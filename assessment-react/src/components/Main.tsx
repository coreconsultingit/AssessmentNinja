import React, { useState } from 'react';
import ApiService from '../services/ApiService';
import TextareaAutosize from 'react-textarea-autosize';
import ResultModal from './ResultModal';

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

const App: React.FC = () => {
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
        <div className="max-w-md mx-auto">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">Select a topic</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="csharp">C#</option>
            <option value="Science Year-9">Science(Year9)</option>
            <option value="Math Year-9">Math(Year9)</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button
            onClick={loadQuestions}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Start Assessment
          </button>
        </div>
      )}

      {qaState.status === 'loading' && (
        <div className="text-center text-gray-500">Loading questions...</div>
      )}

      {qaState.status === 'error' && (
        <div className="text-red-600 bg-red-100 p-4 rounded mb-4">
          {qaState.error}
        </div>
      )}

      {qaState.status === 'ready' && qaState.questions && results.length === 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Question {currentIndex + 1} of {qaState.questions.length}
          </h2>
          <p className="mb-4 text-gray-800">{qaState.questions[currentIndex]}</p>

          <TextareaAutosize
            className="block w-full p-4 border border-gray-300 rounded-lg mb-4"
            minRows={8}
            value={answers[currentIndex]}
            onChange={(e) => {
              const updated = [...answers];
              updated[currentIndex] = e.target.value;
              setAnswers(updated);
            }}
          />

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {currentIndex < qaState.questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmitAll}
                disabled={isSubmitting}
                className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                {isSubmitting ? 'Evaluating...' : 'Submit All'}
              </button>
            )}
          </div>
        </div>
      )}

      <ResultModal
        isOpen={isResultsModalOpen}
        onClose={() => setResultsModalOpen(false)}
      >
        {isSubmitting ? (
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">Evaluating your answers...</p>
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Your Evaluation Preview</h2>

            <div className="mb-4">
              {results.slice(0, 2).map((result, idx) => (
                <div key={idx} className="mb-4 border rounded p-3 bg-gray-50">
                  <p className="text-sm font-semibold mb-1">Q: {qaState.questions?.[idx]}</p>
                  <p className="text-sm"><strong>Your Answer:</strong> {answers[idx]}</p>
                  <p className="text-sm text-blue-600"><strong>Score:</strong> {result.score}</p>
                  <p className="text-sm text-gray-800"><strong>Feedback:</strong> {result.feedback}</p>
                  <p className="text-sm text-green-600"><strong>Correct Answer:</strong> {result.correctAnswer}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-gray-600 mb-3">
              Want full feedback + ideal answers for all questions? <br />
              Enter your email below and we’ll send them over!
            </p>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Send Results to Email</h3>
              {emailSent ? (
                <p className="text-green-600">Results sent successfully!</p>
              ) : (
                <div>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full p-2 border rounded mb-2 ${userEmail && !isEmailValid ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  <button
                    onClick={handleSendResultsEmail}
                    disabled={isEmailSending || !isEmailValid}
                    className="w-full bg-green-600 text-white p-2 rounded disabled:opacity-50"
                  >
                    {isEmailSending ? 'Sending...' : 'Send Full Evaluation'}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </ResultModal>
    </div>
  );
};

export default App;
