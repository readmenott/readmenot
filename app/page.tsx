"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// The "as const" fix ensures Framer Motion accepts this as an Easing tuple
const EASE_WOW = [0.23, 1, 0.32, 1] as const;

export default function Home() {
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      const query = `*[_type == "resource"] | order(_createdAt desc){ 
        title, 
        category, 
        sections[]{ subCategoryName },
        "slug": slug.current 
      }`;
      const data = await client.fetch(query);
      setResources(data);
    };
    fetchDocs();
  }, []);

  const dynamicCategories = [
    "All",
    ...Array.from(new Set(resources.map((r: any) => r.category).filter(Boolean)))
  ];

  const filteredResources = resources.filter((r: any) => {
    const matchesTab = activeCategory === "All" || r.category === activeCategory;
    const sectionMatch = r.sections?.some((s: any) => 
      s.subCategoryName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || sectionMatch;
    return matchesTab && matchesSearch;
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 font-sans min-h-screen bg-white dark:bg-black transition-colors duration-700">
      
      {/* 1. HERO SECTION */}
      <header className="mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: EASE_WOW }}
          className="text-left"
        >
          <h1 className="mb-6 text-6xl font-black tracking-tighter text-black dark:text-white sm:text-8xl">
            ReadMeNot<span className="text-blue-600">.</span>
          </h1>
          <p className="max-w-xl text-lg font-bold text-zinc-500 dark:text-zinc-400">
            The ultimate roadmap for international university applications. 
            Step-by-step guides for SAT, IELTS, and profile building.
          </p>
        </motion.div>
      </header>

      {/* Feature Section */}
      <section className="mb-20 grid md:grid-cols-3 gap-12 border-y-[5px] border-black dark:border-zinc-800 py-16">
        <div>
          <h4 className="font-black uppercase tracking-widest text-sm text-blue-600 mb-3">Structured Path</h4>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">Resources mapped to your 8th-12th grade timeline.</p>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-widest text-sm text-blue-600 mb-3">Verified Content</h4>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">Proven materials from successful admissions.</p>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-widest text-sm text-blue-600 mb-3">Always Free</h4>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">No paywalls or signups. Just quality info.</p>
        </div>
      </section>

      {/* 2. SEARCH BAR */}
      <div className="relative mb-16">
        <input 
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-6 pl-14 rounded-[32px] border-[5px] border-black dark:border-zinc-800 bg-transparent dark:bg-zinc-900/50 text-black dark:text-white font-black outline-none transition-all shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-none focus:ring-4 focus:ring-blue-600"
        />
        <svg className="absolute left-6 top-6 h-6 w-6 text-black dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* 3. CATEGORY TABS */}
      <div className="flex gap-10 border-b-[5px] border-black dark:border-zinc-800 mb-16 overflow-x-auto pb-4 scrollbar-hide">
        {dynamicCategories.map((cat: any) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm font-black transition-all whitespace-nowrap tracking-widest ${
              activeCategory === cat 
                ? "text-blue-600 translate-y-[-2px]" 
                : "text-zinc-400 hover:text-black dark:hover:text-zinc-200"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 4. RESOURCES GRID */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((resource: any) => (
            <motion.div
              layout
              key={resource.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: EASE_WOW }}
            >
              <Link
                href={`/resource/${resource.slug}`}
                className="group flex flex-col justify-between p-10 h-full rounded-[48px] border-[5px] border-black dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:bg-blue-600 transition-all duration-500 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-none hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                <div>
                  <div className="flex flex-wrap gap-2">
                    {resource.sections?.slice(0, 2).map((s: any) => (
                      <span key={s.subCategoryName} className="px-3 py-1 rounded-full border-2 border-black dark:border-zinc-700 bg-white dark:bg-black text-[9px] font-black uppercase tracking-[0.1em] text-black dark:text-white group-hover:border-white">
                        {s.subCategoryName}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-6 text-2xl font-black leading-tight text-zinc-900 dark:text-white group-hover:text-white transition-colors">
                    {resource.title}
                  </h3>
                </div>
                
                <div className="mt-12 flex items-center text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                  <span>View Guide</span>
                  <svg className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <footer className="mt-40 pb-10 text-center border-t-[5px] border-black dark:border-zinc-800 pt-10">
        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800">
          README NOT • 2026
        </p>
      </footer>
    </main>
  );
}