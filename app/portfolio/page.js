import { ProjectCard } from "@/components/content-cards";
import { SectionIntro, SiteShell } from "@/components/site-shell";
import { getResumeData } from "@/lib/resume-data";

export default function PortfolioPage() {
  const { projects } = getResumeData();

  return (
    <SiteShell>
      <section className="page-section">
        <SectionIntro eyebrow="Selected Work" title="作品集">
          每个项目都包含背景、职责、影响和技术栈，方便继续扩展为完整 case study。
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
