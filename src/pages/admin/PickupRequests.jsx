import React, { useState } from "react";
import {
    Clock, CheckCircle, XCircle, Search, Trash2, Eye, Filter,
    Smartphone, HardDrive, Battery, Laptop, X, Calendar, User, Truck, Package, Info
} from "lucide-react";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import ConfirmationModal from "./components/ConfirmationModal";

// ── Initial Pickup Requests Data ──
const initialRequests = [
    { id: "REQ-001", user: "Maria Santos", collector: "RecyclePros Inc.", category: "Working", item: "iPhone 13", status: "completed", date: "Feb 12, 2025", icon: Smartphone, description: "Battery health 85%, screen intact. Includes original box.", address: "Unit 402, Green Residence, Quezon City" },
    { id: "REQ-002", user: "Juan Dela Cruz", collector: "Metro E-Waste", category: "Broken", item: "Laptop Monitor", status: "accepted", date: "Feb 20, 2025", icon: Laptop, description: "Dead pixels on the left side. 14-inch Dell monitor.", address: "15-B Sunflower St., Pasig City" },
    { id: "REQ-003", user: "Ana Reyes", collector: "None", category: "Scrap", item: "Old HardDrive", status: "pending", date: "Feb 28, 2025", icon: HardDrive, description: "500GB HDD, clicking sound. End of life.", address: "789 Blue Ave, Makati City" },
    { id: "REQ-004", user: "Carlo Mendoza", collector: "None", category: "Scrap", item: "Li-ion Battery", status: "cancelled", date: "Mar 01, 2025", icon: Battery, description: "Swollen battery from an old power bank.", address: "Block 4 Lot 10, Spring Village, Taguig" },
];

const statusConfig = {
    completed: { label: "Completed", cls: "bg-green-100 text-green-700", icon: CheckCircle },
    accepted: { label: "Accepted", cls: "bg-blue-100 text-blue-700", icon: Clock },
    pending: { label: "Pending", cls: "bg-yellow-100 text-yellow-700", icon: Clock },
    cancelled: { label: "Cancelled", cls: "bg-gray-100 text-gray-400", icon: XCircle },
};

const PickupRequests = () => {
    const [requests, setRequests] = useState(initialRequests);
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");

    // Modal States
    const [showViewModal, setShowViewModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedReq, setSelectedReq] = useState(null);

    const filtered = requests.filter(r => {
        const matchSearch = r.user.toLowerCase().includes(search.toLowerCase()) ||
            r.item.toLowerCase().includes(search.toLowerCase()) ||
            r.id.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCategory === "all" || r.category === filterCategory;
        return matchSearch && matchCat;
    });

    const openViewModal = (req) => {
        setSelectedReq(req);
        setShowViewModal(true);
    };

    const openDeleteConfirm = (req) => {
        setSelectedReq(req);
        setShowConfirmModal(true);
    };

    const handleDelete = () => {
        setRequests(prev => prev.filter(r => r.id !== selectedReq.id));
        setShowConfirmModal(false);
        setSelectedReq(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex transition-colors text-gray-900 dark:text-gray-100">
            <Navbar activeNav="requests" />
            <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
                <TopBar title="Pickup Requests Oversight" />

                <div className="p-8 flex flex-col gap-6 flex-1 overflow-auto">
                    {/* Header Controls */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="relative w-full sm:w-80">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search by ID, user or item..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 bg-transparent text-sm focus:ring-2 focus:ring-green-400 outline-none text-gray-700 dark:text-gray-200 transition-all dark:bg-gray-800/20"
                                />
                            </div>
                            <div className="flex gap-3">
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="text-sm border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-400 shadow-sm bg-transparent dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold transition-all"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="Working">Working</option>
                                    <option value="Broken">Broken</option>
                                    <option value="Scrap">Scrap</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Table View */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wide border-b border-gray-100 dark:border-gray-800 text-left">
                                        <th className="px-6 py-4">Request ID</th>
                                        <th className="px-6 py-4">E-Waste Item</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Date Posted</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                                    {filtered.map((req) => {
                                        const sc = statusConfig[req.status];
                                        const StatusIcon = sc.icon;
                                        const ItemIcon = req.icon;
                                        return (
                                            <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                                <td className="px-6 py-4 text-xs font-bold text-[#37B26C]">{req.id}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-green-50 dark:bg-green-900/10 rounded-lg">
                                                            <ItemIcon size={16} className="text-[#37B26C]" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-gray-900 dark:text-gray-100">{req.item}</span>
                                                            <span className="text-[10px] text-gray-400 uppercase tracking-tight">{req.category}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-medium">{req.user}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${sc.cls}`}>
                                                        <StatusIcon size={12} />
                                                        {sc.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-semibold text-gray-400">{req.date}</td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2 transition-all">
                                                        <button
                                                            onClick={() => openViewModal(req)}
                                                            className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400 hover:text-[#37B26C] rounded-lg transition-colors border border-transparent hover:border-green-100 dark:hover:border-green-900/30"
                                                            title="View Details"
                                                        ><Eye size={15} /></button>
                                                        <button
                                                            onClick={() => openDeleteConfirm(req)}
                                                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
                                                            title="Delete Request"
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

            {/* View Details Modal */}
            {showViewModal && selectedReq && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100 dark:border-gray-800 scale-in-center">
                        <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/30">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-[#37B26C] rounded-2xl text-white shadow-lg shadow-green-100 dark:shadow-none">
                                    <selectedReq.icon size={22} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Request Details</h3>
                                    <p className="text-xs font-bold text-[#37B26C] tracking-widest">{selectedReq.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-full text-gray-400 shadow-sm border border-transparent hover:border-gray-100 transition-all"><X size={20} /></button>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1"><Package size={12} /> E-Waste Item</label>
                                    <div className="px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-sm font-semibold">{selectedReq.item}</div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1"><User size={12} /> Posted By</label>
                                    <div className="px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-sm font-semibold">{selectedReq.user}</div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1"><Calendar size={12} /> Posting Date</label>
                                    <div className="px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-sm font-semibold">{selectedReq.date}</div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1"><Truck size={12} /> Assigned Collector</label>
                                    <div className={`px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-sm font-bold ${selectedReq.collector === 'None' ? 'text-gray-400' : 'text-blue-500'}`}>{selectedReq.collector}</div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1"><Info size={12} /> Item Status</label>
                                    <div className="px-2">
                                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight ${statusConfig[selectedReq.status].cls}`}>
                                            {React.createElement(statusConfig[selectedReq.status].icon, { size: 14 })}
                                            {statusConfig[selectedReq.status].label}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-Waste Category</label>
                                    <div className="px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-sm font-semibold">{selectedReq.category}</div>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Item Description & Address</label>
                                <div className="px-5 py-4 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-sm leading-relaxed">
                                    <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">{selectedReq.description}</p>
                                    <p className="text-xs text-gray-500 italic">{selectedReq.address}</p>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-50 dark:border-gray-800 flex justify-end">
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="px-8 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-sm font-bold hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                            >Close Preview</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {selectedReq && (
                <ConfirmationModal
                    isOpen={showConfirmModal}
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handleDelete}
                    title="Delete Pickup Request"
                    message={`Are you sure you want to delete ${selectedReq.id}? This will permanently remove the record for ${selectedReq.item} by ${selectedReq.user}.`}
                    type="danger"
                    confirmText="Delete Record"
                />
            )}
        </div>
    );
};

export default PickupRequests;
