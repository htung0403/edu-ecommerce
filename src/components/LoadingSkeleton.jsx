import React from 'react';

const LoadingSkeleton = ({ type = 'card', count = 8 }) => {
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-3"></div>
        <div className="flex items-center gap-4 mb-3">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonList = () => (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const SkeletonSuggestions = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-5 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
      ))}
    </div>
  );

  if (type === 'list') {
    return <SkeletonList />;
  }

  if (type === 'suggestions') {
    return <SkeletonSuggestions />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
