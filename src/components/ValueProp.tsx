import { motion } from "motion/react";
import { Zap, Target, TrendingUp, ShieldCheck } from "lucide-react";

const props = [
  {
    icon: <Zap className="text-accent-blue" />,
    title: "Real-World Skills",
    desc: "We don't teach 'subjects'. We teach outcomes. Learn exactly what employers and clients are paying for right now."
  },
  {
    icon: <Target className="text-accent-blue" />,
    title: "Structured Paths",
    desc: "Stop jumping from tutorial to tutorial. Follow a clear, step-by-step roadmap from beginner to professional."
  },
  {
    icon: <TrendingUp className="text-accent-blue" />,
    title: "Fast-Track Results",
    desc: "Our intensive programs are designed for speed. Get job-ready or launch your business in as little as 90 days."
  },
  {
    icon: <ShieldCheck className="text-accent-blue" />,
    title: "Learn from Doers",
    desc: "Our instructors aren't academics. They are practitioners who have actually built what they're teaching."
  }
];

export default function ValueProp() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6">WHY NILE NETWORK?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We've stripped away the fluff to give you the most direct path to financial freedom and career success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group hover:border-primary-blue/50 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
