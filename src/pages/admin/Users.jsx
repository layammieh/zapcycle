import React, { useState } from "react";
import {
    Users, TrendingUp, RefreshCw, LogOut, Bell, Settings, LayoutDashboard, Search, Filter, MoreVertical, UserPlus,
    CheckCircle, XCircle, Clock, Mail, Phone, Shield, ChevronLeft, ChevronRight,
} from "lucide-react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

const usersData = [
    { id: "USR-001", name: "Maria Santos", email: "maria.santos@email.com", phone: "+63 912 345 6789", role: "Member", cycles: 42, status: "active", joined: "Jan 12, 2025", avatar: "MS" },
    { id: "USR-002", name: "Juan Dela Cruz", email: "juan.delacruz@email.com", phone: "+63 917 234 5678", role: "Member", cycles: 31, status: "active", joined: "Jan 18, 2025", avatar: "JD" },
    { id: "USR-003", name: "Ana Reyes", email: "ana.reyes@email.com", phone: "+63 918 345 6789", role: "Admin", cycles: 0, status: "active", joined: "Feb 01, 2025", avatar: "AR" },
    { id: "USR-004", name: "Carlo Mendoza", email: "carlo.mendoza@email.com", phone: "+63 919 456 7890", role: "Member", cycles: 18, status: "inactive", joined: "Dec 05, 2024", avatar: "CM" },
    { id: "USR-005", name: "Liza Bautista", email: "liza.bautista@email.com", phone: "+63 920 567 8901", role: "Member", cycles: 57, status: "active", joined: "Nov 22, 2024", avatar: "LB" },
    { id: "USR-006", name: "Ramon Torres", email: "ramon.torres@email.com", phone: "+63 921 678 9012", role: "Member", cycles: 9, status: "pending", joined: "Feb 10, 2025", avatar: "RT" },
    { id: "USR-007", name: "Grace Villanueva", email: "grace.villanueva@email.com", phone: "+63 922 789 0123", role: "Member", cycles: 74, status: "active", joined: "Oct 14, 2024", avatar: "GV" },
    { id: "USR-008", name: "Paolo Ocampo", email: "paolo.ocampo@email.com", phone: "+63 923 890 1234", role: "Member", cycles: 3, status: "inactive", joined: "Feb 14, 2025", avatar: "PO" },
    { id: "USR-009", name: "Celine Castro", email: "celine.castro@email.com", phone: "+63 924 901 2345", role: "Member", cycles: 29, status: "active", joined: "Jan 30, 2025", avatar: "CC" },
    { id: "USR-010", name: "Marco Ramos", email: "marco.ramos@email.com", phone: "+63 925 012 3456", role: "Member", cycles: 11, status: "pending", joined: "Feb 16, 2025", avatar: "MR" },
];

const AVATAR_COLORS = [
    "bg-blue-500", "bg-purple-500", "bg-pink-500",
    "bg-indigo-500", "bg-teal-500", "bg-orange-500",
    "bg-cyan-500", "bg-rose-500", "bg-amber-500", "bg-lime-500",
];

const statusConfig = {
    active: { label: "Active", cls: "bg-green-100 text-green-700", icon: CheckCircle },
    inactive: { label: "Inactive", cls: "bg-gray-100 text-gray-500", icon: XCircle },
    pending: { label: "Pending", cls: "bg-yellow-100 text-yellow-700", icon: Clock },
};

const ITEMS_PER_PAGE = 7;

// ── Users Page ────────────────────────────────────────────────────────────────
const UsersPage = () => {
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState("users");
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [openMenu, setOpenMenu] = useState(null);

    // Filter & search
    const filtered = usersData.filter((u) => {
        const matchSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || u.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    // Summary counts
    const counts = {
        total: usersData.length,
        active: usersData.filter((u) => u.status === "active").length,
        inactive: usersData.filter((u) => u.status === "inactive").length,
        pending: usersData.filter((u) => u.status === "pending").length,
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Navbar activeNav="users" />

            {/* ── Main Content ── */}
            <main className="ml-64 flex-1 flex flex-col">

                {/* Top Bar */}
                <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Users</h1>
                        <p className="text-gray-400 text-sm">Manage and monitor all registered users.</p>
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
                <div className="p-8 flex flex-col gap-6">

                    {/* ── Summary Cards ── */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: "Total Users", value: counts.total, bg: "bg-blue-50", text: "text-blue-600", icon: Users },
                            { label: "Active", value: counts.active, bg: "bg-green-50", text: "text-green-600", icon: CheckCircle },
                            { label: "Inactive", value: counts.inactive, bg: "bg-gray-50", text: "text-gray-500", icon: XCircle },
                            { label: "Pending", value: counts.pending, bg: "bg-yellow-50", text: "text-yellow-600", icon: Clock },
                        ].map(({ label, value, bg, text, icon: Icon }) => (
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

                    {/* ── Table Card ── */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">

                        {/* Table Header / Filters */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">
                            {/* Search */}
                            <div className="relative w-full sm:w-72">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email or ID…"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-700 placeholder-gray-400"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Status filter */}
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

                                {/* Add User */}
                                <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-green-200">
                                    <UserPlus size={15} />
                                    Add User
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-gray-400 text-xs font-semibold uppercase tracking-wide border-b border-gray-100">
                                        <th className="px-6 pb-3 pt-4 text-left">User</th>
                                        <th className="px-6 pb-3 pt-4 text-left">Contact</th>
                                        <th className="px-6 pb-3 pt-4 text-left">Role</th>
                                        <th className="px-6 pb-3 pt-4 text-left">Cycles</th>
                                        <th className="px-6 pb-3 pt-4 text-left">Joined</th>
                                        <th className="px-6 pb-3 pt-4 text-left">Status</th>
                                        <th className="px-6 pb-3 pt-4 text-left"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {paginated.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="py-12 text-center text-gray-400 text-sm">
                                                No users found matching your search.
                                            </td>
                                        </tr>
                                    ) : paginated.map((user, idx) => {
                                        const sc = statusConfig[user.status];
                                        const StatusIcon = sc.icon;
                                        const colorIdx = (parseInt(user.id.replace("USR-", "")) - 1) % AVATAR_COLORS.length;
                                        return (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors relative">
                                                {/* User */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold ${AVATAR_COLORS[colorIdx]}`}>
                                                            {user.avatar}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{user.name}</p>
                                                            <p className="text-gray-400 text-xs font-mono">{user.id}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Contact */}
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="flex items-center gap-1.5 text-gray-600 text-xs">
                                                            <Mail size={12} className="text-gray-400" /> {user.email}
                                                        </span>
                                                        <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                                                            <Phone size={12} /> {user.phone}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Role */}
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${user.role === "Admin" ? "bg-purple-100 text-purple-600" : "bg-blue-50 text-blue-600"}`}>
                                                        {user.role === "Admin" && <Shield size={11} />}
                                                        {user.role}
                                                    </span>
                                                </td>

                                                {/* Cycles */}
                                                <td className="px-6 py-4">
                                                    <span className="font-bold text-gray-800">{user.cycles}</span>
                                                    <span className="text-gray-400 text-xs ml-1">cycles</span>
                                                </td>

                                                {/* Joined */}
                                                <td className="px-6 py-4 text-gray-500 text-xs">{user.joined}</td>

                                                {/* Status */}
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.cls}`}>
                                                        <StatusIcon size={12} />
                                                        {sc.label}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 relative">
                                                    <button
                                                        onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                                    >
                                                        <MoreVertical size={16} />
                                                    </button>
                                                    {openMenu === user.id && (
                                                        <div className="absolute right-6 top-10 w-40 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                                                            <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">View Profile</button>
                                                            <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Edit User</button>
                                                            <button className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">Deactivate</button>
                                                        </div>
                                                    )}
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
                                Showing <span className="font-semibold text-gray-700">{Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="font-semibold text-gray-700">{filtered.length}</span> users
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft size={14} />
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${page === p ? "bg-green-500 text-white shadow-sm" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages || totalPages === 0}
                                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Click-outside to close menu */}
            {openMenu && (
                <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
            )}
        </div>
    );
};

export default UsersPage;
