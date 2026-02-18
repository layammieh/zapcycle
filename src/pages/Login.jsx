import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in with email: ${email}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src="/asset/zapcycle_logo.png"
            alt="ZapCycle Logo"
            className="mx-auto w-20 h-20"
          />
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Welcome Back
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <span className="px-3 text-gray-500">📧</span>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <span className="px-3 text-gray-500">🔒</span>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Forgot password */}
        <div className="text-right mb-6">
          <a href="#" className="text-blue-500 hover:underline text-sm">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition"
        >
          Login
        </button>

        {/* Sign up link */}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;