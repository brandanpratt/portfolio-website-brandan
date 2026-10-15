import { getProject, projects } from "@/app/data/projects";
import { ogImage, ogSize } from "@/app/lib/og";

export const alt = "Case study by Brandan Pratt";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return ogImage({ eyebrow: `Case study · ${project?.category ?? ""}`, title: project?.title ?? "Case study" });
}
