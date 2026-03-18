"use client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import React, { use, useState, useEffect } from "react";

const EASE = [0.23, 1, 0.32, 1] as const;

async function getResource(slug: string) {
  const query = `*[_type == "resource" && slug.current == $slug][0]{
    title,
    category,
    description, 
    sections[]{
      subCategoryName,
      contentBlocks[]{
        ...,
        _type == "fileDownload" => { "fileUrl": file.asset->url },
        _type == "image" => { ..., "asset": asset-> },
        _type == "externalLink" => { label, url }
      }
    }
  }`;
  return await client.fetch(query, { slug });
}

const ptComponents = {
  block: {
    // FIXED: Reduced weight to font-normal and tightened line spacing
    normal: ({ children }: any) => (
      <p className="mb-6 leading-[1.4] font-normal text-zinc-900 dark:text-zinc-200 text-lg max-w-2xl">
        {children}
      </p>
    ),
  },
  marks: {
    textColor: ({ children, value }: any) => {
      return <span style={{ color: value.value }}>{children}</span>;
    },
    link: ({ children, value }: any) => {
      const isExternal = !value.href.startsWith("/");
      return (
        <a 
          href={value.href} 
          target={value.blank || isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-blue-600 dark:text-blue-400 font-black underline decoration-[2px] underline-offset-4 hover:opacity-80 transition-all cursor-pointer"
        >
          {children}
        </a>
      );
    },
  },

  list: {
    // FIXED: Reduced gap between list items to keep it compact
    bullet: ({ children }: any) => <ul className="space-y-4 mb-10 list-none max-w-2xl">{children}</ul>,
    task: ({ children }: any) => <div className="space-y-4 mb-12 max-w-2xl">{children}</div>,
  },

  listItem: {
    // FIXED: Blue Square Boxes - set font-black for the uppercase text but normal leading
    bullet: ({ children }: any) => (
      <li className="flex items-center p-5 rounded-[24px] border-[4px] border-black dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-black dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none transition-all hover:translate-x-1">
        <div className="mr-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="h-2.5 w-2.5 bg-white rounded-full" />
        </div>
        <span className="text-lg font-black uppercase tracking-tight leading-none">
          {children}
        </span>
      </li>
    ),
    task: ({ children }: any) => (
      <div className="flex items-center gap-6 p-6 border-[5px] border-black dark:border-zinc-800 rounded-[32px] bg-zinc-50 dark:bg-zinc-900/30 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none transition-all hover:-translate-y-1">
        <input 
          type="checkbox" 
          className="w-8 h-8 rounded-lg border-[4px] border-black dark:border-white bg-white dark:bg-black checked:bg-blue-600 appearance-none cursor-pointer transition-all flex-shrink-0" 
        />
        <div className="font-black text-xl text-black dark:text-white uppercase tracking-tighter leading-tight italic">
          {children}
        </div>
      </div>
    ),
  },

  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      const sizeClasses = {
        center: "max-w-2xl mx-auto rounded-[40px]",
        full: "w-full rounded-[60px]",
        small: "max-w-md mx-auto rounded-[24px]"
      };
      const currentSize = value.size || 'center';
      const selectedClass = sizeClasses[currentSize as keyof typeof sizeClasses];

      return (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`my-12 overflow-hidden border-[5px] border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] dark:shadow-none ${selectedClass}`}
        >
          <img 
            src={urlFor(value).url()} 
            alt={value.caption || "Resource Visual"} 
            className="w-full h-auto object-cover" 
          />
          {value.caption && (
            <p className="py-4 px-6 text-center text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 border-t-[5px] border-black dark:border-zinc-800">
              {value.caption}
            </p>
          )}
        </motion.div>
      );
    },
    fileDownload: ({ value }: any) => (
      <motion.a 
        href={value.fileUrl} 
        download
        target="_blank"
        whileHover={{ scale: 1.01, x: 5 }}
        className="my-8 flex items-center justify-between p-7 rounded-[40px] bg-white dark:bg-zinc-900/40 border-[5px] border-black dark:border-zinc-800 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-none group transition-all duration-300 max-w-2xl"
      >
        <div className="flex items-center gap-6">
          <div className="bg-blue-600 p-4 rounded-2xl text-white">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <span className="block font-black text-xl text-black dark:text-white leading-none mb-1">{value.title || "Download Resource"}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Official PDF • Secure</span>
          </div>
        </div>
        <svg className="w-7 h-7 text-black dark:text-white transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </motion.a>
    ),
  },
};

export default function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [resource, setResource] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(-1); 

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    getResource(slug).then(setResource);
  }, [slug]);

  if (!resource) return <div className="min-h-screen bg-white dark:bg-black" />;

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-700 selection:bg-blue-600 selection:text-white">
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-blue-600 z-[110] origin-left" style={{ scaleX }} />

      <main className="max-w-5xl mx-auto px-6 py-24">
        <header className="mb-16">
          <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-black dark:text-white">{resource.category}</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-8 leading-[0.85] text-black dark:text-white uppercase antialiased">
            {resource.title}<span className="text-blue-600">.</span>
          </h1>
        </header>

        <div className="flex flex-wrap gap-4 mb-16 border-b-[6px] border-black dark:border-zinc-800 pb-10">
          <button
            onClick={() => setActiveTab(-1)}
            className={`px-8 py-4 rounded-[20px] border-[6px] text-[11px] font-black uppercase tracking-widest transition-all duration-400 ${
              activeTab === -1
                ? "bg-blue-600 border-blue-600 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none -translate-x-1 -translate-y-1"
                : "bg-white dark:bg-zinc-900 border-black dark:border-zinc-800 text-black dark:text-zinc-400 hover:border-blue-600"
            }`}
          >
            Overview
          </button>

          {resource.sections?.map((section: any, index: number) => (
            <button
              key={section.subCategoryName}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-4 rounded-[20px] border-[6px] text-[11px] font-black uppercase tracking-widest transition-all duration-400 ${
                activeTab === index
                  ? "bg-blue-600 border-blue-600 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none -translate-x-1 -translate-y-1"
                  : "bg-white dark:bg-zinc-900 border-black dark:border-zinc-800 text-black dark:text-zinc-400 hover:border-blue-600"
              }`}
            >
              {section.subCategoryName}
            </button>
          ))}
        </div>

        <div className="relative antialiased">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {activeTab === -1 ? (
                <section>
                  <div className="flex items-center gap-6 mb-12">
                    <span className="text-7xl font-black tracking-tighter text-blue-600 dark:text-blue-400 drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                      00
                    </span>
                    <h2 className="text-5xl font-black tracking-tighter text-black dark:text-white uppercase leading-none">
                      Introduction
                    </h2>
                  </div>
                  {/* REMOVED prose class to allow custom component styling */}
                  <article className="max-w-none text-black dark:text-white">
                    <PortableText value={resource.description} components={ptComponents} />
                  </article>
                </section>
              ) : (
                resource.sections && resource.sections[activeTab] && (
                  <section>
                    <div className="flex items-center gap-6 mb-12">
                      <span className="text-7xl font-black tracking-tighter text-blue-600 dark:text-blue-400 drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                        0{activeTab + 1}
                      </span>
                      <h2 className="text-5xl font-black tracking-tighter text-black dark:text-white uppercase leading-none">
                        {resource.sections[activeTab].subCategoryName}
                      </h2>
                    </div>

                    <article className="max-w-none text-black dark:text-white">
                      <PortableText 
                        value={resource.sections[activeTab].contentBlocks} 
                        components={ptComponents} 
                      />
                    </article>
                  </section>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="mt-60 pb-16 text-center border-t-[6px] border-black dark:border-zinc-800 pt-16">
          <p className="text-[12px] font-black uppercase tracking-[1em] text-zinc-300 dark:text-zinc-800">
            README NOT • 2026
          </p>
        </footer>
      </main>
    </div>
  );
}