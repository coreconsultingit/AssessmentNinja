import React, { useState } from 'react';
import ApiService from '../../services/ApiService';

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Types
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

const HomePage: React.FC = () => {
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

  const loadQuestions = async () => {
    if (!topic) {
      alert("Please select a topic.");
      return;
    }

    setQaState({ status: 'loading' });
    try {
      const questions = await ApiService.get('/interview/generate', {
        topic,
        count: 5,
        difficulty,
      });

      setQaState({ status: 'ready', questions });
      setAnswers(Array(questions.length).fill(''));
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      setQaState({
        status: 'error',
        error: 'Failed to load questions',
      });
    }
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);

  const calculateOverallScore = () => {
    if (!results.length) return 0;
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    return Math.round((totalScore / results.length) * 10) / 10;
  };

  const handleSendResultsEmail = async () => {
    if (!userEmail) return;
    setIsEmailSending(true);
    try {
      // Format the results into a nice HTML structure
      const formattedResults = qaState.questions!.map((q, idx) => ({
        question: q,
        answer: answers[idx] || '',
        score: results[idx]?.score || 0,
        feedback: results[idx]?.feedback || '',
        correctAnswer: results[idx]?.correctAnswer || ''
      }));
      
      // Send results via email
      await ApiService.post('/interview/send-email', {
        email: userEmail,
        subject: "Your Complete Assessment Results",
        content: JSON.stringify(formattedResults),
        overallScore: calculateOverallScore()
      });
      setEmailSent(true);
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setIsEmailSending(false);
    }
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    setResultsModalOpen(true); // Show modal while evaluating

    const payload = qaState.questions!.map((q, i) => ({
      question: q,
      answer: answers[i] || '',
    }));

    const results = await ApiService.post('/interview/evaluate', payload);
    setResults(results);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Assessment Ninja</h1>
      <p className="text-gray-600 text-center mb-6">
        Practice mock technical interviews, get AI-powered evaluation, and improve your answers!
      </p>

      {qaState.status === 'idle' && (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Start a New Assessment</CardTitle>
            <CardDescription>
              Choose a topic and difficulty level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="Science Year-9">Science (Year 9)</SelectItem>
                <SelectItem value="Math Year-9">Math (Year 9)</SelectItem>
              </SelectContent>
            </Select>

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
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={loadQuestions}>
              Start Assessment
            </Button>
          </CardFooter>
        </Card>
      )}

      {qaState.status === 'loading' && (
        <div className="text-center text-gray-500 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Loading questions...
        </div>
      )}

      {qaState.status === 'error' && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {qaState.error}
          </AlertDescription>
        </Alert>
      )}

      {qaState.status === 'ready' && qaState.questions && results.length === 0 && (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>
              Question {currentIndex + 1} of {qaState.questions.length}
            </CardTitle>
            <CardDescription className="text-gray-800 text-base">
              {qaState.questions[currentIndex]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[200px]"
              placeholder="Type your answer here..."
              value={answers[currentIndex]}
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
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>

            {currentIndex < qaState.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentIndex((i) => i + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmitAll}
                disabled={isSubmitting}
                variant="default"
              >
                {isSubmitting ? 
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Evaluating...</> : 
                  'Submit All'
                }
              </Button>
            )}
          </CardFooter>
        </Card>
      )}

      <Dialog open={isResultsModalOpen} onOpenChange={setResultsModalOpen}>
        <DialogContent className="sm:max-w-md">
          {isSubmitting ? (
            <div className="text-center py-4">
              <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" />
              <p className="text-lg font-semibold">Evaluating your answers...</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">Your Evaluation Preview</DialogTitle>
                <DialogDescription className="text-center">
                  See how you performed on this assessment
                </DialogDescription>
              </DialogHeader>

              <div className="mb-4 mt-4 space-y-4">
                {results.slice(0, 2).map((result, idx) => (
                  <Card key={idx} className="bg-gray-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold">Q: {qaState.questions?.[idx]}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 pt-0 text-sm">
                      <div>
                        <strong>Your Answer:</strong> {answers[idx]}
                      </div>
                      <div className="text-blue-600">
                        <strong>Score:</strong> {result.score}
                      </div>
                      <div className="text-gray-800">
                        <strong>Feedback:</strong> {result.feedback}
                      </div>
                      <div className="text-green-600">
                        <strong>Correct Answer:</strong> {result.correctAnswer}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="text-center text-sm text-gray-600 mb-3">
                Want full feedback + ideal answers for all questions? <br />
                Enter your email below and we'll send them over!
              </p>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Send Results to Email</h3>
                {emailSent ? (
                  <p className="text-green-600">Results sent successfully!</p>
                ) : (
                  <div className="space-y-2">
                    <Input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={userEmail && !isEmailValid ? 'border-red-500' : ''}
                      required
                    />
                    <Button
                      onClick={handleSendResultsEmail}
                      disabled={isEmailSending || !isEmailValid}
                      className="w-full"
                      variant="default"
                    >
                      {isEmailSending ? 
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : 
                        'Send Full Evaluation'
                      }
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
