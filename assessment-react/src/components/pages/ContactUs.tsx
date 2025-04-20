import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '../ui/toaster';
import { emailService } from '@/services/emailService';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [, setIndustry] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    subject: '',
    content: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      subject: '',
      content: '',
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!content.trim()) {
      newErrors.content = 'Message is required';
      isValid = false;
    } else if (content.trim().length < 10) {
      newErrors.content = 'Message must be at least 10 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await emailService.sendEmail(email, subject, content);
      toast({
        title: "Email Sent",
        description: "Your message has been sent successfully!",
        duration: 3000,
      });
      setEmail('');
      setSubject('');
      setIndustry('');
      setContent('');
      navigate('/');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen w-full p-6 md:p-10 bg-gray-50">
      <Card className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl">
        <CardHeader className="space-y-4">
          <CardTitle className="text-3xl md:text-4xl font-bold text-blue-800">
            Smart Assessments for Every Industry
          </CardTitle>
          <CardDescription className="text-lg md:text-xl text-gray-700">
            Whether you're hiring developers, healthcare staff, customer support, or educators — our AI-powered assessment platform helps you screen and shortlist the best-fit candidates fast.
          </CardDescription>
          <div>
            <p className="text-blue-900 font-semibold text-xl">
              👋 We'd love to hear from you!
            </p>
            <p className="text-md text-gray-600 mt-2">
              Tell us about your hiring needs, request a custom demo, or just ask a question — we’ll get back within 1 working day.
            </p>
          </div>
        </CardHeader>

        <CardContent className="mt-4 space-y-10">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <FiPhone className="text-2xl text-blue-800 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-base text-gray-600">+44 7340927162</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FiMail className="text-2xl text-blue-800 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <a href="mailto:info@coreconsultingit.com" className="text-base text-gray-600 hover:text-blue-600 transition-colors">
                  info@coreconsultingit.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FiMapPin className="text-2xl text-blue-800 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-base text-gray-600">372 Brighton Road, South Croydon, CR2 6AL</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FiClock className="text-2xl text-blue-800 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Office Hours</h3>
                <p className="text-base text-gray-600">Mon–Fri: 7:00–22:00</p>
                <p className="text-base text-gray-600">Sat–Sun: 9:00–20:00</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-lg p-4"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

            <Input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-lg p-4"
            />
            {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}

            <Select onValueChange={setIndustry}>
              <SelectTrigger className="text-lg p-4">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="customer_support">Customer Support</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Your Message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="text-lg p-4 min-h-[200px] resize-y"
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}

            <Button
              type="submit"
              className="text-lg px-6 py-4 bg-blue-900 hover:bg-blue-800 text-white w-full md:w-auto transition-colors"
            >
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  );
};

export default ContactUs;
