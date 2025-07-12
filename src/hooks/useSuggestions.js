import { useState, useEffect, useCallback } from 'react';
import { getSuggestions } from '../services/api';

// Custom hook for AI suggestions
export const useSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = useCallback(async (userId = null) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getSuggestions(userId);
      setSuggestions(response.data?.suggestions || []);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tải gợi ý');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return {
    suggestions,
    loading,
    error,
    refetch: fetchSuggestions
  };
};
