import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const location = useLocation()

  return (
    <motion.div 
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-800 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 z-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to <span className="text-emerald-400">AssessmentNinja</span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
          Smart assessments. Instant results. Ninja-level precision.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 z-10 flex-col sm:flex-row"
      >
        <Link to="/student" className="w-full sm:w-auto">
          <Button 
            size="lg" 
            className="bg-emerald-500 hover:bg-emerald-600 shadow-lg transition-all w-full"
          >
            For Students
          </Button>
        </Link>
        <Link to="/home" className="w-full sm:w-auto">
          <Button 
            size="lg"
            variant="outline"
            className="border-blue-400 text-blue-400 hover:bg-blue-900/30 w-full"
          >
            For Professionals
          </Button>
        </Link>
      </motion.div>

      {/* Secondary CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 z-10"
      >
        <Link to="/contact">
          <Button 
            variant="ghost" 
            size="lg"
            className="text-slate-300 hover:bg-slate-800/30"
          >
            Contact Us →
          </Button>
        </Link>
      </motion.div>

      {/* Background Elements */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-repeat opacity-10"
      />
    </motion.div>
  )
}
