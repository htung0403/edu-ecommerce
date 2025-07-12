import React, { useState } from 'react';
import { Heart, ShoppingCart, User, Menu, GraduationCap, LogIn, LogOut, BookOpen } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { useAuth } from '../hooks/useAuth';
import LoginModal from './LoginModal';
import UserProfile from './UserProfile';

const Header = ({ onNavigate, currentPage }) => {
  const { favorites, getCartCount } = useApp();
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Trang chủ', icon: GraduationCap },
    { id: 'courses', label: 'Khóa học', icon: BookOpen },
    { id: 'favorites', label: 'Yêu thích', icon: Heart, count: favorites.length },
    { id: 'cart', label: 'Giỏ hàng', icon: ShoppingCart, count: getCartCount() },
    { id: 'history', label: 'Lịch sử', icon: User }
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="bg-primary-600 text-white p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EduMarket</h1>
                <p className="text-xs text-gray-500">Powered by AI</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors relative ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {item.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {/* User Authentication */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowUserProfile(true)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User size={16} />
                  <span className="hidden sm:block font-medium">{user.name}</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut size={16} />
                  <span className="hidden sm:block">Đăng xuất</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <LogIn size={16} />
                <span className="font-medium">Đăng nhập</span>
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-white">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors relative ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-600'
                }`}
              >
                <Icon size={18} />
                <span className="text-xs font-medium">{item.label}</span>
                {item.count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      )}
      
      {showUserProfile && (
        <UserProfile
          isOpen={showUserProfile}
          onClose={() => setShowUserProfile(false)}
        />
      )}
    </header>
  );
};

export default Header;
