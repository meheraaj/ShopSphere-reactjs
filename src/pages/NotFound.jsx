import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 text-center mt-12">
      <h1 className="text-6xl font-bold text-primary mb-4 font-heading">404</h1>
      <p className="text-xl text-text-secondary mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-white bg-primary shadow-sm hover:bg-primary-light hover:-translate-y-px hover:shadow-md transition-all no-underline">Go Home</Link>
    </div>
  );
}
