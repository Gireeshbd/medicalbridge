import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Texas, USA",
      treatment: "Cardiac Bypass Surgery",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b607?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The level of care I received in India exceeded my expectations. The doctors were incredibly skilled, and the facilities were world-class. I saved over $80,000 and received better treatment than I would have in the US.",
      savings: "$85,000 saved"
    },
    {
      name: "Michael Chen",
      location: "California, USA",
      treatment: "Hip Replacement",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "From consultation to recovery, every step was handled professionally. The hospital felt like a 5-star hotel, and the medical team was exceptional. I'm back to playing tennis pain-free!",
      savings: "$45,000 saved"
    },
    {
      name: "Jennifer Williams",
      location: "Florida, USA",
      treatment: "IVF Treatment",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "After failing multiple IVF attempts in the US, I was skeptical. But the fertility specialists in India gave me hope and results. I'm now a proud mother of twins, and it cost 70% less than US treatment.",
      savings: "$30,000 saved"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories from Real Patients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from thousands of Americans who 
            have transformed their lives through medical tourism to India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-200" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Savings badge */}
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-6">
                {testimonial.savings}
              </div>

              {/* Patient info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            MedBridge USA in Numbers
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">5,000+</div>
              <div className="text-blue-100">Successful Treatments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-blue-100">Patient Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$50M+</div>
              <div className="text-blue-100">Total Patient Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-blue-100">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
