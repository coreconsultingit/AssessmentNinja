import React, { useState } from 'react';
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

type QAState = {
  status: 'idle' | 'loading' | 'ready' | 'error';
  error?: string;
  questions?: string[];
};

type EvaluationResult = {
  score: number;
  feedback: string;
  correctAnswer: string;
};

type AssessmentPageProps = {
  topics: { label: string, value: string }[];
  assessmentType: string;
};

const AssessmentPage: React.FC<AssessmentPageProps> = ({ topics, assessmentType }) => {
  const [qaState, setQaState] = useState<QAState>({ status: 'idle' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<EvaluationResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResultsModalOpen, setResultsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const { toast } = useToast();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);

  const calculateOverallScore = () => {
    if (!results.length) return 0;
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    return Math.round((totalScore / results.length) * 10) / 10;
  };

  const resetAssessment = () => {
    setQaState({ status: 'idle' });
    setCurrentIndex(0);
    setAnswers([]);
    setResults([]);
    setIsSubmitting(false);
    setResultsModalOpen(false);
    setUserEmail('');
    setIsEmailSending(false);
    setEmailSent(false);
    setTopic('');
    setDifficulty('medium');
  };

  const loadQuestions = async () => {
    if (!topic) {
      toast({ 
        title: "Selection Required",
        description: "Please select a topic to continue",
        variant: "destructive"
      });
      return;
    }

    setQaState({ status: 'loading' });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock questions based on topic and difficulty
      const mockQuestions = [
        `Explain the main concepts of ${topic} at a ${difficulty} level`,
        `What are the key differences between ${topic} and similar technologies?`,
        `Describe a real-world application of ${topic}`,
        `What are the advantages of using ${topic}?`,
        `How would you solve a common problem in ${topic}?`
      ];
      
      setQaState({ status: 'ready', questions: mockQuestions });
      setAnswers(Array(mockQuestions.length).fill(''));
    } catch (error) {
      setQaState({ 
        status: 'error', 
        error: 'Failed to load questions. Please try again.' 
      });
      console.error('Error loading questions:', error);
    }
  };

  const handleSendResultsEmail = async () => {
    if (!userEmail || !isEmailValid) return;
    
    setIsEmailSending(true);
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      setEmailSent(true);
      toast({ 
        title: "Success!",
        description: "Your results have been sent to your email",
      });
    } catch (error) {
      toast({ 
        title: "Failed to send",
        description: "Couldn't send email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsEmailSending(false);
    }
  };

  const handleSubmitAll = async () => {
    if (answers.some(answer => !answer.trim())) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions before submitting",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setResultsModalOpen(true);
    
    try {
      // Simulate API evaluation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock evaluation results
      const mockResults = qaState.questions!.map((question, i) => ({
        score: Math.floor(Math.random() * 3) + 2, // Random score 2-5
        feedback: answers[i].length > 30 
          ? "Good answer with relevant details" 
          : "Your answer could use more elaboration",
        correctAnswer: `A comprehensive answer would include key concepts from ${topic} and specific examples of its application.`
      }));
      
      setResults(mockResults);
    } catch (error) {
      toast({
        title: "Evaluation Error",
        description: "Failed to evaluate answers. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <Toaster />

      {/* Intro Card */}
      {qaState.status === 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border border-blue-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-blue-900">
                {assessmentType === 'interview' 
                  ? "Technical Skills Assessment" 
                  : "Student Learning Assessment"}
              </CardTitle>
              <CardDescription>
                {assessmentType === 'interview'
                  ? "Select a technology and difficulty level to begin your assessment"
                  : "Select your subject and year level to begin"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {assessmentType === 'interview' ? "Technology" : "Subject"}
                  </label>
                  <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${assessmentType === 'interview' ? 'technology' : 'subject'}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={loadQuestions}
                className="w-full py-6"
                disabled={!topic}
              >
                Start Assessment
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      {/* Loading State */}
      {qaState.status === 'loading' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center p-12"
        >
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
          <p className="text-lg">Generating your assessment questions...</p>
        </motion.div>
      )}

      {/* Error State */}
      {qaState.status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant="destructive">
            <AlertDescription>{qaState.error}</AlertDescription>
          </Alert>
          <Button 
            onClick={loadQuestions}
            variant="outline"
            className="mt-4"
          >
            Try Again
          </Button>
        </motion.div>
      )}

      {/* Question Display */}
      {qaState.status === 'ready' && qaState.questions && results.length === 0 && (
        <motion.div
          key="questions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-blue-900">
              Question {currentIndex + 1} of {qaState.questions.length}
            </h3>
            <div className="text-sm text-gray-500">
              {answers[currentIndex]?.length > 0 ? `${answers[currentIndex].length} characters` : ''}
            </div>
          </div>

          <Card className="border border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg">
                {qaState.questions[currentIndex]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px] text-base"
                placeholder="Type your answer here..."
                value={answers[currentIndex] || ''}
                onChange={(e) => {
                  const updated = [...answers];
                  updated[currentIndex] = e.target.value;
                  setAnswers(updated);
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentIndex(i => Math.max(i - 1, 0))}
                disabled={currentIndex === 0}
              >
                Previous
              </Button>
              
              {currentIndex < qaState.questions.length - 1 ? (
                <Button 
                  onClick={() => setCurrentIndex(i => i + 1)}
                  disabled={!answers[currentIndex]?.trim()}
                >
                  Next Question
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmitAll}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Evaluating...
                    </>
                  ) : (
                    'Submit All Answers'
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>

          <div className="flex justify-center gap-2">
            {qaState.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index 
                    ? 'bg-blue-600' 
                    : answers[index] 
                      ? 'bg-green-500' 
                      : 'bg-gray-300'
                }`}
                aria-label={`Go to question ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Results Modal */}
      <Dialog open={isResultsModalOpen} onOpenChange={setResultsModalOpen}>
        <DialogContent className="max-w-2xl">
          {isSubmitting ? (
            <div className="text-center py-12">
              <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-lg font-medium">Evaluating your answers...</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">
                  Assessment Results
                </DialogTitle>
                <DialogDescription className="text-center">
                  Your overall score: {calculateOverallScore()}/5
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                {results.map((result, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="border border-blue-100">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium">
                          Q{idx + 1}: {qaState.questions?.[idx]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Your Answer:</span>
                          <Badge 
                            variant={answers[idx]?.length > 30 ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {answers[idx]?.length > 30 ? 'Detailed' : 'Brief'}
                          </Badge>
                        </div>
                        <p className="text-gray-700 bg-blue-50/50 p-3 rounded">
                          {answers[idx] || 'No answer provided'}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Score:</span>
                          <Badge 
                            variant={
                              result.score >= 4 ? 'default' : 
                              result.score >= 2 ? 'secondary' : 'destructive'
                            }
                          >
                            {result.score}/5
                          </Badge>
                        </div>
                        
                        <div>
                          <span className="font-medium">Feedback:</span>
                          <p className="text-gray-700 mt-1">{result.feedback}</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-green-600">Model Answer:</span>
                          <p className="text-gray-700 mt-1">{result.correctAnswer}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {!emailSent ? (
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email for full report
                    </label>
                    <Input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your@email.com"
                      className={userEmail && !isEmailValid ? 'border-red-500' : ''}
                    />
                    {userEmail && !isEmailValid && (
                      <p className="text-sm text-red-500 mt-1">Please enter a valid email</p>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={handleSendResultsEmail}
                      disabled={isEmailSending || !isEmailValid}
                      className="flex-1"
                    >
                      {isEmailSending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Get Full Report'
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetAssessment}
                      className="flex-1"
                    >
                      Start New Assessment
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-green-600 mb-4">Results sent to your email!</p>
                  <Button onClick={resetAssessment} className="w-full">
                    Start New Assessment
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssessmentPage;