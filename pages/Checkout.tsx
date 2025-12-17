import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Banknote, CheckCircle, ArrowLeft } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('UPI');
  const [step, setStep] = useState<'review' | 'success'>('review');

  const totalAmount = cart.reduce((sum, item) => sum + (item.variants[item.selectedVariantIndex].price * item.quantity), 0);

  const handlePlaceOrder = () => {
    placeOrder(paymentMethod, user?.address || 'Default Address');
    setStep('success');
  };

  if (cart.length === 0 && step !== 'success') {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
            <button onClick={() => navigate('/')} className="mt-4 text-primary hover:underline">Go Home</button>
        </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-500 mb-8">Thank you for shopping with FreshMart. Your order will be delivered tomorrow morning.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
         <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
         </button>
         <h1 className="text-xl md:text-2xl font-bold text-gray-800">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Address */}
          <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600"><MapPin size={20} /></div>
                <h3 className="text-lg font-bold text-gray-800">Delivery Address</h3>
             </div>
             <div className="pl-12">
                <h4 className="font-medium text-gray-900">{user?.name || 'Guest User'}</h4>
                <p className="text-gray-500 text-sm mt-1">{user?.address || '123, Green Street, Model Town, New Delhi - 110001'}</p>
                <p className="text-gray-500 text-sm mt-1">Mobile: +91 9876543210</p>
                
                <button className="mt-3 text-primary text-sm font-medium hover:underline">Change Address</button>
             </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-2 rounded-full text-purple-600"><CreditCard size={20} /></div>
                <h3 className="text-lg font-bold text-gray-800">Payment Method</h3>
             </div>
             
             <div className="space-y-3 pl-2">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'UPI' ? 'border-primary bg-green-50/50 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input 
                        type="radio" 
                        name="payment" 
                        className="w-5 h-5 text-primary focus:ring-primary"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                    />
                    <div className="ml-4 flex-1">
                        <span className="font-bold text-gray-800 block">UPI / QR Code</span>
                        <span className="text-xs text-gray-500">Pay using Google Pay, PhonePe, Paytm</span>
                    </div>
                    {paymentMethod === 'UPI' && (
                        <div className="w-16 h-16 bg-white p-1 border rounded">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR" className="w-full h-full object-contain" />
                        </div>
                    )}
                </label>

                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-primary bg-green-50/50 ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input 
                        type="radio" 
                        name="payment" 
                        className="w-5 h-5 text-primary focus:ring-primary"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                    />
                    <div className="ml-4 flex-1">
                        <span className="font-bold text-gray-800 block">Cash on Delivery</span>
                        <span className="text-xs text-gray-500">Pay cash at your doorstep</span>
                    </div>
                    <Banknote className="text-gray-400" />
                </label>
             </div>
          </section>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-1">
           <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                 {cart.map(item => (
                    <div key={`${item.id}-${item.selectedVariantIndex}`} className="flex justify-between text-sm">
                       <span className="text-gray-600 truncate flex-1 pr-2">
                           {item.quantity} x {item.name} <span className="text-xs text-gray-400">({item.variants[item.selectedVariantIndex].weight})</span>
                       </span>
                       <span className="font-medium text-gray-900">₹{item.variants[item.selectedVariantIndex].price * item.quantity}</span>
                    </div>
                 ))}
              </div>

              <div className="border-t border-dashed border-gray-200 my-4 pt-4 space-y-2">
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Item Total</span>
                    <span className="font-medium">₹{totalAmount}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Delivery Charges</span>
                    <span className="text-green-600 font-medium">Free</span>
                 </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
                 <span className="text-base font-bold text-gray-800">Total Payable</span>
                 <span className="text-xl font-bold text-primary">₹{totalAmount}</span>
              </div>

              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30"
              >
                Place Order
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
