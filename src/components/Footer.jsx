import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-2xl font-bold">TopAi24</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-8">
              We create cutting-edge mobile experiences that connect brands with their audiences and drive measurable results — from concept to launch. We're a fast-paced, early-stage startup focused on innovation, exceptional user experience, and real-world impact. We seamlessly integrate AI-driven solutions into our applications to make them smarter, more intuitive, and more productive. Join us on this journey as we shape the next generation of intelligent digital products.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin size={20} className="text-blue-400" />
                <span className="text-gray-300">Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-blue-400" />
                <a 
                  href="mailto:topai24apps@gmail.com" 
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  topai24apps@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">© 2025 TopAi24. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;