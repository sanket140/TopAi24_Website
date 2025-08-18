import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause, Users, Award, TrendingUp } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "Michael Chen",
      position: "CEO",
      company: "TechNova",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "Working with TopAi24 transformed our business. Their team delivered a mobile app that exceeded our expectations and helped us reach new customers. The attention to detail and commitment to quality was impressive.",
      project: "E-commerce Mobile App",
      results: "300% increase in mobile sales",
      duration: "3 months",
      category: "Mobile App"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Founder",
      company: "HealthFirst",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "The AI integration TopAi24 provided revolutionized our healthcare platform. Their expertise in machine learning and user experience design created a solution that our patients love using.",
      project: "AI Healthcare Platform",
      results: "85% user satisfaction rate",
      duration: "4 months",
      category: "AI Integration"
    },
    {
      id: 3,
      name: "David Rodriguez",
      position: "CTO",
      company: "FinanceFlow",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "TopAi24's development team built our fintech application with security and scalability in mind. The result is a robust platform that handles thousands of transactions daily without any issues.",
      project: "Fintech Web Application",
      results: "99.9% uptime achieved",
      duration: "5 months",
      category: "Web Development"
    },
    {
      id: 4,
      name: "Emily Watson",
      position: "Marketing Director",
      company: "RetailMax",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "The e-commerce solution TopAi24 created for us increased our online sales by 400%. Their understanding of user behavior and conversion optimization is exceptional.",
      project: "E-commerce Platform",
      results: "400% sales increase",
      duration: "2 months",
      category: "E-commerce"
    },
    {
      id: 5,
      name: "James Wilson",
      position: "Product Manager",
      company: "EduTech Solutions",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "TopAi24 delivered an educational platform that engages students like never before. The interactive features and AI-powered personalization have improved learning outcomes significantly.",
      project: "Educational Platform",
      results: "60% improvement in engagement",
      duration: "6 months",
      category: "EdTech"
    },
    {
      id: 6,
      name: "Lisa Anderson",
      position: "Operations Manager",
      company: "LogiFlow",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "The logistics management system TopAi24 built streamlined our entire operation. Real-time tracking and AI-powered route optimization saved us 30% in operational costs.",
      project: "Logistics Management System",
      results: "30% cost reduction",
      duration: "4 months",
      category: "Enterprise Software"
    },
    {
      id: 7,
      name: "Robert Kim",
      position: "Startup Founder",
      company: "InnovateNow",
      image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "As a startup, we needed a development partner who could move fast without compromising quality. TopAi24 delivered our MVP in record time and helped us secure our first round of funding.",
      project: "Startup MVP",
      results: "Successfully raised $2M",
      duration: "2 months",
      category: "Startup"
    },
    {
      id: 8,
      name: "Maria Garcia",
      position: "Digital Director",
      company: "FashionForward",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "TopAi24 created a stunning fashion e-commerce app with AR try-on features. The innovative technology and beautiful design helped us stand out in a competitive market.",
      project: "Fashion AR App",
      results: "250% user engagement boost",
      duration: "5 months",
      category: "AR/VR"
    }
  ];

  const stats = [
    { icon: Users, label: "Happy Clients", value: "200+", color: "text-blue-600" },
    { icon: Award, label: "Projects Completed", value: "500+", color: "text-green-600" },
    { icon: TrendingUp, label: "Success Rate", value: "98%", color: "text-purple-600" },
    { icon: Star, label: "Average Rating", value: "4.9", color: "text-yellow-600" }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Quote className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Client Testimonials
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 mb-4`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Testimonial Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Auto-play Control */}
              <div className="flex justify-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleAutoPlay}
                  className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span className="font-medium">
                    {isAutoPlaying ? 'Pause' : 'Play'} Auto-scroll
                  </span>
                </motion.button>
              </div>

              {/* Testimonial Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 100, rotateY: 90 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: -90 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" />
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                      {/* Client Image */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="relative"
                      >
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
                          <img
                            src={testimonials[currentTestimonial].image}
                            alt={testimonials[currentTestimonial].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                        >
                          <Star className="w-4 h-4 text-white fill-current" />
                        </motion.div>
                      </motion.div>

                      {/* Testimonial Content */}
                      <div className="flex-1 text-center lg:text-left">
                        {/* Quote Icon */}
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-block mb-4"
                        >
                          <Quote className="w-12 h-12 text-blue-600 opacity-50" />
                        </motion.div>

                        {/* Testimonial Text */}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-6 italic"
                        >
                          "{testimonials[currentTestimonial].text}"
                        </motion.p>

                        {/* Client Info */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              {testimonials[currentTestimonial].name}
                            </h3>
                            <p className="text-lg text-gray-600">
                              {testimonials[currentTestimonial].position} at {testimonials[currentTestimonial].company}
                            </p>
                          </div>

                          {/* Rating */}
                          <div className="flex justify-center lg:justify-start space-x-1">
                            {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                              >
                                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                              </motion.div>
                            ))}
                          </div>

                          {/* Project Details */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-blue-50 rounded-lg p-3 text-center">
                              <p className="text-sm text-gray-600">Project</p>
                              <p className="font-semibold text-blue-600">{testimonials[currentTestimonial].project}</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3 text-center">
                              <p className="text-sm text-gray-600">Results</p>
                              <p className="font-semibold text-green-600">{testimonials[currentTestimonial].results}</p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-3 text-center">
                              <p className="text-sm text-gray-600">Duration</p>
                              <p className="font-semibold text-purple-600">{testimonials[currentTestimonial].duration}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </motion.button>

                {/* Dots Indicator */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? 'bg-blue-600 w-8'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              All Client Reviews
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore what all our clients have to say about their experience working with TopAi24.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  z: 50
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group cursor-pointer"
                onClick={() => setCurrentTestimonial(index)}
              >
                {/* Hover Effect Background */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: hoveredCard === index ? 1 : 0,
                    opacity: hoveredCard === index ? 0.1 : 0
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl"
                />

                <div className="relative z-10">
                  {/* Client Image and Info */}
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 rounded-full overflow-hidden shadow-lg ring-2 ring-white"
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                      <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                    "{testimonial.text}"
                  </p>

                  {/* Category Badge */}
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {testimonial.category}
                    </span>
                    <motion.div
                      animate={{ x: hoveredCard === index ? 5 : 0 }}
                      className="text-blue-600 text-sm font-medium"
                    >
                      View Details →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white rounded-full opacity-10"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Let's create something amazing together. Your project could be our next success story.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl group"
            >
              Start Your Project
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;