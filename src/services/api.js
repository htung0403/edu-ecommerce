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
            'under-300k': { min: 0, max: 300000 },
            '300k-500k': { min: 300000, max: 500000 },
            '500k-700k': { min: 500000, max: 700000 },
            'above-700k': { min: 700000, max: Infinity }
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
  getSuggestions: async (userId = 'user123') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate AI suggestions based on user behavior
        // In real app, userId would be used to personalize suggestions
        console.log(`Generating suggestions for user: ${userId}`);
        
        const suggestions = mockProducts
          .sort(() => Math.random() - 0.5) // Random shuffle
          .slice(0, 6); // Get 6 suggestions
        
        resolve({
          data: {
            suggestions,
            reason: `Dựa trên lịch sử xem và sở thích của bạn (User: ${userId})`
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
export const getSuggestions = productService.getSuggestions;
export const getSearchSuggestions = productService.getSearchSuggestions;

export default api;
