import React, { useState } from "react";
import {
    Users, CheckCircle, XCircle, Clock, Search, TrendingUp, MoreVertical,
    ShieldCheck, ShieldAlert, Mail, UserCheck, Settings, Shield, Pencil, Trash2, X, Globe, Plus, Building2
} from "lucide-react";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import ConfirmationModal from "./components/ConfirmationModal";

// ── Initial Collectors Data ──
const initialCollectors = [
    { id: "COL-001", name: "RecyclePros Inc.", business: "Green Waste Solutions", contact: "+63 912 888 7777", pickups: 156, status: "active", joined: "Dec 10, 2024", verified: true },
    { id: "COL-002", name: "EcoPick Services", business: "EcoPick Ltd.", contact: "+63 917 555 4444", pickups: 89, status: "pending", joined: "Jan 05, 2025", verified: false },
    { id: "COL-003", name: "Metro E-Waste", business: "Metro Junkshops", contact: "+63 918 222 1111", pickups: 210, status: "active", joined: "Nov 22, 2024", verified: true },
    { id: "COL-004", name: "Junkyard Heroes", business: "Heroes Collect", contact: "+63 919 999 0000", pickups: 42, status: "inactive", joined: "Feb 15, 2025", verified: false },
];

const statusConfig = {
    active: { label: "Active", cls: "bg-green-100 text-green-700", icon: CheckCircle },
    inactive: { label: "Suspended", cls: "bg-red-100 text-red-700", icon: XCircle },
    pending: { label: "Pending", cls: "bg-yellow-100 text-yellow-700", icon: Clock },
};

const Collectors = () => {
    const [collectors, setCollectors] = useState(initialCollectors);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Modals & Action State
    const [showEditModal, setShowEditModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Data States
    const [activeCollector, setActiveCollector] = useState(null);
    const [formData, setFormData] = useState({ name: "", business: "", contact: "", status: "active" });
    const [confirmAction, setConfirmAction] = useState({ type: '', id: '', title: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        setCollectors(collectors.map(c => (c.id === activeCollector.id ? { ...c, ...formData } : c)));
        setShowEditModal(false);
        setActiveCollector(null);
    };

    const startEdit = (collector) => {
        setActiveCollector(collector);
        setFormData({ name: collector.name, business: collector.business, contact: collector.contact, status: collector.status });
        setShowEditModal(true);
    };

    const confirmDelete = (id, business) => {
        setConfirmAction({
            type: 'delete',
            id,
            title: 'Remove Collector',
            message: `Are you sure you want to remove ${business}? All associated pickup data will be archived.`
        });
        setShowConfirmModal(true);
    };

    const confirmToggleStatus = (col) => {
        const isSuspending = col.status === 'active';
        setConfirmAction({
            type: 'status',
            id: col.id,
            title: isSuspending ? 'Suspend Collector' : 'Activate Collector',
            message: `This will ${isSuspending ? 'prevent' : 'allow'} ${col.business} from accepting new pickup requests.`
        });
        setShowConfirmModal(true);
    };

    const handleConfirmAction = () => {
        if (confirmAction.type === 'delete') {
            setCollectors(collectors.filter(c => c.id !== confirmAction.id));
        } else if (confirmAction.type === 'status') {
            setCollectors(collectors.map(c =>
                c.id === confirmAction.id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c
            ));
        }
        setShowConfirmModal(false);
    };

    const filtered = collectors.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.business.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || c.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors text-gray-900 dark:text-gray-100">
            <Navbar activeNav="collectors" />

            <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
                <TopBar title="Collectors Oversight" />

                <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
                    {/* Toolbar */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="relative w-full sm:w-80">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search business or name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-transparent text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all dark:bg-gray-800/20"
                                />
                            </div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="text-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-400 text-gray-700 dark:text-gray-200 transition-all font-semibold"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="inactive">Suspended</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wide border-b border-gray-100 dark:border-gray-800 text-left">
                                        <th className="px-6 py-4">Collector / Business</th>
                                        <th className="px-6 py-4">Contact Detail</th>
                                        <th className="px-6 py-4 text-center">Pickups</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50 text-gray-700 dark:text-gray-300">
                                    {filtered.map(col => {
                                        const sc = statusConfig[col.status];
                                        const StatusIcon = sc.icon;
                                        return (
                                            <tr key={col.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                                                            {col.name}
                                                            {col.verified && <ShieldCheck size={14} className="text-blue-500" />}
                                                        </span>
                                                        <span className="text-xs text-gray-400">{col.business}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-medium">{col.contact}</td>
                                                <td className="px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-300">{col.pickups}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${sc.cls}`}>
                                                        <StatusIcon size={12} /> {sc.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2 transition-all">
                                                        <button
                                                            onClick={() => startEdit(col)}
                                                            className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400 hover:text-[#37B26C] rounded-lg transition-colors border border-transparent hover:border-green-100 dark:hover:border-green-900/30"
                                                            title="Edit Info"
                                                        ><Pencil size={15} /></button>
                                                        <button
                                                            onClick={() => confirmToggleStatus(col)}
                                                            className={`p-2 rounded-lg transition-colors border border-transparent ${col.status === 'active' ? 'text-orange-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-100 dark:hover:border-orange-900/30' : 'text-green-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-100 dark:hover:border-green-900/30'}`}
                                                            title={col.status === 'active' ? 'Suspend Collector' : 'Activate Collector'}
                                                        ><Shield size={15} /></button>
                                                        <button
                                                            onClick={() => confirmDelete(col.id, col.business)}
                                                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30" title="Delete Collector"
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

            {/* Edit Collector Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-800 scale-in-center">
                        <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-[#37B26C] to-green-400 bg-clip-text text-transparent">Update Collector</h3>
                            <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full text-gray-400 transition-colors"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="p-8 flex flex-col gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Person</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-transparent dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Business Name</label>
                                <input type="text" name="business" required value={formData.business} onChange={handleInputChange} className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-transparent dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Contact Number</label>
                                <input type="text" name="contact" required value={formData.contact} onChange={handleInputChange} className="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-transparent dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all" />
                            </div>
                            <div className="flex gap-4 mt-4">
                                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-800 transition-all active:scale-95">Cancel</button>
                                <button type="submit" className="flex-1 px-5 py-3 rounded-2xl bg-[#37B26C] text-white text-sm font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-100 dark:shadow-none active:scale-95">Update Information</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Collectors;
