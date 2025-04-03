
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism shadow-subtle py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-apple duration-300 hover:opacity-80"
          >
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-accent">ShopFusion</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/category/clothing" className="font-medium hover:text-brand-blue transition-apple duration-300">Clothing</Link>
            <Link to="/category/electronics" className="font-medium hover:text-brand-blue transition-apple duration-300">Electronics</Link>
          </nav>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex relative w-1/3 mx-4"
          >
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-apple"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brand-blue transition-apple"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 transition-apple"
              aria-label="Wishlist"
            >
              <Heart size={20} className="text-gray-700 hover:text-brand-blue transition-apple" />
            </Button>
            
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 transition-apple"
                  aria-label="Account"
                >
                  <User size={20} className="text-gray-700 hover:text-brand-blue transition-apple" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 transition-apple"
                  aria-label="Logout"
                  onClick={handleSignOut}
                >
                  <LogOut size={20} className="text-gray-700 hover:text-brand-blue transition-apple" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button
                  variant="outline"
                  className="rounded-full hover:bg-gray-100 transition-apple"
                >
                  Login
                </Button>
              </Link>
            )}
            
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 transition-apple relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} className="text-gray-700 hover:text-brand-blue transition-apple" />
                <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-fade-in">
                  0
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-slide-down">
            <form 
              onSubmit={handleSearchSubmit}
              className="relative mb-4"
            >
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-apple"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brand-blue transition-apple"
              >
                <Search size={18} />
              </button>
            </form>
            
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/category/clothing" 
                className="py-2 font-medium hover:text-brand-blue transition-apple"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Clothing
              </Link>
              <Link 
                to="/category/electronics" 
                className="py-2 font-medium hover:text-brand-blue transition-apple"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Electronics
              </Link>
              
              {user ? (
                <button 
                  className="py-2 font-medium hover:text-brand-blue transition-apple text-left flex items-center"
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut size={20} className="mr-2" />
                  Logout
                </button>
              ) : (
                <Link 
                  to="/auth" 
                  className="py-2 font-medium hover:text-brand-blue transition-apple"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login / Sign Up
                </Link>
              )}
            </nav>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <Link 
                to="/wishlist" 
                className="flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart size={20} className="text-gray-700" />
                <span>Wishlist</span>
              </Link>
              
              <Link 
                to="/account" 
                className="flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} className="text-gray-700" />
                <span>Account</span>
              </Link>
              
              <Link 
                to="/cart" 
                className="flex items-center space-x-2 relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart size={20} className="text-gray-700" />
                <span>Cart</span>
                <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
