import axios from 'axios';
import { mockProducts } from '../data/mockData';

// Tạo instance axios
const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// Mock API responses
export const productService = {
  // Lấy danh sách sản phẩm
  getProducts: async (params = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let products = [...mockProducts];
        
        // Tìm kiếm theo tên
        if (params.search) {
          products = products.filter(product => 
            product.name.toLowerCase().includes(params.search.toLowerCase()) ||
            product.description.toLowerCase().includes(params.search.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(params.search.toLowerCase()))
          );
        }
        
        // Lọc theo category
        if (params.category && params.category !== 'all') {
          products = products.filter(product => 
            product.category === params.category
          );
        }
        
        // Lọc theo giá
        if (params.priceRange && params.priceRange !== 'all') {
          const ranges = {
            'under-500k': { min: 0, max: 500000 },
            '500k-1m': { min: 500000, max: 1000000 },
            'above-1m': { min: 1000000, max: Infinity }
          };
          
          const range = ranges[params.priceRange];
          if (range) {
            products = products.filter(product => 
              product.price >= range.min && product.price <= range.max
            );
          }
        }
        
        // Sắp xếp
        if (params.sortBy) {
          switch (params.sortBy) {
            case 'price-asc':
              products.sort((a, b) => a.price - b.price);
              break;
            case 'price-desc':
              products.sort((a, b) => b.price - a.price);
              break;
            case 'rating':
              products.sort((a, b) => b.rating - a.rating);
              break;
            case 'popularity':
              products.sort((a, b) => b.students - a.students);
              break;
            case 'newest':
              products.sort((a, b) => b.id - a.id);
              break;
            default:
              break;
          }
        }
        
        resolve({
          data: {
            products,
            total: products.length,
            page: params.page || 1,
            limit: params.limit || 12
          }
        });
      }, 300); // Simulate network delay
    });
  },
  
  // Lấy chi tiết sản phẩm
  getProductById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = mockProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve({ data: product });
        } else {
          reject(new Error('Product not found'));
        }
      }, 200);
    });
  },
  
  // Gợi ý sản phẩm thông minh (AI)
  getSuggestions: async (userId = 'user123', userFavorites = [], userViewHistory = []) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Extract categories from actual user data
        const favoriteCategories = [...new Set(userFavorites.map(item => item.category))];
        const viewedCategories = [...new Set(userViewHistory.map(item => item.category))];
        const viewedProducts = userViewHistory.map(item => item.id);
        
        // Extract tags from favorites and viewed products
        const favoriteTags = [...new Set(userFavorites.flatMap(item => item.tags || []))];
        const viewedTags = [...new Set(userViewHistory.flatMap(item => item.tags || []))];
        const allUserTags = [...new Set([...favoriteTags, ...viewedTags])];
        
        // Calculate user's typical price range from favorites and viewed products
        const allUserProducts = [...userFavorites, ...userViewHistory];
        let priceRange = { min: 299000, max: 799000 }; // Default range
        
        if (allUserProducts.length > 0) {
          const prices = allUserProducts.map(item => item.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
          
          // Create a range around user's typical price preference
          priceRange = {
            min: Math.max(0, Math.min(minPrice, avgPrice * 0.7)),
            max: Math.max(maxPrice, avgPrice * 1.5)
          };
        }
        
        // Determine user's skill level preference from viewed/favorite courses
        const skillLevels = allUserProducts.map(item => item.level).filter(Boolean);
        const skillLevelCount = skillLevels.reduce((acc, level) => {
          acc[level] = (acc[level] || 0) + 1;
          return acc;
        }, {});
        const preferredSkillLevel = Object.keys(skillLevelCount).sort((a, b) => 
          skillLevelCount[b] - skillLevelCount[a]
        )[0] || 'Trung bình';

        // Build user behavior profile from real data
        const userBehavior = {
          viewedCategories,
          favoriteCategories,
          priceRange,
          viewedProducts,
          skill_level: preferredSkillLevel,
          tags: allUserTags
        };

        console.log(`Generating AI suggestions for user: ${userId}`);
        console.log('User behavior profile:', userBehavior);
        
        let scoredProducts = mockProducts.map(product => {
          let score = 0;
          
          // Score based on favorite categories (highest weight)
          if (userBehavior.favoriteCategories.includes(product.category)) {
            score += 50;
          }
          
          // Score based on viewed categories
          if (userBehavior.viewedCategories.includes(product.category)) {
            score += 30;
          }
          
          // Score based on price range preference
          if (product.price >= userBehavior.priceRange.min && 
              product.price <= userBehavior.priceRange.max) {
            score += 25;
          }
          
          // Score based on skill level match
          if (product.level === userBehavior.skill_level) {
            score += 20;
          }
          
          // Score based on matching tags
          const matchingTags = product.tags.filter(tag => 
            userBehavior.tags.includes(tag)
          );
          score += matchingTags.length * 15;
          
          // Score based on rating (popular products)
          score += product.rating * 5;
          
          // Penalty for already viewed products
          if (userBehavior.viewedProducts.includes(product.id)) {
            score -= 20;
          }
          
          // Bonus for courses in same category as favorites but not already owned
          if (userBehavior.favoriteCategories.includes(product.category) && 
              !userFavorites.some(fav => fav.id === product.id)) {
            score += 15;
          }
          
          // Small random factor to add variety
          score += Math.random() * 10;
          
          return { ...product, aiScore: score };
        });
        
        // Sort by AI score and get top suggestions
        const suggestions = scoredProducts
          .sort((a, b) => b.aiScore - a.aiScore)
          .slice(0, 6)
          // eslint-disable-next-line no-unused-vars
          .map(({ aiScore, ...product }) => product); // Remove aiScore from response
        
        // Generate personalized reason based on real data
        const topCategory = userBehavior.favoriteCategories[0] || userBehavior.viewedCategories[0];
        let reason = 'Gợi ý dành riêng cho bạn từ AI';
        
        if (topCategory) {
          const reasonMessages = [
            `Dựa trên sở thích ${topCategory} và lịch sử xem của bạn`,
            `Phù hợp với trình độ ${userBehavior.skill_level} và sở thích của bạn`,
            `Các khóa học ${topCategory} được đề xuất riêng cho bạn`,
            `Dựa trên ${userFavorites.length} khóa học yêu thích và ${userViewHistory.length} lượt xem`
          ];
          reason = reasonMessages[Math.floor(Math.random() * reasonMessages.length)];
        }
        
        resolve({
          data: {
            suggestions,
            reason,
            userInsights: {
              primaryInterest: topCategory || 'Chưa xác định',
              skillLevel: userBehavior.skill_level,
              priceRange: `${Math.floor(userBehavior.priceRange.min/1000)}K - ${Math.floor(userBehavior.priceRange.max/1000)}K`,
              totalViewed: userViewHistory.length,
              totalFavorites: userFavorites.length,
              topCategories: [...userBehavior.favoriteCategories, ...userBehavior.viewedCategories].slice(0, 3)
            }
          }
        });
      }, 1000); // Longer delay to simulate AI processing
    });
  },
  
  // Tìm kiếm gợi ý
  getSearchSuggestions: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const suggestions = mockProducts
          .filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
          )
          .slice(0, 5)
          .map(product => ({
            id: product.id,
            name: product.name,
            category: product.category
          }));
        
        resolve({ data: suggestions });
      }, 200);
    });
  }
};

// Chatbot AI service
export const chatbotService = {
  sendMessage: async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple chatbot responses
        const responses = {
          'tiếng anh': 'Tôi khuyên bạn nên học khóa "Tiếng Anh Giao tiếp Cơ bản" - rất phù hợp cho người mới bắt đầu!',
          'lập trình': 'Khóa học "Lập trình React.js từ A đến Z" rất được yêu thích. Bạn có muốn tìm hiểu thêm?',
          'thiết kế': 'Khóa "Thiết kế UI/UX với Figma" sẽ giúp bạn tạo ra những giao diện đẹp mắt!',
          'marketing': 'Khóa "Marketing Digital 2024" có những chiến lược mới nhất cho doanh nghiệp.',
          'python': 'Khóa "Python cho Data Science" sẽ giúp bạn thành thạo phân tích dữ liệu.',
          'photoshop': 'Khóa "Photoshop CC 2024 Toàn tập" từ cơ bản đến nâng cao rất đáng học!'
        };
        
        let response = 'Tôi có thể giúp bạn tìm khóa học phù hợp. Bạn muốn học về lĩnh vực nào? (Ví dụ: lập trình, thiết kế, tiếng anh, marketing...)';
        
        // Find matching response
        for (const [keyword, reply] of Object.entries(responses)) {
          if (message.toLowerCase().includes(keyword)) {
            response = reply;
            break;
          }
        }
        
        resolve({
          data: {
            message: response,
            suggestions: mockProducts.slice(0, 3).map(p => ({
              id: p.id,
              name: p.name,
              price: p.price
            }))
          }
        });
      }, 800);
    });
  }
};

// Export individual functions for convenience
export const getProducts = productService.getProducts;
export const getProductById = productService.getProductById;
export const getSuggestions = (userId, userFavorites, userViewHistory) => 
  productService.getSuggestions(userId, userFavorites, userViewHistory);
export const getSearchSuggestions = productService.getSearchSuggestions;

export default api;
