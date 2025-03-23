
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  ctaText: string;
  ctaLink: string;
  color: string;
}

interface HeroCarouselProps {
  banners: Banner[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (autoplayPaused) return;
    
    const intervalId = setInterval(() => {
      goToNext();
    }, 7000);
    
    return () => clearInterval(intervalId);
  }, [currentIndex, autoplayPaused]);

  const goToNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const currentBanner = banners[currentIndex];

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplayPaused(true);
  const handleMouseLeave = () => setAutoplayPaused(false);

  return (
    <div 
      className="relative h-[500px] md:h-[600px] w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Banner */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isTransitioning ? "opacity-80" : "opacity-100"
        )}
        style={{ backgroundColor: currentBanner.color }}
      >
        <div className="container mx-auto h-full px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center h-full">
            {/* Content */}
            <div className="w-full md:w-1/2 pt-20 md:pt-0 text-center md:text-left animate-slide-up z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                {currentBanner.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {currentBanner.title}
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-white/90 mb-2">
                {currentBanner.subtitle}
              </h2>
              <p className="text-white/80 mb-8 max-w-md">
                {currentBanner.description}
              </p>
              <Link to={currentBanner.ctaLink}>
                <Button className="group bg-white text-gray-800 hover:bg-gray-100 py-6 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <span>{currentBanner.ctaText}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            
            {/* Image */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center relative">
              <img
                src={currentBanner.image}
                alt={currentBanner.title}
                className="w-full h-full object-contain object-center max-h-[400px] animate-float z-10"
              />
              
              {/* Decorative circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-white/10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 shadow-lg backdrop-blur-sm transition-all z-20"
        aria-label="Previous banner"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 shadow-lg backdrop-blur-sm transition-all z-20"
        aria-label="Next banner"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-8 bg-white"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
