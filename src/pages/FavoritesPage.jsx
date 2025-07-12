import React, { useState } from 'react';
import { Heart, Search, Filter, Trash2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useApp } from '../hooks/useApp';

const FavoritesPage = ({ onNavigate }) => {
  const { favorites, clearFavorites } = useApp();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'Lập trình', name: 'Lập trình' },
    { id: 'Ngoại ngữ', name: 'Ngoại ngữ' },
    { id: 'Thiết kế', name: 'Thiết kế' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Kỹ năng mềm', name: 'Kỹ năng mềm' }
  ];

  const priceRanges = [
    { id: 'all', name: 'Tất cả' },
    { id: 'under-300k', name: 'Dưới 300K' },
    { id: '300k-500k', name: '300K - 500K' },
    { id: '500k-700k', name: '500K - 700K' },
    { id: 'above-700k', name: 'Trên 700K' }
  ];

  const filteredFavorites = favorites.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    
    let matchesPrice = true;
    if (filterPrice !== 'all') {
      switch (filterPrice) {
        case 'under-300k':
          matchesPrice = product.price < 300000;
          break;
        case '300k-500k':
          matchesPrice = product.price >= 300000 && product.price <= 500000;
          break;
        case '500k-700k':
          matchesPrice = product.price >= 500000 && product.price <= 700000;
          break;
        case 'above-700k':
          matchesPrice = product.price > 700000;
          break;
        default:
          matchesPrice = true;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm yêu thích?')) {
      clearFavorites();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Heart className="text-red-500" size={32} />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Yêu thích</h1>
                <p className="text-gray-600">
                  {favorites.length} sản phẩm đã lưu
                </p>
              </div>
            </div>
            
            {favorites.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
                Xóa tất cả
              </button>
            )}
          </div>

          {/* Search and Filter */}
          {favorites.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm trong yêu thích..."
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

              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Chưa có sản phẩm yêu thích
            </h2>
            <p className="text-gray-600 mb-6">
              Khám phá và lưu những khóa học bạn quan tâm
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Khám phá ngay
            </button>
          </div>
        ) : filteredFavorites.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFavorites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={handleViewDetail}
                onNavigate={onNavigate}
              />
            ))}
          </div>
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

export default FavoritesPage;
