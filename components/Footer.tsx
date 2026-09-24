import { Mail, Github, Linkedin, FileDown } from "lucide-react";

export default function Footer({
  name,
  email,
  linkedin,
  github,
  resumeUrl,
}: {
  name: string;
  email: string;
  linkedin?: string | null;
  github?: string | null;
  resumeUrl?: string | null;
}) {
  return (
    <footer id="contact" className="border-t border-line mt-24">
      <div className="max-w-content mx-auto px-6 py-14">
        <h2 className="font-display text-2xl font-semibold text-ink mb-2">Let's talk</h2>
        <p className="text-ink-soft mb-8 max-w-md">
          Open to AI Product Manager and Business Analyst internships and roles.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={"mailto:" + email}
            className="inline-flex items-center gap-2 text-sm bg-surface border border-line px-4 py-2 rounded-md hover:border-primary transition-colors"
          >
            <Mail size={16} /> {email}
          </a>
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm bg-surface border border-line px-4 py-2 rounded-md hover:border-primary transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm bg-surface border border-line px-4 py-2 rounded-md hover:border-primary transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
          )}
          {resumeUrl && (
            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 text-sm bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              <FileDown size={16} /> Download Resume
            </a>
          )}
        </div>
        <p className="text-xs text-ink-soft mt-12">
          &copy; {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  );
}
