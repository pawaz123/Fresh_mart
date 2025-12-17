import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { Filter, X, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ProductList: React.FC = () => {
  const { products, searchQuery } = useStore();
  const location = useLocation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'priceLow' | 'priceHigh'>('popularity');

  // Handle query params for category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
        // Map category ID back to name if possible, or simple check
        const categoryObj = CATEGORIES.find(c => c.id === cat);
        if(categoryObj) setSelectedCategories([categoryObj.name]);
    }
  }, [location]);


  const handleCategoryChange = (catName: string) => {
    setSelectedCategories(prev => 
      prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
    );
  };

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(c => product.category.includes(c) || product.category === c);
    const productPrice = product.variants[0].price;
    const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'priceLow') return a.variants[0].price - b.variants[0].price;
    if (sortBy === 'priceHigh') return b.variants[0].price - a.variants[0].price;
    return b.rating - a.rating; // Default popularity (rating)
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Products ({filteredProducts.length})</h1>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm"
          >
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 md:translate-x-0 md:static md:w-64 md:shadow-none md:block ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center md:hidden mb-6">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} /></button>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-3">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-primary checked:bg-primary"
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => handleCategoryChange(cat.name)}
                      />
                      <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" size={10} />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-primary">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-3">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>₹0</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
            
            <button 
                onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 1000]);
                }}
                className="w-full py-2 text-primary border border-primary rounded-lg text-sm hover:bg-primary hover:text-white transition-colors"
            >
                Clear Filters
            </button>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileFilterOpen(false)}></div>
        )}

        {/* Product Grid */}
        <main className="flex-1">
          <div className="hidden md:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
               {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
            </h1>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary bg-white"
              >
                <option value="popularity">Popularity</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" 
                alt="No results" 
                className="w-32 h-32 opacity-20 mb-4"
              />
              <h3 className="text-xl font-medium text-gray-600">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;