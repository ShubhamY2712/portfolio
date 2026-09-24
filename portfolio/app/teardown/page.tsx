import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function TeardownPage() {
  const supabase = createClient();
  const { data: profile } = await supabase.from("profile").select("*").eq("id", 1).single();
  const { data: teardown } = await supabase.from("teardown").select("*").eq("id", 1).single();

  return (
    <>
      <Navbar name={profile?.name || ""} resumeUrl={profile?.resume_url} />
      <article className="max-w-content mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back home
        </Link>

        <AnimatedSection>
          <p className="text-xs font-medium text-accent uppercase tracking-wide mb-2">
            Product Teardown
          </p>
          <h1 className="font-display text-4xl font-semibold text-ink mb-6">
            {teardown?.placeholder ? "Coming soon" : teardown?.product_name}
          </h1>
          <p className="text-ink-soft leading-relaxed max-w-2xl">{teardown?.summary}</p>
        </AnimatedSection>

        {teardown?.placeholder && (
          <AnimatedSection delay={0.1} className="mt-10 bg-surface border border-line rounded-lg p-6">
            <p className="text-sm text-ink-soft">
              Edit this page&apos;s content anytime from the <code className="bg-primary-soft text-primary px-1 rounded">/admin</code> dashboard.
            </p>
          </AnimatedSection>
        )}
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
