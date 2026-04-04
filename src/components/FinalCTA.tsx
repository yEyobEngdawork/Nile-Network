import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 blue-gradient opacity-5 -z-10" />
      
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-24 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary-blue to-accent-blue" />
          
          <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tight leading-none">
            READY TO MASTER <br />
            <span className="text-primary-blue uppercase">YOUR FUTURE?</span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop wasting time on outdated education. Join Nile Network today and start building the skills that actually matter.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-white text-black font-black text-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 glow-blue">
              GET STARTED FREE <ArrowRight size={24} />
            </button>
            <p className="text-gray-500 font-medium">No credit card required. <br className="sm:hidden" /> Cancel anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
