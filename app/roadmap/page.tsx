import Link from "next/link";

export default function Roadmap() {
  const steps = [
    { year: "8th - 9th Grade", title: "Discovery", tasks: ["Identify interests", "Start extracurriculars", "Basic IELTS English focus"] },
    { year: "10th Grade", title: "Testing & Profile", tasks: ["Take first SAT/IELTS", "Research universities", "Secure leadership roles"] },
    { year: "11th Grade", title: "The Intensive", tasks: ["Finalize SAT scores", "Draft personal statement", "Build university list"] },
    { year: "12th Grade", title: "Application", tasks: ["Common App & CSS Profile", "Submit applications", "Scholarship interviews"] },
  ];

  return (
    <main className="mx-auto max-w-3xl px-6 py-20 font-sans">
      <h1 className="text-5xl font-black mb-4 tracking-tighter">THE ROADMAP.</h1>
      <p className="text-zinc-500 mb-16 text-lg">Your step-by-step guide from 8th grade to university admission.</p>

      <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 ml-4 space-y-16">
        {steps.map((step, index) => (
          <div key={index} className="relative pl-10">
            {/* The Circle on the line */}
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-blue-600 border-4 border-white dark:border-black"></div>
            
            <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">{step.year}</span>
            <h2 className="text-2xl font-bold mt-1 mb-4">{step.title}</h2>
            
            <ul className="space-y-3">
              {step.tasks.map((task, i) => (
                <li key={i} className="flex items-center text-zinc-600 dark:text-zinc-400">
                  <span className="mr-3 text-blue-500">✓</span> {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Link href="/" className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors">
          Explore All Resources
        </Link>
      </div>
    </main>
  );
}