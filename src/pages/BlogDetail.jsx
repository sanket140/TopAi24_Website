
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, CheckCircle, Code, Shield, Lock, Database, Grid, Book, ArrowRight, ArrowUp, X } from 'lucide-react';
import { blogsApi } from '../lib/supabase';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await blogsApi.getBySlug(slug);
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Blog not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (sections) => {
    if (!sections || !Array.isArray(sections)) return '5 min read';
    const wordsPerMinute = 200;
    let totalWords = 0;
    
    sections.forEach(section => {
      if (section.subtitle) totalWords += section.subtitle.split(' ').length;
      if (section.description) totalWords += section.description.split(' ').length;
      if (section.features) {
        section.features.forEach(feature => {
          if (feature.description) totalWords += feature.description.split(' ').length;
        });
      }
    });
    
    const readTime = Math.ceil(totalWords / wordsPerMinute);
    return `${readTime} min read`;
  };

  const getGradientClass = (slug) => {
    switch (slug) {
      case 'supabase-getting-started':
        return 'gradient-purple';
      case 'ai-in-web-development':
        return 'gradient-green';
      case 'flutter-clean-architecture':
        return 'gradient-blue';
      case 'react-vs-flutter':
        return 'gradient-blue';
      default:
        return 'gradient-blue';
    }
  };

  const getIcon = (iconName) => {
    const icons = {
      'shield': Shield,
      'code': Code,
      'lock': Lock,
      'database': Database,
      'grid': Grid,
      'book': Book,
      'arrow-right': ArrowRight,
      'arrow-up': ArrowUp,
      'block': X,
      'presentation': User,
      'domain': Code,
      'data': Database
    };
    return icons[iconName] || CheckCircle;
  };

  const getTagColor = (color) => {
    const colors = {
      'green': 'bg-green-100 text-green-800',
      'purple': 'bg-purple-100 text-purple-800',
      'blue': 'bg-blue-100 text-blue-800',
      'yellow': 'bg-yellow-100 text-yellow-800',
      'red': 'bg-red-100 text-red-800',
      'indigo': 'bg-indigo-100 text-indigo-800'
    };
    return colors[color] || 'bg-gray-100 text-gray-800';
  };

  const renderHeroSection = (heroData) => {
    return (
      <div className={`relative min-h-[70vh] md:min-h-screen ${heroData.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 container mx-auto px-6 py-12 md:py-20">
          <div className="text-center animate-fade-in">
            {heroData.logo && (
              <img src={heroData.logo} alt="Logo" className="h-12 mx-auto mb-8" />
            )}
            {heroData.image && (
              <div className="flex justify-center mb-8">
                <img src={heroData.image} alt="Hero" className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-xl animate-float" />
              </div>
            )}
            {heroData.emoji && (
              <div className="text-8xl mb-6 animate-float hidden md:block">{heroData.emoji}</div>
            )}
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 hero-title animate-slide-up">
              {heroData.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
              {heroData.subtitle}
            </p>
            {heroData.tags && (
              <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                {heroData.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 text-sm md:text-base">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {heroData.cta_buttons && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
                {heroData.cta_buttons.map((button, index) => (
                  <a key={index} href={button.href} className={index === 0 ? 
                    "px-8 py-3 bg-white text-teal-600 font-medium rounded-full hover:bg-gray-100 transition duration-300" :
                    "px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:bg-opacity-10 transition duration-300"
                  }>
                    {button.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'intro':
      case 'benefits':
        return (
          <section key={index} className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4 md:mb-6">{section.title}</h2>
                <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mb-6 md:mb-8"></div>
                <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">{section.subtitle}</p>
              </div>

              {section.features && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
                    {section.features.map((feature, idx) => (
                      <div key={idx} className={`p-6 md:p-8 rounded-2xl hover-lift bg-gradient-to-br ${feature.gradient} text-center feature-card`}>
                        {feature.icon && <img src={feature.icon} alt={feature.title} className="feature-icon mx-auto" />}
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">{feature.title}</h3>
                        <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {section.layers && (
                <>
                  <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {section.layers.map((layer, idx) => (
                      <div key={idx} className={`p-8 rounded-2xl hover-lift bg-gradient-to-br ${layer.gradient}`}>
                        <div className="layer-icon bg-blue-100 text-blue-600 mx-auto mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{layer.title}</h3>
                        <p className="text-gray-600 text-center">{layer.description}</p>
                      </div>
                    ))}
                  </div>

                  {section.benefits && (
                    <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Key Benefits of Clean Architecture</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {section.benefits.map((benefit, idx) => (
                          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                            <h4 className="font-bold text-indigo-600 mb-2">{benefit.title}</h4>
                            <p className="text-gray-600">{benefit.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {section.cards && (
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {section.cards.map((card, idx) => (
                    <div key={idx} className={`p-8 rounded-2xl hover-lift bg-gradient-to-br ${card.gradient} ai-feature-card`}>
                      <div className="flex items-center mb-4">
                        <img src={card.image} alt={card.title} className="w-16 h-16 rounded-lg object-cover mr-4" />
                        <h3 className="text-2xl font-bold text-gray-800">{card.title}</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        {card.features.map((feature, featureIdx) => (
                          <li key={featureIdx} dangerouslySetInnerHTML={{ __html: feature }}></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'comparison':
        return (
          <section key={index} className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="comparison-table mb-12 md:mb-20">
                <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 md:mb-8">{section.title}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm md:text-base">
                    <thead className="bg-gray-100">
                      <tr>
                        {section.table.headers.map((header, idx) => (
                          <th key={idx} className="p-3 md:p-4">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {section.table.rows.map((row, idx) => (
                        <tr key={idx}>
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className={`p-3 md:p-4 ${cellIdx === 0 ? 'font-medium' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        );

      case 'code_examples':
        return (
          <section key={index} className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">{section.title}</h3>
                  <div className="space-y-4 md:space-y-6">
                    {section.examples.map((example, idx) => (
                      <div key={idx}>
                        <h4 className="text-lg md:text-xl font-semibold text-gray-700 mb-2 md:mb-3">{example.title}</h4>
                        <div className="code-block">
                          <pre><code className={`language-${example.language}`}>{example.code}</code></pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'advanced_features':
        return (
          <section key={index} className="py-12 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-6 md:p-12 mb-12 md:mb-20">
                <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6 md:mb-8">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {section.features.map((feature, idx) => (
                    <div key={idx} className="p-4 md:p-6 bg-white rounded-lg border border-gray-200">
                      <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">{feature.title}</h4>
                      <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">{feature.description}</p>
                      <div className="code-block">
                        <pre><code className={`language-${feature.language}`}>{feature.code}</code></pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 'tools_showcase':
        return (
          <section key={index} className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-6">{section.title}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto mb-8"></div>
                <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">{section.subtitle}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.tools.map((tool, idx) => (
                  <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-md hover-lift">
                    <img src={tool.image} alt={tool.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.name}</h3>
                      <p className="text-gray-600 mb-4">{tool.description}</p>
                      <span className={`inline-block px-3 py-1 ${getTagColor(tool.tagColor)} rounded-full text-sm font-medium`}>
                        {tool.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'future_section':
        return (
          <section key={index} className="py-20 bg-gradient-to-r from-teal-600 to-green-500 text-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{section.title}</h2>
                <div className="w-24 h-1 bg-white bg-opacity-50 mx-auto mb-8"></div>
                <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto">{section.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {section.features.map((feature, idx) => (
                  <div key={idx} className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm border border-white border-opacity-20">
                    <div className="text-4xl mb-4">{feature.emoji}</div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'framework_comparison':
        return (
          <section key={index} className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-6">{section.title}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8"></div>
                <p className="text-xl text-gray-700 max-w-4xl mx-auto">{section.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-20">
                {section.frameworks.map((framework, idx) => (
                  <div key={idx} className={`p-8 rounded-2xl hover-lift bg-gradient-to-br ${framework.gradient}`}>
                    <img src={framework.logo} alt={`${framework.name} Logo`} className="framework-icon" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{framework.name}</h3>
                    <p className="text-gray-600 mb-4">{framework.description}</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {framework.features.map((feature, featureIdx) => (
                        <li key={featureIdx} dangerouslySetInnerHTML={{ __html: feature }}></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'performance_comparison':
        return (
          <section key={index} className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="performance-chart mb-20">
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">{section.title}</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {section.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <h4 className="text-xl font-semibold text-gray-700 mb-4">{metric.name}</h4>
                      <div className="h-48 flex items-end justify-center gap-2">
                        <div className="w-16 bg-blue-500 rounded-t-lg" style={{height: `${metric.react_native}%`}}>
                          <span className="block text-white text-sm mt-2">React Native</span>
                        </div>
                        <div className="w-16 bg-purple-500 rounded-t-lg" style={{height: `${metric.flutter}%`}}>
                          <span className="block text-white text-sm mt-2">Flutter</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-4">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 'when_to_choose':
        return (
          <section key={index} className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-12 mb-20">
                {section.choices.map((choice, idx) => (
                  <div key={idx}>
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">When to Choose {choice.framework}</h3>
                    <ul className="space-y-4">
                      {choice.reasons.map((reason, reasonIdx) => (
                        <li key={reasonIdx} className="flex items-start">
                          <span className={`bg-${choice.color}-100 text-${choice.color}-800 rounded-full p-2 mr-4`}>✓</span>
                          <span className="text-gray-700">{reason}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={`mt-8 p-6 bg-${choice.color}-50 rounded-lg border border-${choice.color}-200`}>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">Popular {choice.framework} Apps</h4>
                      <p className="text-gray-600">{choice.popular_apps}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'development_experience':
        return (
          <section key={index} className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="bg-gray-50 rounded-2xl p-12 mb-20">
                <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">{section.title}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        {section.comparison_table.headers.map((header, idx) => (
                          <th key={idx} className="p-4">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {section.comparison_table.rows.map((row, idx) => (
                        <tr key={idx}>
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className={`p-4 ${cellIdx === 0 ? 'font-medium' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        );

      case 'decision_guide':
        return (
          <section key={index} className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">{section.title}</h3>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">{section.subtitle}</p>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {section.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                      <h4 className={`text-xl font-semibold text-${rec.color}-600 mb-4`}>Choose {rec.framework} if...</h4>
                      <ul className="space-y-3 text-gray-600 text-left">
                        {rec.conditions.map((condition, condIdx) => (
                          <li key={condIdx} className="flex items-start">
                            <span className={`text-${rec.color}-500 mr-2`}>•</span>
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 'implementation':
        return (
          <section key={index} className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-8">{section.title}</h2>
                <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10"></div>
                <p className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">{section.subtitle}</p>
              </div>

              {section.project_structure && (
                <div className="mb-20">
                  <div className="bg-white rounded-3xl p-10 md:p-16 border border-gray-200 shadow-lg">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">{section.project_structure.title}</h3>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">{section.project_structure.description}</p>
                        <div className="space-y-4">
                          {section.project_structure.legend.map((item, idx) => (
                            <div key={idx} className="flex items-center text-gray-700">
                              <div className={`w-3 h-3 bg-${item.color}-500 rounded-full mr-3`}></div>
                              <span className="font-semibold">{item.label}:</span>&nbsp;{item.description}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="bg-gray-900 rounded-2xl p-8 text-gray-100 font-mono overflow-x-auto shadow-2xl">
                          <div className="flex items-center mb-6">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="ml-4 text-gray-400 text-sm">Flutter Project</span>
                          </div>
                          <pre className="text-sm leading-relaxed whitespace-pre-wrap">{section.project_structure.structure}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {section.layer_details && (
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                  {section.layer_details.map((detail, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-200 hover-lift">
                      <div className={`bg-gradient-to-br ${detail.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                        {React.createElement(getIcon(detail.icon), { className: "h-8 w-8 text-white" })}
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-4">{detail.title}</h4>
                      <p className="text-gray-600 mb-4">{detail.description}</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        {detail.features.map((feature, featureIdx) => (
                          <li key={featureIdx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {section.dependency_flow && (
                <div className="bg-white rounded-3xl p-10 md:p-16 border border-gray-200 shadow-lg">
                  <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">Dependency Flow & Communication</h3>
                  <div className="grid md:grid-cols-3 gap-12">
                    {section.dependency_flow.map((flow, idx) => (
                      <div key={idx} className="text-center">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          {React.createElement(getIcon(flow.icon), { className: "h-10 w-10" })}
                        </div>
                        <h4 className="font-bold text-xl text-gray-800 mb-4">{flow.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{flow.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        );

      case 'best_practices':
        return (
          <section key={index} className="py-20 bg-white">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-6">{section.title}</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-8"></div>
                <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">{section.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.practices.map((practice, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover-lift">
                    <div className="text-indigo-500 mb-4">
                      {React.createElement(getIcon(practice.icon), { className: "h-8 w-8" })}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{practice.title}</h3>
                    <p className="text-gray-600">{practice.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
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
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen pt-32 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/blogs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Global Styles */}
      <style jsx global>{`
        .gradient-purple {
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        }
        .gradient-green {
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        }
        .gradient-blue {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
        }
        .text-gradient {
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .feature-icon {
          width: 60px;
          height: 60px;
          object-fit: contain;
          margin-bottom: 1rem;
        }
        .framework-icon {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-bottom: 1.5rem;
        }
        .layer-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          margin-bottom: 1rem;
        }
        .code-block {
          background: #2d2d2d;
          border-radius: 8px;
          overflow: hidden;
        }
        .code-block pre {
          padding: 1rem;
          margin: 0;
          color: #fff;
          overflow-x: auto;
        }
        .comparison-table {
          background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
          border-radius: 12px;
          padding: 1rem;
        }
        .performance-chart {
          background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .ai-feature-card {
          transition: all 0.4s ease;
        }
        .ai-feature-card:hover {
          transform: translateY(-5px) scale(1.02);
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .section-title {
          font-size: 2.5rem;
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 3.5rem;
          }
          .section-title {
            font-size: 2rem;
          }
          .feature-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      {/* Blog Content */}
      <article className="pt-20">
        {/* Blog Metadata */}
       

        {/* Hero Section */}
        {blog.hero_section && renderHeroSection(blog.hero_section)}

        {/* Dynamic Sections */}
        {blog.sections && Array.isArray(blog.sections) && blog.sections.map((section, index) => 
          renderSection(section, index)
        )}

        {/* Back to Blogs CTA */}
        <div className={`py-20 ${getGradientClass(slug)}`}>
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Explore More?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Check out our other articles on web development, mobile apps, and technology insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/blogs"
                  className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl"
                >
                  More Articles
                </Link>
                <Link
                  to="/contact"
                  className="inline-block border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>  
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
