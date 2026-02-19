import React, { useState } from "react";
import {
    LayoutDashboard,
    Users,
    RefreshCw,
    TrendingUp,
    Settings,
    LogOut,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/zapcycle_logo.png";

const Sidebar = ({ activeNav }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleNavClick = (id) => {
        if (id === "dashboard") navigate("/admin/dashboard");
        if (id === "users") navigate("/admin/users");
        if (id === "cycles") navigate("/admin/cycles");
        if (id === "analytics") navigate("/admin/analytics");
        if (id === "settings") navigate("/admin/settings");
    };

    const confirmLogout = () => {
        setShowModal(true);
    };

    const handleLogout = () => {
        setShowModal(false);
        navigate("/login");
    };

    const cancelLogout = () => {
        setShowModal(false);
    };

    return (
        <>
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm fixed h-full z-10">
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
                    <img src={logo} alt="ZapCycle" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-bold text-gray-900">ZapCycle</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
                    {[
                        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                        { id: "users", label: "Users", icon: Users },
                        { id: "cycles", label: "Cycles", icon: RefreshCw },
                        { id: "analytics", label: "Analytics", icon: TrendingUp },
                        { id: "settings", label: "Settings", icon: Settings },
                    ].map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => handleNavClick(id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full text-left
                        ${activeNav === id
                                    ? "bg-green-500 text-white shadow-md shadow-green-200"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                }`}
                        >
                            <Icon size={18} />
                            {label}
                        </button>
                    ))}
                </nav>

                {/* Logout */}
                <div className="px-4 pb-6">
                    <button
                        onClick={confirmLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
                    >
                        <LogOut size={18} />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={cancelLogout}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-lg font-bold text-gray-900 mb-2">Confirm Logout</h2>
                        <p className="text-gray-500 mb-6">Are you sure you want to log out?</p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelLogout}
                                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
