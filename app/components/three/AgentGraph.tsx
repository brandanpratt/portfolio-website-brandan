"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const SIGNAL = new THREE.Color("#22e1ff");
const AQUA = new THREE.Color("#2de2b6");
const SUN = new THREE.Color("#f6c453");
const WHITE = new THREE.Color("#ffffff");
const EDGE = SIGNAL.clone().multiplyScalar(0.22);
const EDGE_HOT = SIGNAL.clone().multiplyScalar(1.4);

type Graph = {
  positions: THREE.Vector3[];
  hubs: boolean[];
  edges: [number, number][];
  adj: number[][];
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph(count: number): Graph {
  const rand = mulberry32(242);
  const positions: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const inner = rand() < 0.18;
    const radius = (inner ? 1.1 : 2.4) + (rand() - 0.5) * 0.7;
    positions.push(new THREE.Vector3(Math.cos(theta) * r * radius * 1.25, y * radius * 0.85, Math.sin(theta) * r * radius));
  }
  const hubs = positions.map((_, i) => i % 9 === 0);

  const keys = new Set<string>();
  const edges: [number, number][] = [];
  const adj: number[][] = positions.map(() => []);
  positions.forEach((p, i) => {
    const k = hubs[i] ? 5 : 3;
    positions
      .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (keys.has(key)) return;
        keys.add(key);
        edges.push([i, j]);
        adj[i].push(j);
        adj[j].push(i);
      });
  });
  return { positions, hubs, edges, adj };
}

type Packet = { from: number; to: number; t: number; speed: number; gold: boolean };

function Network({ count, packetCount }: { count: number; packetCount: number }) {
  const graph = useMemo(() => buildGraph(count), [count]);
  const group = useRef<THREE.Group>(null!);
  const nodes = useRef<THREE.InstancedMesh>(null!);
  const packetsMesh = useRef<THREE.InstancedMesh>(null!);
  const lines = useRef<THREE.LineSegments>(null!);
  const { gl } = useThree();
  const hovered = useRef<number | null>(null);
  const lastHovered = useRef<number | null | undefined>(undefined);
  const pointer = useRef({ x: 0, y: 0, active: false });

  // Mutable simulation state lives in a ref; it is advanced every frame.
  const sim = useRef({
    energy: new Float32Array(0),
    packets: [] as Packet[],
    tmp: new THREE.Object3D(),
    v: new THREE.Vector3(),
    c: new THREE.Color(),
  });

  useEffect(() => {
    const rand = mulberry32(7);
    sim.current.energy = new Float32Array(count);
    sim.current.packets = Array.from({ length: packetCount }, () => {
      const [from, to] = graph.edges[Math.floor(rand() * graph.edges.length)];
      return { from, to, t: rand(), speed: 0.35 + rand() * 0.5, gold: rand() < 0.15 };
    });
  }, [graph, count, packetCount]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(graph.edges.length * 6);
    const col = new Float32Array(graph.edges.length * 6);
    graph.edges.forEach(([a, b], i) => {
      graph.positions[a].toArray(pos, i * 6);
      graph.positions[b].toArray(pos, i * 6 + 3);
      EDGE.toArray(col, i * 6);
      EDGE.toArray(col, i * 6 + 3);
    });
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return geo;
  }, [graph]);

  useEffect(() => () => lineGeometry.dispose(), [lineGeometry]);

  // Track the pointer across the whole window so overlaid hero text doesn't block interaction.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.current.active = e.clientY >= rect.top && e.clientY <= rect.bottom;
    };
    const onLeave = () => (pointer.current.active = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [gl]);

  useFrame((state, delta) => {
    const { energy, packets, tmp, v, c } = sim.current;
    if (packets.length === 0) return;
    const { camera } = state;
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    const g = group.current;
    const p = pointer.current;

    // Ambient drift + cursor parallax.
    g.rotation.y += dt * 0.05;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, p.y * 0.25, 0.04);
    // On wide screens the network sits to the right of the headline.
    const baseX = state.size.width >= 1024 ? 1.9 : 0;
    g.position.x = THREE.MathUtils.lerp(g.position.x, baseX + p.x * 0.35, 0.04);

    // Scroll: dive into the network as the hero scrolls away.
    const progress = Math.min(window.scrollY / window.innerHeight, 1.2);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.5 - progress * 3, 0.08);
    g.position.y = THREE.MathUtils.lerp(g.position.y, progress * 0.8, 0.08);
    g.updateMatrixWorld();

    // Hover: nearest node to the pointer in screen space.
    let nearest: number | null = null;
    if (p.active) {
      const aspect = state.size.width / state.size.height;
      let best = 0.07;
      for (let i = 0; i < count; i++) {
        v.copy(graph.positions[i]).applyMatrix4(g.matrixWorld).project(camera);
        const d = Math.hypot((v.x - p.x) * aspect, v.y - p.y);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
    }
    hovered.current = nearest;
    const neighbors = nearest !== null ? graph.adj[nearest] : [];

    // Packets walk the graph like agents handing off work.
    for (let i = 0; i < packets.length; i++) {
      const pk = packets[i];
      pk.t += dt * pk.speed;
      if (pk.t >= 1) {
        energy[pk.to] = 1;
        const next = graph.adj[pk.to];
        const prev = pk.from;
        pk.from = pk.to;
        pk.to = next.length > 1 ? next.filter((n) => n !== prev)[Math.floor(Math.random() * (next.length - 1))] : next[0];
        pk.t = 0;
      }
      const e = pk.t * pk.t * (3 - 2 * pk.t);
      tmp.position.lerpVectors(graph.positions[pk.from], graph.positions[pk.to], e);
      tmp.scale.setScalar(pk.gold ? 0.045 : 0.03);
      tmp.updateMatrix();
      packetsMesh.current.setMatrixAt(i, tmp.matrix);
      c.copy(pk.gold ? SUN : WHITE).multiplyScalar(pk.gold ? 3 : 2);
      packetsMesh.current.setColorAt(i, c);
    }
    packetsMesh.current.instanceMatrix.needsUpdate = true;
    if (packetsMesh.current.instanceColor) packetsMesh.current.instanceColor.needsUpdate = true;

    // Nodes: breathe, flash on packet arrival, light up on hover.
    for (let i = 0; i < count; i++) {
      energy[i] *= Math.exp(-dt * 2.2);
      const boost = i === nearest ? 1 : neighbors.includes(i) ? 0.55 : 0;
      const glow = Math.max(energy[i], boost);
      const base = graph.hubs[i] ? 0.085 : 0.045;
      tmp.position.copy(graph.positions[i]);
      tmp.scale.setScalar(base * (1 + 0.08 * Math.sin(time * 1.4 + i)) * (1 + glow * 0.9));
      tmp.updateMatrix();
      nodes.current.setMatrixAt(i, tmp.matrix);
      c.copy(graph.hubs[i] ? AQUA : SIGNAL)
        .lerp(WHITE, glow * 0.6)
        .multiplyScalar(1.1 + glow * 2.2);
      nodes.current.setColorAt(i, c);
    }
    nodes.current.instanceMatrix.needsUpdate = true;
    if (nodes.current.instanceColor) nodes.current.instanceColor.needsUpdate = true;

    // Edge highlight only changes when the hovered node does.
    if (lastHovered.current !== nearest) {
      lastHovered.current = nearest;
      const col = lines.current.geometry.getAttribute("color") as THREE.BufferAttribute;
      graph.edges.forEach(([a, b], i) => {
        const hot = nearest !== null && (a === nearest || b === nearest);
        const color = hot ? EDGE_HOT : EDGE;
        col.setXYZ(i * 2, color.r, color.g, color.b);
        col.setXYZ(i * 2 + 1, color.r, color.g, color.b);
      });
      col.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <lineSegments ref={lines} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.9} toneMapped={false} />
      </lineSegments>
      <instancedMesh ref={nodes} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={packetsMesh} args={[undefined, undefined, packetCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

export default function AgentGraph({ onReady }: { onReady?: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [mobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden>
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, mobile ? 1.5 : 1.75]}
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        onCreated={() => onReady?.()}
        style={{ pointerEvents: "none" }}
      >
        <Network count={mobile ? 54 : 110} packetCount={mobile ? 18 : 42} />
        {!mobile && (
          <EffectComposer multisampling={4}>
            <Bloom mipmapBlur intensity={1.1} luminanceThreshold={0.25} luminanceSmoothing={0.2} radius={0.7} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
