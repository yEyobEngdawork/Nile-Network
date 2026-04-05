import { motion } from "motion/react";
import { Briefcase, DollarSign, Star, Clock, MessageCircle, ArrowRight, CheckCircle2, Zap } from "lucide-react";

export default function MarketplaceFeed() {
  const gigs = [
    {
      title: "Full-Stack React & Node.js Developer for E-commerce",
      budget: "$2,500 - $4,000",
      urgency: "High",
      match: "98%",
      tags: ["React", "Node.js", "Stripe"]
    },
    {
      title: "UI/UX Designer for FinTech Mobile App",
      budget: "$1,200 - $2,000",
      urgency: "Medium",
      match: "92%",
      tags: ["Figma", "Prototyping", "FinTech"]
    },
    {
      title: "Smart Contract Auditor (Solidity)",
      budget: "$3,000+",
      urgency: "Critical",
      match: "85%",
      tags: ["Web3", "Solidity", "Security"]
    }
  ];

  const activeBids = [
    { title: "Frontend Dashboard", status: "Interviewing", color: "text-accent-blue", bg: "bg-accent-blue/10" },
    { title: "API Integration", status: "Under Review", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { title: "Landing Page Design", status: "Drafting Proposal", color: "text-gray-400", bg: "bg-gray-500/10" }
  ];

  return (
    <section id="marketplace" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black mb-4">LEARN. <span className="text-primary-blue">EARN.</span> SCALE.</h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Your verified skills automatically unlock elite freelance opportunities. No more cold pitching—just apply with your Nile Portfolio.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Central Box (Job Board) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card p-6 md:p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-blue/20 flex items-center justify-center text-primary-blue">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Elite Matches</h3>
                  <p className="text-sm text-gray-400">Verified for your current skill level</p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> LIVE
              </div>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {gigs.map((gig, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-blue/30 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-2 py-1 rounded-md bg-white/10 text-gray-300">
                          Match: {gig.match}
                        </span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 ${
                          gig.urgency === 'Critical' ? 'bg-red-500/10 text-red-400' : 
                          gig.urgency === 'High' ? 'bg-orange-500/10 text-orange-400' : 
                          'bg-blue-500/10 text-blue-400'
                        }`}>
                          <Zap size={12} /> {gig.urgency}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold group-hover:text-primary-blue transition-colors">{gig.title}</h4>
                    </div>
                    <div className="text-left md:text-right shrink-0">
                      <p className="text-xl font-black text-white">{gig.budget}</p>
                      <p className="text-xs text-gray-500">Fixed Price</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6">
                    <div className="flex flex-wrap gap-2">
                      {gig.tags.map((tag, j) => (
                        <span key={j} className="text-xs text-gray-400 bg-black/50 px-2 py-1 rounded-md border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full md:w-auto px-6 py-2.5 rounded-xl blue-gradient text-black font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shrink-0">
                      Apply with Portfolio <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side Column */}
          <div className="space-y-6 flex flex-col">
            {/* Earnings & Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8"
            >
              <h3 className="font-bold text-gray-400 mb-6 uppercase tracking-wider text-sm">Earnings & Reputation</h3>
              
              <div className="mb-8">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <DollarSign size={16} /> Pending Payouts
                </div>
                <div className="text-4xl font-black text-white">$4,250<span className="text-lg text-gray-500">.00</span></div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Client Rating</span>
                  <span className="font-bold flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /> 4.9/5.0</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[98%] rounded-full" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Top 2% of verified talent</p>
              </div>
            </motion.div>

            {/* Active Bids */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 flex-1"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-400 uppercase tracking-wider text-sm">Active Bids</h3>
                <div className="relative">
                  <MessageCircle size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background" />
                </div>
              </div>

              <div className="space-y-4">
                {activeBids.map((bid, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                    <div>
                      <h4 className="font-bold text-sm mb-1">{bid.title}</h4>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-500">Updated 2h ago</span>
                      </div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-md text-xs font-bold ${bid.bg} ${bid.color}`}>
                      {bid.status}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 rounded-xl border border-white/10 text-sm font-bold text-gray-300 hover:bg-white/5 transition-colors">
                View All Applications
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
