import React, { useState } from "react";
import { Lock, Mail, User, CheckCircle2 } from "lucide-react";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";

const Settings = () => {
    const [email, setEmail] = useState("admin@zapcycle.com");
    const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSave = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors text-gray-900 dark:text-gray-100 font-sans">
            <Navbar activeNav="settings" />

            <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
                <TopBar title="Admin Settings" />

                <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
                    {/* Success Message */}
                    {showSuccess && (
                        <div className="bg-green-500 text-white px-6 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 shadow-lg shadow-green-100 dark:shadow-none">
                            <CheckCircle2 size={20} />
                            <p className="text-sm font-bold">Profile updated successfully!</p>
                        </div>
                    )}

                    <div className="space-y-6">
                        <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 space-y-6 transition-colors shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                    <User size={20} className="text-[#37B26C]" />
                                </div>
                                <h3 className="text-xl font-bold">Admin Profile</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Admin Email</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Leave blank to keep current"
                                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                className="bg-[#37B26C] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-green-600 transition-all shadow-lg shadow-green-100 dark:shadow-none active:scale-95"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
