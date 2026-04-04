import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSolution from "./components/ProblemSolution";
import ValueProp from "./components/ValueProp";
import CourseSection from "./components/CourseSection";
import HowItWorks from "./components/HowItWorks";
import SocialProof from "./components/SocialProof";
import NileFlowAI from "./components/NileFlowAI";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary-blue/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
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
