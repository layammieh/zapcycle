import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, change, positive, color }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex items-center gap-5 transition-colors">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
            <Icon size={26} className="text-white" />
        </div>
        <div className="flex-1">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-0.5">{value}</p>
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${positive ? "text-green-500" : "text-red-400 dark:text-red-500"}`}>
            {positive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {change}
        </div>
    </div>
);

export default StatCard;
