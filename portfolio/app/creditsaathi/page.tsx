import CaseStudy from "@/components/CaseStudy";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function CreditSaathiPage() {
  const supabase = createClient();
  const { data: p } = await supabase.from("projects").select("*").eq("slug", "creditsaathi").single();

  if (!p) return <p className="p-10 text-sm text-ink-soft">Project not found.</p>;

  return (
    <CaseStudy
      name={p.name}
      tag={p.tag}
      role={p.role}
      dates={p.dates}
      tech={p.tech || []}
      summary={p.summary}
      bullets={p.bullets || []}
      prdLink={p.prd_link}
      githubLink={p.github_link}
    />
  );
}
