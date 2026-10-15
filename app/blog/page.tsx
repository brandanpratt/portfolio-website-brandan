import type { Metadata } from "next";
import { getAllPosts } from "../lib/blog";
import { CtaBand, PostCard } from "../components/cards";
import { PageHeader, Serif } from "../components/ui/Section";

export const metadata: Metadata = {
  title: "Insights on AI for Business",
  description:
    "Practical writing on AI agents, automation and software for startups and small businesses, from a Caribbean-based AI consultant and engineer.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={<>Notes on <Serif>AI in business</Serif></>}
        intro="Practical, hype-free writing on where AI and software actually move the needle for growing businesses."
      />
      <section className="container-page">
        <div className="border-b border-line">
          {posts.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
