import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="text-2xl font-bold text-blue-400 mb-4">
              MedBridge<span className="text-white">USA</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting US patients with world-class medical care in India. 
              Your health, our priority. Your savings, our commitment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Medical Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cardiac Surgery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Orthopedic Surgery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Neurosurgery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cosmetic Surgery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Eye Surgery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Fertility Treatment</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Patient Stories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cost Calculator</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Treatment Guides</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hospital Network</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <div>
                  <p className="text-white font-medium">+1 (555) 123-4567</p>
                  <p className="text-gray-300 text-sm">24/7 Patient Support</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <div>
                  <p className="text-white font-medium">info@medbridgeusa.com</p>
                  <p className="text-gray-300 text-sm">Get a response within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                <div>
                  <p className="text-white font-medium">Miami, FL</p>
                  <p className="text-gray-300 text-sm">US Headquarters</p>
                </div>
              </div>
            </div>

            {/* Emergency contact */}
            <div className="mt-6 p-4 bg-red-900 bg-opacity-50 rounded-lg border border-red-700">
              <p className="text-red-300 text-sm font-medium mb-1">Emergency Support</p>
              <p className="text-white font-semibold">+1 (555) 911-HELP</p>
              <p className="text-red-200 text-xs">For patients currently in India</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 MedBridge USA. All rights reserved. | Licensed Medical Tourism Facilitator
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
