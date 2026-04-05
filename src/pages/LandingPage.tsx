import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import ProblemSolution from "../components/ProblemSolution";
import ValueProp from "../components/ValueProp";
import CourseSection from "../components/CourseSection";
import HowItWorks from "../components/HowItWorks";
import NileFlowAI from "../components/NileFlowAI";
import SocialProof from "../components/SocialProof";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-primary-blue/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <ProblemSolution />
        <ValueProp />
        <CourseSection />
        <HowItWorks />
        <NileFlowAI />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
