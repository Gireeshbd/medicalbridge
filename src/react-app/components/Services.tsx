import { Heart, Brain, Eye, Scissors, Baby, Bone } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Heart,
      title: "Cardiac Surgery",
      description: "Advanced heart procedures including bypass surgery, valve replacement, and angioplasty",
      savings: "Save up to $100,000",
      color: "text-red-600 bg-red-100"
    },
    {
      icon: Brain,
      title: "Neurosurgery",
      description: "Complex brain and spine surgeries performed by world-renowned neurosurgeons",
      savings: "Save up to $150,000",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: Bone,
      title: "Orthopedic Surgery",
      description: "Joint replacements, sports medicine, and advanced orthopedic procedures",
      savings: "Save up to $80,000",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Scissors,
      title: "Cosmetic Surgery",
      description: "Aesthetic and reconstructive procedures with internationally trained surgeons",
      savings: "Save up to $20,000",
      color: "text-pink-600 bg-pink-100"
    },
    {
      icon: Eye,
      title: "Eye Surgery",
      description: "LASIK, cataract surgery, and advanced ophthalmologic treatments",
      savings: "Save up to $15,000",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: Baby,
      title: "Fertility Treatment",
      description: "IVF, IUI, and comprehensive fertility solutions with high success rates",
      savings: "Save up to $25,000",
      color: "text-yellow-600 bg-yellow-100"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Medical Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From routine procedures to complex surgeries, access world-class medical care 
            at a fraction of US costs with our network of premier Indian hospitals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <service.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-semibold text-lg">{service.savings}</span>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Explore Your Options?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a personalized treatment plan and cost estimate for your specific medical needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
              Get Free Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
