import { motion } from "motion/react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="py-24 px-6 bg-neutral-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              TRADITIONAL EDUCATION <br />
              <span className="text-red-500">IS BROKEN.</span>
            </h2>
            
            <div className="space-y-6">
              {[
                "4 years of theory that's obsolete by graduation.",
                "Massive student debt with zero income guarantee.",
                "Generic curriculum built for the 19th century.",
                "No mentorship from real-world practitioners."
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                  <AlertCircle className="text-red-500 shrink-0 mt-1" size={20} />
                  <p className="text-gray-300 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              NILE NETWORK IS <br />
              <span className="text-primary-blue">THE FUTURE.</span>
            </h2>
            
            <div className="space-y-6">
              {[
                "Learn high-income skills in weeks, not years.",
                "Pay for results, not just a piece of paper.",
                "Curriculum updated weekly to match the market.",
                "Direct access to industry leaders and mentors."
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-primary-blue/5 border border-primary-blue/10">
                  <CheckCircle2 className="text-primary-blue shrink-0 mt-1" size={20} />
                  <p className="text-gray-300 font-medium">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
