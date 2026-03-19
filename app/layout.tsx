import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "ReadMeNot | Your Admission Roadmap",
  description: "From 0 to International Admission",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
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
      <body
        className={`${inter.className} antialiased bg-white dark:bg-black text-black dark:text-[#f5f5f5] transition-colors duration-700`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* NAVIGATION */}
          <nav className="sticky top-0 z-[100] w-full border-b-[5px] border-black bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-black/95 transition-all duration-500">
            <div className="mx-auto flex h-16 sm:h-20 max-w-5xl items-center justify-between px-6">
              
              {/* LOGO */}
              <Link href="/" className="text-xl sm:text-2xl font-black tracking-tighter text-black dark:text-white">
                ReadMeNot<span className="text-blue-600">.</span>
              </Link>

              <div className="flex items-center gap-6 sm:gap-10">
                {/* DESKTOP LINKS - ORIGINAL STYLING (NOT BLUE) */}
                <div className="hidden sm:flex gap-8 text-[12px] font-bold uppercase tracking-[0.2em] text-black dark:text-[#f5f5f5]">
                  <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resources</Link>
                  <Link href="/roadmap" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Roadmap</Link>
                  <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
                </div>

                {/* THEME TOGGLE */}
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