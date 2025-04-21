import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function TermsOfService() {
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
              Terms of Service
            </CardTitle>
            <p className="text-sm text-gray-500 mt-2">
              Effective date: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using the Assessment Ninja Portal ("ANP", "Platform"), you agree to be bound by these 
                Terms of Service. If you do not agree, you may not use our services. These terms apply to all visitors, 
                users, and others who access the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">2. Description of Service</h2>
              <p className="mb-4">
                ANP provides an online platform for creating, taking, and evaluating assessments. The service includes 
                AI-generated questions, performance evaluation, and learning resources. We reserve the right to modify 
                or discontinue the service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">3. User Accounts</h2>
              <p className="mb-2">When creating an account, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Be responsible for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">4. Acceptable Use</h2>
              <p className="mb-2">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Use the service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service</li>
                <li>Use automated systems to extract data without permission</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">5. Intellectual Property</h2>
              <p className="mb-4">
                All content on the Platform, including questions, assessments, and evaluation methodologies, are the 
                property of ANP or its licensors and are protected by intellectual property laws. You may not reproduce, 
                distribute, or create derivative works without our express permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">6. User Content</h2>
              <p className="mb-4">
                You retain ownership of any content you submit to the Platform. By submitting content, you grant us a 
                worldwide, non-exclusive license to use, reproduce, and display such content for the purpose of 
                providing and improving our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">7. Disclaimer of Warranties</h2>
              <p className="mb-4">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT 
                THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. ASSESSMENT RESULTS ARE FOR EDUCATIONAL 
                PURPOSES ONLY AND SHOULD NOT BE SOLELY RELIED UPON FOR CAREER OR ACADEMIC DECISIONS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">8. Limitation of Liability</h2>
              <p className="mb-4">
                IN NO EVENT SHALL ANP BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES 
                ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US 
                IN THE PAST 12 MONTHS, IF ANY.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">9. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account immediately, without prior notice, for any violation of these 
                Terms. Upon termination, your right to use the service will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">10. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by the laws of the United Kingdom, without regard to its conflict of law 
                provisions. Any disputes shall be resolved in the courts located in London, UK.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">11. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes. 
                Your continued use of the service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-blue-800 mb-3">12. Contact Information</h2>
              <p>
                For questions about these Terms, please contact us at{' '}
                <a href="mailto:legal@assessmentninja.com" className="text-blue-600 hover:underline">
                  legal@assessmentninja.com
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