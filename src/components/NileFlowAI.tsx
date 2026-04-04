import { motion } from "motion/react";
import { Brain, Cpu, Sparkles, Activity } from "lucide-react";

export default function NileFlowAI() {
  return (
    <section id="ai" className="py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent-blue/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-sm font-bold text-accent-blue uppercase tracking-widest">
              <Sparkles size={16} /> BIOMETRICAL AI
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              MEET <span className="text-accent-blue">NILE FLOW.</span>
            </h2>
            
            <p className="text-xl text-gray-400 leading-relaxed">
              Stop browsing. Start mastering. Nile Flow is your 24/7 AI personal coach that adapts to your brain in real-time for frictionless learning.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <Brain size={24} />,
                  title: "The Flow State",
                  desc: "Enter the Flow. Our AI adapts to your brain in real-time for frictionless learning."
                },
                {
                  icon: <Activity size={24} />,
                  title: "Results-Driven",
                  desc: "Personalized feedback loops that identify your weaknesses and turn them into strengths."
                },
                {
                  icon: <Cpu size={24} />,
                  title: "Career Path Bridge",
                  desc: "Let Nile Flow AI build your personalized path from learner to industry leader."
                }
              ].map((feature, i) => (
                <div key={i} className="flex gap-6 p-6 glass-card hover:bg-white/5 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-12 aspect-square flex items-center justify-center relative overflow-hidden group">
              {/* AI Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-2 border-accent-blue/20 animate-ping" />
                <div className="absolute w-48 h-48 rounded-full border-2 border-accent-blue/40 animate-pulse" />
                <div className="absolute w-32 h-32 rounded-full blue-gradient glow-blue flex items-center justify-center">
                  <Brain size={48} className="text-black" />
                </div>
              </div>
              
              {/* Floating Data Points */}
              <div className="absolute top-20 left-20 glass-card px-4 py-2 text-xs font-bold animate-bounce">
                FOCUS: 92%
              </div>
              <div className="absolute bottom-20 right-20 glass-card px-4 py-2 text-xs font-bold animate-bounce [animation-delay:1s]">
                RETENTION: HIGH
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
