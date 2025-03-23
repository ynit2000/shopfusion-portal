
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import FeaturedSection from '@/components/FeaturedSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { heroBanners, getFeaturedProducts, getNewArrivals, getDiscountedProducts } from '@/lib/data';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Get products for each section
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const discountedProducts = getDiscountedProducts();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-accent animate-pulse">
            ShopFusion
          </span>
          <div className="mt-4 w-12 h-12 rounded-full border-4 border-brand-blue border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Carousel */}
      <main className="flex-grow mt-16">
        <HeroCarousel banners={heroBanners} />
        
        {/* Categories Grid Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Shop by Category</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Link 
                to="/category/clothing" 
                className="relative rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-square bg-[#E0F2FE] flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Clothing" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">Clothing</h3>
                      <p className="text-sm text-white/80">Latest styles</p>
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/category/electronics" 
                className="relative rounded-lg overflow-hidden group shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-square bg-[#EDE9FE] flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" 
                    alt="Electronics" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">Electronics</h3>
                      <p className="text-sm text-white/80">Smart devices</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <FeaturedSection
          title="Featured Products"
          subtitle="Handpicked just for you"
          products={featuredProducts}
          viewAllLink="/featured"
        />
        
        {/* New Arrivals */}
        <FeaturedSection
          title="New Arrivals"
          subtitle="Just landed in our store"
          products={newArrivals}
          viewAllLink="/new-arrivals"
          className="bg-gray-50"
        />
        
        {/* Deals & Discounts */}
        <FeaturedSection
          title="Special Offers"
          subtitle="Limited time deals you don't want to miss"
          products={discountedProducts}
          viewAllLink="/sale"
        />
        
        {/* Info Banners */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Clothing Banner */}
              <div className="relative rounded-xl overflow-hidden shadow-sm h-[300px]">
                <img 
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" 
                  alt="Clothing Sale" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                  <div className="p-8 text-white max-w-md animate-fade-in">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                      Limited Time
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Summer Fashion Sale</h3>
                    <p className="mb-6 text-white/80">
                      Up to 40% off on selected summer styles. Refresh your wardrobe today!
                    </p>
                    <Link to="/category/clothing">
                      <Button className="bg-white text-gray-800 hover:bg-gray-100">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Electronics Banner */}
              <div className="relative rounded-xl overflow-hidden shadow-sm h-[300px]">
                <img 
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80" 
                  alt="Electronics Sale" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
                  <div className="p-8 text-white max-w-md animate-fade-in">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                      New Tech
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">Smart Tech Gadgets</h3>
                    <p className="mb-6 text-white/80">
                      Discover the latest electronics with exclusive deals starting at just $99.
                    </p>
                    <Link to="/category/electronics">
                      <Button className="bg-white text-gray-800 hover:bg-gray-100">
                        Explore Deals
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Join Our Newsletter</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter and be the first to receive updates about new products, special offers, and exclusive discounts.
            </p>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <Button className="bg-white text-brand-blue hover:bg-white/90 px-6 whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
