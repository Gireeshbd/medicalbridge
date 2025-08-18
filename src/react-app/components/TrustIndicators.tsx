export default function TrustIndicators() {
  const partners = [
    { name: "Apollo Hospitals", logo: "AH" },
    { name: "Fortis Healthcare", logo: "FH" },
    { name: "Max Healthcare", logo: "MH" },
    { name: "Medanta", logo: "MD" },
    { name: "Narayana Health", logo: "NH" },
    { name: "Manipal Hospitals", logo: "MP" }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-600 text-lg">Partnered with India's Premier Healthcare Institutions</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-3 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-200">
                <span className="text-blue-600 font-bold text-lg">{partner.logo}</span>
              </div>
              <span className="text-sm text-gray-600 text-center font-medium">{partner.name}</span>
            </div>
          ))}
        </div>

        {/* Accreditations */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Accreditations & Certifications</h3>
            <p className="text-gray-600">International standards you can trust</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">JCI</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">JCI Accredited</h4>
              <p className="text-sm text-gray-600">Joint Commission International certified hospitals</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">ISO</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">ISO 9001:2015</h4>
              <p className="text-sm text-gray-600">Quality management systems certified</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">NABH</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">NABH Certified</h4>
              <p className="text-sm text-gray-600">National Accreditation Board for Hospitals</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-xl">CAP</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">CAP Accredited</h4>
              <p className="text-sm text-gray-600">College of American Pathologists certified labs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
