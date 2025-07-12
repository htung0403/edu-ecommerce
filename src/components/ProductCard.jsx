import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye, BookOpen, Users, Clock } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/toast';
import LoginModal from './LoginModal';

const ProductCard = ({ product, onViewDetail, onNavigate }) => {
  const { isFavorite, addToFavorites, removeFromFavorites, addToCart, isInCart, addToViewHistory } = useApp();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isProductFavorite = isFavorite(product.id);
  const isProductInCart = isInCart(product.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      showToast.requireLogin();
      setShowLoginModal(true);
    } else if (!isProductInCart) {
      addToCart(product);
    }
  };

  const handleViewDetail = () => {
    addToViewHistory(product);
    if (onNavigate) {
      onNavigate('product-detail', product.id);
    } else if (onViewDetail) {
      onViewDetail(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <div className="relative" onClick={handleViewDetail}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isProductFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart size={16} fill={isProductFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            -{product.discount}%
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
            {product.category}
          </span>
          <span className="text-xs text-gray-500">{product.level}</span>
        </div>
        
        <h3
          className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors"
          onClick={handleViewDetail}
        >
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" fill="currentColor" />
            <span>{product.rating || 0}</span>
            <span>({(product.reviews || 0).toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{(product.students || 0).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
          <Clock size={14} />
          <span>{product.duration}</span>
          <span>•</span>
          <BookOpen size={14} />
          <span>{typeof product.instructor === 'string' ? product.instructor : product.instructor?.name || 'Giảng viên'}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-primary-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isProductInCart}
            className={`p-2 rounded-full transition-colors ${
              isProductInCart
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
