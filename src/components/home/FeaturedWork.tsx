import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "./ProjectCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { projectsData } from "@/data/projects";
import { ArrowRight } from "lucide-react";

export function FeaturedWork() {
  return (
    <section id="featured-work" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background ambient light fields */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[140px] pointer-events-none animate-ambient-cyan" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#8B2CFF]/5 rounded-full blur-[150px] pointer-events-none animate-ambient-purple" />

      <Container>
        <ScrollReveal>
          <SectionHeader
            badgeText="FEATURED WORK"
            badgeVariant="cyan"
            title="Engineered Products & Digital Platforms"
            description="Verified digital platforms and experiences built with modern architectures for ambitious organizations."
          />
        </ScrollReveal>

        {/* Large Editorial Project Showcases (Alternating Asymmetric Layout) */}
        <div className="space-y-10 sm:space-y-14 mb-16">
          {projectsData.slice(0, 2).map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 100}>
              <ProjectCard
                project={project}
                index={index}
                reverse={index % 2 === 1}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Archive Callout */}
        <ScrollReveal delay={150} className="text-center">
          <Button
            href="/work"
            variant="secondary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore All Projects in Archive
          </Button>
        </ScrollReveal>
      </Container>
    </section>
  );
}
