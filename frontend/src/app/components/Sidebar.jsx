"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserLogoutMutation } from "../features/users/usersApi";
import { Menu, X } from "lucide-react";

const Sidebar = ({isOpen}) => {
    const router = useRouter();
    const [logout] = useUserLogoutMutation();

    const menuItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Classes", path: "/classes" },
        { name: "Logout", path: "/auth/signin", isLogout: true },
    ];

    const handleLogout = () => {
        logout();
        router.push("/auth/signin");
    };

    return (
        <>
            {/* Mobile Header */}
            {isOpen && (
                <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4 shadow-lg">
                    <h1 className="text-xl font-extrabold">Gradewise</h1>
                </div>
            )}
            
            {/* Sidebar for Desktop & Mobile */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg transform transition-transform duration-300 z-50 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex`}
            >
                {/* Logo */}
                <div className="p-6 hidden md:block">
                    <h1 className="text-2xl font-extrabold tracking-wide">Gradewise</h1>
                </div>

                {/* Mobile Logo */}
                <div className="p-6 md:hidden">
                    <h1 className="text-2xl font-extrabold tracking-wide">Gradewise</h1>
                </div>

                {/* Menu */}
                <nav className="flex-1">
                    <ul className="space-y-4 px-6">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                className={`cursor-pointer text-lg font-medium transition duration-300 
                                ${item.isLogout ? "text-red-400 hover:text-red-600" : "hover:text-yellow-400"}`}
                                onClick={() => {
                                    if (item.isLogout) handleLogout();
                                    else router.push(item.path); // Close menu on mobile click
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Overlay when mobile sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                />
            )}
        </>
    );
};

export default Sidebar;
