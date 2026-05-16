'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden bg-gray-300">
        <img
          src="https://api.unsplash.com/photos/random?query=travel,adventure&orientation=portrait&w=800&h=1200&client_id=_6Z1dSHN_5UeIV9mXWXAAxPkemGxtaGJIwCL2t-SYyw"
          alt="Travel background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=1200&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600 text-lg">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium disabled:bg-gray-400 mt-6"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-600">OR</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 13.5c0-1.82-1.43-3.35-3.19-3.35-1.76 0-3.19 1.53-3.19 3.35 0 1.82 1.43 3.35 3.19 3.35 1.76 0 3.19-1.53 3.19-3.35zm-9.81 0c0-1.82-1.43-3.35-3.19-3.35S1.05 11.68 1.05 13.5c0 1.82 1.43 3.35 3.19 3.35s3.19-1.53 3.19-3.35z"/>
                <path d="M23 1H1v22h22V1zm-4 13.5c0 2.49-1.95 4.51-4.35 4.51-2.4 0-4.35-2.02-4.35-4.51 0-2.49 1.95-4.51 4.35-4.51 2.4 0 4.35 2.02 4.35 4.51z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          {/* Sign up Link */}
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="text-gray-900 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
