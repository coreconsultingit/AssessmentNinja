import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LiveExaminerFlowSection } from "./LiveExaminerFlowSection";
import { AssessmentSection } from "./AssessmentSection";
import { FeaturesSection } from "./FeaturesSection";
import { HeroSection } from "./HeroSection";
import { HowItWorksDialog } from "./HowItWorksDialog";
import { PlansSection } from "./PlansSection";

const topics = [
  { label: "Angular", value: "angular" },
  { label: "AWS", value: "aws" },
  { label: "Azure", value: "azure" },
  { label: "C#", value: "csharp" },
  { label: "Django", value: "django" },
  { label: "Docker", value: "docker" },
  { label: "GCP", value: "gcp" },
  { label: "Java", value: "java" },
  { label: "Node.Js", value: "node.js" },
  { label: "Python", value: "python" },
  { label: "React", value: "ReactJs" },
  { label: "Spring", value: "spring" },
  { label: "TypeScript", value: "typeScript" },
  { label: "SQL Server", value: "sqlserver" },
];

const popularTechGroups = [
  ['React', 'Node.js', 'TypeScript', 'Next.js'],
  ['Python', 'Django', 'Flask', 'FastAPI'],
  ['AWS', 'Azure', 'GCP', 'Docker'],
  ['C#', '.NET', 'Java', 'Spring']
];

export default function HomePage() {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [popularTechIndex, setPopularTechIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPopularTechIndex((prev) => (prev + 1) % popularTechGroups.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToAssessment = () => {
    document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-800">
      <HowItWorksDialog 
        open={isHowItWorksOpen} 
        onOpenChange={setIsHowItWorksOpen} 
      />
      
      <HeroSection
        popularTechGroups={popularTechGroups}
        popularTechIndex={popularTechIndex}
        onStartAssessment={scrollToAssessment}
        onHowItWorks={() => setIsHowItWorksOpen(true)}
      />
      
      <AssessmentSection topics={topics} />
      
      <FeaturesSection />
      
      <PlansSection navigate={navigate} />
      
      <LiveExaminerFlowSection />
    </div>
  );
}