import { motion } from "motion/react";
import { ArrowRight, Play, Users, PlayCircle, Lock, BarChart, Sparkles, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-blue/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-blue/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-accent-blue animate-pulse" />
          Join 12,400+ students mastering the future
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 text-gradient relative z-10"
        >
          LEARN SKILLS THAT <br />
          <span className="text-primary-blue relative inline-block">
            ACTUALLY MAKE MONEY.
            <svg className="absolute w-[110%] h-auto -bottom-4 -left-[5%] text-accent-blue opacity-90 -z-10" viewBox="0 0 500 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 25 C 100 10, 300 5, 490 20 C 350 25, 200 30, 20 35 C 150 30, 350 20, 480 25" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="animate-[dash_2s_ease-out_forwards]" strokeDasharray="1500" strokeDashoffset="1500"/>
              <style>
                {`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: 0;
                    }
                  }
                `}
              </style>
            </svg>
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
        >
          Skip the outdated theory. Master high-income skills in Tech, Business, and Sales through structured paths designed for the modern economy.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link to="/login" className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-[color:var(--text-color)] text-background font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 glow-blue">
            GET STARTED FREE <ArrowRight size={20} />
          </Link>
          <button className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-[color:var(--text-color)] font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Play size={20} className="fill-current" /> WATCH DEMO
          </button>
        </motion.div>

        {/* Dashboard Mockup Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 w-full max-w-5xl relative group"
        >
          <div className="absolute inset-0 bg-primary-blue/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative glass-card p-2 md:p-4 aspect-video overflow-hidden shadow-2xl">
            <div className="w-full h-full rounded-xl bg-neutral-950 flex flex-col border border-white/10 overflow-hidden shadow-inner">
              
              {/* Mockup Header (Browser-like) */}
              <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-black/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto px-4 py-1 rounded-md bg-white/5 text-[10px] text-gray-500 font-mono flex items-center gap-2">
                  <Lock size={10} /> nile-flow.app/dashboard
                </div>
              </div>

              {/* Mockup Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full p-4 bg-[#0a0a0a]">
                
                {/* Video Player Area */}
                <div className="md:col-span-2 rounded-lg border border-white/5 bg-black relative overflow-hidden flex flex-col group/player">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 to-accent-blue/5" />
                  
                  {/* Simulated Video Content */}
                  <div className="flex-1 flex items-center justify-center relative">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-20 h-20 rounded-full bg-primary-blue/20 flex items-center justify-center backdrop-blur-sm border border-primary-blue/30 cursor-pointer hover:bg-primary-blue/40 transition-colors"
                    >
                      <PlayCircle size={40} className="text-primary-blue" />
                    </motion.div>
                  </div>

                  {/* Simulated Player Controls */}
                  <div className="h-12 border-t border-white/5 bg-black/80 backdrop-blur-md flex items-center px-4 gap-4 relative z-10 transform translate-y-full group-hover/player:translate-y-0 transition-transform duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">
                      <Play size={14} className="text-white ml-0.5" />
                    </div>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                        className="h-full blue-gradient relative" 
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                      </motion.div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">12:45 / 18:20</span>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="hidden md:flex flex-col gap-3">
                  
                  {/* Progress Card */}
                  <div className="h-1/4 rounded-lg border border-white/5 bg-white/5 p-3 flex flex-col justify-center relative overflow-hidden group/card hover:bg-white/10 transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-blue/10 blur-2xl rounded-full group-hover/card:bg-accent-blue/20 transition-colors" />
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-[10px] font-bold text-gray-400 flex items-center gap-1"><BarChart size={10} /> Course Progress</h4>
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-black text-white">65%</span>
                      <span className="text-[9px] text-green-400 mb-1 font-bold bg-green-400/10 px-1.5 py-0.5 rounded">+12%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-green-400"
                      />
                    </div>
                  </div>

                  {/* Curriculum List */}
                  <div className="flex-1 rounded-lg border border-white/5 bg-white/5 p-3 flex flex-col gap-2 overflow-hidden">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Up Next</h4>
                    
                    <div className="flex flex-col gap-1.5">
                      {[
                        { title: "1. Advanced React Patterns", active: true, duration: "18:20" },
                        { title: "2. State Management", active: false, duration: "24:15" },
                        { title: "3. Performance Tuning", active: false, duration: "15:40" }
                      ].map((item, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (i * 0.1) }}
                          key={i} 
                          className={`flex items-center justify-between p-2 rounded-md transition-colors cursor-pointer ${
                            item.active ? 'bg-primary-blue/10 border border-primary-blue/20' : 'hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {item.active ? (
                              <div className="relative flex items-center justify-center w-4 h-4">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-primary-blue opacity-20 animate-ping" />
                                <PlayCircle size={12} className="text-primary-blue relative" />
                              </div>
                            ) : (
                              <Lock size={12} className="text-gray-600" />
                            )}
                            <span className={`text-[10px] font-medium ${item.active ? 'text-primary-blue' : 'text-gray-400'}`}>
                              {item.title}
                            </span>
                          </div>
                          <span className="text-[8px] text-gray-600 font-mono">{item.duration}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Nile Flow AI Box */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="h-1/4 rounded-lg border border-accent-blue/30 bg-accent-blue/5 p-3 flex flex-col justify-between relative overflow-hidden group/ai"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-accent-blue/20 blur-xl rounded-full" />
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5 relative z-10">
                        <Sparkles size={12} className="text-accent-blue" />
                        <span className="text-[11px] font-bold text-accent-blue">Nile Flow AI</span>
                      </div>
                      <p className="text-[9px] text-gray-300 leading-tight relative z-10">Stuck on React Patterns? I can explain it simply.</p>
                    </div>
                    <div className="w-full bg-black/60 border border-white/10 rounded-md p-1.5 flex items-center justify-between relative z-10 mt-2 cursor-pointer hover:bg-black/80 transition-colors">
                      <span className="text-[9px] text-gray-500">Ask a question...</span>
                      <Send size={10} className="text-gray-400" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute -bottom-6 -left-6 hidden md:flex glass-card p-4 items-center gap-4 z-20"
          >
            <div className="w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center shadow-[0_0_15px_rgba(0,102,255,0.5)]">
              <Users className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Active Learners</p>
              <p className="text-lg font-bold text-white">12.4k+</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
