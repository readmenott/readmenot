import Link from "next/link";

export default function Roadmap() {
  const steps = [
    { year: "8th - 9th Grade", title: "Discovery", tasks: ["Identify interests", "Start extracurriculars", "Basic IELTS English focus"] },
    { year: "10th Grade", title: "Testing & Profile", tasks: ["Take first SAT/IELTS", "Research universities", "Secure leadership roles"] },
    { year: "11th Grade", title: "The Intensive", tasks: ["Finalize SAT scores", "Draft personal statement", "Build university list"] },
    { year: "12th Grade", title: "Application", tasks: ["Common App & CSS Profile", "Submit applications", "Scholarship interviews"] },
  ];

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 font-sans min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <h1 className="text-6xl font-black mb-6 tracking-tighter text-black dark:text-white uppercase">
        THE ROADMAP<span className="text-blue-600">.</span>
      </h1>
      <p className="text-zinc-600 dark:text-white mb-16 text-xl font-bold leading-tight">
        Your step-by-step guide from 8th grade to university admission.
      </p>

      <div className="relative border-l-[5px] border-black dark:border-zinc-800 ml-4 space-y-20">
        {steps.map((step, index) => (
          <div key={index} className="relative pl-12">
            {/* The Dot on the line */}
            <div className="absolute -left-[14.5px] top-1 h-6 w-6 rounded-full bg-blue-600 border-[4px] border-black dark:border-zinc-800"></div>
            
            <span className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">{step.year}</span>
            <h2 className="text-3xl font-black mt-2 mb-6 text-black dark:text-white uppercase tracking-tighter">{step.title}</h2>
            
            <ul className="space-y-4">
              {step.tasks.map((task, i) => (
                <li key={i} className="flex items-start text-zinc-700 dark:text-zinc-200 text-lg font-medium leading-tight">
                  <span className="mr-4 text-blue-600 font-black">✓</span> {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Brutalist Button at bottom */}
      <div className="mt-24 text-center">
        <Link 
          href="/" 
          className="inline-block px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest border-[5px] border-black dark:border-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          Explore All Resources
        </Link>
      </div>
    </main>
  );
}