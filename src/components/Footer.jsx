import React, { useState, useEffect } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const { data, error } = await supabase
          .from('basic_info') // 👈 replace with your actual table name
          .select('*')
          .single();

        if (error) throw error;

        setFooterData(data);
      } catch (err) {
        setError(err);
        console.error("Error fetching footer data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-500">Error: {error.message}</p>;

  return (
    <footer className="bg-gray-900 text-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Left side - Branding & Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">TopAi24</h2>
          <p className="mt-2 text-gray-400">
            {footerData?.footerDescription || "No description available."}
          </p>
        </div>

        {/* Right side - Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={18} />
            <span>{footerData?.cityName || "No city available"}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Mail size={18} />
            <span>{footerData?.contactDetails || "topai24apps@gmail.com"}</span>
          </div>
        
        </div>
      </div>

      <div className="text-center text-gray-500 mt-6 text-sm">
        © 2025 TopAi24. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
