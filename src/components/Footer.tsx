
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="medictrip-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-medictrip-600 to-medictrip-800">
                MedicTrip
              </span>
            </Link>
            <p className="text-gray-600 text-sm">
              Connecting patients with world-class medical care abroad. Your health journey, made simple.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-medictrip-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-medictrip-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-medictrip-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-900 tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-medictrip-600 transition-colors text-sm">
                  Find Treatments
                </Link>
              </li>
              <li>
                <a href="/#destinations-section" className="text-gray-600 hover:text-medictrip-600 transition-colors text-sm">
                  Destinations
                </a>
              </li>
              <li>
                <a href="/#featured-section" className="text-gray-600 hover:text-medictrip-600 transition-colors text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-600 hover:text-medictrip-600 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-600 hover:text-medictrip-600 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-600 hover:text-medictrip-600 transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Treatments */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-900 tracking-wider mb-5">
              Treatments
            </h3>
            <ul className="space-y-3">
              {['Dental', 'Cosmetic Surgery', 'Orthopedic', 'Cardiac', 'Fertility', 'Medical Checkups', 'Eye Surgery', 'Weight Loss'].map((treatment) => (
                <li key={treatment}>
                  <a href="#" className="text-gray-600 hover:text-medictrip-600 transition-colors text-sm">
                    {treatment}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-900 tracking-wider mb-5">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:support@medictrip.com" className="text-gray-600 hover:text-medictrip-600 transition-colors flex items-start">
                  <Mail className="w-4 h-4 mt-0.5 mr-2" />
                  <span className="text-sm">support@medictrip.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+18001234567" className="text-gray-600 hover:text-medictrip-600 transition-colors flex items-start">
                  <Phone className="w-4 h-4 mt-0.5 mr-2" />
                  <span className="text-sm">+91 123456789</span>
                </a>
              </li>
              <li>
                <div className="text-gray-600 flex items-start">
                  <MapPin className="w-4 h-4 mt-0.5 mr-2" />
                  <span className="text-sm">RT Nagar<br />Bengaluru, India</span>
                </div>
              </li>
            </ul>
            <div className="mt-5">
              <Link to="/contact-us" className="medictrip-button-secondary text-sm">
                24/7 Support
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MedicTrip. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-medictrip-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-medictrip-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-medictrip-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
