import Link from "next/link";
import { ArrowRight, FileText, Award, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function Home() {
  const supabase = createClient();

  const [
    { data: profile },
    { data: skills },
    { data: projects },
    { data: teardown },
    { data: achievements },
    { data: certifications },
    { data: researchPaper },
  ] = await Promise.all([
    supabase.from("profile").select("*").eq("id", 1).single(),
    supabase.from("skills").select("*").order("sort_order"),
    supabase.from("projects").select("*").order("sort_order"),
    supabase.from("teardown").select("*").eq("id", 1).single(),
    supabase.from("achievements").select("*").order("sort_order"),
    supabase.from("certifications").select("*").order("sort_order"),
    supabase.from("research_paper").select("*").eq("id", 1).single(),
  ]);

  return (
    <>
      <Navbar name={profile?.name || ""} resumeUrl={profile?.resume_url} />

      <section className="max-w-content mx-auto px-6 pt-20 pb-16 flex flex-col sm:flex-row items-center gap-10">
        <div className="w-32 h-32 rounded-full bg-primary-soft border border-line flex-shrink-0 flex items-center justify-center overflow-hidden">
          {profile?.photo_url ? (
            <img src={profile.photo_url} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-ink-soft text-xs text-center px-2">Add a photo in /admin</span>
          )}
        </div>
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink mb-3">
            {profile?.name}
          </h1>
          <p className="text-lg text-ink-soft mb-6 max-w-xl">{profile?.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              View Projects <ArrowRight size={16} />
            </Link>
            {profile?.resume_url && (
              <a
                href={profile.resume_url}
                download
                className="inline-flex items-center gap-2 border border-line px-5 py-2.5 rounded-md text-sm font-medium hover:border-primary transition-colors"
              >
                Download Resume
              </a>
            )}
          </div>
        </div>
      </section>

      <AnimatedSection id="skills" className="max-w-content mx-auto px-6 pb-16">
        <div className="flex flex-wrap gap-2">
          {skills?.map((skill) => (
            <span
              key={skill.id}
              className="text-sm bg-surface border border-line px-3 py-1.5 rounded-full text-ink-soft"
            >
              {skill.label}
            </span>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="max-w-content mx-auto px-6 pb-20">
        <h2 className="font-display text-2xl font-semibold text-ink mb-4">About</h2>
        <p className="text-ink-soft leading-relaxed max-w-2xl">{profile?.summary}</p>
      </AnimatedSection>

      <AnimatedSection id="projects" className="max-w-content mx-auto px-6 pb-20">
        <h2 className="font-display text-2xl font-semibold text-ink mb-8">Featured Projects</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {projects?.map((p) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              name={p.name}
              tag={p.tag}
              hook={p.hook}
              tech={p.tech || []}
            />
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="max-w-content mx-auto px-6 pb-20">
        <h2 className="font-display text-2xl font-semibold text-ink mb-6">Product Thinking</h2>
        <Link
          href={"/teardown"}
          className="block bg-surface border border-line rounded-lg p-6 hover:border-primary transition-colors"
        >
          <p className="text-xs font-medium text-accent uppercase tracking-wide mb-2">
            Product Teardown
          </p>
          <h3 className="font-display text-xl font-semibold text-ink mb-2">
            {teardown?.placeholder ? "Coming soon" : teardown?.product_name}
          </h3>
          <p className="text-ink-soft text-sm">{teardown?.summary}</p>
        </Link>
      </AnimatedSection>

      <AnimatedSection className="max-w-content mx-auto px-6 pb-20">
        <h2 className="font-display text-2xl font-semibold text-ink mb-6 flex items-center gap-2">
          <FileText size={22} className="text-accent" /> Research
        </h2>
        <div className="bg-surface border border-line rounded-lg p-6">
          <h3 className="font-display text-lg font-semibold text-ink mb-1">
            {researchPaper?.title}
          </h3>
          <p className="text-sm text-ink-soft mb-1">
            {researchPaper?.publication} &middot; {researchPaper?.date}
          </p>
          <p className="text-xs text-ink-soft mb-4">{researchPaper?.note}</p>
          {researchPaper?.pdf_link ? (
            <a
              href={researchPaper.pdf_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              View PDF
            </a>
          ) : (
            <p className="text-xs text-ink-soft italic">Add the PDF in /admin</p>
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection id="achievements" className="max-w-content mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink mb-6 flex items-center gap-2">
              <Award size={22} className="text-accent" /> Achievements
            </h2>
            <ul className="space-y-4">
              {achievements?.map((a) => (
                <li key={a.id} className="text-sm">
                  <p className="text-ink">{a.text}</p>
                  <p className="text-ink-soft text-xs mt-1">{a.date}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink mb-6 flex items-center gap-2">
              <GraduationCap size={22} className="text-accent" /> Certifications
            </h2>
            <ul className="space-y-4">
              {certifications?.map((c) => (
                <li key={c.id} className="text-sm flex items-start gap-2">
                  <span
                    className={"mt-1 w-2 h-2 rounded-full flex-shrink-0 " + (c.status === "done" ? "bg-primary" : "bg-accent")}
                  />
                  <div>
                    <p className="text-ink">
                      {c.text} <span className="text-ink-soft">— {c.org}</span>
                    </p>
                    <p className="text-ink-soft text-xs mt-0.5">{c.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>

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
