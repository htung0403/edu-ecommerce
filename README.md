# EduMarket - Sàn Thương Mại Điện Tử Giáo Dục với AI

## 🚀 Tổng quan

EduMarket là một ứng dụng web hiện đại cho sàn thương mại điện tử giáo dục tích hợp AI, được xây dựng bằng React và Tailwind CSS. Ứng dụng cung cấp trải nghiệm học tập thông minh với các tính năng gợi ý cá nhân hóa, chatbot AI, và giao diện responsive.

## ✨ Tính năng chính

### 🎯 Tính năng cơ bản
- **Hiển thị danh sách khóa học**: Xem tất cả khóa học với thông tin chi tiết
- **Tìm kiếm và lọc thông minh**: Tìm kiếm theo tên, danh mục, giá cả
- **Chi tiết khóa học**: Modal hiển thị thông tin đầy đủ
- **Yêu thích**: Đánh dấu và quản lý khóa học yêu thích
- **Giỏ hàng**: Thêm khóa học vào giỏ hàng và thanh toán
- **Lịch sử xem**: Theo dõi các khóa học đã xem gần đây

### 🤖 Tính năng AI
- **Gợi ý thông minh**: AI đề xuất khóa học phù hợp dựa trên hành vi
- **Chatbot tư vấn**: Trợ lý AI hỗ trợ tìm kiếm và tư vấn
- **Gợi ý tìm kiếm**: Auto-complete và suggestions thông minh

### 📱 Trải nghiệm người dùng
- **Responsive Design**: Tối ưu cho mọi thiết bị
- **Loading Skeleton**: Trải nghiệm loading mượt mà
- **Animations**: Hiệu ứng hover và transition đẹp mắt
- **Toast Notifications**: Thông báo real-time thân thiện

## 🛠️ Công nghệ sử dụng

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Icons**: Lucide React
- **Storage**: localStorage
- **Deployment**: Vercel

## 📦 Cài đặt và chạy

### Yêu cầu
- Node.js 18.0+
- npm hoặc yarn

### Cài đặt
```bash
# Clone repository
git clone https://github.com/htung0403/edu-ecommerce.git
cd edu-ecommerce

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

### Scripts
```bash
npm run dev      # Chạy development (port 5173)
npm run build    # Build cho production
npm run preview  # Preview build locally
npm run lint     # Lint code
```

## 🏗️ Cấu trúc dự án

```
src/
├── components/         # Components tái sử dụng
│   ├── Header.jsx     # Navigation header
│   ├── ProductCard.jsx # Card hiển thị khóa học
│   ├── ProductModal.jsx # Modal chi tiết
│   ├── SearchBar.jsx  # Thanh tìm kiếm
│   ├── Chatbot.jsx    # AI Chatbot
│   └── ...
├── pages/             # Các trang chính
│   ├── HomePage.jsx   # Trang chủ
│   ├── CoursesPage.jsx # Trang khóa học
│   ├── FavoritesPage.jsx # Yêu thích
│   ├── CartPage.jsx   # Giỏ hàng
│   └── ...
├── context/           # State management
│   ├── AppContext.jsx # App state
│   ├── AuthContext.jsx # Authentication
│   └── OrderContext.jsx # Orders
├── hooks/             # Custom hooks
├── services/          # API services
├── data/              # Mock data
└── utils/             # Utilities
```

## 🎯 Demo

🌐 **Live Demo**: [https://edu-ecommerce-lime.vercel.app/](https://edu-ecommerce-lime.vercel.app/)

### Tài khoản demo
- **Email**: demo@edumarket.com  
- **Password**: password

## 📋 Checklist tính năng

### ✅ Yêu cầu cơ bản
- [x] Hiển thị danh sách sản phẩm
- [x] Tìm kiếm theo tên
- [x] Bộ lọc theo giá
- [x] Modal chi tiết sản phẩm
- [x] Tính năng yêu thích
- [x] API gợi ý sản phẩm

### ✅ Tính năng nâng cao
- [x] Authentication với đăng ký/đăng nhập
- [x] Giỏ hàng và checkout
- [x] Lịch sử xem sản phẩm
- [x] Chatbot AI tư vấn
- [x] Search suggestions
- [x] Loading states và error handling
- [x] Responsive design hoàn chỉnh

### ✅ Kỹ thuật
- [x] React hooks (useState, useEffect, useReducer)
- [x] Context API cho state management
- [x] Component-based architecture
- [x] Clean code và best practices
- [x] Mock API với realistic delays

## 📄 License

Dự án được phát hành dưới [MIT License](LICENSE).

## 👨‍� Tác giả

**htung0403** - [GitHub Profile](https://github.com/htung0403)

---

⭐ **Nếu bạn thấy project hữu ích, hãy cho một star nhé!** ⭐
