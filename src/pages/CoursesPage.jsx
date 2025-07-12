import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SearchBar from '../components/SearchBar';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useProducts } from '../hooks/useProducts';

const CoursesPage = ({ onNavigate }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    priceRange: 'all',
    sortBy: 'popularity'
  });
  
  const { products, loading, refetch } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    refetch(filters);
  }, [filters, refetch]);

  useEffect(() => {
    setFilteredProducts(Array.isArray(products) ? products : []);
  }, [products]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filters={filters}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen size={32} className="text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Tất cả khóa học</h1>
          </div>
          <p className="text-lg text-gray-600">
            Khám phá thư viện khóa học đa dạng với chất lượng cao
          </p>
        </div>

        {/* Courses Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Danh sách khóa học
            </h2>
            <span className="text-gray-600">
              {filteredProducts.length} khóa học
            </span>
          </div>
          
          {loading ? (
            <LoadingSkeleton count={12} />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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

export default CoursesPage;
