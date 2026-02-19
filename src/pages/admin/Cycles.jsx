import React, { useState } from "react";
import {
    Users, TrendingUp, RefreshCw, LogOut, Bell, Settings, LayoutDashboard,
    Search, Filter, MoreVertical, Plus,
    CheckCircle, XCircle, Clock, Package, Recycle,
    ChevronLeft, ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/zapcycle_logo.png";

const cyclesData = [
    {
        id: "CYC-001",
        name: "Mobile Phone Recycling",
        category: "Electronics",
        points: 120,
        status: "active",
        totalCollected: "245 kg",
        created: "Jan 10, 2025",
    },
    {
        id: "CYC-002",
        name: "Laptop & PC Disposal",
        category: "Computers",
        points: 250,
        status: "active",
        totalCollected: "520 kg",
        created: "Jan 18, 2025",
    },
    {
        id: "CYC-003",
        name: "Battery Collection Drive",
        category: "Batteries",
        points: 80,
        status: "pending",
        totalCollected: "110 kg",
        created: "Feb 02, 2025",
    },
    {
        id: "CYC-004",
        name: "Appliance Recycling",
        category: "Home Appliances",
        points: 300,
        status: "inactive",
        totalCollected: "900 kg",
        created: "Dec 20, 2024",
    },
    {
        id: "CYC-005",
        name: "Printer & Ink Recycling",
        category: "Office Equipment",
        points: 150,
        status: "active",
        totalCollected: "180 kg",
        created: "Jan 25, 2025",
    },
    {
        id: "CYC-006",
        name: "TV & Monitor Disposal",
        category: "Electronics",
        points: 220,
        status: "active",
        totalCollected: "640 kg",
        created: "Feb 08, 2025",
    },
];

/* ── Status Config ───────────────────────────── */

const statusConfig = {
    active: { label: "Active", cls: "bg-green-100 text-green-700", icon: CheckCircle },
    inactive: { label: "Inactive", cls: "bg-gray-100 text-gray-500", icon: XCircle },
    pending: { label: "Pending", cls: "bg-yellow-100 text-yellow-700", icon: Clock },
};

const ITEMS_PER_PAGE = 5;

/* ── Cycles Page ───────────────────────────────────────────────── */

const CyclesPage = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState("cycles");
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [openMenu, setOpenMenu] = useState(null);

    const handleNavClick = (id) => {
        setActiveNav(id);
        if (id === "dashboard") navigate("/admin/dashboard");
        if (id === "users") navigate("/admin/users");
        if (id === "cycles") navigate("/admin/cycles");
        if (id === "analytics") navigate("/admin/analytics");
        if (id === "settings") navigate("/admin/settings");
    };

    const handleLogout = () => navigate("/login");

    /* ── Filtering ── */
    const filtered = cyclesData.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.id.toLowerCase().includes(search.toLowerCase()) ||
            c.category.toLowerCase().includes(search.toLowerCase());

        const matchStatus = filterStatus === "all" || c.status === filterStatus;

        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    /* ── Summary Counts ── */
    const counts = {
        total: cyclesData.length,
        active: cyclesData.filter((c) => c.status === "active").length,
        inactive: cyclesData.filter((c) => c.status === "inactive").length,
        pending: cyclesData.filter((c) => c.status === "pending").length,
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* ── Sidebar ── */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm fixed h-full z-10">
                <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
                    <img src={logo} alt="ZapCycle" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-bold text-gray-900">ZapCycle</span>
                </div>

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
                        <h1 className="text-xl font-bold text-gray-900">Cycles</h1>
                        <p className="text-gray-400 text-sm">
                            Manage predefined E-waste recycling cycles.
                        </p>
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

                <div className="p-8 flex flex-col gap-6">

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "Total Cycles", value: counts.total, icon: Package, bg: "bg-blue-50", text: "text-blue-600" },
                            { label: "Active", value: counts.active, icon: CheckCircle, bg: "bg-green-50", text: "text-green-600" },
                            { label: "Inactive", value: counts.inactive, icon: XCircle, bg: "bg-gray-50", text: "text-gray-500" },
                            { label: "Pending", value: counts.pending, icon: Clock, bg: "bg-yellow-50", text: "text-yellow-600" },
                        ].map(({ label, value, icon: Icon, bg, text }) => (
                            <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
                                    <Icon size={22} className={text} />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs font-medium">{label}</p>
                                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">

                            <div className="relative w-full sm:w-72">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search cycle..."
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                                    <Filter size={14} className="text-gray-400" />
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                                        className="bg-transparent text-sm text-gray-600 focus:outline-none"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>

                                <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-green-200">
                                    <Plus size={15} />
                                    Add Cycle
                                </button>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-gray-400 text-xs font-semibold uppercase tracking-wide border-b border-gray-100">
                                        <th className="px-6 py-3 text-left">Cycle</th>
                                        <th className="px-6 py-3 text-left">Category</th>
                                        <th className="px-6 py-3 text-left">Points</th>
                                        <th className="px-6 py-3 text-left">Collected</th>
                                        <th className="px-6 py-3 text-left">Created</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {paginated.map((cycle) => {
                                        const sc = statusConfig[cycle.status];
                                        const StatusIcon = sc.icon;

                                        return (
                                            <tr key={cycle.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                                                            <Recycle size={16} />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{cycle.name}</p>
                                                            <p className="text-gray-400 text-xs font-mono">{cycle.id}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-gray-600 text-xs">{cycle.category}</td>

                                                <td className="px-6 py-4 font-bold text-gray-800">
                                                    {cycle.points} pts
                                                </td>

                                                <td className="px-6 py-4 text-gray-500 text-xs">
                                                    {cycle.totalCollected}
                                                </td>

                                                <td className="px-6 py-4 text-gray-500 text-xs">
                                                    {cycle.created}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.cls}`}>
                                                        <StatusIcon size={12} />
                                                        {sc.label}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-right">
                                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors">
                                                        <MoreVertical size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                            <p className="text-gray-400 text-sm">
                                Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–
                                {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} cycles
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                                >
                                    <ChevronLeft size={14} />
                                </button>

                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                                >
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default CyclesPage;
