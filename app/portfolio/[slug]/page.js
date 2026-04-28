import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectCard } from "@/components/content-cards";
import { ProjectDemo } from "@/components/project-demo";
import { DetailLead, DetailSection } from "@/components/detail-shell";
import { SiteShell } from "@/components/site-shell";
import { getProjectBySlug, getResumeData } from "@/lib/resume-data";

export function generateStaticParams() {
  return getResumeData().projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }) {
  const data = getResumeData();
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const siblingProjects = data.projects.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <SiteShell>
      <article className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
        <DetailLead
          backHref="/portfolio"
          backLabel="返回作品集"
          eyebrow={`${project.category} / ${project.year}`}
          title={project.title}
          description={project.summary}
          meta={project.stack}
        />

        <DetailSection title="项目亮点">
          <ul className="space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-base leading-7 text-[var(--muted)]">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" />
                {highlight}
              </li>
            ))}
          </ul>
        </DetailSection>

        {project.link && (
          <DetailSection title="项目链接">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[8px] border border-[var(--accent)] bg-white px-5 py-3 font-semibold text-[var(--accent-dark)] transition hover:bg-[var(--wash)]"
            >
              访问项目
              <span className="text-lg">↗</span>
            </a>
          </DetailSection>
        )}

        <DetailSection title="详细设计">
          <p className="text-base leading-8 text-[var(--muted)]">{project.design}</p>
        </DetailSection>

        <DetailSection title="主要功能">
          <div className="grid gap-4 md:grid-cols-2">
            {project.features.map((feature) => (
              <div key={feature} className="rounded-[8px] border border-black/8 bg-[var(--wash)] p-5">
                <p className="font-semibold text-[var(--ink)]">{feature}</p>
              </div>
            ))}
          </div>
        </DetailSection>

        {project.demo && (
          <DetailSection title="在线体验">
            <ProjectDemo demo={project.demo} />
          </DetailSection>
        )}

        <DetailSection title="更多项目">
          <div className="grid gap-5 lg:grid-cols-2">
            {siblingProjects.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/portfolio" className="text-sm font-semibold text-[var(--accent-dark)]">
              查看全部项目
            </Link>
          </div>
        </DetailSection>
      </article>
    </SiteShell>
  );
}
