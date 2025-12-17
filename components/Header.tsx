import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Search, MapPin, User, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { cart, searchQuery, setSearchQuery, toggleCart, user } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Bar (Location) */}
      <div className="bg-primary-dark text-white text-xs py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span>Deliver to: <strong>110001, New Delhi</strong></span>
        </div>
        <div className="hidden md:block">
          <span>Free delivery on orders over ₹499</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary flex-shrink-0">
            Fresh<span className="text-dark">Mart</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for vegetables, fruits, milk..."
              className="w-full pl-4 pr-12 py-2.5 rounded-l-lg border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50 text-gray-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-primary text-white px-6 py-2.5 rounded-r-lg hover:bg-primary-dark transition-colors"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to={user ? "/profile" : "/login"} className="hidden md:flex flex-col items-center text-gray-600 hover:text-primary">
              <User size={24} />
              <span className="text-xs font-medium mt-0.5">{user ? 'Account' : 'Login'}</span>
            </Link>
            
            <button 
              onClick={() => toggleCart(true)} 
              className="flex flex-col items-center text-gray-600 hover:text-primary relative"
            >
              <div className="relative">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:block text-xs font-medium mt-0.5">My Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="mt-3 md:hidden flex relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary bg-gray-50 text-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <nav className="flex flex-col">
             <Link to="/" className="px-4 py-3 text-gray-700 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
             <Link to="/products" className="px-4 py-3 text-gray-700 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
             <Link to={user ? "/profile" : "/login"} className="px-4 py-3 text-gray-700 hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
               {user ? 'My Profile' : 'Login / Register'}
             </Link>
             {user?.isAdmin && (
               <Link to="/admin" className="px-4 py-3 text-primary font-medium hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
             )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;