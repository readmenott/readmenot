"use client";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 font-sans min-h-screen bg-white dark:bg-black transition-colors duration-300">
      
      {/* 1. HEADER SECTION */}
      <header className="mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h1 className="mb-6 text-6xl font-black tracking-tighter text-black dark:text-white sm:text-7xl">
            The Mission<span className="text-blue-600">.</span>
          </h1>
          <p className="text-xl font-bold text-black dark:text-zinc-400 leading-tight">
            Reducing barriers to elite education through technology and transparency.
          </p>
        </motion.div>
      </header>

      {/* 2. CORE CONTENT CARD */}
      <section className="p-10 rounded-[40px] border-[5px] border-black dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-none mb-20">
        <div className="prose">
          <h2 className="text-3xl font-black tracking-tighter text-black dark:text-white mb-6">
            Why ReadMeNot?
          </h2>
          <p className="text-lg leading-[1.8] text-zinc-600 dark:text-zinc-400 mb-8">
            The international university application process is intentionally complex. 
            Information is often scattered across forums, paywalled by consultants, 
            or buried in outdated PDF guides.
          </p>
          <p className="text-lg leading-[1.8] text-zinc-600 dark:text-zinc-400">
            ReadMeNot is built to provide a structured, step-by-step roadmap for 
            ambitious students. From mastering the SAT to building a world-class profile, 
            we provide the strategy without the gatekeeping.
          </p>
        </div>
      </section>

      {/* 3. VALUES GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl border-[5px] border-black dark:border-zinc-800">
          <h4 className="text-lg font-black tracking-tighter text-black dark:text-white mb-2 uppercase">Verified</h4>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">Materials derived from successful top-tier admissions and faculty expertise.</p>
        </div>
        <div className="p-8 rounded-3xl border-[5px] border-black dark:border-zinc-800">
          <h4 className="text-lg font-black tracking-tighter text-black dark:text-white mb-2 uppercase">Accessible</h4>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">Free forever. No paywalls, no sign-ups, no hidden costs.</p>
        </div>
      </div>

    </main>
  );
}