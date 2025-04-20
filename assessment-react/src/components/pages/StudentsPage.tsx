import { FaLightbulb, FaBrain, FaClipboardList } from 'react-icons/fa'; // Import icons for a better visual experience
import AssessmentPage from './AssessmentPage';

// Function to dynamically generate topics for each subject and year
const generateYearTopics = (subject: string, years: number[]) => {
  return years.map((year) => {
    return { 
      label: `${subject} (Year ${year})`, 
      value: `${subject} Year-${year}`
    };
  });
};

// Predefined years for each subject
const years = [3, 4, 5, 6, 7, 8, 9, 10];

// Generating topics for each subject
const scienceTopics = generateYearTopics("Science", years);
const mathTopics = generateYearTopics("Math", years);
const englishTopics = generateYearTopics("English", years);
const geographyTopics = generateYearTopics("Geography", years);
const historyTopics = generateYearTopics("History", years);

// Combine all subject topics into a single array
const topics = [
  ...scienceTopics,
  ...mathTopics,
  ...englishTopics,
  ...geographyTopics,
  ...historyTopics,
];

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-50 py-16 px-6">
      {/* Introduction Section */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Welcome to Your Personalized Learning Dashboard</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
          Ready to take on your next assessment? Choose a subject and year level to get started! Our platform will help you improve with AI-powered assessments tailored to your learning level.
        </p>
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-64">
            <FaLightbulb className="text-4xl text-yellow-500 mb-4" />
            <h3 className="font-semibold text-xl text-blue-600 mb-2">Engage Your Brain</h3>
            <p className="text-gray-700 text-center">Select a subject and year level that suits you best. Dive into assessments and watch your skills grow!</p>
          </div>
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-64">
            <FaBrain className="text-4xl text-green-500 mb-4" />
            <h3 className="font-semibold text-xl text-blue-600 mb-2">Boost Your Knowledge</h3>
            <p className="text-gray-700 text-center">AI-generated questions provide real-time feedback to help you improve, track your progress, and become more confident in your studies.</p>
          </div>
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-64">
            <FaClipboardList className="text-4xl text-purple-500 mb-4" />
            <h3 className="font-semibold text-xl text-blue-600 mb-2">Stay Organized</h3>
            <p className="text-gray-700 text-center">Keep track of your progress, see areas for improvement, and get back to learning with personalized recommendations.</p>
          </div>
        </div>
      </section>

      {/* Assessment Section */}
      <section className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Select Your Topic and Start Learning</h2>
        <p className="text-lg text-center text-gray-600 mb-4">
          Choose from the list of subjects and year levels below. Each assessment is tailored to your skill level and will help you improve in areas that matter most.
        </p>
        <AssessmentPage topics={topics} />
      </section>

      {/* How It Works Section */}
      <section className="bg-blue-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">How Does It Work?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-semibold text-xl text-blue-600 mb-2">1. Choose Your Subject</h3>
            <p className="text-gray-700 text-center">Select your subject (Math, Science, History, etc.) and pick the year that matches your current learning level.</p>
          </div>
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-semibold text-xl text-blue-600 mb-2">2. Take the Assessment</h3>
            <p className="text-gray-700 text-center">AI-generated questions are tailored to your level. Answer questions in real-time and get instant feedback on your progress.</p>
          </div>
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-semibold text-xl text-blue-600 mb-2">3. Review & Improve</h3>
            <p className="text-gray-700 text-center">Review your answers, track areas of improvement, and continue practicing to boost your knowledge and confidence.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
