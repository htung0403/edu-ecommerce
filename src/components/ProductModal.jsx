import React from 'react';
import { X, Star, Users, Clock, BookOpen, Heart, ShoppingCart } from 'lucide-react';
import { useApp } from '../hooks/useApp';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { isFavorite, addToFavorites, removeFromFavorites, addToCart, isInCart } = useApp();

  if (!isOpen || !product) return null;

  const isProductFavorite = isFavorite(product.id);
  const isProductInCart = isInCart(product.id);

  const handleFavoriteClick = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    if (!isProductInCart) {
      addToCart(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 md:h-80 object-cover"
            />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                -{product.discount}%
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded">
                    {product.category}
                  </span>
                  <span className="text-sm text-gray-500">{product.level}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h2>
                
                <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" fill="currentColor" />
                    <span className="font-medium">{product.rating}</span>
                    <span>({product.reviews.toLocaleString()} đánh giá)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{product.students.toLocaleString()} học viên</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{product.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={16} className="text-gray-500" />
                  <span className="text-gray-600">Giảng viên: {typeof product.instructor === 'string' ? product.instructor : product.instructor?.name || 'Giảng viên'}</span>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <button
                  onClick={handleFavoriteClick}
                  className={`p-3 rounded-full transition-colors ${
                    isProductFavorite
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <Heart size={20} fill={isProductFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Mô tả khóa học</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Thẻ chủ đề</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isProductInCart}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      isProductInCart
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {isProductInCart ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ'}
                  </button>
                  
                  <button className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
