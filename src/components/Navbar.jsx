import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch {
      console.error("Failed to log out");
    }
  }

  const defaultAvatar = "https://ui-avatars.com/api/?name=" + (currentUser?.displayName || "User") + "&background=0f172a&color=fff";
  const cartCount = cartItems ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-border sticky top-0 z-50 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 text-primary font-heading font-bold text-2xl no-underline">
          <img src="/logo.png" alt="ShopSphere" className="h-10 w-auto" />
          ShopSphere
        </Link>
        
        <div className="flex items-center gap-8">
          <Link to="/" className="text-text-secondary hover:text-primary font-medium transition-colors no-underline">Home</Link>
          
          {currentUser ? (
            <div className="flex items-center gap-6">
              <Link to="/cart" className="relative text-text-secondary hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/dashboard" className="flex items-center gap-3 text-text-secondary hover:text-primary font-medium transition-colors no-underline">
                <img 
                  src={!imgError && currentUser.photoURL ? currentUser.photoURL : defaultAvatar} 
                  alt="Profile" 
                  className="w-9 h-9 rounded-full object-cover border-2 border-border"
                  onError={() => setImgError(true)}
                />
                <span className="font-semibold text-sm text-primary hidden sm:block">{currentUser.displayName || currentUser.email.split('@')[0]}</span>
              </Link>
              <button onClick={handleLogout} className="bg-transparent text-text-secondary p-2 text-sm hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-text-secondary hover:text-primary font-medium transition-colors no-underline">Login</Link>
              <Link to="/register" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-primary shadow-sm hover:bg-primary-light hover:-translate-y-px hover:shadow-md transition-all no-underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
