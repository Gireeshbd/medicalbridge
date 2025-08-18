import { Calendar, ArrowRight, Clock } from 'lucide-react';

export default function BlogSection() {
  const blogPosts = [
    {
      title: "Complete Guide to Cardiac Surgery in India: What US Patients Need to Know",
      excerpt: "Everything you need to know about heart surgery in India, from choosing the right hospital to post-operative care and recovery.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Cardiac Care"
    },
    {
      title: "Cost Comparison: Hip Replacement Surgery USA vs India",
      excerpt: "A detailed breakdown of hip replacement costs, quality comparisons, and why thousands of Americans choose India for orthopedic procedures.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Orthopedics"
    },
    {
      title: "Medical Tourism Safety: How to Choose JCI-Accredited Hospitals",
      excerpt: "Your comprehensive guide to selecting safe, certified hospitals in India and ensuring quality medical care abroad.",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=250&fit=crop",
      date: "March 10, 2024",
      readTime: "7 min read",
      category: "Medical Tourism"
    },
    {
      title: "IVF Success Rates: Why India is Becoming the Fertility Hub",
      excerpt: "Explore India's advanced fertility treatments, high success rates, and significantly lower costs compared to US clinics.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=250&fit=crop",
      date: "March 8, 2024",
      readTime: "5 min read",
      category: "Fertility"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Insights & Patient Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with our comprehensive guides, cost comparisons, 
            and latest updates on medical tourism to India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="mr-4">{post.date}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  {/* CTA in each blog post */}
                  <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                    Get Quote
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-16 bg-white rounded-3xl p-12 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with Medical Tourism Insights
            </h3>
            <p className="text-xl text-gray-600">
              Get weekly updates on medical procedures, cost comparisons, and success stories.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
