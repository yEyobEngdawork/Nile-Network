import { motion } from "motion/react";
import { Brain, Cpu, Sparkles, Activity, MessageSquare, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";

export default function NileFlowAI() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="ai" className="py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent-blue/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-sm font-bold text-accent-blue uppercase tracking-widest">
              <Sparkles size={16} className="animate-pulse" /> BIOMETRICAL AI
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
              MEET <span className="text-accent-blue relative inline-block">
                NILE FLOW.
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-2 bg-accent-blue/30"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
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
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex gap-6 p-6 glass-card hover:bg-white/5 transition-all group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/0 via-accent-blue/5 to-accent-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center text-accent-blue shrink-0 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] flex items-center justify-center"
          >
            {/* Central AI Core */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Outer rotating dashed ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-accent-blue/30"
              />
              
              {/* Inner rotating solid ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[260px] h-[260px] rounded-full border border-accent-blue/20"
              />

              {/* Pulsing Core */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 40px -10px rgba(0, 198, 255, 0.3)",
                    "0 0 80px -10px rgba(0, 198, 255, 0.6)",
                    "0 0 40px -10px rgba(0, 198, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-32 h-32 rounded-full blue-gradient flex items-center justify-center z-20"
              >
                <Brain size={48} className="text-black" />
              </motion.div>

              {/* Orbiting Nodes */}
              {[
                { icon: <Zap size={20} />, label: "Real-time Sync", angle: 0 },
                { icon: <Target size={20} />, label: "Focus Tracking", angle: 120 },
                { icon: <MessageSquare size={20} />, label: "Smart Feedback", angle: 240 }
              ].map((node, i) => (
                <motion.div
                  key={i}
                  className="absolute w-[380px] h-[380px] flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "center" }}
                >
                  <motion.div 
                    className="absolute"
                    style={{ 
                      rotate: node.angle,
                      translateX: 190,
                    }}
                  >
                    {/* Counter-rotate to keep text upright */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className={`flex items-center gap-3 glass-card px-4 py-2 rounded-full whitespace-nowrap transition-all duration-500 ${activeNode === i ? 'border-accent-blue bg-accent-blue/10 scale-110 shadow-[0_0_20px_rgba(0,198,255,0.3)]' : 'border-white/10 scale-100'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${activeNode === i ? 'bg-accent-blue text-black' : 'bg-white/10 text-white'}`}>
                        {node.icon}
                      </div>
                      <span className="text-sm font-bold">{node.label}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Simulated AI Chat Box */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-10 right-0 glass-card p-4 rounded-2xl w-64 z-30 border-accent-blue/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full blue-gradient flex items-center justify-center">
                    <Brain size={16} className="text-black" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-accent-blue">Nile Flow AI</p>
                    <p className="text-[10px] text-gray-400">Analyzing learning pattern...</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1 }}
                    viewport={{ once: true }}
                    className="h-2 bg-white/10 rounded-full overflow-hidden"
                  >
                    <div className="h-full bg-accent-blue w-[85%] rounded-full" />
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    viewport={{ once: true }}
                    className="text-xs text-gray-300"
                  >
                    "I noticed you're highly focused. Let's tackle the advanced module next."
                  </motion.p>
                </div>
              </motion.div>

              {/* Floating Data Points */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-10 glass-card px-4 py-2 text-xs font-bold border-green-500/30 text-green-400 z-30 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
              >
                FOCUS: 92%
              </motion.div>
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-40 right-10 glass-card px-4 py-2 text-xs font-bold border-yellow-500/30 text-yellow-400 z-30 shadow-[0_0_20px_rgba(234,179,8,0.1)]"
              >
                RETENTION: HIGH
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
