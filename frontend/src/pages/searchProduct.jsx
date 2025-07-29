import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SummaryApi } from '../common';
import VerticalCard from '../components/VerticalCardProduct';

const SearchProduct = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get("query") || "";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!query.trim()) {
        setData([]);
        return;
      }

      const response = await fetch(`${SummaryApi.searchProduct.url}?query=${encodeURIComponent(query)}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        setData(result.data || []);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [query]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>
        {query ? `Search Results for "${query}"` : 'Search Products'}
      </h1>
      
      {loading && query && (
        <div className='text-center py-8'>
          <p className='text-lg'>Searching products...</p>
        </div>
      )}

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          Error: {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && query && (
        <div className='bg-white p-4 rounded shadow text-center'>
          <p className='text-lg'>No products found matching your search</p>
        </div>
      )}

      {!loading && data.length > 0 && (
        <>
          <p className='text-gray-600 mb-4'>{data.length} products found</p>
          <VerticalCard data={data} />
        </>
      )}
    </div>
  );
};

export default SearchProduct;