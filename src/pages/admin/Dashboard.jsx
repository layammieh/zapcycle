import React, { useState } from "react";
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import {
    Truck as TruckIcon, Users, TrendingUp, RefreshCw, LayoutDashboard, CheckCircle, Package, Clock
} from "lucide-react";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import TopBar from "./components/TopBar";

// ── ZapCycle Platform Data ──────────────────────────────────────────────────
const requestTrends = [
    { month: "Oct", requests: 45 },
    { month: "Nov", requests: 120 },
    { month: "Dec", requests: 185 },
    { month: "Jan", requests: 240 },
    { month: "Feb", requests: 310 },
    { month: "Mar", requests: 425 },
];

const categoryData = [
    { name: "Working", value: 35 },
    { name: "Broken", value: 45 },
    { name: "Scrap", value: 20 },
];

const platformActivity = [
    { id: "REQ-102", detail: "New Pickup Requested", user: "Maria Santos", time: "2 min ago", type: "new" },
    { id: "COL-045", detail: "Collector Verified", user: "EcoPick Ltd.", time: "15 min ago", type: "system" },
    { id: "REQ-098", detail: "Request Completed", user: "RecyclePros", time: "22 min ago", type: "done" },
    { id: "REQ-101", detail: "Pickup Accepted", user: "Metro Junkshops", time: "1 hr ago", type: "active" },
];

const COLORS = ["#37B26C", "#3b82f6", "#ef4444"];

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors">
            <Navbar activeNav="dashboard" />

            <main className="ml-64 flex-1 flex flex-col">
                <TopBar title="Platform Overview" />

                <div className="p-8 flex flex-col gap-8">
                    {/* ── Metric Cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                        <StatCard icon={Users} label="Total Users" value="1,482" change="+12%" positive color="bg-blue-500" />
                        <StatCard icon={TruckIcon} label="Total Collectors" value="86" change="+5%" positive color="bg-[#37B26C]" />
                        <StatCard icon={Package} label="Active Requests" value="42" change="8 new" positive color="bg-yellow-500" />
                        <StatCard icon={CheckCircle} label="Completed Pickups" value="894" change="+18%" positive color="bg-green-600" />
                    </div>

                    {/* ── Charts ── */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
                            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-6">Platform Growth (Requests)</h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={requestTrends}>
                                    <defs>
                                        <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#37B26C" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#37B26C" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: "#1f2937" }} />
                                    <Area type="monotone" dataKey="requests" stroke="#37B26C" fillOpacity={1} fill="url(#colorReq)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
                            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-6">Requests by Category</h2>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {categoryData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: "#1f2937" }} />
                                    <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ color: "#9ca3af" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ── Recent Activity ── */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
                        <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-6">Recent Activity Feed</h2>
                        <div className="flex flex-col gap-4">
                            {platformActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 px-2 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'new' ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400' :
                                            activity.type === 'done' ? 'bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                            }`}>
                                            {activity.type === 'new' ? <Clock size={18} /> :
                                                activity.type === 'done' ? <CheckCircle size={18} /> : <RefreshCw size={18} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{activity.detail}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.user} • {activity.time}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500">{activity.id}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
