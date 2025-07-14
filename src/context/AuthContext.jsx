import React, { createContext, useReducer, useEffect } from 'react';
import { showToast } from '../utils/toast';

// Create Context
const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Action types
const AuthActionTypes = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_START:
    case AuthActionTypes.REGISTER_START:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
      
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
      
    case AuthActionTypes.LOGOUT:
      return {
        ...initialState
      };
      
    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
      
    default:
      return state;
  }
};

// Mock API functions
const mockAPI = {
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'demo@edumarket.com' && credentials.password === 'password') {
      return {
        id: 1,
        name: 'Demo User',
        email: 'demo@edumarket.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      };
    }
    throw new Error('Email hoặc mật khẩu không đúng');
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    };
  }
};

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: user });
      } catch {
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  // Save user to localStorage when authenticated
  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      localStorage.setItem('auth_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [state.isAuthenticated, state.user]);

  // Actions
  const actions = {
    login: async (credentials) => {
      dispatch({ type: AuthActionTypes.LOGIN_START });
      try {
        const user = await mockAPI.login(credentials);
        dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: user });
        showToast.success(`Chào mừng ${user.name}!`);
        return user;
      } catch (error) {
        dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: error.message });
        showToast.error(error.message);
        throw error;
      }
    },

    logout: () => {
      dispatch({ type: AuthActionTypes.LOGOUT });
      showToast.success('Đã đăng xuất thành công');
    },

    register: async (userData) => {
      dispatch({ type: AuthActionTypes.REGISTER_START });
      try {
        const user = await mockAPI.register(userData);
        dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, payload: user });
        showToast.success(`Chào mừng ${user.name}! Tài khoản đã được tạo thành công.`);
        return user;
      } catch (error) {
        dispatch({ type: AuthActionTypes.REGISTER_FAILURE, payload: error.message });
        showToast.error(error.message);
        throw error;
      }
    },

    clearError: () => {
      dispatch({ type: AuthActionTypes.CLEAR_ERROR });
    }
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export context for advanced usage
export { AuthContext };
