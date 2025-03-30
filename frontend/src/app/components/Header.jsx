"use client";
import React, { useEffect } from "react";
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
    useEffect(() => {
        console.log(user)
    },[user])
    return (
        <header className="w-full bg-auto  py-4 px-5 flex items-center justify-between">
            {/* Dashboard Title */}
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

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



