import { motion } from "framer-motion";

const features = [
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
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => (
  <motion.div
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
);

export const FeaturesSection = () => (
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
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </div>
  </section>
);