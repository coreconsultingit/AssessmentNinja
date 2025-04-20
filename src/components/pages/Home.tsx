import { useRef, useState } from "react";
import { motion } from "framer-motion";
import AssessmentPage from "./AssessmentPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiveExaminerFlowSection } from "./LiveExaminerFlowSection";

const topics = [
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
  { label: "SQL Server", value: "sqlserver" },
];

export default function HomePage() {
  const [showAssessment, setShowAssessment] = useState(false);
  const assessmentRef = useRef<HTMLDivElement>(null);

  const handleStartAssessment = () => {
    setShowAssessment(true);
    assessmentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-white text-gray-800">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 py-20 bg-gradient-to-r from-blue-50 via-white to-blue-100"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-blue-900"
        >
          Master Technical Interviews with Confidence
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
        >
          Get AI-generated questions, real-time feedback, and improve your coding interview skills.
        </motion.p>
        <div className="mt-8">
          <Button
            size="lg"
            className="text-lg px-8 py-5"
            onClick={handleStartAssessment}
          >
            Start Your Free Assessment
          </Button>
        </div>
      </motion.section>

      {/* Assessment Section */}
      {showAssessment && (
        <motion.section
          ref={assessmentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20 px-4 bg-gray-50"
        >
          <AssessmentPage topics={topics} assessmentType="interview" />
        </motion.section>
      )}

      {/* Plans Comparison Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="px-6 py-20 bg-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
          Compare Free vs Pro Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="border border-gray-200 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-700">Free Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 text-base md:text-lg">
              <p>✔ Basic topic selection</p>
              <p>✔ 5 questions per assessment</p>
              <p>✔ Instant AI evaluation</p>
              <p>✖ No customization</p>
              <p>✖ No assessment history</p>
              <p>✖ No examiner mode</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-300 shadow-lg ring-2 ring-blue-500 rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-800">
                Pro Plan <span className="text-sm text-gray-500">(Enterprise & Professional)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700 text-base md:text-lg">
              <p>✔ All Free features</p>
              <p>✔ Customizable topics & difficulty</p>
              <p>✔ No limit on questions per session</p>
              <p>✔ Save & review assessment history</p>
              <p>✔ Live examiner monitoring</p>
              <p>✔ Priority support</p>
              <p>✔ Ability to train model with your own dataset</p>
              <Button
                disabled
                className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Live Examiner Flow */}
      <motion.section>
        <LiveExaminerFlowSection />
      </motion.section>
    </div>
  );
}
