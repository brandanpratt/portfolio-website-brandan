import { site } from "@/app/data/site";
import { getGitHubActivity, timeAgo } from "@/app/lib/github";
import { Reveal } from "../ui/Reveal";

function level(count: number, max: number) {
  if (count === 0) return "bg-line/60";
  const r = count / Math.max(max, 1);
  if (r < 0.25) return "bg-signal/25";
  if (r < 0.5) return "bg-signal/45";
  if (r < 0.75) return "bg-signal/70";
  return "bg-signal shadow-[0_0_8px_var(--color-signal)]";
}

export async function GitHubPulse() {
  const data = await getGitHubActivity();
  if (!data) return null;

  const max = data.calendar ? Math.max(...data.calendar.map((d) => d.count)) : 0;
  const stats = [
    { label: data.totalContributions !== null ? "Contributions this year" : "Pushes in the last 30 days", value: data.totalContributions ?? data.recentPushes },
    { label: "Public repositories", value: data.publicRepos },
    { label: "Last push", value: data.lastPush ? timeAgo(data.lastPush) : "—" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <Reveal className="glass rounded-3xl p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-fog">GitHub activity</p>
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-signal hover:underline">
            @{site.githubUser} ↗
          </a>
        </div>

        <dl className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="text-2xl font-medium text-paper md:text-3xl">{s.value}</dd>
              <dt className="mt-1 text-xs text-fog">{s.label}</dt>
            </div>
          ))}
        </dl>

        {data.calendar && (
          <div className="mt-8 overflow-hidden" aria-label="Contribution activity, last 26 weeks">
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {data.calendar.map((d) => (
                <span key={d.date} title={`${d.count} contributions on ${d.date}`} className={`aspect-square w-full rounded-[2px] ${level(d.count, max)}`} />
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {data.languages.map((l) => (
              <span key={l.name} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-mist">
                {l.name}
              </span>
            ))}
          </div>
        )}
      </Reveal>

      <ul className="grid gap-3">
        {data.repos.map((r, i) => (
          <Reveal as="li" key={r.name} delay={i * 0.06}>
            <a
              href={r.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass flex h-full flex-col justify-between gap-3 rounded-2xl p-5 transition-colors hover:border-signal/50"
            >
              <div>
                <p className="font-mono text-sm text-paper group-hover:text-signal">{r.name}</p>
                {r.description && <p className="mt-1 line-clamp-2 text-sm text-fog">{r.description}</p>}
              </div>
              <p className="flex gap-4 font-mono text-xs text-fog">
                {r.language && <span>{r.language}</span>}
                <span>updated {timeAgo(r.pushed_at)}</span>
              </p>
            </a>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
