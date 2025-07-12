import React, { useReducer, useEffect } from 'react';
import { OrderContext } from './OrderContext';
import { showToast } from '../utils/toast';

// Initial state
const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
};

// Action types
const OrderActionTypes = {
  CREATE_ORDER_START: 'CREATE_ORDER_START',
  CREATE_ORDER_SUCCESS: 'CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILURE: 'CREATE_ORDER_FAILURE',
  GET_ORDERS_START: 'GET_ORDERS_START',
  GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS',
  GET_ORDERS_FAILURE: 'GET_ORDERS_FAILURE',
  DELETE_ORDER_SUCCESS: 'DELETE_ORDER_SUCCESS',
  CLEAR_ALL_ORDERS: 'CLEAR_ALL_ORDERS',
  SET_CURRENT_ORDER: 'SET_CURRENT_ORDER',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const orderReducer = (state, action) => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER_START:
    case OrderActionTypes.GET_ORDERS_START:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case OrderActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        currentOrder: action.payload,
        loading: false,
        error: null
      };
      
    case OrderActionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null
      };
      
    case OrderActionTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
        loading: false,
        error: null
      };
      
    case OrderActionTypes.CLEAR_ALL_ORDERS:
      return {
        ...state,
        orders: [],
        currentOrder: null,
        loading: false,
        error: null
      };
      
    case OrderActionTypes.CREATE_ORDER_FAILURE:
    case OrderActionTypes.GET_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case OrderActionTypes.SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload
      };
      
    case OrderActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
      
    default:
      return state;
  }
};

// OrderProvider component
export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders);
        dispatch({ type: OrderActionTypes.GET_ORDERS_SUCCESS, payload: orders });
      } catch {
        // Clear invalid data
        localStorage.removeItem('orders');
      }
    }
  }, []);

  // Save orders to localStorage when orders change
  useEffect(() => {
    if (state.orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(state.orders));
    }
  }, [state.orders]);

  // Action creators
  const actions = {
    createOrder: async (orderData) => {
      dispatch({ type: OrderActionTypes.CREATE_ORDER_START });
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newOrder = {
          id: Date.now(),
          orderNumber: `ORD-${Date.now()}`,
          ...orderData,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        dispatch({ type: OrderActionTypes.CREATE_ORDER_SUCCESS, payload: newOrder });
        showToast.orderSuccess(newOrder.orderNumber);
        return newOrder;
      } catch (error) {
        dispatch({ type: OrderActionTypes.CREATE_ORDER_FAILURE, payload: error.message });
        showToast.error('Đặt hàng thất bại: ' + error.message);
        throw error;
      }
    },
    
    getOrders: async (userId) => {
      dispatch({ type: OrderActionTypes.GET_ORDERS_START });
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter orders by userId from localStorage
        const savedOrders = localStorage.getItem('orders');
        let orders = [];
        if (savedOrders) {
          const allOrders = JSON.parse(savedOrders);
          orders = allOrders.filter(order => order.customer.id === userId);
        }
        
        dispatch({ type: OrderActionTypes.GET_ORDERS_SUCCESS, payload: orders });
        return orders;
      } catch (error) {
        dispatch({ type: OrderActionTypes.GET_ORDERS_FAILURE, payload: error.message });
        throw error;
      }
    },
    
    setCurrentOrder: (order) => {
      dispatch({ type: OrderActionTypes.SET_CURRENT_ORDER, payload: order });
    },
    
    deleteOrder: async (orderId) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        dispatch({ type: OrderActionTypes.DELETE_ORDER_SUCCESS, payload: orderId });
        
        // Update localStorage
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
          const orders = JSON.parse(savedOrders);
          const updatedOrders = orders.filter(order => order.id !== orderId);
          localStorage.setItem('orders', JSON.stringify(updatedOrders));
        }
        
        showToast.success('Đã xóa đơn hàng thành công');
        return true;
      } catch (error) {
        showToast.error('Lỗi khi xóa đơn hàng: ' + error.message);
        throw error;
      }
    },
    
    clearAllOrders: async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        dispatch({ type: OrderActionTypes.CLEAR_ALL_ORDERS });
        
        // Clear localStorage
        localStorage.removeItem('orders');
        
        showToast.success('Đã xóa tất cả đơn hàng');
        return true;
      } catch (error) {
        showToast.error('Lỗi khi xóa đơn hàng: ' + error.message);
        throw error;
      }
    },
    
    clearError: () => {
      dispatch({ type: OrderActionTypes.CLEAR_ERROR });
    }
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
