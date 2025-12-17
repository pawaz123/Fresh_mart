import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, isCartOpen, toggleCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const totalAmount = cart.reduce((sum, item) => sum + (item.variants[item.selectedVariantIndex].price * item.quantity), 0);
  const totalSavings = cart.reduce((sum, item) => sum + ((item.variants[item.selectedVariantIndex].mrp - item.variants[item.selectedVariantIndex].price) * item.quantity), 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => toggleCart(false)}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            My Cart ({cart.length})
          </h2>
          <button onClick={() => toggleCart(false)} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                <ShoppingBag size={48} />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">Your cart is empty</h3>
              <p className="text-gray-500 text-sm mb-6">Start adding items from our wide range of products</p>
              <button 
                onClick={() => { toggleCart(false); navigate('/products'); }}
                className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => {
                const variant = item.variants[item.selectedVariantIndex];
                return (
                <div key={`${item.id}-${item.selectedVariantIndex}`} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 p-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                            <button onClick={() => updateQuantity(item.id, item.selectedVariantIndex, 0)} className="text-gray-400 hover:text-red-500">
                                <X size={16} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{variant.weight}</p>
                        
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-sm font-bold">₹{variant.price}</span>
                                <span className="text-xs text-gray-400 line-through ml-1">₹{variant.mrp}</span>
                            </div>
                            
                            <div className="flex items-center bg-gray-100 rounded text-sm">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.selectedVariantIndex, item.quantity - 1)}
                                    className="px-2 py-1 hover:bg-gray-200 rounded-l transition-colors text-gray-600"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="px-2 font-medium w-8 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.selectedVariantIndex, item.quantity + 1)}
                                    className="px-2 py-1 hover:bg-gray-200 rounded-r transition-colors text-gray-600"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )})
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-gray-100">
             {totalSavings > 0 && (
                 <div className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded mb-3 text-center border border-green-100">
                     Yay! You saved ₹{totalSavings} on this order
                 </div>
             )}
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-gray-900">₹{totalAmount}</span>
            </div>
            
            <button 
                onClick={() => { toggleCart(false); navigate('/checkout'); }}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
                Proceed to Checkout
                <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
