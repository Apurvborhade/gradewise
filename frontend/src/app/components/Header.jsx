"use client";
import React from "react";

const Header = () => {
    return (
        <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
            {/* Dashboard Title */}
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search..."
                className="border rounded-md py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Profile / User Section (Optional) */}
            <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Welcome, User</span>
                <img
                    src="https://i.pravatar.cc/100"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />


            </div>
        </header>
    );
};

export default Header;



