import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-[1.5] font-normal text-black dark:text-white text-base">
        {children}
      </p>
    ),
    h1: ({ children }) => <h1 className="text-4xl font-black tracking-tighter mb-3 text-black dark:text-white leading-[1.2]">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-black tracking-tighter mb-2 text-black dark:text-white leading-[1.2]">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-black tracking-tighter mb-2 text-black dark:text-white leading-[1.2]">{children}</h3>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href?.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link 
          href={value.href || "#"} 
          rel={rel}
          target={value.blank ? "_blank" : undefined}
          className="text-blue-600 dark:text-blue-400 font-medium underline decoration-[2px] underline-offset-3 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          {children}
        </Link>
      );
    },
    bold: ({ children }) => <strong className="font-bold text-black dark:text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-black dark:text-white">{children}</em>,
    code: ({ children }) => <code className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm font-mono text-black dark:text-white">{children}</code>,
    
    /* TEXT COLOR SUPPORT */
    textColor: ({ children, value }) => {
      const colorMap: any = {
        blue: 'text-blue-600 dark:text-blue-400',
        red: 'text-red-600 dark:text-red-400',
        green: 'text-green-600 dark:text-green-400',
        yellow: 'text-yellow-600 dark:text-yellow-400',
        purple: 'text-purple-600 dark:text-purple-400',
      };
      return <span className={colorMap[value?.color] || 'text-black dark:text-white'}>{children}</span>;
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-2 mb-4 space-y-2 max-w-2xl pl-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-2 mb-4 space-y-2 max-w-2xl pl-6 list-decimal">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-black dark:text-white font-normal leading-[1.5]">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-black dark:text-white font-normal leading-[1.5]">
        {children}
      </li>
    ),
  },
  types: {
    /* PROFESSIONAL BULLET LIST - FORCE BLACK IN LIGHT MODE */
    bulletList: ({ value }) => (
      <div className="my-6 space-y-3">
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
                  ? 'border-blue-600 bg-blue-100 dark:bg-blue-600/10'
                  : 'border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900/20'
              }`}
            >
              <span className={`mr-4 text-lg font-bold flex-shrink-0 ${item.highlight ? 'text-blue-600 dark:text-blue-400' : 'text-blue-600 dark:text-white'}`}>
                {icon}
              </span>
              <span style={{ color: '#000000' }} className="font-normal leading-[1.5] dark:text-white">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    ),

    /* ENHANCED ROADMAP TIMELINE */
    roadmap: ({ value }) => (
      <div className="relative my-8 pl-8 max-w-2xl">
        {/* Timeline line */}
        <div className="absolute left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-400" />
        
        <div className="space-y-12">
          {value.steps?.map((step: any, index: number) => {
            const colorMap: any = {
              blue: { bg: 'bg-blue-600', text: 'text-blue-600 dark:text-blue-500', border: 'border-blue-600' },
              green: { bg: 'bg-green-600', text: 'text-green-600 dark:text-green-500', border: 'border-green-600' },
              purple: { bg: 'bg-purple-600', text: 'text-purple-600 dark:text-purple-500', border: 'border-purple-600' },
              orange: { bg: 'bg-orange-600', text: 'text-orange-600 dark:text-orange-500', border: 'border-orange-600' },
              red: { bg: 'bg-red-600', text: 'text-red-600 dark:text-red-500', border: 'border-red-600' },
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
                  <h3 className="text-2xl font-black mt-2 mb-4 text-black dark:text-white uppercase tracking-tighter leading-[1.2]">
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
                              ? 'border-green-500 bg-green-50 dark:bg-green-500/10 line-through'
                              : 'border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900/20'
                          }`}
                        >
                          <span className={`mr-3 font-bold flex-shrink-0 ${taskItem.completed ? 'text-green-600 dark:text-green-500' : 'text-black dark:text-white'}`}>
                            {taskItem.completed ? '✓' : '○'}
                          </span>
                          <span className="text-black dark:text-white font-normal leading-[1.5]">
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
  }
};

export default function CustomPortableText({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="w-full max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}