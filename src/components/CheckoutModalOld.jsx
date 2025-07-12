import React, { useState } from 'react';
import { X, CreditCard, Truck, CheckCircle, Loader2, User, Mail, Phone, MapPin, Wallet, Smartphone, Building } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useOrder } from '../hooks/useOrder';
import { useApp } from '../hooks/useApp';
import { showToast } from '../utils/toast';

const CheckoutModal = ({ isOpen, onClose, onLoginRequired }) => {
  const { user, isAuthenticated } = useAuth();
  const { createOrder, loading } = useOrder();
  const { cart, clearCart, getCartTotal } = useApp();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Review
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    note: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      // Format card number with spaces
      formattedValue = value.replace(/\s+/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    } else if (name === 'expiryDate') {
      // Format expiry date MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    } else if (name === 'cvv') {
      // Limit CVV to 3-4 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setPaymentInfo(prev => ({ ...prev, [name]: formattedValue }));
  };

  const validateStep1 = () => {
    return customerInfo.name && customerInfo.email && customerInfo.phone && customerInfo.address;
  };

  const validateStep2 = () => {
    if (paymentMethod === 'card') {
      return paymentInfo.cardNumber.replace(/\s/g, '').length >= 16 && 
             paymentInfo.expiryDate.length === 5 && 
             paymentInfo.cvv.length >= 3 && 
             paymentInfo.cardName;
    }
    return true; // For other payment methods
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      onLoginRequired();
      return;
    }

    // Validate form based on current step
    if (step === 1 && !validateStep1()) {
      showToast.error('Vui lòng điền đầy đủ thông tin giao hàng');
      return;
    }

    if (step === 2 && !validateStep2()) {
      showToast.error('Vui lòng điền đầy đủ thông tin thanh toán');
      return;
    }

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    // Step 3: Process payment
    try {
      // Simulate payment processing
      showToast.loading('Đang xử lý thanh toán...');
      
      const order = {
        customer: {
          id: user.id,
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address
        },
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image
        })),
        total: getCartTotal(),
        paymentMethod,
        paymentInfo: paymentMethod === 'card' ? {
          lastFourDigits: paymentInfo.cardNumber.slice(-4),
          cardType: getCardType(paymentInfo.cardNumber)
        } : null,
        note: customerInfo.note,
        shipping: {
          method: 'standard',
          cost: 0,
          estimatedDays: '7-14'
        }
      };

      const createdOrder = await createOrder(order);
      setOrderData(createdOrder);
      setOrderSuccess(true);
      clearCart();
      showToast.dismiss(); // Remove loading toast
    } catch (error) {
      showToast.dismiss();
      showToast.error('Thanh toán thất bại. Vui lòng thử lại!');
      console.error('Order creation failed:', error);
    }
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    if (number.startsWith('3')) return 'American Express';
    return 'Unknown';
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleClose = () => {
    setOrderSuccess(false);
    setOrderData(null);
    setStep(1);
    setPaymentInfo({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardName: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  if (orderSuccess && orderData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="text-center">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đặt hàng thành công!</h2>
            <p className="text-gray-600 mb-4">
              Mã đơn hàng: <span className="font-semibold">{orderData.orderNumber}</span>
            </p>
            <p className="text-gray-600 mb-6">
              Chúng tôi sẽ liên hệ với bạn trong vòng 24h để xác nhận đơn hàng.
            </p>
            <button
              onClick={handleClose}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Thanh toán</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {!isAuthenticated && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                Bạn cần đăng nhập để tiếp tục thanh toán.
                <button
                  onClick={onLoginRequired}
                  className="ml-2 text-yellow-900 font-semibold hover:underline"
                >
                  Đăng nhập ngay
                </button>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Đơn hàng của bạn</h3>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <span className="font-medium">{item.price.toLocaleString('vi-VN')}đ</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Tổng cộng:</span>
                    <span className="text-lg text-primary-600">
                      {getCartTotal().toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Thông tin khách hàng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ *
                  </label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú đơn hàng
                </label>
                <textarea
                  name="note"
                  value={customerInfo.note}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Ghi chú thêm về đơn hàng..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Phương thức thanh toán</h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <CreditCard size={20} className="mr-3 text-gray-600" />
                  <span>Thẻ tín dụng/ghi nợ</span>
                </label>

                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <Truck size={20} className="mr-3 text-gray-600" />
                  <span>Thanh toán khi nhận hàng (COD)</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isAuthenticated}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? 'Đang xử lý...' : 'Đặt hàng'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
