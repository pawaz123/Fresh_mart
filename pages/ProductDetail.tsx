import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Star, Truck, ShieldCheck, RefreshCw, ShoppingCart, Lightbulb } from 'lucide-react';
import { getProductCookingTip } from '../services/geminiService';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, cart, updateQuantity } = useStore();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [tip, setTip] = useState<string>("");

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (product) {
        getProductCookingTip(product.name).then(setTip);
    }
  }, [product]);

  if (!product) {
    return <div className="p-8 text-center">Product not found</div>;
  }

  const selectedVariant = product.variants[selectedVariantIdx];
  const cartItem = cart.find(
    item => item.id === product.id && item.selectedVariantIndex === selectedVariantIdx
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image Gallery */}
          <div className="p-8 bg-gray-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            <div className="relative group max-w-sm">
               <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-contain mix-blend-multiply transition-transform group-hover:scale-105 duration-300" 
              />
              {product.discount > 0 && (
                <div className="absolute top-0 left-0 bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-10 flex flex-col h-full">
            <div className="mb-1 text-sm text-gray-500 font-medium tracking-wide uppercase">{product.category}</div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-green-100 px-2 py-0.5 rounded text-primary-dark font-bold text-sm">
                <span className="mr-1">{product.rating}</span> <Star size={12} fill="currentColor" />
              </div>
              <span className="text-sm text-gray-500">{product.reviews} Ratings & Reviews</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
               <span className="text-3xl font-bold text-gray-900">₹{selectedVariant.price}</span>
               <span className="text-lg text-gray-400 line-through mb-1">₹{selectedVariant.mrp}</span>
               <span className="text-primary font-medium mb-1 ml-2">You Save ₹{selectedVariant.mrp - selectedVariant.price}</span>
            </div>

            {/* Variant Selector */}
            <div className="mb-8">
              <span className="block text-sm font-medium text-gray-700 mb-3">Pack Sizes</span>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                      selectedVariantIdx === idx 
                        ? 'border-primary bg-green-50 text-primary' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {variant.weight}
                    <div className="text-xs text-gray-500 mt-0.5">₹{variant.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Tip */}
            {tip && (
                <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 mb-6 flex gap-3 items-start">
                    <Lightbulb className="text-orange-500 shrink-0 mt-0.5" size={18} />
                    <div>
                        <span className="text-xs font-bold text-orange-600 uppercase block mb-0.5">Chef's Tip</span>
                        <p className="text-sm text-gray-700 italic">{tip}</p>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="mt-auto flex gap-4">
              {cartItem ? (
                 <div className="flex items-center bg-primary rounded-lg shadow-sm h-12 w-40">
                    <button 
                        onClick={() => updateQuantity(product.id, selectedVariantIdx, cartItem.quantity - 1)}
                        className="w-12 h-full text-white hover:bg-primary-dark transition-colors text-xl font-medium rounded-l-lg"
                    >-</button>
                    <span className="flex-1 text-center text-white font-bold">{cartItem.quantity}</span>
                    <button 
                        onClick={() => updateQuantity(product.id, selectedVariantIdx, cartItem.quantity + 1)}
                        className="w-12 h-full text-white hover:bg-primary-dark transition-colors text-xl font-medium rounded-r-lg"
                    >+</button>
                 </div>
              ) : (
                <button 
                  onClick={() => addToCart(product, selectedVariantIdx, 1)}
                  disabled={!product.inStock}
                  className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center gap-2 flex-1 md:flex-none justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              )}
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 gap-3 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
               <div className="flex items-center gap-2">
                 <Truck size={18} className="text-gray-400" />
                 Standard Delivery: Tomorrow Morning
               </div>
               <div className="flex items-center gap-2">
                 <ShieldCheck size={18} className="text-gray-400" />
                 Quality Guarantee
               </div>
               <div className="flex items-center gap-2">
                 <RefreshCw size={18} className="text-gray-400" />
                 Easy Returns within 2 days
               </div>
            </div>

            <div className="mt-6">
                <h3 className="font-bold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
