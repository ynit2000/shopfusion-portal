import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedSection from '@/components/FeaturedSection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Check, 
  ChevronRight,
  Star
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getProductById, getProductsByCategory, Product } from '@/lib/data';
import { formatInr } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(getProductById(id || ''));
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setIsLoading(true);
    const foundProduct = getProductById(id || '');
    setProduct(foundProduct);
    
    if (foundProduct) {
      const related = getProductsByCategory(foundProduct.category)
        .filter(p => p.id !== foundProduct.id)
        .slice(0, 8);
      setRelatedProducts(related);
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 animate-pulse">
              <div className="w-full md:w-1/2 bg-gray-100 rounded-lg h-[500px]"></div>
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-6 bg-gray-100 w-1/4 rounded"></div>
                <div className="h-10 bg-gray-100 w-3/4 rounded"></div>
                <div className="h-6 bg-gray-100 w-1/2 rounded"></div>
                <div className="h-20 bg-gray-100 w-full rounded"></div>
                <div className="h-12 bg-gray-100 w-full rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-12">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const productImages = product.images || [product.image];
  
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.title} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.title} has been added to your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-brand-blue transition-colors">
              {product.category}
            </Link>
            <ChevronRight size={14} />
            {product.subcategory && (
              <>
                <Link 
                  to={`/category/${product.category.toLowerCase()}?subcategory=${product.subcategory.toLowerCase()}`} 
                  className="hover:text-brand-blue transition-colors"
                >
                  {product.subcategory}
                </Link>
                <ChevronRight size={14} />
              </>
            )}
            <span className="truncate max-w-[200px]">{product.title}</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-full md:w-1/2">
              <div className="sticky top-24 space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-white border">
                  <img 
                    src={productImages[currentImageIndex]} 
                    alt={product.title}
                    className="w-full h-full object-contain p-4 animate-fade-in"
                  />
                </div>
                
                {productImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-20 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                          index === currentImageIndex ? 'border-brand-blue' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${product.title} - view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                {product.isNew && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full mb-2">
                    New Arrival
                  </span>
                )}
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
                
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`fill-current ${
                          i < product.rating ? 'text-amber-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl font-bold">
                    {formatInr(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatInr(product.originalPrice)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="flex items-center text-green-600 text-sm mt-2">
                  <Check size={16} className="mr-1" />
                  <span>In stock</span>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0 && val <= product.stock) {
                        setQuantity(val);
                      }
                    }}
                    className="w-16 h-10 border-y border-gray-300 text-center"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button 
                  size="lg" 
                  className="flex-grow flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center justify-center gap-2"
                  onClick={handleAddToWishlist}
                >
                  <Heart size={20} />
                  <span className="sm:hidden md:inline">Wishlist</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center justify-center gap-2"
                >
                  <Share2 size={20} />
                  <span className="sm:hidden md:inline">Share</span>
                </Button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Free Delivery</h4>
                    <p className="text-sm text-gray-600">
                      On orders over ₹4,000. Otherwise ₹500.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Secure Payments</h4>
                    <p className="text-sm text-gray-600">
                      We support multiple payment methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <div className="flex border-b">
              <button 
                className={`px-6 py-3 font-medium ${
                  activeTab === 'description' 
                    ? 'border-b-2 border-brand-blue text-brand-blue' 
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`px-6 py-3 font-medium ${
                  activeTab === 'specifications' 
                    ? 'border-b-2 border-brand-blue text-brand-blue' 
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button 
                className={`px-6 py-3 font-medium ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-brand-blue text-brand-blue' 
                    : 'text-gray-600'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews})
              </button>
            </div>
            
            <div className="py-6">
              {activeTab === 'description' && (
                <div className="animate-fade-in">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, 
                    nisi nisl aliquam nunc, eget tincidunt nisl nisl eget nisl. Sed euismod, urna eu tincidunt consectetur, 
                    nisi nisl aliquam nunc, eget tincidunt nisl nisl eget nisl.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget tincidunt nisl nisl eget nisl. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt consectetur, 
                    nisi nisl aliquam nunc, eget tincidunt nisl nisl eget nisl.
                  </p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="animate-fade-in">
                  {product.specifications ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="border-b pb-3">
                          <span className="font-medium">{key}: </span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No specifications available for this product.</p>
                  )}
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="animate-fade-in">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gray-100 w-20 h-20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{product.rating.toFixed(1)}</div>
                        <div className="flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={`fill-current ${
                                i < product.rating ? 'text-amber-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">{product.reviews} reviews</div>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-xs font-medium w-8">{star} star</span>
                            <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-amber-400" 
                                style={{ 
                                  width: `${Math.random() * 100}%` 
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {Math.floor(Math.random() * product.reviews)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Button>Write a Review</Button>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="font-medium text-gray-600">
                              {String.fromCharCode(65 + i)}
                            </span>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">Customer {i + 1}</h4>
                              <span className="text-xs text-gray-500">
                                {new Date(Date.now() - (i + 1) * 86400000).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex mb-2">
                              {[...Array(5)].map((_, j) => (
                                <Star
                                  key={j}
                                  size={14}
                                  className={`fill-current ${
                                    j < 5 - i ? 'text-amber-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600 text-sm">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
                              urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget tincidunt nisl nisl eget nisl.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {relatedProducts.length > 0 && (
            <FeaturedSection
              title="Related Products"
              subtitle="You might also like"
              products={relatedProducts}
              viewAllLink={`/category/${product.category.toLowerCase()}`}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;

