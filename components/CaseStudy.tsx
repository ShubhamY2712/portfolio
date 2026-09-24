import Link from "next/link";
import { ArrowLeft, Github, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { createClient } from "@/lib/supabase/server";

export default async function CaseStudy({
  name,
  tag,
  role,
  dates,
  tech,
  summary,
  bullets,
  prdLink,
  githubLink,
}: {
  name: string;
  tag: string;
  role: string;
  dates: string;
  tech: string[];
  summary: string;
  bullets: string[];
  prdLink?: string | null;
  githubLink?: string | null;
}) {
  const supabase = createClient();
  const { data: profile } = await supabase.from("profile").select("*").eq("id", 1).single();

  return (
    <>
      <Navbar name={profile?.name || ""} resumeUrl={profile?.resume_url} />
      <article className="max-w-content mx-auto px-6 py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to projects
        </Link>

        <AnimatedSection>
          <p className="text-xs font-medium text-accent uppercase tracking-wide mb-2">{tag}</p>
          <h1 className="font-display text-4xl font-semibold text-ink mb-3">{name}</h1>
          <p className="text-ink-soft mb-1">{role}</p>
          <p className="text-ink-soft text-sm mb-6">{dates}</p>
          <div className="flex flex-wrap gap-1.5 mb-10">
            {tech.map((t) => (
              <span key={t} className="text-xs bg-primary-soft text-primary px-2 py-1 rounded">
                {t}
              </span>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.05} className="mb-10">
          <p className="text-lg text-ink leading-relaxed max-w-2xl">{summary}</p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mb-10">
          <h2 className="font-display text-xl font-semibold text-ink mb-5">
            Approach &amp; decisions
          </h2>
          <ul className="space-y-4">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-accent mt-1.5 flex-shrink-0">&bull;</span>
                <p className="text-ink-soft leading-relaxed">{b}</p>
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="flex flex-wrap gap-3 pt-6 border-t border-line">
          {prdLink && (
            <a
              href={prdLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm bg-surface border border-line px-4 py-2 rounded-md hover:border-primary transition-colors"
            >
              <FileText size={16} /> View AI PRD
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm bg-surface border border-line px-4 py-2 rounded-md hover:border-primary transition-colors"
            >
              <Github size={16} /> View code on GitHub
            </a>
          )}
        </AnimatedSection>
      </article>
      <Footer
        name={profile?.name || ""}
        email={profile?.email || ""}
        linkedin={profile?.linkedin}
        github={profile?.github}
        resumeUrl={profile?.resume_url}
      />
    </>
  );
}
