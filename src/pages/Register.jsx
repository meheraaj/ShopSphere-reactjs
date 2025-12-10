import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account: ' + err.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8">
      <div className="bg-surface p-10 rounded-2xl shadow-lg w-full max-w-md border border-border">
        <h2 className="text-center mb-8 text-3xl font-bold font-heading text-primary">Register</h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-text-main">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-3 border border-border rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-text-main">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-3 border border-border rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2 text-text-main">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              className="w-full px-4 py-3 border border-border rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
          <button disabled={loading} className="w-full mb-3 inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-white bg-primary shadow-sm hover:bg-primary-light hover:-translate-y-px hover:shadow-md transition-all border-none cursor-pointer disabled:opacity-50" type="submit">Sign Up</button>
        </form>
        <div className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
