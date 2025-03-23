
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  YouTube, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RefreshCw
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      {/* Trust badges section */}
      <div className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center bg-brand-blue/10 rounded-full mb-4">
              <Truck className="h-6 w-6 text-brand-blue" />
            </div>
            <h3 className="font-medium mb-2">Free Delivery</h3>
            <p className="text-sm text-gray-600">On orders above $50</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center bg-brand-blue/10 rounded-full mb-4">
              <RefreshCw className="h-6 w-6 text-brand-blue" />
            </div>
            <h3 className="font-medium mb-2">Easy Returns</h3>
            <p className="text-sm text-gray-600">30-day return policy</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center bg-brand-blue/10 rounded-full mb-4">
              <CreditCard className="h-6 w-6 text-brand-blue" />
            </div>
            <h3 className="font-medium mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-600">100% secure checkout</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 flex items-center justify-center bg-brand-blue/10 rounded-full mb-4">
              <Shield className="h-6 w-6 text-brand-blue" />
            </div>
            <h3 className="font-medium mb-2">Quality Support</h3>
            <p className="text-sm text-gray-600">Dedicated 24/7 support</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company & About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-accent">ShopFusion</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Experience the future of shopping with ShopFusion, where quality meets innovation. We bring you the best products from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors" aria-label="YouTube">
                <YouTube size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/clothing" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/category/electronics" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/category/home" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-600 hover:text-brand-blue transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Account & Help */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">My Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/account" className="text-gray-600 hover:text-brand-blue transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-600 hover:text-brand-blue transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 hover:text-brand-blue transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-brand-blue transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">
                  123 Shopping Avenue, Fashion District, NY 10001, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-blue mr-3 flex-shrink-0" />
                <span className="text-gray-600">support@shopfusion.com</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-brand-blue flex-grow text-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-brand-blue text-white px-4 py-2 rounded-r-md hover:bg-brand-blue/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Payment methods and copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2023 ShopFusion. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8 w-auto opacity-70" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8 w-auto opacity-70" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-8 w-auto opacity-70" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" className="h-8 w-auto opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
