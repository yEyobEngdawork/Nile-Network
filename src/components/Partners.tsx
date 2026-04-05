import { motion } from "motion/react";

const partners = [
  { name: "Jehoachin Techno", domain: "jehoachintechno.com" },
  { name: "ACT", domain: "actamericancollege.com" },
  { name: "Hilco", domain: "hilcoe.net" },
  { name: "Chapa", domain: "chapa.co" },
  { name: "CBE", domain: "combanketh.et" },
  { name: "Safaricom", domain: "safaricom.et" },
  { name: "ICT Park", domain: "ipdc.gov.et" },
  { name: "iCog Labs", domain: "icog-labs.com" },
  { name: "Ashewa", domain: "ashewa.com" }
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
            <div 
              key={i} 
              className="flex items-center gap-4 group cursor-default"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors shrink-0">
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`} 
                  alt={`${partner.name} logo`}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    // Fallback if logo fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-2xl md:text-3xl font-black text-gray-300 uppercase tracking-tighter group-hover:text-white transition-colors">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
