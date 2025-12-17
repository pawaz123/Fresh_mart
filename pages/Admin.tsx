import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Package, TrendingUp, Users, Plus, Edit2, Trash2, X, Save, Image as ImageIcon, ShoppingBag } from 'lucide-react';
import { Product, Variant } from '../types';
import { CATEGORIES } from '../constants';

const Admin: React.FC = () => {
  const { products, orders, addProduct, updateProduct, deleteProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const initialProductState: Product = {
    id: '',
    name: '',
    category: CATEGORIES[0].name,
    image: '',
    description: '',
    discount: 0,
    inStock: true,
    rating: 0,
    reviews: 0,
    variants: [{ weight: '', price: 0, mrp: 0 }]
  };

  const [formData, setFormData] = useState<Product>(initialProductState);

  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsEditing(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setFormData({ ...initialProductState, id: Math.random().toString(36).substr(2, 9) });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(formData);
    } else {
      addProduct(formData);
    }
    setIsEditing(false);
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { weight: '', price: 0, mrp: 0 }]
    });
  };

  const removeVariant = (index: number) => {
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  if (isEditing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <button onClick={() => setIsEditing(false)} className="flex items-center text-gray-500 hover:text-gray-800 mb-6">
          <X size={20} className="mr-2" /> Cancel
        </button>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                   <textarea 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                   />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                      value={formData.discount}
                      onChange={(e) => setFormData({...formData, discount: Number(e.target.value)})}
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-primary rounded focus:ring-primary"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                      />
                      <span className="text-gray-700 font-medium">In Stock</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Image Preview & Variants */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none mb-3"
                    value={formData.image}
                    placeholder="https://..."
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                  />
                  <div className="w-full h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                    {formData.image ? (
                      <img src={formData.image} alt="Preview" className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <ImageIcon size={32} />
                        <span className="text-xs mt-1">Image Preview</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-gray-700">Variants (Size & Price)</label>
                    <button type="button" onClick={addVariant} className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-100 flex items-center gap-1">
                      <Plus size={12} /> Add
                    </button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {formData.variants.map((variant, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input 
                          type="text" placeholder="Weight (e.g. 1kg)" 
                          className="w-1/3 px-2 py-1.5 text-sm border border-gray-300 rounded"
                          value={variant.weight}
                          onChange={(e) => handleVariantChange(idx, 'weight', e.target.value)}
                        />
                        <input 
                          type="number" placeholder="Price" 
                          className="w-1/4 px-2 py-1.5 text-sm border border-gray-300 rounded"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(idx, 'price', Number(e.target.value))}
                        />
                         <input 
                          type="number" placeholder="MRP" 
                          className="w-1/4 px-2 py-1.5 text-sm border border-gray-300 rounded"
                          value={variant.mrp}
                          onChange={(e) => handleVariantChange(idx, 'mrp', Number(e.target.value))}
                        />
                        <button type="button" onClick={() => removeVariant(idx)} className="text-red-400 hover:text-red-600">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                <Save size={18} />
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
         <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Products
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'orders' ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Orders
            </button>
         </div>
      </div>

      {activeTab === 'dashboard' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><TrendingUp size={24} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Total Sales</p>
                    <h3 className="text-2xl font-bold text-gray-900">₹{totalSales}</h3>
                  </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Package size={24} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Total Products</p>
                    <h3 className="text-2xl font-bold text-gray-900">{products.length}</h3>
                  </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><Users size={24} /></div>
                  <div>
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <h3 className="text-2xl font-bold text-gray-900">{orders.length}</h3>
                  </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex justify-between items-center">
             <h2 className="text-lg font-bold text-gray-800">Product Management</h2>
             <button 
                onClick={handleAddClick}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-dark flex items-center gap-2"
             >
                <Plus size={18} /> Add Product
             </button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Image</th>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium">Stock</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                       <td className="px-6 py-3">
                          <img src={product.image} alt="" className="w-10 h-10 object-contain rounded bg-gray-50" />
                       </td>
                       <td className="px-6 py-3 font-medium text-gray-900">{product.name}</td>
                       <td className="px-6 py-3 text-gray-500">{product.category}</td>
                       <td className="px-6 py-3">₹{product.variants[0]?.price}</td>
                       <td className="px-6 py-3">
                         <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                           {product.inStock ? 'In Stock' : 'Out of Stock'}
                         </span>
                       </td>
                       <td className="px-6 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button onClick={() => handleEditClick(product)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                             <button onClick={() => deleteProduct(product.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>
      )}

      {(activeTab === 'orders' || activeTab === 'dashboard') && (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${activeTab === 'dashboard' ? 'mt-0' : ''}`}>
          <div className="p-6 border-b border-gray-100">
             <h2 className="text-lg font-bold text-gray-800">{activeTab === 'dashboard' ? 'Recent Orders' : 'All Orders'}</h2>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="bg-gray-50 text-gray-500">
                 <tr>
                   <th className="px-6 py-4 font-medium">Order ID</th>
                   <th className="px-6 py-4 font-medium">Date</th>
                   <th className="px-6 py-4 font-medium">Customer</th>
                   <th className="px-6 py-4 font-medium">Items</th>
                   <th className="px-6 py-4 font-medium">Total</th>
                   <th className="px-6 py-4 font-medium">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {orders.length > 0 ? orders.map(order => (
                   <tr key={order.id} className="hover:bg-gray-50">
                     <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                     <td className="px-6 py-4 text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                     <td className="px-6 py-4 text-gray-900 font-medium">Guest User</td>
                     <td className="px-6 py-4 text-gray-500">{order.items.length} Items</td>
                     <td className="px-6 py-4 font-bold text-gray-900">₹{order.total}</td>
                     <td className="px-6 py-4">
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                         {order.status}
                       </span>
                     </td>
                   </tr>
                 )) : (
                   <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No orders placed yet.</td>
                   </tr>
                 )}
               </tbody>
             </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;