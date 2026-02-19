import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/zapcycle_logo.png";

const SignUp = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        // TODO: connect to backend
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4 py-10">

            {/* Logo above the card */}
            <div className="mb-2 flex flex-col items-center">
                <img
                    src={logo}
                    alt="ZapCycle Logo"
                    className="w-64 object-contain drop-shadow-md"
                />
            </div>

            {/* Sign Up Card */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl px-8 py-10">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
                    <p className="text-gray-500 text-base mt-1">Join the cycle today.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Full Name */}
                    <div className="relative flex items-center">
                        <User className="absolute left-4 text-gray-400" size={20} />
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Full Name"
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 text-gray-800 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative flex items-center">
                        <Mail className="absolute left-4 text-gray-400" size={20} />
                        <input
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 text-gray-800 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="relative flex items-center">
                        <Phone className="absolute left-4 text-gray-400" size={20} />
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-2xl py-3.5 pl-11 pr-4 text-gray-800 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative flex items-center">
                        <Lock className="absolute left-4 text-gray-400" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-2xl py-3.5 pl-11 pr-12 text-gray-800 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative flex items-center">
                        <Lock className="absolute left-4 text-gray-400" size={20} />
                        <input
                            type={showConfirm ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-2xl py-3.5 pl-11 pr-12 text-gray-800 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center -mt-1">{error}</p>
                    )}

                    {/* Create Account Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 active:bg-green-800 text-white font-semibold text-lg py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 mt-2"
                    >
                        Create Account
                    </button>

                    {/* Sign In Link */}
                    <p className="text-center text-gray-500 text-base mt-2">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                        >
                            Sign In
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;