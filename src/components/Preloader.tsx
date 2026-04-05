import { useState, useEffect } from "react";
import { motion } from "motion/react";

const greetingsData = [
  { text: "Hello", top: "15%", left: "10%", size: "text-3xl md:text-5xl", color: "text-gray-600" },
  { text: "Hola", top: "75%", right: "15%", size: "text-4xl md:text-6xl", color: "text-gray-500" },
  { text: "Bonjour", top: "40%", left: "15%", size: "text-2xl md:text-4xl", color: "text-gray-700" },
  { text: "Ciao", top: "20%", right: "20%", size: "text-3xl md:text-5xl", color: "text-gray-600" },
  { text: "Hallo", bottom: "15%", left: "20%", size: "text-4xl md:text-6xl", color: "text-gray-500" },
  { text: "こんにちは", top: "25%", left: "40%", size: "text-2xl md:text-4xl", color: "text-gray-600" },
  { text: "안녕하세요", bottom: "25%", right: "30%", size: "text-3xl md:text-5xl", color: "text-gray-700" },
  { text: "你好", top: "50%", right: "10%", size: "text-4xl md:text-6xl", color: "text-gray-500" },
  { text: "مرحباً", top: "35%", right: "25%", size: "text-3xl md:text-5xl", color: "text-gray-600" },
  { text: "Selam", bottom: "35%", left: "30%", size: "text-2xl md:text-4xl", color: "text-gray-500" },
  { text: "Hi.", top: "50%", left: "50%", size: "text-7xl md:text-9xl", color: "text-white", isCenter: true }
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < greetingsData.length) {
      const timer = setTimeout(() => {
        setVisibleCount(prev => prev + 1);
      }, 350); // 350ms delay between each word appearing
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500); // Hold for 1.5s after the final "Hi." appears
      return () => clearTimeout(timer);
    }
  }, [visibleCount, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black overflow-hidden"
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {greetingsData.map((item, index) => {
        if (index >= visibleCount) return null;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute font-black tracking-tight flex items-center ${item.size} ${item.color}`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              transform: item.isCenter ? "translate(-50%, -50%)" : "translate(0, 0)",
              zIndex: item.isCenter ? 50 : 10,
              textShadow: item.isCenter ? "0 0 40px rgba(0,198,255,0.3)" : "none"
            }}
          >
            {item.isCenter && (
              <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-primary-blue inline-block mr-4 md:mr-6 animate-pulse shadow-[0_0_20px_rgba(0,198,255,0.8)]" />
            )}
            {item.text}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
