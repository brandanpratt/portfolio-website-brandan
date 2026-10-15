import type { MetadataRoute } from "next";
import { SITE_URL } from "./data/site";
import { projects } from "./data/projects";
import { getAllPosts } from "./lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/services", "/work", "/about", "/blog", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({ url: `${SITE_URL}/work/${p.slug}`, lastModified: now, priority: 0.6 }));
  const posts = getAllPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.7 }));
  return [...pages, ...work, ...posts];
}
