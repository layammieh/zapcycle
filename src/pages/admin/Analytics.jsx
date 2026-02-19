import React from "react";
import {
    AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";
import Navbar from "./components/Navbar";
import { Bell } from "lucide-react";

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

const Analytics = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="ml-64 flex-1 flex flex-col">

                {/* ── Top Bar ── */}
                <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
                        <p className="text-gray-400 text-sm">Overview of cycles, energy, and unit status.</p>
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

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Area Chart — Cycles Over Time */}
                        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-4">Cycles Over Time</h2>
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
                                    <Area
                                        type="monotone"
                                        dataKey="cycles"
                                        stroke="#22c55e"
                                        strokeWidth={2.5}
                                        fill="url(#cycleGrad)"
                                        dot={{ r: 4, fill: "#22c55e", strokeWidth: 0 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pie Chart — Unit Status */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-base font-bold text-gray-900 mb-4">Unit Status</h2>
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
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

                    {/* Bottom Row — Bar Chart */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-base font-bold text-gray-900 mb-4">Daily Energy (kWh)</h2>
                        <ResponsiveContainer width="100%" height={220}>
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

                </div>
            </main>
        </div>
    );
};

export default Analytics;
