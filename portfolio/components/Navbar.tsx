"use client";

import Link from "next/link";

export default function Navbar({
  name,
  resumeUrl,
}: {
  name: string;
  resumeUrl?: string | null;
}) {
  const parts = name.split(" ");
  const shortName = parts.length > 1 ? parts[0] + " " + parts[parts.length - 1] : name;

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-line">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold text-ink">
          {shortName}
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-ink-soft">
          <Link href="/#projects" className="hover:text-ink transition-colors">Projects</Link>
          <Link href="/#skills" className="hover:text-ink transition-colors">Skills</Link>
          <Link href="/#achievements" className="hover:text-ink transition-colors">Achievements</Link>
          <Link href="/#contact" className="hover:text-ink transition-colors">Contact</Link>
        </nav>
        {resumeUrl ? (
          <a
            href={resumeUrl}
            download
            className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Resume
          </a>
        ) : (
          <span className="text-sm font-medium bg-line text-ink-soft px-4 py-2 rounded-md cursor-not-allowed">
            Resume
          </span>
        )}
      </div>
    </header>
  );
}
