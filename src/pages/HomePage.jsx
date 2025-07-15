import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, TrendingUp, BookOpen, Users } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SearchBar from '../components/SearchBar';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useProducts } from '../hooks/useProducts';
import { useSuggestions } from '../hooks/useSuggestions';
import { useApp } from '../hooks/useApp';

const HomePage = ({ showSuggestions, onSuggestionsShown, onNavigate }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: 'all',
    sortBy: 'popularity'
  });
  
  const { products, loading, refetch } = useProducts();
  const { 
    suggestions, 
    loading: suggestionsLoading, 
    reason,
    userInsights,
    refreshSuggestions: fetchSuggestions 
  } = useSuggestions();
  const { viewHistory } = useApp();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestionsSection, setShowSuggestionsSection] = useState(false);

  useEffect(() => {
    refetch(filters);
  }, [filters, refetch]);

  useEffect(() => {
    setFilteredProducts(Array.isArray(products) ? products : []);
  }, [products]);

  const handleGetSuggestions = useCallback(async () => {
    setShowSuggestionsSection(true);
    await fetchSuggestions();
  }, [fetchSuggestions]);

  useEffect(() => {
    if (showSuggestions) {
      handleGetSuggestions();
      onSuggestionsShown();
    }
  }, [showSuggestions, onSuggestionsShown, handleGetSuggestions]);

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const stats = [
    { label: 'Khóa học', value: '1,000+', icon: BookOpen },
    { label: 'Học viên', value: '50,000+', icon: Users },
    { label: 'Hoàn thành', value: '95%', icon: TrendingUp },
    { label: 'Đánh giá', value: '4.8/5', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={filters}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Học tập thông minh với{' '}
            <span className="text-primary-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Khám phá hàng ngàn khóa học chất lượng cao với gợi ý cá nhân hóa
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Icon size={24} className="text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* AI Suggestions Button */}
          <button
            onClick={handleGetSuggestions}
            disabled={suggestionsLoading}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            <Sparkles size={20} />
            {suggestionsLoading ? 'Đang tạo gợi ý...' : 'Gợi ý sản phẩm phù hợp'}
          </button>
        </div>

        {/* View History */}
        {viewHistory.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Đã xem gần đây</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {viewHistory.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetail={handleViewDetail}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        {showSuggestionsSection && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="text-purple-600" />
                Gợi ý dành cho bạn
              </h2>
              {userInsights && (
                <div className="text-sm text-gray-600 bg-purple-50 px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>🎯 {userInsights.primaryInterest}</span>
                    <span>📚 {userInsights.totalFavorites} yêu thích</span>
                    <span>👀 {userInsights.totalViewed} đã xem</span>
                  </div>
                </div>
              )}
            </div>
            {reason && (
              <p className="text-gray-600 mb-4 italic">
                {reason}
              </p>
            )}
            {suggestionsLoading ? (
              <LoadingSkeleton type="suggestions" count={6} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((product) => (
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
        )}

        {/* Featured Courses */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Khóa học nổi bật
            </h2>
            <button
              onClick={() => onNavigate('courses')}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              <BookOpen size={20} />
              Xem tất cả khóa học
            </button>
          </div>
          
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : !Array.isArray(filteredProducts) || filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                Không tìm thấy khóa học nào
              </div>
              <p className="text-gray-400">
                Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.slice(0, 6).map((product) => (
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

export default HomePage;
