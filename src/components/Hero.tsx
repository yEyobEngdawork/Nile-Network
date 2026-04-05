import { motion } from "motion/react";
import { ArrowRight, Play, Users } from "lucide-react";
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
          className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 text-gradient"
        >
          LEARN SKILLS THAT <br />
          <span className="text-primary-blue">ACTUALLY MAKE MONEY.</span>
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
          <Link to="/login" className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white text-black font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 glow-blue">
            GET STARTED FREE <ArrowRight size={20} />
          </Link>
          <button className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Play size={20} fill="white" /> WATCH DEMO
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
          <div className="relative glass-card p-4 md:p-8 aspect-video overflow-hidden">
             <div className="w-full h-full rounded-xl bg-neutral-900/50 flex items-center justify-center border border-white/5">
                <div className="grid grid-cols-3 gap-4 w-full h-full p-4">
                  <div className="col-span-2 bg-white/5 rounded-lg animate-pulse" />
                  <div className="flex flex-col gap-4">
                    <div className="h-1/3 bg-white/5 rounded-lg animate-pulse" />
                    <div className="h-2/3 bg-white/5 rounded-lg animate-pulse" />
                  </div>
                </div>
             </div>
          </div>
          
          {/* Floating Stats */}
          <div className="absolute -bottom-6 -left-6 hidden md:flex glass-card p-4 items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center">
              <Users className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Active Learners</p>
              <p className="text-lg font-bold">12.4k+</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
