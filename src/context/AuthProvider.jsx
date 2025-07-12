import React, { useReducer, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { showToast } from '../utils/toast';

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
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
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

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: user });
      } catch {
        // Clear invalid data
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Save user to localStorage when user changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  // Action creators
  const actions = {
    login: async (email, password) => {
      dispatch({ type: AuthActionTypes.LOGIN_START });
      
      try {
        // Simulate API call with email/password validation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simple validation (in real app, this would be server-side)
        if (!email || !password) {
          throw new Error('Email và mật khẩu không được để trống');
        }
        
        // Mock user data - in real app, this would come from API
        const mockUser = {
          id: Date.now(),
          email,
          name: email.split('@')[0],
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=2563eb&color=fff`,
          phone: '',
          address: '',
          dateOfBirth: '',
          createdAt: new Date().toISOString()
        };
        
        dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: mockUser });
        showToast.login(mockUser.name);
        return mockUser;
      } catch (error) {
        dispatch({ type: AuthActionTypes.LOGIN_FAILURE, payload: error.message });
        showToast.error('Đăng nhập thất bại: ' + error.message);
        throw error;
      }
    },
    
    register: async (userData) => {
      dispatch({ type: AuthActionTypes.REGISTER_START });
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser = {
          id: Date.now(),
          ...userData,
          avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=2563eb&color=fff`,
          createdAt: new Date().toISOString()
        };
        
        dispatch({ type: AuthActionTypes.REGISTER_SUCCESS, payload: newUser });
        showToast.success('Đăng ký thành công! Chào mừng ' + newUser.name);
        return newUser;
      } catch (error) {
        dispatch({ type: AuthActionTypes.REGISTER_FAILURE, payload: error.message });
        showToast.error('Đăng ký thất bại: ' + error.message);
        throw error;
      }
    },
    
    logout: () => {
      dispatch({ type: AuthActionTypes.LOGOUT });
      showToast.logout();
    },
    
    updateProfile: (userData) => {
      const updatedUser = { ...state.user, ...userData };
      dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: updatedUser });
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
