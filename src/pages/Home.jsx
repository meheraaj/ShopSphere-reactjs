import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="container mx-auto px-6 pt-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-6">
      <div className="my-8 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2 text-primary font-heading">Discover Our Collection</h1>
        <p className="text-text-secondary text-lg">Curated items just for you</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-16">
        {products.map(product => (
          <div key={product.id} className="bg-surface rounded-xl border border-border overflow-hidden transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-lg hover:border-primary">
            <div className="h-64 p-8 bg-white flex items-center justify-center border-b border-border">
              <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs uppercase tracking-wider text-text-secondary font-semibold mb-2">{product.category}</div>
              <h3 className="text-lg font-semibold mb-3 leading-snug line-clamp-2 flex-grow text-primary" title={product.title}>{product.title}</h3>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                <Link to={`/product/${product.id}`} className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-primary shadow-sm hover:bg-primary-light hover:-translate-y-px hover:shadow-md transition-all no-underline">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
