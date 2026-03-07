import React, { useState } from "react";
import { Bell, Lock, Mail, Settings as SettingsIcon } from "lucide-react";
import Sidebar from "./components/Navbar";
import TopBar from "./components/TopBar";

const Settings = () => {
    const [activeNav, setActiveNav] = useState("settings"); // Active sidebar link
    const [email, setEmail] = useState("user@example.com");
    const [password, setPassword] = useState("");
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        alert("Settings saved!");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors">
            {/* Sidebar */}
            <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

            {/* Main Content */}
            <main className="ml-64 flex-1 flex flex-col">
                <TopBar title="Settings" subtitle="Manage your account and preferences." />

                {/* Page Body */}
                <div className="p-8 flex flex-col gap-8">

                    {/* Profile Info */}
                    <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Profile Info</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Email</label>
                                <div className="flex items-center border dark:border-gray-800 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
                                    <Mail size={18} className="text-gray-400 dark:text-gray-500 mr-2" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-gray-700 dark:text-gray-200 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Password</label>
                                <div className="flex items-center border dark:border-gray-800 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
                                    <Lock size={18} className="text-gray-400 dark:text-gray-500 mr-2" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="********"
                                        className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-gray-700 dark:text-gray-200 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Account Settings */}
                    <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Account Settings</h2>
                        <div className="flex items-center gap-4">
                            <Bell size={18} className="text-gray-500 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm flex-1">Enable email notifications</span>
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                                className="h-5 w-5 accent-green-500"
                            />
                        </div>
                    </section>

                    {/* Preferences */}
                    <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Preferences</h2>
                        <div className="flex flex-col gap-4">
                            <button className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-all w-56">
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
