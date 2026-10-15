import { getAllPosts, getPost } from "@/app/lib/blog";
import { ogImage, ogSize } from "@/app/lib/og";

export const alt = "Article by Brandan Pratt";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return ogImage({ eyebrow: "Insights", title: post?.title ?? "Insights", footer: post?.readingTime });
}
