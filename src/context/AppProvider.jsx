import React, { useReducer, useEffect } from 'react';
import { AppContext } from './AppContext';
import { showToast } from '../utils/toast';

// Initial state
const initialState = {
  favorites: [],
  viewHistory: [],
  cart: [],
  user: null,
  searchHistory: []
};

// Action types
const ActionTypes = {
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  CLEAR_FAVORITES: 'CLEAR_FAVORITES',
  ADD_TO_VIEW_HISTORY: 'ADD_TO_VIEW_HISTORY',
  CLEAR_VIEW_HISTORY: 'CLEAR_VIEW_HISTORY',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  SET_USER: 'SET_USER',
  ADD_TO_SEARCH_HISTORY: 'ADD_TO_SEARCH_HISTORY',
  CLEAR_SEARCH_HISTORY: 'CLEAR_SEARCH_HISTORY'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_FAVORITES:
      if (state.favorites.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    case ActionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload)
      };

    case ActionTypes.CLEAR_FAVORITES:
      return {
        ...state,
        favorites: []
      };

    case ActionTypes.ADD_TO_VIEW_HISTORY: {
      const filteredHistory = state.viewHistory.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        viewHistory: [{ ...action.payload, viewedAt: Date.now() }, ...filteredHistory].slice(0, 50)
      };
    }

    case ActionTypes.CLEAR_VIEW_HISTORY:
      return {
        ...state,
        viewHistory: []
      };

    case ActionTypes.ADD_TO_CART:
      if (state.cart.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };

    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ActionTypes.ADD_TO_SEARCH_HISTORY: {
      const filteredHistory = state.searchHistory.filter(item => item !== action.payload);
      return {
        ...state,
        searchHistory: [action.payload, ...filteredHistory].slice(0, 10)
      };
    }

    case ActionTypes.CLEAR_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: []
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        favorites.forEach(item => dispatch({ type: ActionTypes.ADD_TO_FAVORITES, payload: item }));
      } catch {
        localStorage.removeItem('favorites');
      }
    }

    const savedViewHistory = localStorage.getItem('viewHistory');
    if (savedViewHistory) {
      try {
        const viewHistory = JSON.parse(savedViewHistory);
        viewHistory.forEach(item => dispatch({ type: ActionTypes.ADD_TO_VIEW_HISTORY, payload: item }));
      } catch {
        localStorage.removeItem('viewHistory');
      }
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        cart.forEach(item => dispatch({ type: ActionTypes.ADD_TO_CART, payload: item }));
      } catch {
        localStorage.removeItem('cart');
      }
    }

    const savedSearchHistory = localStorage.getItem('searchHistory');
    if (savedSearchHistory) {
      try {
        const searchHistory = JSON.parse(savedSearchHistory);
        searchHistory.forEach(item => dispatch({ type: ActionTypes.ADD_TO_SEARCH_HISTORY, payload: item }));
      } catch {
        localStorage.removeItem('searchHistory');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem('viewHistory', JSON.stringify(state.viewHistory));
  }, [state.viewHistory]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory));
  }, [state.searchHistory]);

  const actions = {
    addToFavorites: (product) => {
      dispatch({ type: ActionTypes.ADD_TO_FAVORITES, payload: product });
      showToast.addToFavorites(product.name);
    },

    removeFromFavorites: (productId) => {
      dispatch({ type: ActionTypes.REMOVE_FROM_FAVORITES, payload: productId });
      showToast.removeFromFavorites();
    },

    clearFavorites: () => {
      dispatch({ type: ActionTypes.CLEAR_FAVORITES });
      showToast.clearFavorites();
    },

    isFavorite: (productId) => {
      return state.favorites.some(item => item.id === productId);
    },

    addToViewHistory: (product) => {
      dispatch({ type: ActionTypes.ADD_TO_VIEW_HISTORY, payload: product });
    },

    clearViewHistory: () => {
      dispatch({ type: ActionTypes.CLEAR_VIEW_HISTORY });
      showToast.clearHistory();
    },

    addToCart: (product) => {
      if (!state.cart.some(item => item.id === product.id)) {
        dispatch({ type: ActionTypes.ADD_TO_CART, payload: product });
        showToast.addToCart(product.name);
      }
    },

    removeFromCart: (productId) => {
      dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: productId });
      showToast.removeFromCart();
    },

    clearCart: () => {
      dispatch({ type: ActionTypes.CLEAR_CART });
    },

    isInCart: (productId) => {
      return state.cart.some(item => item.id === productId);
    },

    getCartCount: () => {
      return state.cart.length;
    },

    getCartTotal: () => {
      return state.cart.reduce((total, item) => total + item.price, 0);
    },

    setUser: (user) => {
      dispatch({ type: ActionTypes.SET_USER, payload: user });
    },

    addToSearchHistory: (searchTerm) => {
      if (searchTerm.trim()) {
        dispatch({ type: ActionTypes.ADD_TO_SEARCH_HISTORY, payload: searchTerm.trim() });
      }
    },

    clearSearchHistory: () => {
      dispatch({ type: ActionTypes.CLEAR_SEARCH_HISTORY });
    }
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};