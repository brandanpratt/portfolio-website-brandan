export type TechItem = {
  name: string;
  slug: string;
  color: string;
  category: "ai" | "frontend" | "backend" | "data" | "devops";
};

export const techStack: TechItem[] = [
  { name: "Claude", slug: "claude", color: "D97757", category: "ai" },
  { name: "Cursor", slug: "cursor", color: "FFFFFF", category: "ai" },
  { name: "Vercel AI SDK", slug: "vercel", color: "FFFFFF", category: "ai" },
  { name: "React", slug: "react", color: "61DAFB", category: "frontend" },
  { name: "Next.js", slug: "nextdotjs", color: "FFFFFF", category: "frontend" },
  { name: "TypeScript", slug: "typescript", color: "3178C6", category: "frontend" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E", category: "frontend" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4", category: "frontend" },
  { name: "Laravel", slug: "laravel", color: "FF2D20", category: "backend" },
  { name: "PHP", slug: "php", color: "777BB4", category: "backend" },
  { name: "Python", slug: "python", color: "3776AB", category: "backend" },
  { name: "Go", slug: "go", color: "00ADD8", category: "backend" },
  { name: "Node.js", slug: "nodedotjs", color: "339933", category: "backend" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1", category: "backend" },
  { name: "MySQL", slug: "mysql", color: "4479A1", category: "backend" },
  { name: "Snowflake", slug: "snowflake", color: "29B5E8", category: "data" },
  { name: "Apache Airflow", slug: "apacheairflow", color: "017CEE", category: "data" },
  { name: "Pandas", slug: "pandas", color: "150458", category: "data" },
  { name: "Docker", slug: "docker", color: "2496ED", category: "devops" },
];

export const techByCategory = {
  ai: techStack.filter((t) => t.category === "ai"),
  frontend: techStack.filter((t) => t.category === "frontend"),
  backend: techStack.filter((t) => t.category === "backend"),
  data: techStack.filter((t) => t.category === "data"),
  devops: techStack.filter((t) => t.category === "devops"),
} as const;

export function techLogoUrl(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}
