import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Sparkles, Clock, Users, Award } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Adjust the import path as needed

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);

  // Fetch API URL from Supabase
  useEffect(() => {
    const fetchApiUrl = async () => {
      try {
         
        const { data, error } = await supabase
          .from('basic_info') // Replace with your actual table name
          .select('resendApiUrl, contactDetails') // Fetch both URL and email
          .limit(1)
          .single();

        if (error) {
          // Fallback values if Supabase fails
          const fallbackUrl = 'https://5fnq5t8wu2.execute-api.ap-south-1.amazonaws.com/v1/send-email';
          const fallbackEmail = 'topai24apps@gmail.com';
          setApiUrl(fallbackUrl);
          setContactEmail(fallbackEmail);
        } else {
          setApiUrl(data.resendApiUrl);
          setContactEmail(data.contactDetails);
        }
      } catch (error) {
        console.error('❌ Exception while fetching configuration:', error);
        // Fallback values
        const fallbackUrl = 'https://5fnq5t8wu2.execute-api.ap-south-1.amazonaws.com/v1/send-email';
        const fallbackEmail = 'topai24apps@gmail.com';
        setApiUrl(fallbackUrl);
        setContactEmail(fallbackEmail);
      } finally {
        setIsLoadingConfig(false);
      }
    };

    fetchApiUrl();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
function getHTMLBody({ fullName, email, phone, message }) {
  return `
  <!DOCTYPE html>
  <html lang="en" style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
  <head>
    <meta charset="UTF-8">
    <title>New Contact Message</title>
  </head>
  <body style="background-color: #ffffff; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

    <h2 style="color: #333333;">📩 New Contact Message</h2>

    <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; font-weight: bold;">Full Name:</td>
        <td style="padding: 8px;">${fullName}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Email Address:</td>
        <td style="padding: 8px;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Phone Number:</td>
        <td style="padding: 8px;">${phone}</td>
      </tr>
    </table>

    <h3 style="color: #333333; margin-top: 30px;">📝 Message:</h3>
    <p style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
      ${message}
    </p>

    <p style="font-size: 12px; color: #888888; margin-top: 40px; text-align: center;">
      This message was sent from your website contact form.
    </p>

  </body>
  </html>
  `;
}
  // Use dynamic API URL from Supabase
const sendEmail = async (formData) => {
  if (!apiUrl) {
    throw new Error('API URL not loaded yet');
  }


  try {
    const emailPayload = {
      subject: formData.subject,
      html: getHTMLBody({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message,
      }),
    };


    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });


    if (response.ok) {
      return { success: true, status: response.status };
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Don't submit if API URL is still loading
    if (isLoadingConfig) {
      setSubmitError('Configuration is still loading. Please wait...');
      return;
    }

    if (!apiUrl) {
      setSubmitError('Unable to load configuration. Please refresh and try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const result = await sendEmail(formData);
      
      if (result.success) {
        setIsSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          });
        }, 5000);
      }
    } catch (error) {
      setSubmitError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjects = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Custom Software',
    'AI Integration',
    'DevOps & Deployment',
    'General Inquiry'
  ];

  return (
    <div className="min-h-screen pt-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(0) rotate(0deg); }
          25% { transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(1) rotate(90deg); }
          50% { transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(1) rotate(180deg); }
          75% { transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(1) rotate(270deg); }
        }
      `}</style>

      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 relative">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full animate-spin" style={{ animationDuration: '25s' }} />
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/10 to-red-400/10 rotate-45 animate-bounce" style={{ animationDuration: '18s' }} />
        </div>

        <div className="container mx-auto px-6">
          <div className="text-center relative z-10">
            {/* Animated Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full mb-6 transform hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-semibold">GET IN TOUCH</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Let's Talk About Your Project
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form and our team will get back to you within 24 hours. We're excited to learn more about your project and how we can help.
            </p>

            {/* Quick Stats */}
            <div className="flex justify-center items-center space-x-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 animate-pulse">24h</div>
                <p className="text-gray-600 text-sm">Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 animate-pulse" style={{ animationDelay: '0.5s' }}>200+</div>
                <p className="text-gray-600 text-sm">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 animate-pulse" style={{ animationDelay: '1s' }}>98%</div>
                <p className="text-gray-600 text-sm">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl -rotate-1"></div>
              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                Ready to transform your digital presence? We're here to help you bring your vision to life with cutting-edge technology and exceptional design.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-all duration-300 transform hover:scale-105 hover:translate-x-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg hover:rotate-12 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <a 
                      href={`mailto:${contactEmail}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium"
                    >
                      {contactEmail || 'Loading...'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-all duration-300 transform hover:scale-105 hover:translate-x-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg hover:rotate-12 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-600">Mumbai, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50/50 transition-all duration-300 transform hover:scale-105 hover:translate-x-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg hover:rotate-12 transition-transform duration-300">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                    <p className="text-gray-600">Within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-12 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold text-gray-900 mb-3">Why Choose TopAi24?</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    Expert team with 5+ years experience
                  </li>
                  <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    200+ successful projects delivered
                  </li>
                  <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    24/7 support and maintenance
                  </li>
                  <li className="flex items-center hover:translate-x-1 transition-transform duration-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    AI-powered solutions integration
                  </li>
                </ul>
              </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 rounded-3xl rotate-1"></div>
              <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="animate-spin-slow">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md focus:scale-105"
                        placeholder="Your full name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md focus:scale-105"
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md focus:scale-105"
                        placeholder="+91 98765 43210"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md focus:scale-105"
                        disabled={isSubmitting}
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none shadow-sm hover:shadow-md focus:scale-105"
                      placeholder="Tell us about your project, requirements, timeline, and any specific features you need..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoadingConfig}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center group shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1"
                  >
                    {isLoadingConfig ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Loading Configuration...
                      </>
                    ) : isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "How long does a typical project take?",
                  answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during consultation."
                },
                {
                  question: "Do you provide ongoing support?",
                  answer: "Yes, we offer comprehensive maintenance and support packages to keep your application running smoothly with regular updates and technical assistance."
                },
                {
                  question: "What technologies do you work with?",
                  answer: "We specialize in modern technologies including React, Node.js, React Native, Python, and various AI/ML frameworks. We choose the best tech stack for each project."
                },
                {
                  question: "Can you help with existing projects?",
                  answer: "Absolutely! We can audit, optimize, and enhance existing applications, or help migrate legacy systems to modern technologies."
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden transform hover:scale-105 hover:-translate-y-2 group"
                >
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <div className="relative z-10">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> 
    </div>
  );
};

export default Contact;