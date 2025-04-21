import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/30 to-white"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="border border-blue-100 shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-900">
              Privacy Policy
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">1. Introduction</h2>
              <p className="mb-4">
                Welcome to Assessment Ninja Portal ("ANP", "we", "us", or "our"). We are committed to protecting your 
                privacy and ensuring the security of your personal information. This Privacy Policy explains how we 
                collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">2. Information We Collect</h2>
              <p className="mb-2">We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Personal Information:</strong> Name, email address, contact details when you register or contact us</li>
                <li><strong>Assessment Data:</strong> Questions answered, responses provided, evaluation results</li>
                <li><strong>Usage Data:</strong> IP addresses, browser type, pages visited, time spent on platform</li>
                <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze usage patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">3. How We Use Your Information</h2>
              <p className="mb-2">We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Provide and maintain our service</li>
                <li>Improve and personalize your experience</li>
                <li>Analyze usage to enhance our platform</li>
                <li>Communicate with you about updates or changes</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">4. Data Sharing and Disclosure</h2>
              <p className="mb-4">
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Service providers who assist in platform operations</li>
                <li>Educational institutions if you're using an institutional account</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your data, including 
                encryption, access controls, and regular security audits. However, no internet transmission is 
                100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">6. Your Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data in a portable format</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">7. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy periodically. We will notify you of significant changes through 
                our platform or via email. Your continued use of the service after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">8. Contact Us</h2>
              <p>
                For questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@assessmentninja.com" className="text-blue-600 hover:underline">
                  privacy@assessmentninja.com
                </a>.
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}