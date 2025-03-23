
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
}

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink: string;
  className?: string;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
  className,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Calculate max scroll value when component mounts or window resizes
  useEffect(() => {
    const updateMaxScroll = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.scrollWidth;
        const visibleWidth = scrollContainerRef.current.clientWidth;
        setMaxScroll(containerWidth - visibleWidth);
      }
    };

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, [products]);

  // Update scroll position when scrolling
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Handle scroll buttons
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.max(scrollPosition - 600, 0);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const newPosition = Math.min(scrollPosition + 600, maxScroll);
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          <Link 
            to={viewAllLink} 
            className="flex items-center text-brand-blue mt-4 md:mt-0 group"
          >
            <span>View all</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Products Carousel */}
        <div className="relative">
          {/* Scroll Shadow (left) */}
          {scrollPosition > 20 && (
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          )}
          
          {/* Left Scroll Button */}
          {scrollPosition > 20 && (
            <button
              onClick={scrollLeft}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 hover:bg-gray-50 transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          
          {/* Products Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-5 pb-4 hide-scrollbar snap-x"
            style={{ scrollbarWidth: 'none' }}
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="min-w-[260px] sm:min-w-[280px] flex-shrink-0 snap-start"
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          
          {/* Right Scroll Button */}
          {scrollPosition < maxScroll - 20 && (
            <button
              onClick={scrollRight}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20 hover:bg-gray-50 transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
          
          {/* Scroll Shadow (right) */}
          {scrollPosition < maxScroll - 20 && (
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
