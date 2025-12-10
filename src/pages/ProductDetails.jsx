import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  async function handleAddToCart() {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      setAdding(true);
      await addToCart(product);
      alert('Product added to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to add to cart');
    }
    setAdding(false);
  }

  if (loading) return <Loading />;
  if (error) return <div className="container mx-auto px-6 pt-8">Error: {error}</div>;
  if (!product) return <div className="container mx-auto px-6 pt-8">Product not found</div>;

  return (
    <div className="container mx-auto px-6">
      <div className="mt-8 mb-8">
        <Link to="/" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm bg-white text-text-main border border-border hover:bg-background hover:border-text-secondary transition-all no-underline">&larr; Back to Home</Link>
      </div>
      
      <div className="bg-surface rounded-xl shadow-md mt-8 overflow-hidden flex flex-col md:flex-row">
        <div className="p-12 bg-white flex items-center justify-center flex-1 border-r border-border">
          <img src={product.image} alt={product.title} className="max-w-full max-h-[400px] object-contain" />
        </div>
        <div className="p-12 flex-1">
          <div className="text-accent uppercase font-semibold text-sm mb-2">{product.category}</div>
          <h1 className="text-3xl font-heading font-bold mb-4 leading-tight text-primary">{product.title}</h1>
          <div className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</div>
          <p className="text-text-secondary leading-relaxed mb-8">{product.description}</p>
          <button 
            onClick={handleAddToCart}
            disabled={adding}
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-lg text-white bg-primary shadow-sm hover:bg-primary-light hover:-translate-y-px hover:shadow-md transition-all border-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {adding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
