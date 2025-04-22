import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const HeroSection = ({ 
  popularTechGroups, 
  popularTechIndex,
  onStartAssessment,
  onHowItWorks
}: {
  popularTechGroups: string[][];
  popularTechIndex: number;
  onStartAssessment: () => void;
  onHowItWorks: () => void;
}) => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/40 to-transparent"></div>
    
    <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold mb-6 text-blue-900"
      >
        Master Technical Interviews with <span className="text-blue-600">Confidence</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto"
      >
        Get AI-generated questions, real-time feedback, and improve your coding interview skills through personalized assessments.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          size="lg"
          className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg"
          onClick={onStartAssessment}
        >
          Start Free Assessment
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="px-8 py-6 text-lg border-blue-600 text-blue-600 hover:bg-blue-50"
          onClick={onHowItWorks}
        >
          How It Works
        </Button>
      </motion.div>
      
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto">
        {popularTechGroups[popularTechIndex].map((tech) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white p-3 rounded-lg shadow-sm border border-blue-100 text-sm font-medium flex items-center justify-center gap-2"
          >
            <ChevronRight className="h-4 w-4 text-blue-500" />
            {tech}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);