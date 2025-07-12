import toast from 'react-hot-toast';
import { Heart, ShoppingCart, User, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

// Custom toast với icon
const toastWithIcon = (message, type = 'success', icon = null) => {
  const iconComponent = icon || getDefaultIcon(type);
  
  return toast(message, {
    icon: iconComponent,
    style: {
      background: '#fff',
      color: '#374151',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      fontSize: '14px',
      fontWeight: '500',
    },
  });
};

const getDefaultIcon = (type) => {
  switch (type) {
    case 'success':
      return '✅';
    case 'error':
      return '❌';
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
    default:
      return '✅';
  }
};

// Các toast functions tiện ích
export const showToast = {
  // Toast cơ bản
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  loading: (message) => toast.loading(message),
  
  // Toast với custom icons
  addToCart: (productName) => 
    toastWithIcon(`Đã thêm "${productName}" vào giỏ hàng`, 'success', '🛒'),
  
  removeFromCart: (productName) => 
    toastWithIcon(`Đã xóa "${productName}" khỏi giỏ hàng`, 'info', '🗑️'),
  
  addToFavorites: (productName) => 
    toastWithIcon(`Đã thêm "${productName}" vào yêu thích`, 'success', '❤️'),
  
  removeFromFavorites: (productName) => 
    toastWithIcon(`Đã xóa "${productName}" khỏi yêu thích`, 'info', '💔'),
  
  login: (userName) => 
    toastWithIcon(`Chào mừng ${userName}!`, 'success', '👋'),
  
  logout: () => 
    toastWithIcon('Đã đăng xuất thành công', 'success', '👋'),
  
  orderSuccess: (orderNumber) => 
    toastWithIcon(`Đặt hàng thành công! Mã đơn: ${orderNumber}`, 'success', '🎉'),
  
  requireLogin: () => 
    toastWithIcon('Vui lòng đăng nhập để tiếp tục', 'warning', '🔐'),
  
  clearCart: () => 
    toastWithIcon('Đã xóa tất cả sản phẩm trong giỏ hàng', 'info', '🗑️'),
  
  clearHistory: () => 
    toastWithIcon('Đã xóa lịch sử xem', 'info', '🗑️'),
  
  profileUpdated: () => 
    toastWithIcon('Cập nhật thông tin thành công', 'success', '✏️'),
  
  // Promise toast cho async operations
  promise: (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || 'Đang xử lý...',
      success: messages.success || 'Thành công!',
      error: messages.error || 'Có lỗi xảy ra!',
    });
  },
  
  // Dismiss all toasts
  dismiss: () => toast.dismiss(),
  
  // Custom toast
  custom: (message, options = {}) => toast(message, options),
};

export default showToast;
