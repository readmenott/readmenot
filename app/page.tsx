"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      const query = `*[_type == "resource"] | order(_createdAt desc){ 
        title, 
        category, 
        subCategory, 
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
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (r.subCategory && r.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 font-sans min-h-screen">
      
      {/* 1. HERO SECTION */}
      <header className="mb-20 flex justify-between items-start">
        <div className="text-left">
          <h1 className="mb-6 text-6xl font-black tracking-tighter text-black dark:text-white sm:text-8xl">
            ReadMeNot<span className="text-blue-600">.</span>
          </h1>
          <p className="max-w-xl text-lg text-zinc-500 dark:text-zinc-400">
            The ultimate roadmap for international university applications. 
            Step-by-step guides for SAT, IELTS, and profile building.
          </p>
        </div>
        <div className="pt-4">
          <ThemeToggle />
        </div>
      </header>

      {/* 2. MISSION / ABOUT SECTION (20% Larger text) */}
      <section className="mb-20 grid md:grid-cols-3 gap-12 border-y border-zinc-100 dark:border-zinc-800 py-16">
        <div>
          <h4 className="font-black uppercase tracking-widest text-sm text-blue-600 mb-3">Structured Path</h4>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Resources mapped to your 8th-12th grade timeline.
          </p>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-widest text-sm text-blue-600 mb-3">Verified Content</h4>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Proven materials from successful top-tier admissions.
          </p>
        </div>
        <div>
          <h4 className="font-black uppercase tracking-widest text-sm text-blue-600 mb-3">Always Free</h4>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            No paywalls or signups. Just high-quality information.
          </p>
        </div>
      </section>

      {/* 3. SEARCH BAR (Changed bg-zinc-50 to transparent/subtle border) */}
      <div className="relative mb-16">
        <input 
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-6 pl-14 rounded-[32px] border border-zinc-200 dark:border-zinc-800 bg-transparent dark:bg-zinc-900/50 focus:ring-2 focus:ring-blue-600 outline-none transition-all dark:text-white"
        />
        <svg className="absolute left-6 top-6 h-6 w-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* 4. DYNAMIC CATEGORY NAVIGATION */}
      <div className="flex gap-10 border-b border-zinc-100 dark:border-zinc-800 mb-16 overflow-x-auto pb-4 scrollbar-hide">
        {dynamicCategories.map((cat: any) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-sm font-black transition-all whitespace-nowrap tracking-widest ${
              activeCategory === cat 
                ? "text-blue-600 border-b-2 border-blue-600 pb-4 -mb-[18px]" 
                : "text-zinc-400 hover:text-black dark:hover:text-zinc-200"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 5. RESOURCES GRID (Removed bg-white for better blending) */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource: any) => (
            <Link
              key={resource.slug}
              href={`/resource/${resource.slug}`}
              className="group flex flex-col justify-between p-10 rounded-[48px] border border-zinc-200 dark:border-zinc-800 bg-transparent dark:bg-zinc-900/40 hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div>
                <span className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                  {resource.subCategory || "General"}
                </span>
                <h3 className="mt-8 text-2xl font-black leading-tight text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {resource.title}
                </h3>
              </div>
              
              <div className="mt-12 flex items-center text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-blue-600 transition-colors">
                <span>View Guide</span>
                <svg className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-32 text-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[60px]">
            <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No resources found.</p>
          </div>
        )}
      </div>

      <footer className="mt-40 pb-10 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-800">
          README NOT • 2026
        </p>
      </footer>
    </main>
  );
}