import React, { useState } from "react";
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import {
    Zap, Users, TrendingUp, RefreshCw, LogOut, Bell, Settings, LayoutDashboard, ChevronUp, ChevronDown,
} from "lucide-react";
import Navbar from "./components/Navbar";
import StatCard from "./components/StatCard";
import TopBar from "./components/TopBar";
import { useNavigate } from "react-router-dom";

// ── Sample Data ──────────────────────────────────────────────────────────────
const cyclesData = [
    { month: "Aug", cycles: 120 },
    { month: "Sep", cycles: 185 },
    { month: "Oct", cycles: 210 },
    { month: "Nov", cycles: 175 },
    { month: "Dec", cycles: 240 },
    { month: "Jan", cycles: 310 },
    { month: "Feb", cycles: 295 },
];

const energyData = [
    { day: "Mon", kWh: 42 },
    { day: "Tue", kWh: 58 },
    { day: "Wed", kWh: 35 },
    { day: "Thu", kWh: 71 },
    { day: "Fri", kWh: 63 },
    { day: "Sat", kWh: 89 },
    { day: "Sun", kWh: 54 },
];

const statusData = [
    { name: "Active", value: 68 },
    { name: "Idle", value: 20 },
    { name: "Maintenance", value: 12 },
];

const STATUS_COLORS = ["#22c55e", "#facc15", "#f87171"];

const recentActivity = [
    { id: "ZC-001", user: "Maria Santos", action: "Cycle Started", time: "2 min ago", status: "active" },
    { id: "ZC-002", user: "Juan Dela Cruz", action: "Cycle Completed", time: "8 min ago", status: "done" },
    { id: "ZC-003", user: "Ana Reyes", action: "Account Created", time: "15 min ago", status: "new" },
    { id: "ZC-004", user: "Carlo Mendoza", action: "Cycle Started", time: "22 min ago", status: "active" },
    { id: "ZC-005", user: "Liza Bautista", action: "Cycle Completed", time: "31 min ago", status: "done" },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState("dashboard");

    const statusBadge = (status) => {
        const map = {
            active: "bg-green-100 text-green-700",
            done: "bg-blue-100 text-blue-700",
            new: "bg-purple-100 text-purple-700",
        };
        return map[status] || "bg-gray-100 text-gray-600";
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors">
            <Navbar activeNav="dashboard" />

            {/* ── Main Content ── */}
            <main className="ml-64 flex-1 flex flex-col">

                {/* Top Bar */}
                <TopBar title="Dashboard" subtitle="Welcome back! Here's what's happening." />

                {/* Page Body */}
                <div className="p-8 flex flex-col gap-8">

                    {/* ── Stat Cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                        <StatCard icon={RefreshCw} label="Total Cycles" value="1,284" change="12%" positive color="bg-green-500" />
                        <StatCard icon={Users} label="Active Users" value="348" change="8%" positive color="bg-blue-500" />
                        <StatCard icon={Zap} label="Energy Saved (kWh)" value="9,420" change="5%" positive color="bg-yellow-400" />
                        <StatCard icon={TrendingUp} label="Revenue" value="₱84,500" change="3%" positive={false} color="bg-purple-500" />
                    </div>

                    {/* ── Charts Row ── */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Area Chart — Cycles Over Time */}
                        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Cycles Over Time</h2>
                                    <p className="text-gray-400 dark:text-gray-500 text-sm">Monthly cycle completions</p>
                                </div>
                                <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 px-3 py-1 rounded-full">Last 7 months</span>
                            </div>
                            <ResponsiveContainer width="100%" height={220}>
                                <AreaChart data={cyclesData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="cycleGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                                        labelStyle={{ fontWeight: 600, color: "#111827" }}
                                    />
                                    <Area type="monotone" dataKey="cycles" stroke="#22c55e" strokeWidth={2.5} fill="url(#cycleGrad)" dot={{ r: 4, fill: "#22c55e", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pie Chart — Unit Status */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Unit Status</h2>
                                <p className="text-gray-400 dark:text-gray-500 text-sm">Current fleet breakdown</p>
                            </div>
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="45%"
                                        innerRadius={55}
                                        outerRadius={80}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {statusData.map((_, i) => (
                                            <Cell key={i} fill={STATUS_COLORS[i]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                                    />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ── Bottom Row ── */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Bar Chart — Daily Energy */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Daily Energy (kWh)</h2>
                                <p className="text-gray-400 dark:text-gray-500 text-sm">This week's consumption</p>
                            </div>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={energyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barSize={18}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                                        cursor={{ fill: "#f0fdf4" }}
                                    />
                                    <Bar dataKey="kWh" fill="#22c55e" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Recent Activity Table */}
                        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">Recent Activity</h2>
                                    <p className="text-gray-400 dark:text-gray-500 text-sm">Latest user actions</p>
                                </div>
                                <button className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 text-sm font-semibold transition-colors">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wide border-b border-gray-100 dark:border-gray-800">
                                            <th className="pb-3 text-left">ID</th>
                                            <th className="pb-3 text-left">User</th>
                                            <th className="pb-3 text-left">Action</th>
                                            <th className="pb-3 text-left">Time</th>
                                            <th className="pb-3 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                        {recentActivity.map((row) => (
                                            <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="py-3.5 text-gray-400 dark:text-gray-500 font-mono text-xs">{row.id}</td>
                                                <td className="py-3.5 font-medium text-gray-800 dark:text-gray-200">{row.user}</td>
                                                <td className="py-3.5 text-gray-600 dark:text-gray-400">{row.action}</td>
                                                <td className="py-3.5 text-gray-400 dark:text-gray-500">{row.time}</td>
                                                <td className="py-3.5">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge(row.status)}`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;