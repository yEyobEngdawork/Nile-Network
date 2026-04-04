import { motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 blue-gradient rounded-lg flex items-center justify-center font-bold text-black">N</div>
          <span className="text-xl font-extrabold tracking-tighter">NILE NETWORK</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#courses" className="hover:text-white transition-colors">Courses</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#ai" className="hover:text-white transition-colors">Nile Flow AI</a>
          <button className="px-5 py-2.5 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center gap-2">
            Get Started <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-white/5 p-6 flex flex-col gap-6"
        >
          <a href="#courses" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Courses</a>
          <a href="#how-it-works" className="text-lg font-medium" onClick={() => setIsOpen(false)}>How it Works</a>
          <a href="#ai" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Nile Flow AI</a>
          <button className="w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2">
            Get Started <ArrowRight size={18} />
          </button>
        </motion.div>
      )}
    </nav>
  );
}
