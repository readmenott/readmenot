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
        _type == "externalLink" => { label, url },
        _type == "bulletList" => {
          items[] {
            text,
            icon,
            highlight
          }
        },
        _type == "roadmap" => {
          steps[] {
            year,
            title,
            color,
            tasks[] {
              task,
              completed
            }
          }
        }
      }
    }
  }`;
  return await client.fetch(query, { slug });
}

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 leading-[1.4] font-normal text-black dark:text-white text-lg max-w-2xl">
        {children}
      </p>
    ),
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-black mb-6 text-black dark:text-white leading-[1.2]">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-black mb-4 text-black dark:text-white leading-[1.2]">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-black mb-3 text-black dark:text-white leading-[1.2]">{children}</h3>
    ),
  },
  marks: {
    textColor: ({ children, value }: any) => {
      const colorMap: any = {
        blue: 'text-blue-500',
        red: 'text-red-500',
        green: 'text-green-500',
        yellow: 'text-yellow-400',
        purple: 'text-purple-500',
      };
      return <span className={colorMap[value?.color] || 'text-white'}>{children}</span>;
    },
    link: ({ children, value }: any) => {
      const isExternal = !value.href?.startsWith("/");
      return (
        <a 
          href={value.href} 
          target={value.blank || isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-blue-600 dark:text-blue-400 font-medium underline decoration-[2px] underline-offset-3 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          {children}
        </a>
      );
    },
  },

  list: {
    bullet: ({ children }: any) => <ul className="space-y-4 mb-10 list-none max-w-2xl">{children}</ul>,
    task: ({ children }: any) => <div className="space-y-4 mb-12 max-w-2xl">{children}</div>,
  },

  listItem: {
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
    /* PROFESSIONAL BULLET LIST */
    bulletList: ({ value }: any) => (
      <div className="my-8 space-y-3 max-w-2xl">
        {value.items?.map((item: any, index: number) => {
          const iconMap: any = {
            circle: '●',
            checkmark: '✓',
            arrow: '→',
            diamond: '◆',
            star: '★',
          };
          const icon = iconMap[item.icon] || '●';
          
          return (
            <div 
              key={index}
              className={`flex items-start p-4 rounded-lg border-l-4 ${
                item.highlight
                  ? 'border-blue-600 bg-blue-600/10'
                  : 'border-zinc-700 bg-zinc-900/40'
              }`}
            >
              <span className={`mr-4 text-lg font-bold flex-shrink-0 ${item.highlight ? 'text-blue-500' : 'text-white'}`}>
                {icon}
              </span>
              <span className="text-white font-normal leading-[1.5]">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    ),

    /* ENHANCED ROADMAP TIMELINE */
    roadmap: ({ value }: any) => (
      <div className="relative my-8 pl-8 max-w-2xl">
        {/* Timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-400" />
        
        <div className="space-y-12">
          {value.steps?.map((step: any, index: number) => {
            const colorMap: any = {
              blue: { bg: 'bg-blue-600', text: 'text-blue-500', border: 'border-blue-600' },
              green: { bg: 'bg-green-600', text: 'text-green-500', border: 'border-green-600' },
              purple: { bg: 'bg-purple-600', text: 'text-purple-500', border: 'border-purple-600' },
              orange: { bg: 'bg-orange-600', text: 'text-orange-500', border: 'border-orange-600' },
              red: { bg: 'bg-red-600', text: 'text-red-500', border: 'border-red-600' },
            };
            const color = colorMap[step.color] || colorMap.blue;
            
            return (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className={`absolute -left-[22px] top-1 h-6 w-6 rounded-full border-4 border-black dark:border-zinc-800 ${color.bg} shadow-lg`} />
                
                {/* Step content */}
                <div className="pt-2">
                  <span className={`text-sm font-bold uppercase tracking-widest ${color.text}`}>
                    {step.year}
                  </span>
                  <h3 className="text-2xl font-black mt-2 mb-4 text-white uppercase tracking-tighter leading-[1.2]">
                    {step.title}
                  </h3>
                  
                  {/* Tasks */}
                  {step.tasks && step.tasks.length > 0 && (
                    <ul className="space-y-2 pl-0">
                      {step.tasks.map((taskItem: any, i: number) => (
                        <li 
                          key={i}
                          className={`flex items-start p-3 rounded-md border-l-2 ${
                            taskItem.completed
                              ? 'border-green-500 bg-green-500/10 line-through'
                              : 'border-zinc-700 bg-zinc-900/40'
                          }`}
                        >
                          <span className={`mr-3 font-bold flex-shrink-0 ${taskItem.completed ? 'text-green-500' : 'text-white'}`}>
                            {taskItem.completed ? '✓' : '○'}
                          </span>
                          <span className="text-white font-normal leading-[1.5]">
                            {taskItem.task}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),

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