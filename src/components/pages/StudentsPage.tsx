import { FaLightbulb, FaBrain, FaClipboardList } from 'react-icons/fa';
import AssessmentPage from './AssessmentPage';
import { motion } from 'framer-motion';

const generateYearTopics = (subject: string, years: number[]) => {
  return years.map((year) => ({
    label: `${subject} (Year ${year})`, 
    value: `${subject} Year-${year}`
  }));
};

const years = [3, 4, 5, 6, 7, 8, 9, 10];
const topics = [
  ...generateYearTopics("Science", years),
  ...generateYearTopics("Math", years),
  ...generateYearTopics("English", years),
  ...generateYearTopics("Geography", years),
  ...generateYearTopics("History", years)  
];

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-white py-8 px-6">
      {/* Introduction Section */}
      <section className="text-center mb-12 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-blue-900 mb-6"
        >
          Personalized Learning for <span className="text-blue-600">Students</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-700 mb-8"
        >
          AI-powered assessments tailored to your year level and learning needs.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              icon: <FaLightbulb className="text-3xl text-yellow-500 mb-4" />,
              title: "Engage Your Brain",
              description: "Select your subject and year level for personalized assessments"
            },
            {
              icon: <FaBrain className="text-3xl text-green-500 mb-4" />,
              title: "Boost Your Knowledge",
              description: "Get real-time feedback to improve your understanding"
            },
            {
              icon: <FaClipboardList className="text-3xl text-purple-500 mb-4" />,
              title: "Track Progress",
              description: "Monitor your improvement over time"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2 text-blue-800">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Assessment Section */}
      <section className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-blue-100 max-w-4xl mx-auto mb-12">
        <AssessmentPage topics={topics} assessmentType="student"/>
      </section>

      {/* How It Works Section */}
      <section className="bg-blue-50/50 p-8 rounded-xl border border-blue-100 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-center mb-8 text-blue-900"
        >
          How It Works
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Choose Your Subject",
              description: "Select your subject and year level"
            },
            {
              step: "2",
              title: "Take the Assessment",
              description: "Answer AI-generated questions"
            },
            {
              step: "3",
              title: "Review & Improve",
              description: "Get feedback and track progress"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-blue-100"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-800">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}