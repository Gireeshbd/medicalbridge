import { Play, Shield, Award, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [usCost, setUsCost] = useState(120000);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const indiaCost = Math.round(usCost * 0.15);
  const savingsPercent = Math.round(((usCost - indiaCost) / usCost) * 100);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsCost(parseInt(e.target.value));
  };

  // Calculate progress bar color based on cost position
  const getProgressBarColor = () => {
    const minCost = 20000;
    const maxCost = 300000;
    const position = (usCost - minCost) / (maxCost - minCost);
    
    if (position <= 0.33) {
      // Low cost: Green to Blue
      return `linear-gradient(to right, rgb(34, 197, 94), rgb(59, 130, 246))`;
    } else if (position <= 0.66) {
      // Medium cost: Blue to Purple
      return `linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234))`;
    } else {
      // High cost: Purple to Red
      return `linear-gradient(to right, rgb(147, 51, 234), rgb(239, 68, 68))`;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="mb-6">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Trusted by 5,000+ US Patients
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                World-Class
                <span className="text-blue-600 block">Medical Care</span>
                in India
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Save up to 80% on medical procedures without compromising quality. 
                From cardiac surgery to cosmetic procedures, experience premium healthcare 
                with personalized hospitality services.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center text-sm text-gray-600">
                <Award className="w-5 h-5 text-blue-600 mr-2" />
                JCI Certified Hospitals
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-5 h-5 text-blue-600 mr-2" />
                US-trained Doctors
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                data-cal-namespace="consultation"
                data-cal-link="gireesh-reddy/consultation"
                data-cal-config='{"layout":"month_view"}'
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Book Free Consultation
              </button>
              <button className="flex items-center justify-center border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors">
                <Play className="w-5 h-5 mr-2" />
                Watch Success Stories
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5K+</div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">80%</div>
                <div className="text-sm text-gray-600">Cost Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className={`mt-12 lg:mt-0 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative">
              {/* Main image placeholder - using a medical/hospital theme */}
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium text-gray-600">Treatment Savings</div>
                    <div className="text-green-600 text-sm font-semibold transition-all duration-300">
                      {savingsPercent}% Saved
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">US Cost</span>
                      <span className="text-gray-900 font-semibold transition-all duration-300">
                        ${usCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">India Cost</span>
                      <span className="text-blue-600 font-semibold transition-all duration-300">
                        ${indiaCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative group">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${savingsPercent}%`,
                            background: getProgressBarColor()
                          }}
                        ></div>
                      </div>
                      <input
                        type="range"
                        min="20000"
                        max="300000"
                        step="5000"
                        value={usCost}
                        onChange={handleSliderChange}
                        className="absolute inset-0 w-full h-2 bg-transparent cursor-pointer slider-input opacity-0"
                        style={{
                          background: 'transparent'
                        }}
                        aria-label="Adjust treatment cost"
                      />
                      <div className="absolute top-0 left-0 w-full h-2 flex items-center pointer-events-none">
                        <div 
                          className="w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ marginLeft: `calc(${(usCost - 20000) / (300000 - 20000) * 100}% - 6px)` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-xs text-gray-600">Success Rate</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">24/7</div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
