import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";

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
    /* suppressHydrationWarning is essential for next-themes to prevent the red error screens */
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* CRITICAL: This blocking script forces the dark theme before the first paint to prevent the white flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add(theme);
                  document.documentElement.style.background = theme === 'dark' ? '#000000' : '#ffffff';
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-700">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* NAVIGATION - 5PX BRUTALIST BORDER */}
          <nav className="sticky top-0 z-[100] w-full border-b-[5px] border-black bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80 transition-all duration-500">
            <div className="mx-auto flex h-16 sm:h-20 max-w-5xl items-center justify-between px-6">
              
              {/* LOGO - BOLD & STRAIGHT */}
              <Link href="/" className="text-xl sm:text-2xl font-black tracking-tighter text-black dark:text-white">
                ReadMeNot<span className="text-blue-600">.</span>
              </Link>

              <div className="flex items-center gap-6 sm:gap-10">
                {/* DESKTOP LINKS - FIXED: Changed dark:text-zinc-400 to dark:text-white */}
                <div className="hidden sm:flex gap-8 text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white">
                  <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resources</Link>
                  <Link href="/roadmap" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Roadmap</Link>
                  <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
                </div>

                {/* THE ONLY THEME TOGGLE - Make sure to delete any other buttons in Home.tsx */}
                <ThemeToggle />
              </div>
            </div>
          </nav>

          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}