
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: 'Understanding Medical Tourism: Benefits, Risks, and What to Expect',
    excerpt: 'Medical tourism is growing rapidly as people seek affordable, high-quality healthcare abroad. Here\'s what you need to know before planning your medical journey.',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80',
    category: 'Medical Tourism',
    author: 'Dr. Sarah Chen',
    date: 'June 15, 2023',
    readTime: '8 min read',
    tags: ['Medical Tourism', 'Healthcare', 'Travel Tips']
  },
  {
    id: '2',
    title: 'Top 5 Destinations for Dental Treatments Abroad',
    excerpt: 'Dental work can be expensive in many countries. Discover the top destinations where you can get high-quality dental care at a fraction of the cost.',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=800&q=80',
    category: 'Dental',
    author: 'Michael Rodriguez',
    date: 'May 28, 2023',
    readTime: '6 min read',
    tags: ['Dental', 'Travel', 'Cost Savings']
  },
  {
    id: '3',
    title: 'How to Prepare for Surgery Abroad: A Complete Checklist',
    excerpt: 'Planning for surgery in another country requires careful preparation. Use our comprehensive checklist to ensure you\'re ready for a successful procedure and recovery.',
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=800&q=80',
    category: 'Surgery',
    author: 'Aisha Patel',
    date: 'April 10, 2023',
    readTime: '10 min read',
    tags: ['Surgery', 'Preparation', 'Checklist']
  },
  {
    id: '4',
    title: 'Cosmetic Surgery Tourism: What You Need to Know',
    excerpt: 'The rise of cosmetic surgery tourism comes with both opportunities and risks. Learn what to consider when planning aesthetic procedures abroad.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    category: 'Cosmetic Surgery',
    author: 'Dr. James Wilson',
    date: 'March 5, 2023',
    readTime: '7 min read',
    tags: ['Cosmetic Surgery', 'Beauty', 'Recovery']
  },
  {
    id: '5',
    title: 'Recovering in Paradise: Best Destinations for Post-Surgery Relaxation',
    excerpt: 'Why not combine your medical treatment with a relaxing vacation? Discover the most beautiful destinations that also offer excellent medical care.',
    image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=800&q=80',
    category: 'Recovery',
    author: 'Emily Nakamura',
    date: 'February 18, 2023',
    readTime: '5 min read',
    tags: ['Recovery', 'Travel', 'Wellness']
  },
  {
    id: '6',
    title: 'How to Navigate Insurance for Medical Treatments Abroad',
    excerpt: 'Understanding insurance coverage for international medical care can be complicated. This guide breaks down what you need to know about insurance for medical tourism.',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80',
    category: 'Insurance',
    author: 'Robert Johnson',
    date: 'January 22, 2023',
    readTime: '9 min read',
    tags: ['Insurance', 'Finance', 'Planning']
  }
];

const categories = [
  'All Categories', 'Medical Tourism', 'Dental', 'Surgery', 'Cosmetic Surgery', 'Recovery', 'Insurance', 'Travel Tips'
];

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  const filteredPosts = blogPosts.filter(post => {
    // Filter by search term
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        {/* Hero Section */}
        <section className="py-12 bg-medictrip-50">
          <div className="medictrip-container">
            <div className="max-w-3xl mx-auto text-center">
              <span className="medictrip-badge-primary mb-4">MedicTrip Blog</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Insights for Your Medical Journey
              </h1>
              <p className="text-lg text-gray-600">
                Expert advice, patient stories, and comprehensive guides to help you
                navigate the world of medical tourism.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b">
          <div className="medictrip-container">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medictrip-500 focus:border-medictrip-500"
                  placeholder="Search articles..."
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex-shrink-0">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medictrip-500 focus:border-medictrip-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="medictrip-container">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute top-4 left-4 medictrip-badge-primary">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h2 className="text-xl font-bold mb-3">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <User className="w-4 h-4 mr-1" />
                        <span className="mr-4">{post.author}</span>
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="mr-4">{post.date}</span>
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a href={`/blog/${post.id}`} className="medictrip-button-secondary text-sm flex items-center self-start">
                        Read More
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-medictrip-50">
          <div className="medictrip-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest medical travel insights, tips, and special offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                <input
                  type="email"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-medictrip-500 focus:border-medictrip-500"
                  placeholder="Your email address"
                />
                <button className="medictrip-button-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
