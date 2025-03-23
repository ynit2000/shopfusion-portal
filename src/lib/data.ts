
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  stock: number;
  specifications?: Record<string, string>;
}

export interface Banner {
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

// Hero banners
export const heroBanners: Banner[] = [
  {
    id: "banner-clothing",
    title: "Summer Fashion Collection",
    subtitle: "Refresh Your Wardrobe",
    description: "Discover our latest summer styles with up to 40% off. Limited time offer.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    category: "Clothing",
    ctaText: "Shop Now",
    ctaLink: "/category/clothing",
    color: "#4158D0"
  },
  {
    id: "banner-electronics",
    title: "Tech Gadgets & Accessories",
    subtitle: "Elevate Your Digital Life",
    description: "The latest electronics with exclusive deals starting at just $99.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    category: "Electronics",
    ctaText: "Explore Deals",
    ctaLink: "/category/electronics",
    color: "#3A1C71"
  }
];

// Products data
export const products: Product[] = [
  // Clothing products
  {
    id: "cl-1001",
    title: "Classic Cotton T-Shirt",
    description: "A timeless classic, this pure cotton t-shirt features a comfortable fit and soft fabric that's perfect for everyday wear. Available in multiple colors.",
    price: 24.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    ],
    category: "Clothing",
    subcategory: "T-shirts",
    rating: 4.5,
    reviews: 128,
    discount: 16,
    stock: 150,
    isFeatured: true,
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Regular",
      "Care": "Machine wash cold",
    }
  },
  {
    id: "cl-1002",
    title: "Slim Fit Jeans",
    description: "These slim fit jeans combine style and comfort with a touch of stretch for easy movement. Perfect for casual outings or dress-down Fridays.",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1604176424472-44aff4a696c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    images: [
      "https://images.unsplash.com/photo-1604176424472-44aff4a696c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    ],
    category: "Clothing",
    subcategory: "Jeans",
    rating: 4.3,
    reviews: 89,
    discount: 25,
    stock: 75,
    specifications: {
      "Material": "98% Cotton, 2% Elastane",
      "Fit": "Slim",
      "Rise": "Mid-rise",
    }
  },
  {
    id: "cl-1003",
    title: "Casual Button-Down Shirt",
    description: "A versatile button-down shirt made from breathable fabric. Features a modern cut and subtle pattern that pairs well with jeans or chinos.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1594938298603-c9148ed2cdca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Clothing",
    subcategory: "Shirts",
    rating: 4.7,
    reviews: 54,
    isNew: true,
    stock: 60,
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Regular",
      "Collar": "Button-down",
    }
  },
  {
    id: "cl-1004",
    title: "Athletic Performance Jacket",
    description: "Stay comfortable and dry during your workouts with this lightweight performance jacket featuring moisture-wicking technology and breathable panels.",
    price: 89.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80",
    category: "Clothing",
    subcategory: "Activewear",
    rating: 4.8,
    reviews: 76,
    discount: 18,
    stock: 45,
    specifications: {
      "Material": "88% Polyester, 12% Elastane",
      "Features": "Moisture-wicking, Quick-dry",
      "Pockets": "Zippered side pockets",
    }
  },
  {
    id: "cl-1005",
    title: "Wool Blend Overcoat",
    description: "Elevate your winter wardrobe with this sophisticated wool blend overcoat. Features a tailored fit and timeless design for versatile styling.",
    price: 179.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "Clothing",
    subcategory: "Outerwear",
    rating: 4.9,
    reviews: 42,
    discount: 21,
    isFeatured: true,
    stock: 30,
    specifications: {
      "Material": "70% Wool, 30% Polyester",
      "Lining": "100% Polyester",
      "Closure": "Button front",
    }
  },
  {
    id: "cl-1006",
    title: "Printed Summer Dress",
    description: "A lightweight, flowy summer dress with a vibrant print. Perfect for warm days and features an adjustable waist tie for a flattering silhouette.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80",
    category: "Clothing",
    subcategory: "Dresses",
    rating: 4.6,
    reviews: 63,
    isNew: true,
    stock: 40,
    specifications: {
      "Material": "100% Viscose",
      "Length": "Midi",
      "Pattern": "Floral print",
    }
  },

  // Electronics products
  {
    id: "el-2001",
    title: "Wireless Noise-Cancelling Headphones",
    description: "Experience immersive sound with these premium wireless headphones featuring active noise cancellation, long battery life, and comfortable over-ear design.",
    price: 249.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    ],
    category: "Electronics",
    subcategory: "Audio",
    rating: 4.8,
    reviews: 215,
    discount: 16,
    isFeatured: true,
    stock: 60,
    specifications: {
      "Battery Life": "Up to 30 hours",
      "Connectivity": "Bluetooth 5.0, 3.5mm jack",
      "Features": "Active Noise Cancellation, Voice Assistant Support",
    }
  },
  {
    id: "el-2002",
    title: "4K Smart TV 55-inch",
    description: "Transform your home entertainment with this 55-inch 4K Smart TV featuring HDR, streaming apps, voice control, and stunning picture quality.",
    price: 699.99,
    originalPrice: 849.99,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
    category: "Electronics",
    subcategory: "TVs",
    rating: 4.7,
    reviews: 178,
    discount: 17,
    stock: 25,
    specifications: {
      "Resolution": "4K UHD (3840 x 2160)",
      "Display": "LED",
      "Smart Features": "Built-in Wi-Fi, Voice Control, App Store",
    }
  },
  {
    id: "el-2003",
    title: "Smartphone Pro Max",
    description: "The latest flagship smartphone with advanced camera system, powerful processor, all-day battery life, and stunning OLED display.",
    price: 1099.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80",
    category: "Electronics",
    subcategory: "Smartphones",
    rating: 4.9,
    reviews: 324,
    isNew: true,
    isFeatured: true,
    stock: 50,
    specifications: {
      "Display": "6.7-inch OLED",
      "Camera": "Triple camera system (12MP + 12MP + 12MP)",
      "Storage": "256GB",
      "Processor": "A15 Bionic chip",
    }
  },
  {
    id: "el-2004",
    title: "Ultra-Portable Laptop",
    description: "Thin, light, and powerful laptop perfect for work and entertainment on the go. Features all-day battery life and a vibrant display.",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    category: "Electronics",
    subcategory: "Laptops",
    rating: 4.7,
    reviews: 203,
    discount: 13,
    stock: 40,
    specifications: {
      "Processor": "Intel Core i7, 11th Gen",
      "Memory": "16GB RAM",
      "Storage": "512GB SSD",
      "Display": "13.3-inch Retina display",
    }
  },
  {
    id: "el-2005",
    title: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound quality, virtual assistant integration, and smart home control capabilities.",
    price: 129.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "Electronics",
    subcategory: "Smart Home",
    rating: 4.6,
    reviews: 156,
    discount: 13,
    stock: 65,
    specifications: {
      "Connectivity": "Wi-Fi, Bluetooth",
      "Compatibility": "Works with Alexa, Google Assistant",
      "Audio": "360° omnidirectional sound",
    }
  },
  {
    id: "el-2006",
    title: "Fitness Smartwatch",
    description: "Track your workouts, monitor your health, and stay connected with this advanced fitness smartwatch featuring GPS, heart rate monitor, and water resistance.",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    category: "Electronics",
    subcategory: "Wearables",
    rating: 4.5,
    reviews: 142,
    isNew: true,
    stock: 55,
    specifications: {
      "Battery Life": "Up to 7 days",
      "Water Resistance": "50m water resistant",
      "Sensors": "Heart rate, GPS, Accelerometer, Barometer",
    }
  },
];

// Filter products by category
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

// Filter products by featured
export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

// Filter products by new arrivals
export const getNewArrivals = () => {
  return products.filter(product => product.isNew);
};

// Get products with discounts
export const getDiscountedProducts = () => {
  return products.filter(product => product.discount && product.discount > 0);
};

// Get product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};
