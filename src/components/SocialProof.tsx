import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Full-Stack Developer",
    text: "Nile Network changed my life. I went from zero coding knowledge to landing a $60k/year job in just 4 months. The curriculum is incredibly practical.",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "David Okoro",
    role: "Digital Entrepreneur",
    text: "The business path gave me the exact roadmap I needed to launch my agency. I made my first $2k within 3 weeks of finishing the course.",
    image: "https://i.pravatar.cc/150?u=david"
  },
  {
    name: "Elena Rodriguez",
    role: "UI/UX Designer",
    text: "The mentorship is what sets Nile Network apart. Getting feedback from real designers helped me build a portfolio that actually gets interviews.",
    image: "https://i.pravatar.cc/150?u=elena"
  }
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-24 px-6 bg-neutral-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase">REAL RESULTS. REAL PEOPLE.</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their lives through Nile Network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 flex flex-col justify-between"
            >
              <div>
                <Quote className="text-primary-blue mb-6" size={32} />
                <p className="text-gray-300 text-lg mb-8 italic leading-relaxed">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img 
                  src={t.image} 
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Students", val: "12.4k+" },
            { label: "Success Rate", val: "94%" },
            { label: "Avg. Salary Increase", val: "65%" },
            { label: "Countries Reached", val: "45+" }
          ].map((m, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-black text-primary-blue mb-2">{m.val}</p>
              <p className="text-sm text-gray-500 uppercase font-bold tracking-widest">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
