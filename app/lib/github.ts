import { site } from "@/app/data/site";

const REVALIDATE = 3600;
const token = process.env.GITHUB_TOKEN;
const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": "brandan-pratt-portfolio",
  ...(token && { Authorization: `Bearer ${token}` }),
};

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

export type Activity = {
  repos: Repo[];
  languages: { name: string; count: number }[];
  publicRepos: number;
  followers: number;
  recentPushes: number;
  lastPush: string | null;
  calendar: { date: string; count: number }[] | null;
  totalContributions: number | null;
};

async function gh<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`https://api.github.com${path}`, { headers, next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function contributionCalendar() {
  if (!token) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}}}`,
        variables: { login: site.githubUser },
      }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;
    const days: { date: string; count: number }[] = cal.weeks.flatMap(
      (w: { contributionDays: { date: string; contributionCount: number }[] }) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
    );
    return { days, total: cal.totalContributions as number };
  } catch {
    return null;
  }
}

export async function getGitHubActivity(): Promise<Activity | null> {
  const [user, repos, events, calendar] = await Promise.all([
    gh<{ public_repos: number; followers: number }>(`/users/${site.githubUser}`),
    gh<Repo[]>(`/users/${site.githubUser}/repos?sort=pushed&per_page=30`),
    gh<{ type: string; created_at: string; payload?: { size?: number } }[]>(
      `/users/${site.githubUser}/events/public?per_page=100`,
    ),
    contributionCalendar(),
  ]);
  if (!user || !repos) return null;

  const own = repos.filter((r) => !r.fork && r.name !== site.githubUser);
  const langCounts = new Map<string, number>();
  own.forEach((r) => r.language && langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1));

  const pushes = (events ?? []).filter((e) => e.type === "PushEvent");
  const monthAgo = Date.now() - 30 * 864e5;

  return {
    repos: own.slice(0, 4),
    languages: [...langCounts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 6),
    publicRepos: user.public_repos,
    followers: user.followers,
    recentPushes: pushes.filter((e) => +new Date(e.created_at) > monthAgo).length,
    lastPush: repos[0]?.pushed_at ?? null,
    calendar: calendar?.days.slice(-26 * 7) ?? null,
    totalContributions: calendar?.total ?? null,
  };
}

export function timeAgo(iso: string) {
  const s = (Date.now() - +new Date(iso)) / 1000;
  const units: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, name] of units) {
    const n = Math.floor(s / secs);
    if (n >= 1) return `${n} ${name}${n > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
