import React from "react";
import { Bell } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const TopBar = ({ title }) => {
    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-8 py-4 flex items-center justify-between sticky top-0 z-10 transition-colors">
            <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
                <DarkModeToggle />

                <button className="relative p-2 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></span>
                </button>
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                    A
                </div>
            </div>
        </header>
    );
};

export default TopBar;
