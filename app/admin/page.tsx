"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User, Shield } from 'react-feather';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Login attempt with:', { username: credentials.username, password: credentials.password ? '***' : 'empty' });

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Response text length:', responseText.length);
      console.log('Response text:', responseText);

      if (!responseText || responseText.trim() === '') {
        throw new Error('Empty response from server');
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response text that failed to parse:', responseText);
        throw new Error('Invalid JSON response from server');
      }

      console.log('Response data:', data);
      
      if (data.success) {
        // Store admin session
        try {
          // Store authentication data
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Also store with admin prefix for compatibility with existing layout
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminUser', JSON.stringify(data.user));
          console.log('Token stored successfully');
          
          // Verify token was stored
          const storedToken = localStorage.getItem('adminToken');
          if (storedToken) {
            console.log('Token verified in localStorage');
            
            // Redirect to dashboard
            window.location.href = '/admin/dashboard';
          } else {
            throw new Error('Failed to store token in localStorage');
          }
        } catch (storageError) {
          console.error('Storage error:', storageError);
          setError('Failed to store login session. Please try again.');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('Empty response')) {
        setError('Server returned empty response. Please try again.');
      } else if (error.message.includes('JSON')) {
        setError('Invalid server response. Please try again.');
      } else if (error.message.includes('HTTP error')) {
        setError('Server error. Please try again.');
      } else {
        setError('Connection error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F0E5] to-[#E8D8C5] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-[#C46A26] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#4A3F36] mb-2">Admin Portal</h1>
          <p className="text-gray-600">La Brezi Suites Management</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[#4A3F36] mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C46A26] focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#4A3F36] mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C46A26] focus:border-transparent"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C46A26] text-white py-3 rounded-lg font-medium hover:bg-[#A85B1F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-700">Username: admin</p>
          <p className="text-xs text-gray-700">Password: labrezi123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;