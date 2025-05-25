import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Home className="h-8 w-8 mr-2 text-[#DAA520]" />
              <span className="text-xl font-bold">GharDekho</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for finding the perfect home in India.
              Made with ❤️ by kethe Dev Chand.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#DAA520]">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#DAA520]">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#DAA520]">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#DAA520]">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-[#DAA520]">Properties</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-[#DAA520]">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-[#DAA520]">Signup</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Top Locations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?location=mumbai" className="text-gray-300 hover:text-[#DAA520]">Mumbai</Link>
              </li>
              <li>
                <Link to="/properties?location=delhi" className="text-gray-300 hover:text-[#DAA520]">Delhi</Link>
              </li>
              <li>
                <Link to="/properties?location=bangalore" className="text-gray-300 hover:text-[#DAA520]">Bangalore</Link>
              </li>
              <li>
                <Link to="/properties?location=hyderabad" className="text-gray-300 hover:text-[#DAA520]">Hyderabad</Link>
              </li>
              <li>
                <Link to="/properties?location=pune" className="text-gray-300 hover:text-[#DAA520]">Pune</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-[#DAA520] mt-1" />
                <span>contact@ghardekho.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-[#DAA520] mt-1" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-start">
                <Home className="h-5 w-5 mr-2 text-[#DAA520] mt-1" />
                <span>123 Real Estate Tower, Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} GharDekho. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;