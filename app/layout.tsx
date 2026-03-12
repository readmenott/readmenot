import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ReadMeNot | Your Admission Roadmap",
  description: "From 0 to International Admission",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Remove bg-zinc-50 and dark:bg-black. Let globals.css handle the background. */}
      <body className="antialiased selection:bg-blue-600 selection:text-white">
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80 transition-colors duration-500">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
            <Link href="/" className="text-xl font-black tracking-tighter text-black dark:text-white">
              ReadMeNot<span className="text-blue-600">.</span>
            </Link>
            <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                Resources
              </Link>
              <Link href="/roadmap" className="hover:text-blue-600 dark:hover:text-white transition-colors">
                Roadmap
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}