
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Globe, Play, Pause } from 'lucide-react';
import { projectsApi } from '../lib/supabase';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Project not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  const scrollToProjectOverview = () => {
    const element = document.getElementById('project-overview');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getTechnologyIcon = (tech) => {
    const techLower = tech.toLowerCase();

    if (techLower.includes('react')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg';
    if (techLower.includes('flutter')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg';
    if (techLower.includes('node')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg';
    if (techLower.includes('firebase')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg';
    if (techLower.includes('supabase')) return 'https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png';
    if (techLower.includes('typescript')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg';
    if (techLower.includes('tailwind')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg';
    if (techLower.includes('mongodb')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg';
    if (techLower.includes('express')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg';
    if (techLower.includes('aws')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg';
    if (techLower.includes('vercel')) return 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png';
    if (techLower.includes('css')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg';
    if (techLower.includes('javascript')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
    if (techLower.includes('python')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg';
    if (techLower.includes('stripe')) return 'https://images.ctfassets.net/fzn2n1nzq965/3AGidihOJl4nH9D7Zjj6y7/a73d90a41fcb947467b50a87954c4e07/Stripe_icon_-_square.svg';
    if (techLower.includes('google')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg';
    if (techLower.includes('tensorflow')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg';
    if (techLower.includes('openai')) return 'https://openai.com/favicon.ico';
    if (techLower.includes('laravel')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg';
    if (techLower.includes('healthkit')) return 'https://developer.apple.com/assets/elements/icons/healthkit/healthkit-96x96_2x.png';
    if (techLower.includes('cdn')) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg';
    if (techLower.includes('framer')) return 'https://www.framer.com/images/favicons/favicon.svg';

    return 'https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=' + tech.charAt(0);
  };

  // Get project emoji from database or fallback to category-based emoji
  const getProjectEmoji = () => {
    if (project?.emoji) {
      return project.emoji;
    }
    
    // Fallback to category-based emoji if no emoji in database
    if (project?.category === 'Mobile App') return '📱';
    if (project?.category === 'Web App') return '💻';
    if (project?.category === 'E-commerce') return '🛒';
    return '⚡'; // default fallback
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 bg-gray-50">
        <div className="container mx-auto px-6 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-full mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/projects"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const content = project.content || {};
  const hero = content.hero || {};
  const features = content.features || [];
  const architecture = content.architecture || {};
  const screenshots = project.screenshots || [];
  const videoPath = project.video_path;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section - Fixed spacing from header */}
      <section className="relative min-h-screen gradient-blue overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-8xl mb-6 animate-float"
            >
              {getProjectEmoji()}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-white mb-6"
            >
              {hero.title || project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
            >
              {hero.subtitle || project.description}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjectOverview}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl cursor-pointer"
            >
              Explore Project
            </motion.button>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-10 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-2xl"
          style={{ animationDelay: '1s' }}
        >
          ⭐
        </motion.div>
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-52 right-20 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-xl"
        >
          🚀
        </motion.div>
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-lg"
        >
          💡
        </motion.div>
      </section>

      {/* Video Section - Only show if video exists */}
      {videoPath && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gradient mb-6">Project Demo</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10"></div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-2xl hover-lift"
                style={{ aspectRatio: '16/9' }}
              >
                <video
                  controls
                  className="w-full h-full object-contain bg-black"
                  poster={project.image}
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  style={{ maxHeight: '500px' }}
                >
                  <source src={videoPath} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {!isVideoPlaying && (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-6"
                    >
                      <Play className="w-16 h-16 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Project Overview */}
      <section id="project-overview" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gradient mb-6">Project Overview</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10"></div>
            <p className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Use custom project overview if available, otherwise show default cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {content.project_overview && content.project_overview.length > 0 ? (
              content.project_overview.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))
            ) : (
              // Fallback default cards
              <>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
                >
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Purpose</h3>
                  <p className="text-gray-600">
                    {hero.description || project.description || 'Solving real-world problems with innovative technology solutions'}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl hover-lift bg-gradient-to-br from-green-50 to-green-100 border border-green-200"
                >
                  <div className="text-6xl mb-4">⚙️</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Technology</h3>
                  <p className="text-gray-600">
                    {project.technologies.slice(0, 3).join(', ') + (project.technologies.length > 3 ? '...' : '')}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl hover-lift bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
                >
                  <div className="text-6xl mb-4">{getProjectEmoji()}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Platform</h3>
                  <p className="text-gray-600">
                    {project.category || 'Cross-platform solution'}
                  </p>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gradient mb-6">Key Features</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              // Handle both string and object features
              const featureTitle = typeof feature === 'string' ? feature : feature.title;
              const featureIcon = typeof feature === 'object' && feature.icon ? feature.icon : 
                                 (index === 0 ? '🔥' : 
                                  index === 1 ? '🎨' : 
                                  index === 2 ? '📱' : 
                                  index === 3 ? '⚡' : 
                                  index === 4 ? '🔒' : '⭐');
              const featureDescription = typeof feature === 'object' && feature.description ? feature.description : 
                                        'Advanced functionality designed for optimal user experience';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl hover-lift bg-white shadow-lg border border-gray-200 group"
                >
                  <div className="text-5xl mb-4 group-hover:animate-bounce">
                    {featureIcon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{featureTitle}</h3>
                  <p className="text-gray-600">{featureDescription}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Used - Fixed with proper icons */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gradient mb-6">Technologies Used</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <img 
                    src={getTechnologyIcon(tech)} 
                    alt={tech}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-12 h-12 bg-blue-500 rounded-lg hidden items-center justify-center text-white font-bold text-lg">
                    {tech.charAt(0)}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{tech}</h3>
                <p className="text-gray-600 text-sm">Modern technology stack</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture - Show if any architecture data exists */}
      {architecture && Object.keys(architecture).length > 0 && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-gradient mb-6">System Architecture</h2>
              <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10"></div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="hover-lift bg-white p-8 rounded-3xl shadow-2xl"
              >
                {/* Architecture Image - Only show if exists */}
                {architecture.image && (
                  <img src={architecture.image} 
                       alt="Architecture Diagram" 
                       className="w-full rounded-2xl shadow-lg mb-8"/>
                )}

                {/* Dynamic Architecture Details */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(architecture).map(([key, value], index) => {
                    // Skip the image key as it's displayed separately
                    if (key === 'image') return null;
                    
                    // Get appropriate icon and title for each architecture component
                    const getArchitectureConfig = (key) => {
                      const configs = {
                        frontend: { icon: '🎨', title: 'Frontend', color: 'blue' },
                        backend: { icon: '⚙️', title: 'Backend', color: 'green' },
                        database: { icon: '🗄️', title: 'Database', color: 'purple' },
                        deployment: { icon: '🚀', title: 'Deployment', color: 'indigo' },
                        styling: { icon: '💅', title: 'Styling', color: 'pink' },
                        features: { icon: '✨', title: 'Features', color: 'yellow' },
                        animations: { icon: '🎬', title: 'Animations', color: 'red' },
                        performance: { icon: '⚡', title: 'Performance', color: 'orange' },
                        auth: { icon: '🔐', title: 'Authentication', color: 'cyan' },
                        payments: { icon: '💳', title: 'Payments', color: 'emerald' },
                        storage: { icon: '💾', title: 'Storage', color: 'slate' },
                        ai: { icon: '🤖', title: 'AI/ML', color: 'violet' },
                        ml: { icon: '🧠', title: 'Machine Learning', color: 'fuchsia' },
                        maps: { icon: '🗺️', title: 'Maps', color: 'teal' },
                        social: { icon: '👥', title: 'Social Features', color: 'rose' },
                        analytics: { icon: '📊', title: 'Analytics', color: 'amber' },
                        video: { icon: '🎥', title: 'Video', color: 'lime' },
                        content: { icon: '📝', title: 'Content', color: 'sky' },
                        health: { icon: '🏥', title: 'Health Integration', color: 'emerald' },
                        state: { icon: '🔄', title: 'State Management', color: 'indigo' },
                        media: { icon: '📱', title: 'Media', color: 'purple' },
                        community: { icon: '🌐', title: 'Community', color: 'blue' }
                      };
                      
                      return configs[key.toLowerCase()] || { 
                        icon: '🔧', 
                        title: key.charAt(0).toUpperCase() + key.slice(1), 
                        color: 'gray' 
                      };
                    };

                    const config = getArchitectureConfig(key);
                    
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`p-6 bg-${config.color}-50 rounded-xl text-center hover-lift border border-${config.color}-200`}
                      >
                        <div className="text-4xl mb-4">{config.icon}</div>
                        <h3 className="font-bold text-lg mb-2 text-gray-800">{config.title}</h3>
                        <p className="text-gray-600 text-sm">{value}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Application Screens - Fixed to show 6 columns and larger images */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gradient mb-6">Application Screens</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10"></div>
          </motion.div>

          {screenshots && screenshots.length > 0 ? (
            <div className={`grid gap-8 ${screenshots.length < 6 ? 'justify-center' : ''} ${
              screenshots.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              screenshots.length === 2 ? 'grid-cols-2 max-w-2xl mx-auto' :
              screenshots.length === 3 ? 'grid-cols-3 max-w-4xl mx-auto' :
              screenshots.length === 4 ? 'grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto' :
              screenshots.length === 5 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto' :
              'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
            }`}>
              {screenshots.map((screenshot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="hover-lift rounded-3xl shadow-2xl overflow-hidden">
                    <img
                      src={screenshot}
                      alt={`Application Screen ${index + 1}`}
                      className="w-full h-auto"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    /> 
                    <div 
                      className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center text-gray-500 hidden"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">📱</div>
                        <p>Screenshot {index + 1}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📱</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">Screenshots Coming Soon</h3>
              <p className="text-gray-500">Application screenshots will be available soon</p>
            </div>
          )}
        </div>
      </section>

      {/* Performance Metrics - Dynamic based on project data */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gradient mb-6">Performance Metrics</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10"></div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Use custom metrics if available, otherwise fallback to default */}
            {content.performance_metrics && content.performance_metrics.length > 0 ? (
              content.performance_metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
                >
                  <div className="text-5xl mb-4">{metric.icon || '📊'}</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{metric.title || 'N/A'}</div>
                  <p className="text-gray-600 font-medium">{metric.description || 'Performance metric'}</p>
                </motion.div>
              ))
            ) : (
              // Fallback to default metrics if no custom metrics are provided
              [
                { metric: '99.9%', label: 'Uptime', icon: '⚡' },
                { metric: '<2s', label: 'Load Time', icon: '🚀' },
                { metric: '100%', label: 'Responsive', icon: '📱' },
                { metric: 'A+', label: 'Security', icon: '🛡️' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl hover-lift bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{item.metric}</div>
                  <p className="text-gray-600 font-medium">{item.label}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-blue">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Build Something Amazing?</h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Let's discuss your project and create innovative solutions together.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact" 
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl"
              >
                Start Your Project
              </motion.a>
              {project.custom_url && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.custom_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  <Globe className="mr-2 w-5 h-5" />
                  View Live Demo
                  <ExternalLink className="ml-2 w-4 h-4" />
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        .gradient-blue {
          background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .text-gradient {
          background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
