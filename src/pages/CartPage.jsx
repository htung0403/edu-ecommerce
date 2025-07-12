import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';
import ProductModal from '../components/ProductModal';
import LoginModal from '../components/LoginModal';
import CheckoutModal from '../components/CheckoutModal';
import { useApp } from '../hooks/useApp';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/toast';

const CartPage = () => {
  const { cart, removeFromCart, getCartTotal, clearCart } = useApp();
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleRemoveFromCart = (productId, productName) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      removeFromCart(productId, productName);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    console.log('handleCheckout called, user:', user);
    if (!user) {
      showToast.requireLogin();
      setShowLoginModal(true);
    } else {
      console.log('Setting showCheckoutModal to true');
      setShowCheckoutModal(true);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-primary-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng</h1>
                <p className="text-gray-600">
                  {cart.length} sản phẩm
                </p>
              </div>
            </div>
            
            {cart.length > 0 && (
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
                Xóa tất cả
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-600 mb-6">
              Thêm khóa học vào giỏ hàng để bắt đầu học
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Khám phá khóa học
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Sản phẩm trong giỏ hàng
                  </h2>
                </div>
                
                <div className="divide-y">
                  {cart.map((product) => (
                    <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleViewDetail(product)}
                        />
                        
                        <div className="flex-1">
                          <h3
                            className="font-semibold text-gray-900 mb-1 cursor-pointer hover:text-primary-600 transition-colors"
                            onClick={() => handleViewDetail(product)}
                          >
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
                              {product.category}
                            </span>
                            <span>{product.level}</span>
                            <span>{product.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => handleRemoveFromCart(product.id, product.name)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                          
                          <div className="text-right">
                            <div className="font-semibold text-lg text-primary-600">
                              {formatPrice(product.price)}
                            </div>
                            {product.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm sticky top-24">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Tổng cộng
                  </h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">{formatPrice(getCartTotal())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí xử lý:</span>
                    <span className="font-medium">Miễn phí</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                      <span className="text-2xl font-bold text-primary-600">
                        {formatPrice(getCartTotal())}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <CreditCard size={18} />
                    {user ? 'Thanh toán' : 'Đăng nhập để mua hàng'}
                    <ArrowRight size={18} />
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Bằng cách thanh toán, bạn đồng ý với{' '}
                    <span className="text-primary-600 hover:underline cursor-pointer">
                      điều khoản dịch vụ
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
      
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
      
      {showCheckoutModal && (
        <CheckoutModal
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          onLoginRequired={() => {
            setShowCheckoutModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
};

export default CartPage;
