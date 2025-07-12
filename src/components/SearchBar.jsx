import React, { useState } from 'react';
import { Search, Filter, X, History } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { useSearchSuggestions } from '../hooks/useSearchSuggestions';

const SearchBar = ({ onSearch, onFilterChange, filters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { searchHistory, addToSearchHistory, clearSearchHistory } = useApp();
  const { suggestions } = useSearchSuggestions(searchTerm);

  const handleSearch = (term = searchTerm) => {
    if (term.trim()) {
      addToSearchHistory(term);
      onSearch(term);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    handleSearch(suggestion.name);
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'Lập trình', name: 'Lập trình' },
    { id: 'Ngoại ngữ', name: 'Ngoại ngữ' },
    { id: 'Thiết kế', name: 'Thiết kế' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Kỹ năng mềm', name: 'Kỹ năng mềm' }
  ];

  const priceRanges = [
    { id: 'all', name: 'Tất cả' },
    { id: 'under-300k', name: 'Dưới 300K' },
    { id: '300k-500k', name: '300K - 500K' },
    { id: '500k-700k', name: '500K - 700K' },
    { id: 'above-700k', name: 'Trên 700K' }
  ];

  const sortOptions = [
    { id: 'popularity', name: 'Phổ biến nhất' },
    { id: 'price-asc', name: 'Giá thấp đến cao' },
    { id: 'price-desc', name: 'Giá cao đến thấp' },
    { id: 'rating', name: 'Đánh giá cao nhất' },
    { id: 'newest', name: 'Mới nhất' }
  ];

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && (searchTerm || searchHistory.length > 0) && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-64 overflow-y-auto">
                {/* Search History */}
                {searchHistory.length > 0 && !searchTerm && (
                  <div className="p-3 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Tìm kiếm gần đây</span>
                      <button
                        onClick={clearSearchHistory}
                        className="text-xs text-gray-500 hover:text-red-500"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                    {searchHistory.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => handleHistoryClick(term)}
                        className="flex items-center gap-2 w-full text-left py-1 px-2 hover:bg-gray-50 rounded"
                      >
                        <History size={14} className="text-gray-400" />
                        <span className="text-sm">{term}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Search Suggestions */}
                {suggestions.length > 0 && (
                  <div className="p-3">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">Gợi ý</span>
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex items-center justify-between w-full text-left py-2 px-2 hover:bg-gray-50 rounded"
                      >
                        <div>
                          <span className="text-sm font-medium">{suggestion.name}</span>
                          <span className="text-xs text-gray-500 ml-2">{suggestion.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} />
            <span>Bộ lọc</span>
          </button>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="pb-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <select
                  value={filters.category || 'all'}
                  onChange={(e) => onFilterChange({ category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá
                </label>
                <select
                  value={filters.priceRange || 'all'}
                  onChange={(e) => onFilterChange({ priceRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sắp xếp
                </label>
                <select
                  value={filters.sortBy || 'popularity'}
                  onChange={(e) => onFilterChange({ sortBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay */}
      {showSuggestions && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
