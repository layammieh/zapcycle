import React, { useState } from "react";
import { Bell, Lock, Mail, Settings as SettingsIcon } from "lucide-react";
import Sidebar from "./components/Navbar";

const Settings = () => {
    const [activeNav, setActiveNav] = useState("settings"); // Active sidebar link
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("");
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        alert("Settings saved!");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

            {/* Main Content */}
            <main className="ml-64 flex-1 flex flex-col">

                {/* Top Bar */}
                <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                        <p className="text-gray-400 text-sm">Manage your account and preferences.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></span>
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Body */}
                <div className="p-8 flex flex-col gap-8">

                    {/* Profile Info */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Profile Info</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-gray-500 text-sm font-medium mb-1">Email</label>
                                <div className="flex items-center border rounded-xl px-3 py-2">
                                    <Mail size={18} className="text-gray-400 mr-2" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 border-none focus:ring-0 outline-none text-gray-700 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-500 text-sm font-medium mb-1">Password</label>
                                <div className="flex items-center border rounded-xl px-3 py-2">
                                    <Lock size={18} className="text-gray-400 mr-2" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="********"
                                        className="flex-1 border-none focus:ring-0 outline-none text-gray-700 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Account Settings */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h2>
                        <div className="flex items-center gap-4">
                            <Bell size={18} className="text-gray-500" />
                            <span className="text-gray-700 text-sm flex-1">Enable email notifications</span>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                                className="h-5 w-5 accent-green-500"
                            />
                        </div>
                    </section>

                    {/* Preferences */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Preferences</h2>
                        <div className="flex flex-col gap-4">
                            <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-all">
                                <SettingsIcon size={16} />
                                Change Theme
                            </button>
                            <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-all">
                                <SettingsIcon size={16} />
                                Manage Integrations
                            </button>
                        </div>
                    </section>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-all"
                        >
                            Save Changes
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Settings;
