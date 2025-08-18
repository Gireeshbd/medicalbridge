import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              MedBridge<span className="text-gray-800">USA</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </a>
            <a href="#blog" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Blog
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Success Stories
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-1" />
              +1 (555) 123-4567
            </div>
            <button 
              data-cal-namespace="consultation"
              data-cal-link="gireesh-reddy/consultation"
              data-cal-config='{"layout":"month_view"}'
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">
                Services
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
                About
              </a>
              <a href="#blog" className="text-gray-700 hover:text-blue-600 font-medium">
                Blog
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium">
                Success Stories
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Contact
              </a>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Phone className="w-4 h-4 mr-1" />
                  +1 (555) 123-4567
                </div>
                <button 
                  data-cal-namespace="consultation"
                  data-cal-link="gireesh-reddy/consultation"
                  data-cal-config='{"layout":"month_view"}'
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
