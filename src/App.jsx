import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppProvider';
import { AuthProvider } from './context/AuthProvider';
import { OrderProvider } from './context/OrderProvider';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import HistoryPage from './pages/HistoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Chatbot from './components/Chatbot';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setCurrentPage('home');
        setSelectedProductId(null);
      } else if (path.startsWith('/product/')) {
        const productId = path.split('/product/')[1];
        setCurrentPage('product-detail');
        setSelectedProductId(productId);
      } else if (path === '/courses') {
        setCurrentPage('courses');
        setSelectedProductId(null);
      } else if (path === '/favorites') {
        setCurrentPage('favorites');
        setSelectedProductId(null);
      } else if (path === '/cart') {
        setCurrentPage('cart');
        setSelectedProductId(null);
      } else if (path === '/history') {
        setCurrentPage('history');
        setSelectedProductId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Check initial URL
    handlePopState();

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = (page, productId = null) => {
    setCurrentPage(page);
    
    // Update URL based on navigation
    let newUrl = '/';
    if (page === 'product-detail' && productId) {
      setSelectedProductId(productId);
      newUrl = `/product/${productId}`;
    } else if (page === 'courses') {
      setSelectedProductId(null);
      newUrl = '/courses';
    } else if (page === 'favorites') {
      setSelectedProductId(null);
      newUrl = '/favorites';
    } else if (page === 'cart') {
      setSelectedProductId(null);
      newUrl = '/cart';
    } else if (page === 'history') {
      setSelectedProductId(null);
      newUrl = '/history';
    } else {
      setSelectedProductId(null);
      newUrl = '/';
    }
    
    // Update browser URL without page reload
    window.history.pushState({ page, productId }, '', newUrl);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage 
          showSuggestions={showSuggestions} 
          onSuggestionsShown={() => setShowSuggestions(false)}
          onNavigate={handleNavigate}
        />;
      case 'courses':
        return <CoursesPage onNavigate={handleNavigate} />;
      case 'favorites':
        return <FavoritesPage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage />;
      case 'history':
        return <HistoryPage />;
      case 'product-detail':
        return <ProductDetailPage 
          productId={selectedProductId} 
          onNavigate={handleNavigate}
        />;
      default:
        return <HomePage 
          showSuggestions={showSuggestions} 
          onSuggestionsShown={() => setShowSuggestions(false)}
          onNavigate={handleNavigate}
        />;
    }
  };

  return (
    <AppProvider>
      <AuthProvider>
        <OrderProvider>
          <div className="min-h-screen bg-gray-50">
            <Header onNavigate={handleNavigate} currentPage={currentPage} />
            <main>
              {renderPage()}
            </main>
            <Chatbot onNavigate={handleNavigate} />
            
            {/* React Hot Toast */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#fff',
                  color: '#363636',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </OrderProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
