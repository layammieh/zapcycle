import React from "react";
import { X, AlertTriangle, Shield, Trash2, CheckCircle2 } from "lucide-react";

/**
 * A reusable confirmation modal for dangerous or sensitive actions.
 * @param {boolean} isOpen - Whether the modal is visible.
 * @param {function} onClose - Function to call when user cancels.
 * @param {function} onConfirm - Function to call when user confirms.
 * @param {string} title - The title of the modal.
 * @param {string} message - The description text.
 * @param {string} confirmText - Text for the confirm button.
 * @param {'danger' | 'warning' | 'success' | 'info'} type - Visual style.
 * @param {React.ReactNode} icon - Optional Lucide icon component.
 */
const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    type = "danger",
    icon
}) => {
    if (!isOpen) return null;

    const typeStyles = {
        danger: {
            bg: "bg-red-50 dark:bg-red-900/10",
            icon: "text-red-600 dark:text-red-400",
            button: "bg-red-500 hover:bg-red-600 shadow-red-100",
            border: "border-red-100 dark:border-red-900/30",
            defaultIcon: <Trash2 size={24} />
        },
        warning: {
            bg: "bg-orange-50 dark:bg-orange-900/10",
            icon: "text-orange-600 dark:text-orange-400",
            button: "bg-orange-500 hover:bg-orange-600 shadow-orange-100",
            border: "border-orange-100 dark:border-orange-900/30",
            defaultIcon: <AlertTriangle size={24} />
        },
        success: {
            bg: "bg-green-50 dark:bg-green-900/10",
            icon: "text-green-600 dark:text-green-400",
            button: "bg-[#37B26C] hover:bg-green-600 shadow-green-100",
            border: "border-green-100 dark:border-green-900/30",
            defaultIcon: <CheckCircle2 size={24} />
        },
        info: {
            bg: "bg-blue-50 dark:bg-blue-900/10",
            icon: "text-blue-600 dark:text-blue-400",
            button: "bg-blue-500 hover:bg-blue-600 shadow-blue-100",
            border: "border-blue-100 dark:border-blue-900/30",
            defaultIcon: <Shield size={24} />
        }
    };

    const style = typeStyles[type];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100 dark:border-gray-800 scale-in-center">
                <div className="relative p-8 flex flex-col items-center text-center">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Icon */}
                    <div className={`${style.bg} ${style.icon} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                        {icon || style.defaultIcon}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 px-2">{message}</p>

                    <div className="flex w-full gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-sm font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`flex-1 px-6 py-3 rounded-2xl ${style.button} text-white text-sm font-bold transition-all shadow-lg dark:shadow-none active:scale-95`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
