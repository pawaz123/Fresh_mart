import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import GeminiRecipe from './components/GeminiRecipe';

const Login: React.FC = () => {
    const { login } = useStore();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h1>
                <button 
                    onClick={() => login('user@example.com', 'John Doe')}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold mb-3 hover:bg-primary-dark"
                >
                    Login as User
                </button>
                <button 
                    onClick={() => login('admin@freshmart.com', 'Admin User')}
                    className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-900"
                >
                    Login as Admin
                </button>
            </div>
        </div>
    )
}

const ProtectedRoute: React.FC<{ children: React.ReactNode, adminOnly?: boolean }> = ({ children, adminOnly }) => {
    const { user } = useStore();
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
    return <>{children}</>;
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-gray-50/30">
            {children}
        </main>
        <Footer />
        <Cart />
        <GeminiRecipe />
    </div>
);

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/products" element={<Layout><ProductList /></Layout>} />
          <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/profile" element={<ProtectedRoute><Layout><div className="p-10 text-center">Profile Page (Mock)</div></Layout></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Layout><Checkout /></Layout></ProtectedRoute>} />
          
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
                <Layout><Admin /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
