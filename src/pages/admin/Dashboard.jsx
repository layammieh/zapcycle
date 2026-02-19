import React, { useState } from "react";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import {
    Zap,
    Users,
    TrendingUp,
    RefreshCw,
    LogOut,
    Bell,
    Settings,
    LayoutDashboard,
    ChevronUp,
    ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/zapcycle_logo.png";

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

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, change, positive, color }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
            <Icon size={26} className="text-white" />
        </div>
        <div className="flex-1">
            <p className="text-gray-500 text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${positive ? "text-green-500" : "text-red-400"}`}>
            {positive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {change}
        </div>
    </div>
);

// ── Dashboard ─────────────────────────────────────────────────────────────────
const Dashboard = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState("dashboard");

    const handleLogout = () => {
        navigate("/login");
    };

    const handleNavClick = (id) => {
        setActiveNav(id);
        if (id === "users") navigate("/admin/users");
    };

    const statusBadge = (status) => {
        const map = {
            active: "bg-green-100 text-green-700",
            done: "bg-blue-100 text-blue-700",
            new: "bg-purple-100 text-purple-700",
        };
        return map[status] || "bg-gray-100 text-gray-600";
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* ── Sidebar ── */}
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
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
                    >
                        <LogOut size={18} />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="ml-64 flex-1 flex flex-col">

                {/* Top Bar */}
                <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-400 text-sm">Welcome back! Here's what's happening.</p>
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
                        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Cycles Over Time</h2>
                                    <p className="text-gray-400 text-sm">Monthly cycle completions</p>
                                </div>
                                <span className="text-xs font-semibold bg-green-100 text-green-600 px-3 py-1 rounded-full">Last 7 months</span>
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
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900">Unit Status</h2>
                                <p className="text-gray-400 text-sm">Current fleet breakdown</p>
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
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="mb-6">
                                <h2 className="text-base font-bold text-gray-900">Daily Energy (kWh)</h2>
                                <p className="text-gray-400 text-sm">This week's consumption</p>
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
                        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
                                    <p className="text-gray-400 text-sm">Latest user actions</p>
                                </div>
                                <button className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-gray-400 text-xs font-semibold uppercase tracking-wide border-b border-gray-100">
                                            <th className="pb-3 text-left">ID</th>
                                            <th className="pb-3 text-left">User</th>
                                            <th className="pb-3 text-left">Action</th>
                                            <th className="pb-3 text-left">Time</th>
                                            <th className="pb-3 text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {recentActivity.map((row) => (
                                            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-3.5 text-gray-400 font-mono text-xs">{row.id}</td>
                                                <td className="py-3.5 font-medium text-gray-800">{row.user}</td>
                                                <td className="py-3.5 text-gray-600">{row.action}</td>
                                                <td className="py-3.5 text-gray-400">{row.time}</td>
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