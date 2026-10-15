import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SITE_URL, site } from "@/app/data/site";
import { formatDate, getAllPosts, getPost } from "@/app/lib/blog";
import { CtaBand } from "@/app/components/cards";
import { JsonLd, personId } from "@/app/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date, authors: [site.name], tags: post.tags },
    twitter: { title: post.title, description: post.description },
  };
}

const components = {
  a: ({ href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith("/") ? <Link href={href} {...props} /> : <a href={href} target="_blank" rel="noopener noreferrer" {...props} />,
};

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@id": personId, name: site.name, url: SITE_URL },
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
          keywords: post.tags.join(", "),
        }}
      />
      <article className="container-page pt-36 md:pt-44">
        <header className="mx-auto max-w-3xl">
          <Link href="/blog" className="font-mono text-xs text-fog hover:text-signal">← All insights</Link>
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-signal">{t}</span>)}
          </div>
          <h1 className="mt-6 text-4xl font-medium leading-tight tracking-tight text-paper md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-xl text-fog">{post.description}</p>
          <p className="mt-8 border-b border-line pb-8 font-mono text-xs text-fog">
            {site.name} · {formatDate(post.date)} · {post.readingTime}
          </p>
        </header>
        <div className="prose prose-invert prose-lg mx-auto mt-12 max-w-3xl prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-paper prose-p:text-mist prose-a:text-signal prose-strong:text-paper prose-li:text-mist prose-li:marker:text-signal">
          <MDXRemote source={post.content} components={components} />
        </div>
      </article>
      <CtaBand />
    </>
  );
}
