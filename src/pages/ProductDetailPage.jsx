import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingCart, 
  Star, 
  Users, 
  Clock, 
  Play,
  BookOpen,
  CheckCircle,
  Globe
} from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { useAuth } from '../hooks/useAuth';
import LoginModal from '../components/LoginModal';
import { showToast } from '../utils/toast';
import { mockProducts } from '../data/mockData';

const ProductDetailPage = ({ productId, onNavigate }) => {
  const { addToFavorites, removeFromFavorites, isFavorite, addToCart, isInCart, addToViewHistory } = useApp();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        setProduct(null);
        return;
      }

      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 300)); // Reduced delay
        
        // Tìm sản phẩm từ mock data
        const foundProduct = mockProducts.find(p => p.id === parseInt(productId));
        
        if (foundProduct) {
          // Chuyển đổi dữ liệu từ mockData sang format ProductDetailPage
          const detailProduct = {
            ...foundProduct,
            longDescription: foundProduct.fullDescription || foundProduct.description,
            reviewCount: foundProduct.reviews,
            studentCount: foundProduct.students,
            language: 'Tiếng Việt',
            instructor: {
              name: foundProduct.instructor,
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
              bio: `Giảng viên có nhiều năm kinh nghiệm trong lĩnh vực ${foundProduct.category.toLowerCase()}. Chuyên gia giảng dạy với phương pháp hiện đại và hiệu quả.`,
              courseCount: Math.floor(Math.random() * 15) + 5,
              studentCount: foundProduct.students + Math.floor(Math.random() * 10000),
              rating: foundProduct.rating
            },
            features: [
              `${foundProduct.duration} video chất lượng cao`,
              'Mã nguồn đầy đủ cho tất cả dự án',
              'Hỗ trợ 24/7 từ instructor',
              'Chứng chỉ hoàn thành',
              'Truy cập trọn đời',
              'Cập nhật nội dung miễn phí'
            ],
            requirements: [
              'Kiến thức cơ bản về máy tính',
              'Có máy tính cài đặt được phần mềm cần thiết',
              'Kết nối internet ổn định',
              `Phù hợp với level ${foundProduct.level.toLowerCase()}`
            ],
            whatYouLearn: [
              `Nắm vững kiến thức ${foundProduct.category.toLowerCase()}`,
              'Áp dụng kiến thức vào thực tế',
              'Phát triển kỹ năng chuyên môn',
              'Tạo ra sản phẩm hoàn chỉnh',
              'Chuẩn bị cho công việc thực tế',
              'Cập nhật xu hướng mới nhất'
            ]
          };
          
          setProduct(detailProduct);
          // Call addToViewHistory only once when product is found
          addToViewHistory(detailProduct);
        } else {
          setProduct(null);
          showToast.error('Không tìm thấy khóa học');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        showToast.error('Không thể tải thông tin khóa học');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]); // Only depend on productId, ignore addToViewHistory to prevent infinite loop

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (!isInCart(product.id)) {
      addToCart(product);
    }
  };

  const handleBack = () => {
    onNavigate('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin khóa học...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy khóa học</h2>
          <p className="text-gray-600 mb-4">Khóa học bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <button
            onClick={handleBack}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Quay lại</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Image */}
            <div className="relative mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                <button className="bg-white bg-opacity-20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-opacity-30 transition-all">
                  <Play size={32} />
                </button>
              </div>
            </div>

            {/* Course Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.level}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <p className="text-lg text-gray-600 mb-6">{product.description}</p>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-current" size={20} />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-gray-600">({product.reviewCount} đánh giá)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-gray-400" size={20} />
                  <span className="text-gray-600">{product.studentCount.toLocaleString()} học viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-gray-400" size={20} />
                  <span className="text-gray-600">{product.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="text-gray-400" size={20} />
                  <span className="text-gray-600">{product.language}</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {[
                    { id: 'overview', label: 'Tổng quan' },
                    { id: 'instructor', label: 'Giảng viên' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* What you'll learn */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Bạn sẽ học được gì</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={16} />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Yêu cầu</h3>
                    <ul className="space-y-2">
                      {product.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Mô tả chi tiết</h3>
                    <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Giảng viên</h3>
                  <div className="flex items-start gap-4">
                    <img
                      src={product.instructor.avatar}
                      alt={product.instructor.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{product.instructor.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-400 fill-current" size={14} />
                          <span>{product.instructor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{product.instructor.studentCount.toLocaleString()} học viên</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen size={14} />
                          <span>{product.instructor.courseCount} khóa học</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{product.instructor.bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold text-primary-600">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium inline-block">
                    Giảm {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart(product.id)}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  {isInCart(product.id) ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
                </button>
                
                <button
                  onClick={handleFavoriteClick}
                  className={`w-full py-3 px-4 rounded-lg font-semibold border-2 transition-colors flex items-center justify-center gap-2 ${
                    isFavorite(product.id)
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <Heart size={20} className={isFavorite(product.id) ? 'fill-current' : ''} />
                  {isFavorite(product.id) ? 'Đã yêu thích' : 'Yêu thích'}
                </button>
              </div>

              {/* Course Features */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Khóa học bao gồm:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default ProductDetailPage;