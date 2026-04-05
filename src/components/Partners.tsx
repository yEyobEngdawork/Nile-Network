import { motion } from "motion/react";

const partners = [
  "Jehoachin Techno", 
  "ACT", 
  "Hilco", 
  "Chapa", 
  "CBE", 
  "Safaricom", 
  "ICT Park", 
  "iCog Labs",
  "Ashewa"
];

export default function Partners() {
  return (
    <section className="py-10 border-y border-white/5 bg-neutral-950/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
          Trusted by industry leaders & top universities
        </p>
      </div>
      
      {/* Infinite Marquee */}
      <div className="flex w-full overflow-hidden relative">
        {/* Gradient Fades for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap items-center gap-16 px-8"
        >
          {[...partners, ...partners, ...partners].map((partner, i) => (
            <span 
              key={i} 
              className="text-2xl md:text-3xl font-black text-gray-300 uppercase tracking-tighter hover:text-white transition-colors cursor-default"
            >
              {partner}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
