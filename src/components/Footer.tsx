import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer className={`${className} w-full bg-white text-blue-900/80`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Assessment Ninja</h3>
            <p className="text-sm">
              AI-powered assessment platform for students and professionals.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/home" className="hover:text-blue-600 transition-colors">For Professionals</Link></li>
              <li><Link to="/student" className="hover:text-blue-600 transition-colors">For Students</Link></li>
              <li><Link to="/contact-us" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="https://github.com/coreconsultingit/AssessmentNinja" className="text-blue-900/60 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              
              <a href="https://www.linkedin.com/company/coreconsultinginformationtechnology/?viewAsMember=true" className="text-blue-900/60 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-100/50 mt-8 pt-6 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Powered By{' '}
            <a href="https://coreconsultingit.com" className="text-blue-600 hover:underline">
              CCIT
            </a>. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;