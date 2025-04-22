import { motion } from "framer-motion";
import AssessmentPage from "./AssessmentPage";


export const AssessmentSection = ({ topics }: { topics: { label: string; value: string }[] }) => (
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
);