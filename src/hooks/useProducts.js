import { useState, useEffect, useCallback } from 'react';
import { getProducts, getProductById } from '../services/api';

// Custom hook for products
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts(filters);
      setProducts(response.data?.products || []);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tải sản phẩm');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
};

// Custom hook for single product
export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await getProductById(productId);
        setProduct(response.data || null);
      } catch (err) {
        setError(err.message || 'Có lỗi xảy ra khi tải sản phẩm');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return {
    product,
    loading,
    error
  };
};
