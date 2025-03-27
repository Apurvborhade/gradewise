"use client";
import React from "react";
import useAuth from "../hooks/useAuth";
import { Menu, X } from "lucide-react";
import { useUserLogoutMutation } from "../features/users/usersApi";
import { useRouter } from "next/navigation";

const Header = () => {
    const { user } = useAuth()
    const [logout] = useUserLogoutMutation();
    const router = useRouter();
    
    const handleLogout = () => {
        logout();
        router.push("/auth/signin");
    };
    return (
        <header className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
            {/* Dashboard Title */}
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

            {/* Profile / User Section (Optional) */}
            <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Welcome, {user?.username ? user?.username : 'Unknown'}</span>

                <button onClick={handleLogout} className="text-black block md:hidden stroke-black underline cursor-pointer">
                    Logout
                </button>


            </div>
        </header>
    );
};

export default Header;



