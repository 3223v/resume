import { ProjectCard } from "@/components/content-cards";
import { SectionIntro, SiteShell } from "@/components/site-shell";
import { getResumeData } from "@/lib/resume-data";

export default function PortfolioPage() {
  const { projects } = getResumeData();

  return (
    <SiteShell>
      <section className="page-section">
        <SectionIntro eyebrow="Selected Work" title="项目信息">
          项目包含详细设计，主要功能，快速体验。
        </SectionIntro>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 sm:px-8 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </SiteShell>
  );
}
