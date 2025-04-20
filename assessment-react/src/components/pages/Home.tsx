import { useRef, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import AssessmentPage from "./AssessmentPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const topics = [
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
];

export default function HomePage() {
  const [showAssessment, setShowAssessment] = useState(false);
  const assessmentRef = useRef<HTMLDivElement>(null);

  const handleStartAssessment = () => {
    setShowAssessment(true);
    // Scroll to the Assessment section smoothly
    assessmentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-800">
      {/* Hero Section with animations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 py-16 bg-gradient-to-r from-blue-50 via-white to-blue-100"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Master Technical Interviews with Confidence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Get AI-generated questions, real-time feedback, and improve your coding interview skills.
        </motion.p>
        <div className="mt-6">
          <Button
            size="lg"
            className="text-lg px-8 py-6"
            onClick={handleStartAssessment}
          >
            Start Your Free Assessment
          </Button>
        </div>
      </motion.section>

      {/* Animated Assessment Section */}
      {showAssessment && (
        <motion.section
          ref={assessmentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 px-4 bg-gray-50"
        >
          <AssessmentPage topics={topics} />
        </motion.section>
      )}

      {/* Feature Comparison with fade animation */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="px-6 py-16 bg-white"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Compare Free vs Pro Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Free Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>✔ Basic topic selection</p>
              <p>✔ 5 questions per assessment</p>
              <p>✔ Instant AI evaluation</p>
              <p>✖ No customization</p>
              <p>✖ No assessment history</p>
              <p>✖ No examiner mode</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-300 shadow-lg ring-2 ring-blue-500">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">
                Pro Plan <span className="text-sm text-gray-500">(Coming Soon)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
              <p>✔ All Free features</p>
              <p>✔ Customizable topics & difficulty</p>
              <p>✔ Up to 20 questions per session</p>
              <p>✔ Save & review assessment history</p>
              <p>✔ Live examiner monitoring</p>
              <p>✔ Priority support</p>
              <Button
                disabled
                className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  );
}
