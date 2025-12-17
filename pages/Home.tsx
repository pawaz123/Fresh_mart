import React from 'react';
import { CATEGORIES, HERO_SLIDES } from '../constants';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { products } = useStore();

  // Filter products for sections
  const bestDeals = products.filter(p => p.discount >= 20);
  const dailyEssentials = products.filter(p => ['vegetables', 'dairy'].includes(p.category.toLowerCase()) || p.category === 'Vegetables' || p.category === 'Dairy & Bakery');
  const snacks = products.filter(p => p.category === 'Snacks');

  return (
    <div className="space-y-8 pb-10">
      
      {/* Hero Banner Slider */}
      <div className="relative overflow-hidden bg-gray-100 md:h-[300px] h-[200px]">
        <div className="flex transition-transform duration-500 h-full">
          {HERO_SLIDES.map((slide) => (
            <div key={slide.id} className="min-w-full h-full relative">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="container mx-auto px-6 md:px-12">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{slide.title}</h2>
                  <p className="text-xl md:text-2xl text-yellow-300 font-medium mb-6">{slide.subtitle}</p>
                  <Link to="/products" className="bg-white text-primary px-6 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        
        {/* Categories Grid */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link to={`/products?category=${cat.id}`} key={cat.id} className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all group border border-gray-100">
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-700 text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Best Deals Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Best Deals</h2>
            <Link to="/products" className="text-primary font-medium flex items-center text-sm hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bestDeals.slice(0, 5).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Promotional Banner */}
        <div className="rounded-xl overflow-hidden mb-10 shadow-sm">
          <img 
            src="https://images.unsplash.com/photo-1573246123716-6b278e40e6e0?q=80&w=2670&auto=format&fit=crop" 
            alt="Fresh Fruits Banner" 
            className="w-full h-40 md:h-60 object-cover"
          />
        </div>

        {/* Daily Essentials */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Daily Essentials</h2>
            <Link to="/products" className="text-primary font-medium flex items-center text-sm hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4">
            {dailyEssentials.map(product => (
              <div key={product.id} className="min-w-[160px] md:min-w-[220px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
        
        {/* Snacks */}
        <section>
           <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Snack Corner</h2>
            <Link to="/products" className="text-primary font-medium flex items-center text-sm hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
             {snacks.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
