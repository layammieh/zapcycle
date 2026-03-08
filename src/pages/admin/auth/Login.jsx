import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/zapcycle_logo.png";

const Login = () => {
  const navigate = useNavigate();
  // Task 1: Component-level State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Task 2: Controlled Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Task 1: Meaningful UI Update (Simulating login delay)
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mb-2 flex flex-col items-center">
        <img src={logo} alt="ZapCycle Logo" className="w-64 h-74 object-contain" />
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl px-8 py-10 border border-gray-100">
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 text-m mt-1">Sign in to manage your system.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative flex items-center">
            <Mail className="absolute left-4 text-gray-400" size={20} />
            <input
              type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-4 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"} required
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-200 rounded-2xl py-3.5 pl-11 pr-12 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-lg py-4 rounded-full shadow-md transition-all mt-2 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Signing In...
              </>
            ) : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
