import { useState, useEffect, useCallback } from 'react';
import { getSuggestions } from '../services/api';
import { useApp } from './useApp';

// Custom hook for AI suggestions
export const useSuggestions = () => {
  const { favorites, viewHistory } = useApp();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userInsights, setUserInsights] = useState(null);
  const [reason, setReason] = useState('');

  const fetchSuggestions = useCallback(async (userId = 'user123') => {
    try {
      setLoading(true);
      setError(null);
      const response = await getSuggestions(userId, favorites, viewHistory);
      setSuggestions(response.data?.suggestions || []);
      setUserInsights(response.data?.userInsights || null);
      setReason(response.data?.reason || '');
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tải gợi ý');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [favorites, viewHistory]);

  // Auto-refresh suggestions when user data changes
  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return {
    suggestions,
    loading,
    error,
    userInsights,
    reason,
    refreshSuggestions: fetchSuggestions
  };
};
