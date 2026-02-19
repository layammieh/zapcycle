import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/zapcycle_logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4">

      {/* Logo above the card */}
      <div className="mb-2 flex flex-col items-center">
        <img
          src={logo}
          alt="ZapCycle Logo"
          className="w-64 h-74 object-contain drop-shadow-md"
        />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md min-h-[480px] bg-white rounded-3xl shadow-xl px-8 py-10">


        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-1000">Welcome Back</h1>
          <p className="text-gray-500 text-m mt-1">Sign in to keep the cycle going.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email Input */}
          <div className="relative flex items-center">
            <Mail className="absolute left-4 text-gray-400" size={20} />
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 text-gray-800 text-m placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl py-3.5 pl-11 pr-12 text-gray-800 text-m placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right -mt-1">
            <a
              href="#"
              className="text-green-600 hover:text-green-700 text-m font-medium transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 active:bg-green-800 text-white font-semibold text-lg py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 mt-2"

          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-500 text-m mt-2">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;