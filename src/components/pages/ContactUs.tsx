import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '../ui/toaster';
import { motion } from 'framer-motion';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { emailService } from "@/services/emailService";
import { useNavigate } from "react-router-dom";

const ContactUs: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    industry: '',
    content: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    subject: '',
    content: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', subject: '', content: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Message is required';
      isValid = false;
    } else if (formData.content.trim().length < 10) {
      newErrors.content = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log(formData.industry);
      await emailService.sendEmail(formData.email, `${formData.subject} ${formData.industry}` , formData.content);
      toast({
        title: "Message Sent",
        description: "We'll get back to you soon!",
      });
      setFormData({ email: '', subject: '', industry: '', content: '' });
      navigate("/"); // Redirect to home page
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-blue-50/30 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="border border-blue-100 shadow-sm overflow-hidden">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl md:text-3xl">Contact Us</CardTitle>
            <CardDescription className="text-blue-100">
              Have questions? We're here to help!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-semibold text-blue-900"
                >
                  Get in Touch
                </motion.h3>
                
                <div className="space-y-4">
                  {[
                    {
                      icon: <FiPhone className="text-xl text-blue-600" />,
                      title: "Phone",
                      content: "+44 7340927162"
                    },
                    {
                      icon: <FiMail className="text-xl text-blue-600" />,
                      title: "Email",
                      content: "info@coreconsultingit.com"
                    },
                    {
                      icon: <FiMapPin className="text-xl text-blue-600" />,
                      title: "Location",
                      content: "372 Brighton Road, South Croydon, CR2 6AL"
                    },
                    {
                      icon: <FiClock className="text-xl text-blue-600" />,
                      title: "Hours",
                      content: "Mon-Fri: 7:00-22:00\nSat-Sun: 9:00-20:00"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-medium text-blue-900">{item.title}</h4>
                        <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Form */}
              <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${errors.email ? 'border-red-500' : ''}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${errors.subject ? 'border-red-500' : ''}`}
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>
                
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <Select 
                    value={formData.industry} 
                    onValueChange={(value) => setFormData({...formData, industry: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>                      
                      <SelectItem value="promembership">Pro Membership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className={`min-h-[150px] ${errors.content ? 'border-red-500' : ''}`}
                    placeholder="Your message here..."
                  />
                  {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Send Message
                </Button>
              </motion.form>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <Toaster />
    </div>
  );
};

export default ContactUs;