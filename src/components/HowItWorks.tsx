import { motion } from "motion/react";

const steps = [
  {
    num: "01",
    title: "Choose Your Path",
    desc: "Select a high-income skill that aligns with your goals and interests."
  },
  {
    num: "02",
    title: "Master the Content",
    desc: "Learn through structured modules, real-world projects, and AI-driven coaching."
  },
  {
    num: "03",
    title: "Apply and Earn",
    desc: "Get certified, build your portfolio, and start your career or business."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6">HOW IT WORKS.</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A simple, proven system to take you from where you are to where you want to be.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/4 left-0 right-0 h-px bg-white/10 -z-10" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full blue-gradient flex items-center justify-center text-black text-2xl font-black mb-8 glow-blue">
                {step.num}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
