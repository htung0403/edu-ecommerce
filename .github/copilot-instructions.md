<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# EduMarket - Sàn Giáo Dục Thương Mại Điện Tử với AI

## Tổng quan dự án
Đây là một ứng dụng React cho sàn giáo dục thương mại điện tử tích hợp AI. Dự án tập trung vào việc cung cấp trải nghiệm học tập thông minh với các tính năng:

- Hiển thị danh sách khóa học
- Tìm kiếm và lọc thông minh
- Gợi ý AI cá nhân hóa
- Quản lý yêu thích và giỏ hàng
- Chatbot AI tư vấn
- Responsive design

## Công nghệ sử dụng
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **UI Components**: Headless UI

## Cấu trúc thư mục
```
src/
├── components/         # Các component tái sử dụng
├── pages/             # Các trang chính
├── context/           # Context cho state management
├── hooks/             # Custom hooks
├── services/          # API services
├── data/              # Mock data
└── styles/            # CSS styles
```

## Hướng dẫn phát triển
1. Sử dụng functional components với hooks
2. Implement responsive design với Tailwind CSS
3. Tuân thủ naming conventions tiếng Việt cho UI
4. Sử dụng TypeScript khi cần thiết
5. Implement error handling và loading states
6. Tối ưu hóa performance với React.memo và useMemo

## Tính năng chính
- **Trang chủ**: Hiển thị sản phẩm, gợi ý AI, lịch sử xem
- **Tìm kiếm**: Tìm kiếm thông minh với suggestions
- **Yêu thích**: Quản lý sản phẩm yêu thích
- **Giỏ hàng**: Quản lý giỏ hàng và checkout
- **Lịch sử**: Theo dõi lịch sử xem sản phẩm
- **Chatbot**: AI tư vấn sản phẩm

## Mock API
Dự án sử dụng mock API để simulate các tính năng:
- Lấy danh sách sản phẩm
- Tìm kiếm và lọc
- Gợi ý AI
- Chatbot responses

## UI/UX Guidelines
- Thiết kế hiện đại, clean và professional
- Sử dụng màu sắc primary: blue-600, secondary: gray
- Animations và transitions mượt mà
- Responsive trên tất cả thiết bị
- Accessibility-friendly
