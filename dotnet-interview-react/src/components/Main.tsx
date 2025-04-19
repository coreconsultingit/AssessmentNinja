import React, { useState, useEffect } from 'react';
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

  // Load questions from backend
  useEffect(() => {
    const loadQuestions = async () => {
      setQaState({ status: 'loading' });

      try {
        const topic = 'programming';
        const count = 5;
        const difficulty = 'medium';
        const questions = await ApiService.get('/interview/generate', {
          topic,
          count,
          difficulty,
        });

        setQaState({
          status: 'ready',
          questions,
        });
        setAnswers(Array(questions.length).fill(''));
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setQaState({
          status: 'error',
          error: error instanceof Error ? error.message : 'Failed to load questions',
        });
      }
    };

    loadQuestions();
  }, []);


  const calculateOverallScore = () => {
    if (!results.length) return 0;
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    return Math.round((totalScore / results.length) * 10) / 10; // Round to 1 decimal
  };

  const handleSendResultsEmail = async () => {
    if (!userEmail) return;
  
    setIsEmailSending(true);
    try {
      const formattedHtml = qaState.questions!.map((q, idx) => {
        return `
          <div style="margin-bottom: 20px;">
            <strong>Q${idx + 1}:</strong> ${q}<br/>
            <strong>Your Answer:</strong> ${answers[idx]}<br/>
            <strong>Score:</strong> ${results[idx].score}/10<br/>
            <strong>Feedback:</strong> ${results[idx].feedback}
          </div>
        `;
      }).join('');
  
      const finalHtml = `
        <div style="font-family: sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="cid:ccitlogo" alt="CCIT Logo" width="150" />
          </div>
          <h2>Your Interview Practice Results</h2>
          <p><strong>Overall Score:</strong> ${calculateOverallScore()}/10</p>
          ${formattedHtml}
        </div>
      `;
  
      await ApiService.post('/interview/send-email', {
        email: userEmail,
        subject: 'Your Interview Practice Results',
        content: finalHtml,
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
    // Prepare array of { question, answer }
    const payload = qaState.questions!.map((q, i) => ({
      question: q,
      answer: answers[i] || '',
    }));
    // Send all at once
    const results = await ApiService.post('/interview/evaluate', payload);
    setResults(results);
    setIsSubmitting(false);
  };
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Interview Practice</h1>

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

          <div className="w-full border border-red-500">
          <TextareaAutosize
  className="block w-full box-border p-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
  minRows={8}
  value={answers[currentIndex]}
  onChange={(e) => {
    const updated = [...answers];
    updated[currentIndex] = e.target.value;
    setAnswers(updated);
  }}
/>
</div>
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
                {isSubmitting ? 'Submitting...' : 'Submit All'}
              </button>
            )}
          </div>
        </div>
      )}

{results.length > 0 && (
  <>
    <button 
      onClick={() => setResultsModalOpen(true)}
      className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
    >
      View Overall Results
    </button>
    
    <ResultModal
      isOpen={isResultsModalOpen} 
      onClose={() => setResultsModalOpen(false)}
    >
      <h2 className="text-xl font-bold mb-4">Your Overall Results</h2>
      <div className="mb-6">
        <div className="text-3xl font-bold text-center text-blue-600">
          {calculateOverallScore()}/10
        </div>
        <p className="text-center text-gray-600 mt-2">
          Based on {results.length} questions
        </p>
      </div>
      
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
              className="w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            <button
              onClick={handleSendResultsEmail}
              disabled={isEmailSending || !userEmail}
              className="w-full bg-green-600 text-white p-2 rounded disabled:opacity-50"
            >
              {isEmailSending ? 'Sending...' : 'Send Results'}
            </button>
          </div>
        )}
      </div>
    </ResultModal>
  </>
)}
    </div>
  );
};

export default App;
