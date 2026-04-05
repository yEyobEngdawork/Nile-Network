import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Menu, X, Palette, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const themes = [
  { id: "dark", label: "Dark Mode" },
  { id: "light", label: "Light Mode" },
  { id: "modern", label: "Modern Cyber" },
  { id: "cyberpunk", label: "Neon Cyberpunk" },
  { id: "midnight", label: "Midnight Blue" },
  { id: "forest", label: "Emerald Forest" },
  { id: "sunset", label: "Crimson Sunset" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 blue-gradient rounded-lg flex items-center justify-center font-bold text-black">N</div>
          <span className="text-xl font-extrabold tracking-tighter">NILE NETWORK</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#courses" className="hover:text-[color:var(--text-color)] transition-colors">Courses</a>
          <a href="#how-it-works" className="hover:text-[color:var(--text-color)] transition-colors">How it Works</a>
          <a href="#marketplace" className="hover:text-[color:var(--text-color)] transition-colors">Marketplace</a>
          <div className="flex items-center gap-4 ml-4">
            
            {/* Theme Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-colors text-[color:var(--text-color)]"
                title="Select Theme"
              >
                <Palette size={18} />
                <ChevronDown size={14} className={`transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isThemeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 py-2 rounded-xl glass-card border border-white/10 shadow-2xl overflow-hidden z-50"
                  >
                    {themes.map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setCurrentTheme(t.id);
                          setIsThemeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/10 transition-colors flex items-center gap-2 ${
                          currentTheme === t.id ? 'text-primary-blue font-bold bg-primary-blue/5' : 'text-[color:var(--text-color)]'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${currentTheme === t.id ? 'bg-primary-blue' : 'bg-transparent'}`} />
                        {t.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/login" className="text-[color:var(--text-color)] hover:text-primary-blue transition-colors font-bold">
              Login
            </Link>
            <Link to="/login" className="px-5 py-2.5 rounded-full bg-[color:var(--text-color)] text-background font-bold hover:opacity-80 transition-all flex items-center gap-2">
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => {
              const currentIndex = themes.findIndex(t => t.id === currentTheme);
              const nextIndex = (currentIndex + 1) % themes.length;
              setCurrentTheme(themes[nextIndex].id);
            }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-[color:var(--text-color)]"
          >
            <Palette size={20} />
          </button>
          <button className="text-[color:var(--text-color)]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
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
          <a href="#marketplace" className="text-lg font-medium" onClick={() => setIsOpen(false)}>Marketplace</a>
          <Link to="/login" className="text-lg font-medium text-center" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/login" className="w-full py-4 rounded-xl bg-[color:var(--text-color)] text-background font-bold flex items-center justify-center gap-2">
            Get Started <ArrowRight size={18} />
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
