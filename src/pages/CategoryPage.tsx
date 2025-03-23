import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory } from '@/lib/data';
import { formatInr } from '@/lib/utils';
import { 
  Grid, 
  List, 
  Sliders, 
  ChevronDown, 
  ChevronUp,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState(getProductsByCategory(category || ''));
  const [isGridView, setIsGridView] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const subcategories = Array.from(
    new Set(products.map(product => product.subcategory))
  ).filter(Boolean) as string[];

  useEffect(() => {
    setIsLoading(true);
    setProducts(getProductsByCategory(category || ''));
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [category]);

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategory)
        ? prev.filter(item => item !== subcategory)
        : [...prev, subcategory]
    );
  };

  const applyFilters = () => {
    let filteredProducts = getProductsByCategory(category || '');
    
    filteredProducts = filteredProducts.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (selectedSubcategories.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => product.subcategory && selectedSubcategories.includes(product.subcategory)
      );
    }
    
    setProducts(filteredProducts);
  };

  const resetFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedSubcategories([]);
    setProducts(getProductsByCategory(category || ''));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
                  <span>/</span>
                  <span>{capitalizeFirstLetter(category || '')}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{capitalizeFirstLetter(category || '')} </h1>
                <p className="text-gray-600 mt-2">
                  {products.length} products found
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex items-center gap-2 border rounded-md">
                  <button
                    onClick={() => setIsGridView(true)}
                    className={`p-2 ${isGridView ? 'bg-gray-100' : ''}`}
                    aria-label="Grid view"
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setIsGridView(false)}
                    className={`p-2 ${!isGridView ? 'bg-gray-100' : ''}`}
                    aria-label="List view"
                  >
                    <List size={20} />
                  </button>
                </div>
                
                <select className="p-2 border rounded-md bg-white">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                
                <Button 
                  variant="outline" 
                  className="md:hidden flex items-center gap-2"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Sliders size={16} />
                  <span>Filters</span>
                  {filtersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <aside className={`md:block md:w-64 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden'}`}>
              <div className="bg-white border rounded-lg p-4 mb-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-brand-blue hover:underline"
                  >
                    Reset all
                  </button>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range (₹)</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <input 
                      type="number" 
                      className="w-full p-2 border rounded-md text-sm"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
                    />
                    <span>-</span>
                    <input 
                      type="number" 
                      className="w-full p-2 border rounded-md text-sm"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
                    />
                  </div>
                </div>
                
                {subcategories.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Subcategories</h4>
                    <div className="space-y-2">
                      {subcategories.map((subcategory) => (
                        <label 
                          key={subcategory} 
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div 
                            className={`w-5 h-5 flex items-center justify-center rounded border ${
                              selectedSubcategories.includes(subcategory) 
                                ? 'bg-brand-blue border-brand-blue' 
                                : 'border-gray-300'
                            }`}
                            onClick={() => toggleSubcategory(subcategory)}
                          >
                            {selectedSubcategories.includes(subcategory) && (
                              <Check size={14} className="text-white" />
                            )}
                          </div>
                          <span className="text-sm">{subcategory}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={applyFilters}
                  className="w-full"
                >
                  Apply Filters
                </Button>
              </div>
            </aside>
            
            <div className="flex-grow">
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg animate-pulse h-[350px]"></div>
                  ))}
                </div>
              ) : products.length > 0 ? (
                isGridView ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex flex-col sm:flex-row border rounded-lg overflow-hidden hover-lift">
                        <div className="w-full sm:w-48 h-48">
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow p-4">
                          <span className="text-xs text-gray-500">{product.subcategory || product.category}</span>
                          <h3 className="font-medium text-lg mb-2">{product.title}</h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-end gap-2">
                              <span className="font-semibold text-xl">{formatInr(product.price)}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  {formatInr(product.originalPrice)}
                                </span>
                              )}
                            </div>
                            <Link to={`/product/${product.id}`}>
                              <Button>View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or check out our other categories.
                  </p>
                  <Button onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
