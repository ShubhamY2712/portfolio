import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-display text-3xl font-semibold text-ink mb-3">Page not found</h1>
      <p className="text-ink-soft mb-6">This page doesn&apos;t exist &mdash; but the portfolio does.</p>
      <Link href="/" className="text-primary font-medium hover:underline">
        Back to home
      </Link>
    </div>
  );
}
