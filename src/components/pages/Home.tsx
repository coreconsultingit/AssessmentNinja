// src/components/pages/Home.tsx
import { motion } from "framer-motion";
import AssessmentPage from "./AssessmentPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiveExaminerFlowSection } from "./LiveExaminerFlowSection";
import { Badge } from "@/components/ui/badge";

const topics = [
  { label: "Angular", value: "angular" },
  { label: "AWS", value: "aws" },
  { label: "Azure", value: "azure" },
  { label: "C#", value: "csharp" },
  { label: "Java", value: "java" },
  { label: "Python", value: "python" },
  { label: "React", value: "ReactJs" },
  { label: "SQL Server", value: "sqlserver" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white text-gray-800">
      {/* Hero Section */}
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
              onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Free Assessment
            </Button>      {/*
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              How It Works
            </Button>*/}
          </motion.div>
          
          {/*<div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto">
            {['React', 'Python', 'AWS', 'C#'].map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ y: -5 }}
                className="bg-white p-3 rounded-lg shadow-sm border border-blue-100 text-sm font-medium"
              >
                {tech}
              </motion.div>
            ))}
          </div>*/}
        </div>
      </section>

      {/* Assessment Section */}
      <section id="assessment" className="py-16 px-4 bg-blue-50/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <AssessmentPage topics={topics} assessmentType="interview" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12"
          >
            Why Choose Our Platform?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Assessments",
                description: "Get questions tailored to your skill level with instant evaluation",
                icon: "🤖"
              },
              {
                title: "Real-Time Feedback",
                description: "Understand your strengths and areas for improvement immediately",
                icon: "⚡"
              },
              {
                title: "Comprehensive Coverage",
                description: "All major technologies and frameworks included",
                icon: "🌐"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-blue-100"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Comparison Section */}
      <section className="py-16 px-4 bg-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12"
          >
            Choose Your Plan
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Card className="h-full border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                  <CardTitle className="text-2xl text-blue-700 flex items-center justify-between">
                    Free Plan
                    <Badge variant="secondary" className="text-blue-700">Current</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3 text-gray-700">
                    <p className="flex items-center gap-2"><span className="text-green-500">✓</span> Basic topic selection</p>
                    <p className="flex items-center gap-2"><span className="text-green-500">✓</span> 5 questions per assessment</p>
                    <p className="flex items-center gap-2"><span className="text-green-500">✓</span> Instant AI evaluation</p>
                    <p className="flex items-center gap-2 text-gray-400"><span className="text-gray-400">✗</span> No customization</p>
                    <p className="flex items-center gap-2 text-gray-400"><span className="text-gray-400">✗</span> No assessment history</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Card className="h-full border-2 border-blue-300 shadow-lg rounded-xl overflow-hidden">
                <CardHeader className="bg-blue-600 text-white">
                  <CardTitle className="text-2xl flex items-center justify-between">
                    Pro Plan
                    <Badge className="bg-white text-blue-600">Recommended</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3 text-gray-700">
                    <p className="flex items-center gap-2"><span className="text-green-500">✓</span> All Free features</p>
                    <p className="flex items-center gap-2"><span className="text-green-500">✓</span> Customizable topics & difficulty</p>
                    <p className="flex items-center gap-2"><span className="text-green-500">✓</span> Unlimited questions per session</p>
                    <p className="flex items-center gap-2"><span className="text-green-500">✓</span> Save & review assessment history</p>
                    <p className="flex items-center gap-2"><span className="text-green-500">✓</span> Priority support</p>
                  </div>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Upgrade to Pro
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <LiveExaminerFlowSection />
    </div>
  );
}