
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
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
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  originalPrice,
  image,
  category,
  rating,
  isNew = false,
  isFeatured = false,
  discount,
  className,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to wishlist",
      description: `${title} has been added to your wishlist.`,
    });
  };

  return (
    <Link
      to={`/product/${id}`}
      className={cn(
        "group relative flex flex-col rounded-xl bg-white border border-gray-100 overflow-hidden transition-all",
        "hover-lift",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={cn(
            "object-cover w-full h-full transform transition-all duration-500",
            isImageLoaded ? "opacity-100" : "opacity-0 blur-md",
            isHovered ? "scale-105" : "scale-100"
          )}
          onLoad={handleImageLoad}
        />
        
        {/* Product Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full animate-fade-in">
              New
            </span>
          )}
          {discount && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full animate-fade-in">
              {discount}% OFF
            </span>
          )}
        </div>
        
        {/* Quick Action Buttons */}
        <div 
          className={cn(
            "absolute right-3 bottom-3 flex flex-col gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md bg-white hover:bg-brand-blue hover:text-white transition-all"
            onClick={handleAddToWishlist}
            aria-label="Add to wishlist"
          >
            <Heart size={18} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md bg-white hover:bg-brand-blue hover:text-white transition-all"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </Button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col p-4 flex-grow">
        <span className="text-xs text-gray-500 mb-1">{category}</span>
        <h3 className="font-medium text-sm sm:text-base line-clamp-2 mb-1 group-hover:text-brand-blue transition-all">
          {title}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mt-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={cn(
                  "fill-current",
                  i < rating ? "text-amber-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
        </div>
        
        {/* Price */}
        <div className="mt-auto flex items-center">
          <span className="font-semibold text-brand-darkgray">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
