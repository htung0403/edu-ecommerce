import React, { useState } from 'react';
import { Clock, Search, Filter, Eye, Trash2, ShoppingBag, Package, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useApp } from '../hooks/useApp';
import { useOrder } from '../hooks/useOrder';
import { showToast } from '../utils/toast';

const HistoryPage = () => {
  const { viewHistory, clearViewHistory } = useApp();
  const { orders, deleteOrder, clearAllOrders } = useOrder();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('views'); // 'views' or 'orders'

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'Lập trình', name: 'Lập trình' },
    { id: 'Ngoại ngữ', name: 'Ngoại ngữ' },
    { id: 'Thiết kế', name: 'Thiết kế' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Kỹ năng mềm', name: 'Kỹ năng mềm' }
  ];

  const filteredHistory = viewHistory.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử xem?')) {
      clearViewHistory();
      showToast.clearHistory();
    }
  };

  const handleClearAllOrders = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả đơn hàng? Hành động này không thể hoàn tác.')) {
      clearAllOrders();
    }
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      deleteOrder(orderId);
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Clock className="text-primary-600" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Lịch sử</h1>
                <p className="text-gray-600">
                  {activeTab === 'views' 
                    ? `${viewHistory.length} sản phẩm đã xem`
                    : `${orders.length} đơn hàng`
                  }
                </p>
              </div>
            </div>
            
            {((activeTab === 'views' && viewHistory.length > 0) || 
              (activeTab === 'orders' && orders.length > 0)) && (
              <button
                onClick={activeTab === 'views' ? handleClearHistory : handleClearAllOrders}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
                {activeTab === 'views' ? 'Xóa lịch sử' : 'Xóa tất cả đơn hàng'}
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setActiveTab('views')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'views'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Eye size={16} />
              Lịch sử xem
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingBag size={16} />
              Đơn hàng
            </button>
          </div>

          {/* Search and Filter - Only for views tab */}
          {activeTab === 'views' && viewHistory.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm trong lịch sử..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'views' ? (
          // View History Content
          viewHistory.length === 0 ? (
            <div className="text-center py-16">
              <Clock size={64} className="text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Chưa có lịch sử xem
              </h2>
              <p className="text-gray-600 mb-6">
                Khám phá và xem chi tiết các khóa học để tạo lịch sử
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Khám phá ngay
              </button>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="text-center py-16">
              <Search size={64} className="text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Không tìm thấy kết quả
              </h2>
              <p className="text-gray-600">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Recently Viewed Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredHistory.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetail={handleViewDetail}
                  />
                ))}
              </div>

              {/* History Timeline */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Chi tiết lịch sử
                  </h2>
                </div>
                
                <div className="divide-y">
                  {filteredHistory.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
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
                        
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">
                            {formatDateTime(product.viewedAt)}
                          </div>
                          <div className="font-semibold text-primary-600">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            }).format(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              }).format(product.originalPrice)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        ) : (
          // Order History Content
          orders.length === 0 ? (
            <div className="text-center py-16">
              <Package size={64} className="text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Chưa có đơn hàng nào
              </h2>
              <p className="text-gray-600 mb-6">
                Thêm sản phẩm vào giỏ hàng và thanh toán để tạo đơn hàng đầu tiên
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Khám phá khóa học
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Đơn hàng #{order.orderNumber || order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-primary-600">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                          }).format(order.total)}
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status === 'completed' ? 'Hoàn thành' 
                           : order.status === 'pending' ? 'Đang xử lý'
                           : 'Đã hủy'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa đơn hàng"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Thông tin học viên:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <p><span className="font-medium">Họ tên:</span> {order.customer?.name || order.customerInfo?.fullName}</p>
                        <p><span className="font-medium">Email:</span> {order.customer?.email || order.customerInfo?.email}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Số điện thoại:</span> {order.customer?.phone || order.customerInfo?.phone}</p>
                        {order.paymentMethod && (
                          <p><span className="font-medium">Thanh toán:</span> {
                            order.paymentMethod === 'card' ? 'Thẻ tín dụng' :
                            order.paymentMethod === 'momo' ? 'Ví MoMo' :
                            order.paymentMethod === 'banking' ? 'Chuyển khoản' :
                            'Thanh toán trực tiếp'
                          }</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Khóa học đã đăng ký ({order.items.length} khóa học):</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-primary-600">
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              }).format(item.price)}
                            </p>
                            <p className="text-xs text-green-600">✓ Truy cập ngay</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default HistoryPage;
