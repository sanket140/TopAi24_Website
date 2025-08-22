import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;



export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Projects API functions
export const projectsApi = {
  // Get all projects
  async getAll() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get project by slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get featured projects
  async getFeatured() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get projects by category
  async getByCategory(category) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// Blogs API functions
export const blogsApi = {
  // Get all blogs
  async getAll() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('published_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get blog by slug
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get featured blogs (if you have a featured field)
  async getFeatured() {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('featured', true)
      .order('published_date', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};