import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createClient();
  const { data: profile } = await supabase.from("profile").select("name, tagline").eq("id", 1).single();

  const name = profile?.name || "Portfolio";
  const tagline = profile?.tagline || "";

  return {
    title: name + " | AI Product Manager",
    description: tagline,
    openGraph: {
      title: name + " | AI Product Manager",
      description: tagline,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fraunces.variable + " " + plexSans.variable}>
      <body className="font-body">{children}</body>
    </html>
  );
}
