import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { username, password });
      login(response.data.token);
    } catch (error) {
      toast.error("Login failed!");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.news18.com/ibnlive/uploads/2024/05/jalaun-election-2024-2024-05-fb3547cb91ac607f52c4b6e35ac7f5dc-16x9.png?impolicy=website&width=400&height=225')",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white border border-orange-200 rounded-lg p-8 z-10">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-800">
            Voter Login
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Secure access for registered voters
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-700 text-white py-2 rounded-md font-medium hover:bg-orange-800 transition"
          >
            Login
          </button>

          {/* Footer */}
          <div className="text-center text-sm text-slate-600">
            New voter?{" "}
            <Link
              to="/registerVoter"
              className="text-orange-700 font-medium hover:underline"
            >
              Register here
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
