"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function ProjectCard({
  slug,
  name,
  tag,
  hook,
  tech,
}: {
  slug: string;
  name: string;
  tag: string;
  hook: string;
  tech: string[];
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-surface border border-line rounded-lg p-6 flex flex-col h-full"
    >
      <p className="text-xs font-medium text-accent uppercase tracking-wide mb-2">{tag}</p>
      <h3 className="font-display text-xl font-semibold text-ink mb-2">{name}</h3>
      <p className="text-ink-soft text-sm mb-4 flex-grow">{hook}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-xs bg-primary-soft text-primary px-2 py-0.5 rounded"
          >
            {t}
          </span>
        ))}
      </div>
      <Link
        href={`/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
      >
        View case study <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}
