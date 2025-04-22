import { motion } from "framer-motion";
import { PlanCard } from "./PlanCard";

const plans = [
  {
    title: "Free Plan",
    badge: { text: "Current", variant: "secondary", className: "text-blue-700" },
    borderClass: "border border-gray-200",
    headerClass: "bg-blue-50/50 border-b border-blue-100",
    titleClass: "text-blue-700",
    features: [
      { text: "Basic topic selection", included: true },
      { text: "5 questions per assessment", included: true },
      { text: "Instant AI evaluation", included: true },
      { text: "No customization", included: false },
      { text: "No assessment history", included: false }
    ],
    button: null
  },
  {
    title: "Pro Plan",
    badge: { text: "Recommended", variant: "default", className: "bg-white text-blue-600" },
    borderClass: "border-2 border-blue-300 shadow-lg",
    headerClass: "bg-blue-600 text-white",
    titleClass: "text-white",
    features: [
      { text: "All Free features", included: true },
      { text: "Customizable topics & difficulty", included: true },
      { text: "Unlimited questions per session", included: true },
      { text: "Save & review assessment history", included: true },
      { text: "Priority support", included: true }
    ],
    button: {
      text: "Upgrade to Pro",
      className: "bg-blue-600 hover:bg-blue-700",
      onClick: (navigate: any) => navigate('/contact-us', { 
        state: {
          subject: 'Pro membership inquiry',
          industry: 'promembership',
          content: 'We are interested in your pro membership.'
        }
      })
    }
  },
  {
    title: "Enterprise Plan",
    badge: { text: "Custom", variant: "default", className: "bg-yellow-400 text-white" },
    borderClass: "border-2 border-yellow-400 shadow-lg",
    headerClass: "bg-yellow-100 border-b border-yellow-300",
    titleClass: "text-yellow-800",
    features: [
      { text: "All Pro features", included: true },
      { text: "Custom model training", included: true },
      { text: "Live exam monitoring", included: true },
      { text: "Team assessments", included: true },
      { text: "Dedicated support", included: true },
      { text: "SLAs and onboarding", included: true }
    ],
    button: {
      text: "Contact Sales",
      className: "bg-yellow-500 hover:bg-yellow-600 text-white",
      onClick: (navigate: any) => navigate('/contact-us', { 
        state: {
          subject: 'Enterprise Plan Inquiry',
          industry: 'enterprise',
          content: 'We are interested in custom model training, monitored assessment, and other enterprise features.'
        }
      })
    }
  }
];

export const PlansSection = ({ navigate }: { navigate: any }) => (
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
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} navigate={navigate} />
        ))}
      </div>
    </div>
  </section>
);