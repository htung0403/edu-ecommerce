import { useState, useCallback } from 'react';
import { getSearchSuggestions } from '../services/api';

// Custom hook for search suggestions
export const useSearchSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSearchSuggestions = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await getSearchSuggestions(query);
      setSuggestions(response.data || []);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tải gợi ý tìm kiếm');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    suggestions,
    loading,
    error,
    fetchSearchSuggestions
  };
};
