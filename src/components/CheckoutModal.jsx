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
  const [step, setStep] = useState(1); // 1: Student Info, 2: Confirm & Payment
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
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
    return customerInfo.name && customerInfo.email && customerInfo.phone;
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
          phone: customerInfo.phone
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
        courseAccess: {
          immediate: true,
          duration: 'lifetime'
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

  console.log('CheckoutModal rendered with:', { isOpen, user, cart: cart.length });

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
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${step >= stepNumber 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {stepNumber}
                  </div>
                  {stepNumber < 2 && (
                    <div className={`
                      w-12 h-0.5 mx-2
                      ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">
              {step === 1 && 'Thông tin học viên'}
              {step === 2 && 'Xác nhận đăng ký khóa học'}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Customer Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-1" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-1" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-1" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ghi chú về khóa học (không bắt buộc)
                  </label>
                  <textarea
                    name="note"
                    value={customerInfo.note}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Mong muốn đặc biệt về khóa học..."
                  />
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Chọn phương thức thanh toán</h4>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <CreditCard size={20} className="text-blue-600 mr-3" />
                      <span className="font-medium">Thẻ tín dụng/ghi nợ</span>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="momo"
                        checked={paymentMethod === 'momo'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <Smartphone size={20} className="text-pink-600 mr-3" />
                      <span className="font-medium">Ví MoMo</span>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="banking"
                        checked={paymentMethod === 'banking'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <Building size={20} className="text-green-600 mr-3" />
                      <span className="font-medium">Chuyển khoản ngân hàng</span>
                    </label>
                    
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <Wallet size={20} className="text-orange-600 mr-3" />
                      <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                    </label>
                  </div>
                </div>

                {/* Card Information */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900">Thông tin thẻ</h5>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên chủ thẻ *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nguyễn Văn A"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số thẻ *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ngày hết hạn *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Other payment method instructions */}
                {paymentMethod === 'momo' && (
                  <div className="p-4 bg-pink-50 rounded-lg">
                    <p className="text-pink-800">
                      Sau khi nhấn "Xác nhận đăng ký", bạn sẽ được chuyển đến ứng dụng MoMo để hoàn tất thanh toán khóa học.
                    </p>
                  </div>
                )}

                {paymentMethod === 'banking' && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800 mb-2">Thông tin chuyển khoản:</p>
                    <div className="text-sm text-green-700">
                      <p><strong>Ngân hàng:</strong> Vietcombank</p>
                      <p><strong>Số tài khoản:</strong> 1234567890</p>
                      <p><strong>Chủ tài khoản:</strong> EDUMARKET</p>
                      <p><strong>Nội dung:</strong> Thanh toan khoa hoc [Mã đơn hàng]</p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-orange-800">
                      Bạn sẽ thanh toán trực tiếp khi hoàn thành đăng ký. Khóa học sẽ được kích hoạt ngay sau khi thanh toán.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h4>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-gray-600 text-xs">Số lượng: {item.quantity || 1}</p>
                          </div>
                        </div>
                        <p className="font-medium">{item.price.toLocaleString('vi-VN')}₫</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Tổng cộng:</span>
                      <span className="text-blue-600">{getCartTotal().toLocaleString('vi-VN')}₫</span>
                    </div>
                  </div>
                </div>

                {/* Customer Info Review */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Thông tin giao hàng</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Họ tên:</strong> {customerInfo.name}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    <p><strong>Điện thoại:</strong> {customerInfo.phone}</p>
                    <p><strong>Địa chỉ:</strong> {customerInfo.address}</p>
                    {customerInfo.note && (
                      <p><strong>Ghi chú:</strong> {customerInfo.note}</p>
                    )}
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h4>
                  <div className="flex items-center space-x-3">
                    {paymentMethod === 'card' && <CreditCard size={20} className="text-blue-600" />}
                    {paymentMethod === 'momo' && <Smartphone size={20} className="text-pink-600" />}
                    {paymentMethod === 'banking' && <Building size={20} className="text-green-600" />}
                    {paymentMethod === 'cod' && <Wallet size={20} className="text-orange-600" />}
                    <span>
                      {paymentMethod === 'card' && 'Thẻ tín dụng/ghi nợ'}
                      {paymentMethod === 'momo' && 'Ví MoMo'}
                      {paymentMethod === 'banking' && 'Chuyển khoản ngân hàng'}
                      {paymentMethod === 'cod' && 'Thanh toán trực tiếp'}
                    </span>
                    {paymentMethod === 'card' && paymentInfo.cardNumber && (
                      <span className="text-gray-600">(**** {paymentInfo.cardNumber.slice(-4)})</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <button
                type="button"
                onClick={step > 1 ? goToPreviousStep : handleClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {step > 1 ? 'Quay lại' : 'Hủy'}
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                <span>
                  {step < 2 ? 'Tiếp tục' : 'Xác nhận đăng ký'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
