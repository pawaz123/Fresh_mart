import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-10 pb-6 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Fresh<span className="text-dark">Mart</span></h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your daily online grocery store. We deliver fresh fruits, vegetables, dairy, and household essentials directly to your doorstep.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary">Fruits & Vegetables</a></li>
              <li><a href="#" className="hover:text-primary">Dairy & Bakery</a></li>
              <li><a href="#" className="hover:text-primary">Staples</a></li>
              <li><a href="#" className="hover:text-primary">Snacks & Beverages</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123, Fresh Street, Bangalore, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@freshmart.com</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"><Facebook size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"><Twitter size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"><Instagram size={16} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} FreshMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
