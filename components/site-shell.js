import Link from "next/link";
import { getResumeData } from "@/lib/resume-data";

const navigation = [
  { href: "/", label: "快速了解" },
  { href: "/about", label: "详细信息" },
  { href: "/portfolio", label: "项目信息" },
  { href: "/blog", label: "博客" }
];

export function SiteShell({ children }) {
  const { profile } = getResumeData();

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-white/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="Go to homepage">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-sm font-semibold shadow-sm shadow-black/5">
              {profile.name.slice(0, 1)}
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">{profile.name}</span>
              <span className="block text-xs text-[var(--muted)]">{profile.location}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-full border border-black/8 bg-white px-2 py-2 shadow-sm shadow-black/4 md:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition hover:bg-[var(--wash)] hover:text-[var(--ink)]">
                {item.label}
              </Link>
            ))}
          </nav>
          <a href={`mailto:${profile.email}`} className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--accent-dark)]">
            联系
          </a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-black/6 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 {profile.name}. Built by codex.</p>
          <div className="flex gap-4">
            {profile.links.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-[var(--ink)]">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export function SectionIntro({ eyebrow, title, children }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">{eyebrow}</p>
      <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-6xl">{title}</h1>
      {children ? <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{children}</p> : null}
    </div>
  );
}

export function ProjectVisual({ tone = "mist", label }) {
  return (
    <div className={`project-visual tone-${tone}`} aria-label={label} role="img">
      <span className="visual-line visual-line-a" />
      <span className="visual-line visual-line-b" />
      <span className="visual-mark" />
      <span className="visual-dot visual-dot-a" />
      <span className="visual-dot visual-dot-b" />
    </div>
  );
}
