import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export default function Cart() {
  const { cartItems, loading, removeFromCart, updateQuantity } = useCart();

  if (loading) return <Loading />;

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold font-heading text-primary mb-4">Your Cart is Empty</h1>
        <p className="text-text-secondary mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-primary shadow-sm hover:bg-primary-light transition-all no-underline">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold font-heading text-primary mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow">
          <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 border-b border-border last:border-0">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" />
                
                <div className="flex-grow text-center sm:text-left">
                  <Link to={`/product/${item.id}`} className="text-lg font-semibold text-primary hover:underline block mb-1">
                    {item.title}
                  </Link>
                  <div className="text-text-secondary text-sm mb-2">{item.category}</div>
                  <div className="font-bold text-primary">${item.price.toFixed(2)}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-background text-text-secondary transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-medium text-primary min-w-[2rem] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-background text-text-secondary transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-96">
          <div className="bg-surface rounded-xl shadow-sm border border-border p-6 sticky top-24">
            <h2 className="text-xl font-bold font-heading text-primary mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg text-primary">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-3 rounded-xl font-semibold text-white bg-primary shadow-sm hover:bg-primary-light hover:-translate-y-px hover:shadow-md transition-all">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
