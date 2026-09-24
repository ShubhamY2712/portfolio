import Link from "next/link";
import { logout } from "./actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-surface">
        <div className="max-w-content mx-auto px-6 h-14 flex items-center justify-between">
          <nav className="flex items-center gap-5 text-sm">
            <Link href="/admin" className="font-medium text-ink">Dashboard</Link>
            <Link href="/admin/skills" className="text-ink-soft hover:text-ink">Skills</Link>
            <Link href="/admin/projects" className="text-ink-soft hover:text-ink">Projects</Link>
            <Link href="/admin/achievements" className="text-ink-soft hover:text-ink">Achievements</Link>
            <Link href="/admin/certifications" className="text-ink-soft hover:text-ink">Certifications</Link>
            <Link href="/" target="_blank" className="text-ink-soft hover:text-ink">View site &rarr;</Link>
          </nav>
          <form action={logout}>
            <button type="submit" className="text-sm text-ink-soft hover:text-ink">
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-content mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
