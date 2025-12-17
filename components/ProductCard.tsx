import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart, updateQuantity } = useStore();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  const selectedVariant = product.variants[selectedVariantIdx];
  
  // Find if item is in cart
  const cartItem = cart.find(
    item => item.id === product.id && item.selectedVariantIndex === selectedVariantIdx
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page if clicked on btn
    addToCart(product, selectedVariantIdx, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) updateQuantity(product.id, selectedVariantIdx, cartItem.quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) updateQuantity(product.id, selectedVariantIdx, cartItem.quantity - 1);
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVariantIdx(Number(e.target.value));
  };

  return (
    <Link to={`/product/${product.id}`} className="block group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden h-full flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-gray-800 text-sm md:text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Variant Selector */}
        {product.variants.length > 1 ? (
          <div className="mb-2" onClick={(e) => e.preventDefault()}>
            <select 
              value={selectedVariantIdx}
              onChange={handleVariantChange}
              className="text-xs border border-gray-200 rounded px-1 py-1 w-full text-gray-600 focus:outline-none focus:border-primary bg-white cursor-pointer"
            >
              {product.variants.map((v, idx) => (
                <option key={idx} value={idx}>{v.weight} - ₹{v.price}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="text-xs text-gray-500 mb-2">{selectedVariant.weight}</div>
        )}

        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-gray-900">₹{selectedVariant.price}</span>
              <span className="text-xs text-gray-400 line-through">₹{selectedVariant.mrp}</span>
            </div>
            <div className="text-[10px] text-primary font-medium">
              You Save ₹{selectedVariant.mrp - selectedVariant.price}
            </div>
          </div>
          
          {/* Add to Cart Button Logic */}
          <div onClick={(e) => e.preventDefault()}>
            {cartItem ? (
              <div className="flex items-center bg-primary text-white rounded-md overflow-hidden shadow-sm h-8">
                <button onClick={handleDecrement} className="px-2 hover:bg-primary-dark transition-colors">-</button>
                <span className="text-xs font-medium px-1 min-w-[20px] text-center">{cartItem.quantity}</span>
                <button onClick={handleIncrement} className="px-2 hover:bg-primary-dark transition-colors">+</button>
              </div>
            ) : (
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="bg-white text-primary border border-primary px-4 py-1.5 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
