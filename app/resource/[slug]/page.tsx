import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

async function getResource(slug: string) {
  const query = `*[_type == "resource" && slug.current == $slug][0]{
    title,
    category,
    subCategory,
    content,
    "fileUrl": fileUpload.asset->url
  }`;
  return await client.fetch(query, { slug });
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div className="relative w-full h-[300px] sm:h-[550px] my-14 overflow-hidden rounded-[40px] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <Image
            src={urlFor(value).url()}
            alt="Study Guide Visual"
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
};

export default async function ResourcePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const resource = await getResource(resolvedParams.slug);

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <Link href="/" className="text-sm font-black uppercase tracking-widest text-blue-600">← Back Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. SCROLL PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
        <div id="progress-bar" className="h-full bg-blue-600 transition-all duration-150 w-0"></div>
      </div>

      {/* 2. ENHANCED BREADCRUMB NAVIGATION */}
      <nav className="border-b border-zinc-100 dark:border-zinc-800 sticky top-0 bg-white/90 dark:bg-black/90 backdrop-blur-xl z-50">
        <div className="max-w-5xl mx-auto py-5 px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 text-[13px] font-black uppercase tracking-widest">
            <Link href="/" className="text-blue-600 hover:opacity-70 transition-opacity">HOME</Link>
            <span className="text-zinc-300 dark:text-zinc-800 font-normal">/</span>
            <span className="text-zinc-900 dark:text-zinc-100">{resource.category}</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-24">
        {/* 3. HEADER SECTION */}
        <header className="mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[11px] font-black uppercase tracking-[0.25em] text-blue-600 mb-8">
            {resource.subCategory || "Masterclass"}
          </div>
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-10 leading-[0.95] text-zinc-900 dark:text-zinc-100">
            {resource.title}
          </h1>
          <div className="h-2 w-28 bg-blue-600 rounded-full"></div>
        </header>

        {/* 4. ARTICLE CONTENT */}
        <article className="prose prose-xl prose-zinc dark:prose-invert max-w-none 
          prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-zinc-900 dark:prose-headings:text-white
          prose-p:leading-[1.8] prose-p:text-zinc-600 dark:prose-p:text-zinc-400
          prose-strong:text-zinc-900 dark:prose-strong:text-white">
          <PortableText value={resource.content} components={ptComponents} />
        </article>

        {/* 5. DOWNLOAD CTA */}
        {resource.fileUrl && (
          <div className="mt-32 p-16 rounded-[60px] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 text-center shadow-inner">
            <h3 className="text-3xl font-black tracking-tighter mb-4 text-zinc-900 dark:text-zinc-100">Take this with you.</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm mx-auto text-lg">
              Download the official PDF roadmap to keep your prep on track.
            </p>
            <a
              href={resource.fileUrl}
              target="_blank"
              className="inline-flex items-center justify-center px-14 py-5 bg-blue-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
            >
              Download PDF Version
            </a>
          </div>
        )}

        {/* 6. CLEAN FOOTER */}
        <footer className="mt-40 pb-16 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800">
            README NOT • 0 TO ADMISSION
          </p>
        </footer>
      </main>

      {/* SCRIPT FOR PROGRESS BAR */}
      <script dangerouslySetInnerHTML={{ __html: `
        window.onscroll = function() {
          var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var scrolled = (winScroll / height) * 100;
          document.getElementById("progress-bar").style.width = scrolled + "%";
        };
      `}} />
    </div>
  );
}