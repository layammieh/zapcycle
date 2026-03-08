import React, { useState } from "react";
import {
    Users, TrendingUp, RefreshCw, LogOut, Bell, Settings, LayoutDashboard, Search, Filter, MoreVertical, UserPlus,
    CheckCircle, XCircle, Clock, Mail, Phone, Shield, ChevronLeft, ChevronRight, X, Pencil, Trash2
} from "lucide-react";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import ConfirmationModal from "./components/ConfirmationModal";
import { useNavigate } from "react-router-dom";

// ── Initial Data ──
const initialUsers = [
    { id: "USR-001", name: "Maria Santos", email: "maria.santos@email.com", phone: "+63 912 345 6789", role: "Member", cycles: 42, status: "active", joined: "Jan 12, 2025", avatar: "MS" },
    { id: "USR-002", name: "Juan Dela Cruz", email: "juan.delacruz@email.com", phone: "+63 917 234 5678", role: "Member", cycles: 31, status: "active", joined: "Jan 18, 2025", avatar: "JD" },
    { id: "USR-003", name: "Ana Reyes", email: "ana.reyes@email.com", phone: "+63 918 345 6789", role: "Admin", cycles: 0, status: "active", joined: "Feb 01, 2025", avatar: "AR" },
    { id: "USR-004", name: "Carlo Mendoza", email: "carlo.mendoza@email.com", phone: "+63 919 456 7890", role: "Member", cycles: 18, status: "inactive", joined: "Dec 05, 2024", avatar: "CM" },
    { id: "USR-005", name: "Liza Bautista", email: "liza.bautista@email.com", phone: "+63 920 567 8901", role: "Member", cycles: 57, status: "active", joined: "Nov 22, 2024", avatar: "LB" },
];

const AVATAR_COLORS = [
    "bg-blue-500", "bg-purple-500", "bg-pink-500",
    "bg-indigo-500", "bg-teal-500", "bg-orange-500",
];

const statusConfig = {
    active: { label: "Active", cls: "bg-green-100 text-green-700", icon: CheckCircle },
    inactive: { label: "Inactive", cls: "bg-gray-100 text-gray-500", icon: XCircle },
    pending: { label: "Pending", cls: "bg-yellow-100 text-yellow-700", icon: Clock },
};

const ITEMS_PER_PAGE = 7;

const UsersPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [page, setPage] = useState(1);

    // Modals & Action State
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Data States
    const [activeUser, setActiveUser] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", role: "Member", status: "active" });
    const [confirmAction, setConfirmAction] = useState({ type: '', id: '', title: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            id: `USR-00${users.length + 1}`,
            ...formData,
            phone: "+63 --- --- ----",
            cycles: 0,
            joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
        };
        setUsers([newUser, ...users]);
        setShowAddModal(false);
        setFormData({ name: "", email: "", role: "Member", status: "active" });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedAvatar = formData.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
        setUsers(users.map(u => (u.id === activeUser.id ? { ...u, ...formData, avatar: updatedAvatar } : u)));
        setShowEditModal(false);
        setActiveUser(null);
        setFormData({ name: "", email: "", role: "Member", status: "active" });
    };

    const startEdit = (user) => {
        setActiveUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
        setShowEditModal(true);
    };

    const confirmDelete = (id, name) => {
        setConfirmAction({
            type: 'delete',
            id,
            title: 'Delete User',
            message: `Are you sure you want to permanently delete ${name}? This action cannot be undone.`
        });
        setShowConfirmModal(true);
    };

    const confirmToggleStatus = (user) => {
        const isSuspending = user.status === 'active';
        setConfirmAction({
            type: 'status',
            id: user.id,
            title: isSuspending ? 'Suspend User' : 'Activate User',
            message: `Are you sure you want to ${isSuspending ? 'suspend' : 'activate'} ${user.name}?`
        });
        setShowConfirmModal(true);
    };

    const handleConfirmAction = () => {
        if (confirmAction.type === 'delete') {
            setUsers(users.filter(u => u.id !== confirmAction.id));
        } else if (confirmAction.type === 'status') {
            setUsers(users.map(u =>
                u.id === confirmAction.id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
            ));
        }
        setShowConfirmModal(false);
    };

    const filtered = users.filter((u) => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.id.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || u.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors text-gray-900 dark:text-gray-100">
            <Navbar activeNav="users" />

            <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
                <TopBar title="User Management" />

                <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
                    {/* Toolbar */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="relative w-full sm:w-80">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-transparent text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all dark:bg-gray-800/20"
                                />
                            </div>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="bg-[#37B26C] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-600 transition-all flex items-center gap-2 shadow-lg shadow-green-100 dark:shadow-none active:scale-95"
                            >
                                <UserPlus size={16} /> Add User
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wide border-b border-gray-100 dark:border-gray-800 text-left">
                                        <th className="px-6 py-4">User Details</th>
                                        <th className="px-6 py-4 text-center">Role</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4">Joined</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50 text-gray-700 dark:text-gray-300">
                                    {paginated.map(user => {
                                        const sc = statusConfig[user.status];
                                        const StatusIcon = sc.icon;
                                        return (
                                            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs bg-gradient-to-br from-green-500 to-green-600 shadow-sm`}>
                                                            {user.avatar}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</div>
                                                            <div className="text-xs text-gray-400">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold tracking-tight ${user.role === 'Admin' ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${sc.cls}`}>
                                                            <StatusIcon size={12} /> {sc.label}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-semibold text-gray-400">{user.joined}</td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2 transition-all">
                                                        <button
                                                            onClick={() => startEdit(user)}
                                                            className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400 hover:text-[#37B26C] rounded-lg transition-colors border border-transparent hover:border-green-100 dark:hover:border-green-900/30"
                                                            title="Edit Details"
                                                        ><Pencil size={15} /></button>
                                                        <button
                                                            onClick={() => confirmToggleStatus(user)}
                                                            className={`p-2 rounded-lg transition-colors border border-transparent ${user.status === 'active' ? 'text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-100 dark:hover:border-orange-900/30' : 'text-green-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-100 dark:hover:border-green-900/30'}`}
                                                            title={user.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                                                        ><Shield size={15} /></button>
                                                        <button
                                                            onClick={() => confirmDelete(user.id, user.name)}
                                                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30" title="Delete User"
                                                        ><Trash2 size={15} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmAction}
                title={confirmAction.title}
                message={confirmAction.message}
                type={confirmAction.type === 'delete' ? 'danger' : 'warning'}
                confirmText={confirmAction.type === 'delete' ? 'Delete' : (confirmAction.title.includes('Suspend') ? 'Suspend' : 'Activate')}
            />

            {/* Add / Edit User Modal */}
            {(showAddModal || showEditModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-800 scale-in-center">
                        <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-[#37B26C] to-green-400 bg-clip-text text-transparent">
                                {showEditModal ? 'Update User' : 'Add System User'}
                            </h3>
                            <button onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full text-gray-400 transition-colors"><X size={20} /></button>
                        </div>
                        <form onSubmit={showEditModal ? handleEditSubmit : handleAddSubmit} className="p-8 flex flex-col gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-transparent dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all" placeholder="Enter full name" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-transparent dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all" placeholder="user@example.com" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Role</label>
                                    <select name="role" value={formData.role} onChange={handleInputChange} className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all">
                                        <option value="Member">Member</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Status</label>
                                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all">
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button type="button" onClick={() => { setShowAddModal(false); setShowEditModal(false); }} className="flex-1 px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-800 transition-all active:scale-95">Cancel</button>
                                <button type="submit" className="flex-1 px-5 py-3 rounded-2xl bg-[#37B26C] text-white text-sm font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-100 dark:shadow-none active:scale-95">
                                    {showEditModal ? 'Update User' : 'Save User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
