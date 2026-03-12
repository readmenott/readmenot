"use client";
import { motion } from "framer-motion";

interface ResourceProps {
  title: string;
  description: string;
  tag: string;
}

export default function ResourceCard({ title, description, tag }: ResourceProps) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} // Quintic Easing
      className="p-8 rounded-[40px] border-[5px] border-black dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-none"
    >
      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
        {tag}
      </span>
      <h3 className="text-2xl font-black tracking-tighter mt-2 mb-4 text-black dark:text-white">
        {title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}