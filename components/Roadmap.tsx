"use client";
import { motion } from "framer-motion";

// This matches the structure of your "Discovery" and "Testing" sections
interface TimelineSection {
  grade: string;
  title: string;
  items: string[];
}

const roadmapData: TimelineSection[] = [
  {
    grade: "8th - 9th Grade",
    title: "Discovery",
    items: ["Identify interests", "Start extracurriculars", "Basic IELTS English focus"],
  },
  {
    grade: "10th Grade",
    title: "Testing & Profile",
    items: ["Take first SAT/IELTS", "Research universities", "Secure leadership roles"],
  },
  {
    grade: "11th Grade",
    title: "The Intensive",
    items: ["Finalize SAT scores", "Draft personal statement", "Build university list"],
  },
];

export default function Roadmap() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="timeline-track">
        {roadmapData.map((section, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            {/* The Blue Circle Node */}
            <div className="timeline-node" />

            {/* Content Group */}
            <div className="mb-24">
              <span className="timeline-grade">
                {section.grade}
              </span>

              <h2 className="timeline-title">
                {section.title}
              </h2>

              <div className="timeline-list">
                {section.items.map((item, i) => (
                  <div key={i} className="timeline-item">
                    <span className="timeline-check">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}