"use client";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import React, { use, useState, useEffect } from "react";

// The 'as const' suffix fixes the TypeScript Easing error
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
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      
      // Determine layout classes based on Sanity selection
      const layoutClass = value.layout === 'left' 
        ? 'md:w-1/2 float-left md:mr-10' 
        : value.layout === 'center' 
          ? 'max-w-2xl mx-auto' 
          : 'w-full';

      return (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className={`my-12 overflow-hidden rounded-[40px] border-[5px] border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-none ${layoutClass}`}
        >
          <img 
            src={urlFor(value).url()} 
            alt={value.caption || "Resource Visual"} 
            className="w-full h-auto object-cover" 
          />
          {value.caption && (
            <p className="py-5 px-6 text-center text-[11px] font-black uppercase tracking-widest text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 border-t-[5px] border-black dark:border-zinc-800">
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
        whileHover={{ scale: 1.02, x: 5 }}
        className="my-10 flex items-center justify-between p-8 rounded-[32px] bg-white dark:bg-zinc-900/40 border-[5px] border-black dark:border-zinc-800 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-none group transition-all duration-300"
      >
        <div className="flex items-center gap-5">
          <div className="bg-blue-600 p-4 rounded-2xl text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <span className="block font-black text-xl text-black dark:text-white">{value.title || "Download Resource"}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Official PDF • Ready</span>
          </div>
        </div>
        <svg className="w-6 h-6 text-black dark:text-white transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </motion.a>
    ),
    externalLink: ({ value }: any) => (
      <motion.a 
        href={value.url} 
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, x: 5 }}
        className="my-6 flex items-center justify-between p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border-[3px] border-blue-600/20 hover:border-blue-600 transition-all group"
      >
        <span className="font-black text-blue-600">{value.label || "Visit Link"}</span>
        <svg className="w-5 h-5 text-blue-600 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-700">
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-blue-600 z-[110] origin-left" style={{ scaleX }} />

      <main className="max-w-4xl mx-auto px-6 py-24">
        <header className="mb-16">
          <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-10">
            <Link href="/" className="hover:text-blue-600 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-black dark:text-white">{resource.category}</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-12 leading-[0.85] text-black dark:text-white">
            {resource.title}<span className="text-blue-600">.</span>
          </h1>
        </header>

        <div className="flex flex-wrap gap-4 mb-20 border-b-[5px] border-black dark:border-zinc-800 pb-8">
          <button
            onClick={() => setActiveTab(-1)}
            className={`px-8 py-4 rounded-2xl border-[5px] text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === -1
                ? "bg-blue-600 border-blue-600 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none translate-x-[-2px] translate-y-[-2px]"
                : "bg-white dark:bg-zinc-900 border-black dark:border-zinc-800 text-black dark:text-zinc-400 hover:border-blue-600"
            }`}
          >
            Overview
          </button>

          {resource.sections?.map((section: any, index: number) => (
            <button
              key={section.subCategoryName}
              onClick={() => setActiveTab(index)}
              className={`px-8 py-4 rounded-2xl border-[5px] text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === index
                  ? "bg-blue-600 border-blue-600 text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none translate-x-[-2px] translate-y-[-2px]"
                  : "bg-white dark:bg-zinc-900 border-black dark:border-zinc-800 text-black dark:text-zinc-400 hover:border-blue-600"
              }`}
            >
              {section.subCategoryName}
            </button>
          ))}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {activeTab === -1 ? (
                <section className="group">
                  <div className="flex items-center gap-6 mb-12">
                    <span className="text-6xl font-black tracking-tighter text-blue-600/30 dark:text-blue-400/40 transition-all duration-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                      00
                    </span>
                    <h2 className="text-4xl font-black tracking-tighter text-black dark:text-white">
                      Introduction
                    </h2>
                  </div>
                  <article className="prose prose-xl prose-zinc dark:prose-invert max-w-none">
                    <PortableText value={resource.description} components={ptComponents} />
                  </article>
                </section>
              ) : (
                resource.sections && resource.sections[activeTab] && (
                  <section className="group">
                    <div className="flex items-center gap-6 mb-12">
                      <span className="text-6xl font-black tracking-tighter text-blue-600/30 dark:text-blue-400/40 transition-all duration-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                        0{activeTab + 1}
                      </span>
                      <h2 className="text-4xl font-black tracking-tighter text-black dark:text-white">
                        {resource.sections[activeTab].subCategoryName}
                      </h2>
                    </div>
                    <article className="prose prose-xl prose-zinc dark:prose-invert max-w-none">
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

        <footer className="mt-60 pb-20 text-center border-t-[5px] border-black dark:border-zinc-800 pt-20">
          <p className="text-[12px] font-black uppercase tracking-[1em] text-zinc-300 dark:text-zinc-800">
            README NOT • 2026
          </p>
        </footer>
      </main>
    </div>
  );
}