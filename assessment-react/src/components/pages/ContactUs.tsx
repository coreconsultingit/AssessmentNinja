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


const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast()
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    subject: '',
    content: ''
  });
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      subject: '',
      content: ''
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Subject validation
    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    // Content validation
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
    if (!validateForm()) {
      
      return;
    }
    try {
      console.log('Attempting to send email:', { email, subject, content });
      await emailService.sendEmail(email, subject, content);
      toast({
        title: "Email Sent",
        description: "Your message has been sent successfully!",
        duration: 3000,
      })
      setEmail('');
      setSubject('');
      setContent('');
      navigate('/');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-6 lg:p-8 bg-gray-50">
      <Card className="max-w-7xl mx-auto bg-white shadow-xl">
        <CardHeader className="p-6 md:p-8 space-y-4">
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-800">
            Looking for Data Analytics Solutions?
          </CardTitle>
          <CardDescription className="text-base md:text-lg text-gray-600">
            From property market insights to custom data analytics, our expert team is here to help transform your business needs into actionable solutions.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-4">
              <FiPhone className="text-2xl text-blue-800 mt-1" />
              <div>
                <h3 className="font-semibold">Contact Phone</h3>
                <p className="text-gray-600">+44 7340927162</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FiMail className="text-2xl text-blue-800 mt-1" />
              <div>
                <h3 className="font-semibold">Contact Mail</h3>
                <a href="mailto:info@coreconsultingit.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                  info@coreconsultingit.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FiMapPin className="text-2xl text-blue-800 mt-1" />
              <div>
                <h3 className="font-semibold">Contact Location</h3>
                <p className="text-gray-600">372, Brighton Road, South</p>
                <p className="text-gray-600">Croydon, CR2 6AL</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FiClock className="text-2xl text-blue-800 mt-1" />
              <div>
                <h3 className="font-semibold">Office Time</h3>
                <p className="text-gray-600">Mon-Fri: 7.00 - 22.00</p>
                <p className="text-gray-600">Sat-Sun: 9.00 - 20.00</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
  <Input
    type="email"
    placeholder="Your Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    className="w-full p-3"
  />
  {errors.email && (
      <p className="text-sm text-red-500">{errors.email}</p>
    )}
  <Input
    type="text"
    placeholder="Subject"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    required
    className="w-full p-3"
  />
  {errors.subject && (
      <p className="text-sm text-red-500">{errors.subject}</p>
    )}
  <Textarea
    placeholder="Your Message"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    required
    className="w-full p-3 min-h-[200px] resize-y"
  />
  {errors.content && (
      <p className="text-sm text-red-500">{errors.content}</p>
    )}
 <Button 
  type="submit" 
  className="w-full md:w-auto px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white transition-colors duration-300"
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
