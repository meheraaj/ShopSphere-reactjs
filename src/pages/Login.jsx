import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in with Google: ' + err.message);
    }
    setLoading(false);
  }

  async function handleGithubLogin() {
    try {
      setError('');
      setLoading(true);
      await loginWithGithub();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in with GitHub: ' + err.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8">
      <div className="bg-surface p-10 rounded-2xl shadow-lg w-full max-w-md border border-border">
        <h2 className="text-center mb-8 text-3xl font-bold font-heading text-primary">Login</h2>
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
          <button disabled={loading} className="w-full mb-3 inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-white bg-primary shadow-sm hover:bg-primary-light hover:-translate-y-px hover:shadow-md transition-all border-none cursor-pointer disabled:opacity-50" type="submit">Log In</button>
        </form>
        <div className="flex items-center text-center my-6 text-text-secondary text-sm before:flex-1 before:border-b before:border-border before:mr-2 after:flex-1 after:border-b after:border-border after:ml-2">OR</div>
        <button disabled={loading} onClick={handleGoogleLogin} className="w-full mb-3 inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-text-main bg-white border border-border hover:bg-background hover:border-text-secondary transition-all cursor-pointer disabled:opacity-50">Login with Google</button>
        <button disabled={loading} onClick={handleGithubLogin} className="w-full mb-3 inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-white bg-[#24292e] hover:opacity-90 transition-all border-none cursor-pointer disabled:opacity-50">Login with GitHub</button>
        <div className="mt-4 text-center">
          Need an account? <Link to="/register" className="text-primary font-medium hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
}
