import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NileFlowAI from "../components/NileFlowAI";
import Partners from "../components/Partners";
import ProblemSolution from "../components/ProblemSolution";
import ValueProp from "../components/ValueProp";
import CourseSection from "../components/CourseSection";
import HowItWorks from "../components/HowItWorks";
import MarketplaceFeed from "../components/MarketplaceFeed";
import SocialProof from "../components/SocialProof";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen selection:bg-primary-blue/30 overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <NileFlowAI />
          <Partners />
          <ProblemSolution />
          <ValueProp />
          <CourseSection />
          <HowItWorks />
          <MarketplaceFeed />
          <SocialProof />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
