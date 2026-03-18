import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-8 leading-[1.6] font-bold text-zinc-800 dark:text-zinc-100 text-lg">
        {children}
      </p>
    ),
    h1: ({ children }) => <h1 className="text-5xl font-black tracking-tighter uppercase mb-8 text-black dark:text-white">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-black tracking-tighter uppercase mb-6 text-black dark:text-white">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-black tracking-tighter uppercase mb-4 text-black dark:text-white">{children}</h3>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          className="text-blue-600 dark:text-blue-400 font-black underline decoration-[3px] underline-offset-4 hover:opacity-80 transition-all"
        >
          {children}
        </Link>
      );
    },
    bold: ({ children }) => <strong className="font-black text-black dark:text-white">{children}</strong>,
  },
  list: {
    // FIX: "Fix the size man" - Limits the width so the list doesn't stretch across the screen
    bullet: ({ children }) => (
      <ul className="mt-8 mb-12 space-y-4 max-w-2xl">
        {children}
      </ul>
    ),
  },
  listItem: {
    // FIX: Second Image (Bullet Dots) -> Boxed style with blue square
    bullet: ({ children }) => (
      <li className="flex items-center p-6 rounded-[24px] border-[4px] border-black dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-black dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-none transition-all hover:translate-x-1">
        <div className="mr-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <div className="h-2.5 w-2.5 bg-white rounded-full" />
        </div>
        <span className="text-lg font-black uppercase tracking-tight">
          {children}
        </span>
      </li>
    ),
  },
  types: {
    // FIX: Third Image (Roadmap) -> Left part timeline style
    roadmap: ({ value }) => (
      <div className="relative border-l-[5px] border-black dark:border-zinc-800 ml-4 my-16 space-y-20 max-w-2xl">
        {value.steps?.map((step: any, index: number) => (
          <div key={index} className="relative pl-12">
            {/* The Blue Circle on the line */}
            <div className="absolute -left-[14.5px] top-1 h-6 w-6 rounded-full bg-blue-600 border-[4px] border-black dark:border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-none" />
            
            <span className="text-sm font-black text-blue-600 uppercase tracking-widest">{step.year}</span>
            <h3 className="text-3xl font-black mt-2 mb-6 text-black dark:text-white uppercase tracking-tighter">{step.title}</h3>
            
            <ul className="space-y-4">
              {step.tasks?.map((task: string, i: number) => (
                <li key={i} className="flex items-start text-zinc-700 dark:text-zinc-200 text-lg font-bold">
                  <span className="mr-4 text-blue-600 font-black">✓</span> {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  }
};

export default function CustomPortableText({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="w-full">
      <PortableText value={value} components={components} />
    </div>
  );
}