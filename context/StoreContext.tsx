import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  searchQuery: string;
  isCartOpen: boolean;
  addToCart: (product: Product, variantIndex: number, quantity: number) => void;
  removeFromCart: (productId: string, variantIndex: number) => void;
  updateQuantity: (productId: string, variantIndex: number, quantity: number) => void;
  clearCart: () => void;
  setSearchQuery: (query: string) => void;
  toggleCart: (isOpen: boolean) => void;
  login: (email: string, name: string) => void;
  logout: () => void;
  placeOrder: (paymentMethod: 'COD' | 'UPI', address: string) => void;
  // Admin functions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Changed to include setProducts for Admin capabilities
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('freshmart_cart');
    const savedUser = localStorage.getItem('freshmart_user');
    const savedOrders = localStorage.getItem('freshmart_orders');
    const savedProducts = localStorage.getItem('freshmart_products');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    // If we have edited products in local storage, load them, otherwise use mock
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('freshmart_cart', JSON.stringify(cart));
    if (user) localStorage.setItem('freshmart_user', JSON.stringify(user));
    localStorage.setItem('freshmart_orders', JSON.stringify(orders));
    localStorage.setItem('freshmart_products', JSON.stringify(products));
  }, [cart, user, orders, products]);

  const addToCart = (product: Product, variantIndex: number, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedVariantIndex === variantIndex);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedVariantIndex === variantIndex)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, selectedVariantIndex: variantIndex, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantIndex: number) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedVariantIndex === variantIndex)));
  };

  const updateQuantity = (productId: string, variantIndex: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantIndex);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.id === productId && item.selectedVariantIndex === variantIndex)
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const toggleCart = (isOpen: boolean) => setIsCartOpen(isOpen);

  const login = (email: string, name: string) => {
    setUser({
      name,
      email,
      address: '123, Green Street, City',
      isAdmin: email === 'admin@freshmart.com'
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('freshmart_user');
  };

  const placeOrder = (paymentMethod: 'COD' | 'UPI', address: string) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.variants[item.selectedVariantIndex].price * item.quantity), 0),
      date: new Date().toISOString(),
      status: 'Pending',
      paymentMethod
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  // Admin Actions
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      user,
      orders,
      searchQuery,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setSearchQuery,
      toggleCart,
      login,
      logout,
      placeOrder,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};