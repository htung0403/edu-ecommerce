<<<<<<< HEAD
# EduMarket - Sàn Giáo Dục Thương Mại Điện Tử với AI

## 🚀 Tổng quan

EduMarket là một ứng dụng web hiện đại cho sàn giáo dục thương mại điện tử tích hợp AI, được xây dựng bằng React và Tailwind CSS. Ứng dụng cung cấp trải nghiệm học tập thông minh với các tính năng gợi ý cá nhân hóa, chatbot AI, và giao diện responsive.

## ✨ Tính năng chính

### 🎯 Tính năng cơ bản
- **Hiển thị danh sách sản phẩm**: Xem tất cả khóa học với thông tin chi tiết (tên, giá, ảnh, mô tả)
- **Tìm kiếm và lọc**: Tìm kiếm thông minh theo tên, danh mục, giá cả với suggestions
- **Modal chi tiết sản phẩm**: Xem thông tin đầy đủ về khóa học khi click "Xem chi tiết"
- **Yêu thích**: Đánh dấu và quản lý các khóa học yêu thích
- **Giỏ hàng**: Thêm khóa học vào giỏ hàng và quản lý
- **Lịch sử xem**: Theo dõi các sản phẩm đã xem gần đây

### 🤖 Tính năng AI
- **Gợi ý thông minh**: AI đề xuất khóa học phù hợp dựa trên hành vi người dùng
- **Chatbot tư vấn**: Trợ lý AI hỗ trợ tìm kiếm và tư vấn khóa học
- **Gợi ý tìm kiếm**: Auto-complete và suggestions khi nhập tìm kiếm

### 📱 Tính năng UX/UI
- **Responsive Design**: Tối ưu cho desktop, tablet, mobile
- **Loading Skeleton**: Trải nghiệm loading mượt mà
- **Animations**: Hiệu ứng hover và transition
- **Error Handling**: Xử lý lỗi thân thiện với người dùng
- **Toast Notifications**: Thông báo khi thêm/xóa yêu thích

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **UI Components**: Headless UI
- **Storage**: localStorage để lưu trữ dữ liệu

## 📦 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 18.0+
- npm hoặc yarn

### Cài đặt
```bash
# Clone repository
git clone <repository-url>
cd edu-ecommerce

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

### Scripts có sẵn
```bash
# Chạy development server (port 5173)
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

## 🏗️ Cấu trúc dự án

```
src/
├── components/         # Các component tái sử dụng
│   ├── Header.jsx     # Header navigation với menu
│   ├── ProductCard.jsx # Card hiển thị sản phẩm
│   ├── ProductModal.jsx # Modal chi tiết sản phẩm
│   ├── SearchBar.jsx  # Thanh tìm kiếm với filters
│   ├── Chatbot.jsx    # Chatbot AI tư vấn
│   └── LoadingSkeleton.jsx # Loading skeleton
├── pages/             # Các trang chính
│   ├── HomePage.jsx   # Trang chủ với products và AI suggestions
│   ├── FavoritesPage.jsx # Trang sản phẩm yêu thích
│   ├── CartPage.jsx   # Trang giỏ hàng
│   └── HistoryPage.jsx # Trang lịch sử xem
├── context/           # State management
│   └── AppContext.jsx # Global state với useReducer
├── hooks/             # Custom hooks
│   ├── useProducts.js # Hook quản lý sản phẩm
│   ├── useSuggestions.js # Hook AI suggestions
│   ├── useSearchSuggestions.js # Hook search suggestions
│   ├── useChatbot.js  # Hook chatbot
│   └── useApp.js      # Hook context
├── services/          # API services
│   └── api.js         # Mock API với delays
├── data/              # Mock data
│   └── mockData.js    # Dữ liệu mẫu khóa học
└── styles/
    └── index.css      # Tailwind CSS
```

## 🎨 Thiết kế UI/UX

### Màu sắc chính
- **Primary**: Blue-600 (#2563eb)
- **Secondary**: Gray-600 (#4b5563)
- **Success**: Green-500 (#10b981)
- **Error**: Red-500 (#ef4444)
- **AI Gradient**: Purple-600 to Pink-600

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Tính năng kỹ thuật

### State Management
- React Context với useReducer pattern
- Persistent state với localStorage
- Optimistic updates cho UX tốt hơn

### Mock API
- Simulate network delays (500-1500ms)
- Error handling và retry logic
- Search và filter functionality
- Chatbot responses

### Performance
- Code splitting
- Lazy loading
- React.memo optimization
- useCallback cho expensive operations

## 🚀 Deployment

### Build cho production
```bash
npm run build
```

### Deploy lên Vercel
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Hoặc connect GitHub repo trực tiếp
```

### Deploy lên Netlify
```bash
# Build
npm run build

# Upload thư mục dist/ lên Netlify
# Hoặc connect GitHub repo
```

### Environment Variables
Không cần thiết lập environment variables cho phiên bản hiện tại (sử dụng mock data).

## 🎯 Đáp ứng yêu cầu đề bài

### ✅ Yêu cầu chức năng
- [x] Hiển thị danh sách sản phẩm với mock data
- [x] Tìm kiếm theo tên sản phẩm
- [x] Bộ lọc giá (<500K, 500K-1M, >1M)
- [x] Nút "Gợi ý sản phẩm phù hợp" với API /api/suggestions
- [x] Modal chi tiết sản phẩm
- [x] Tính năng yêu thích và trang yêu thích riêng

### ✅ Yêu cầu kỹ thuật
- [x] React với hooks (useState, useEffect, useReducer)
- [x] State management với Context
- [x] Axios cho mock API
- [x] Code sạch, component hóa
- [x] README hướng dẫn build và run

### ✅ Điểm cộng
- [x] Lịch sử xem sản phẩm
- [x] Loading skeleton khi gọi API
- [x] Xử lý lỗi khi API fail
- [x] Chatbot AI tư vấn sản phẩm
- [x] Search suggestions
- [x] Responsive design

### ✅ Yêu cầu UX/UI
- [x] Thiết kế hiện đại, clean
- [x] Responsive trên mọi thiết bị
- [x] Hiệu ứng hover, transition
- [x] Màu sắc đồng bộ
- [x] Toast notifications cho yêu thích

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án được phát hành dưới [MIT License](LICENSE).

## 👥 Tác giả

- **GitHub Copilot** - *AI Assistant Developer*

## 🙏 Cảm ơn

- React team cho framework tuyệt vời
- Tailwind CSS cho styling system
- Lucide React cho icon set
- Vite cho build tool nhanh chóng
=======
# edu-ecommerce
>>>>>>> 32807a65df7cf160e47c40c6aa2ba8a76a34cf1e
