import React from "react";
import { useRouter } from "next/navigation";
import { useUserLogoutMutation } from "../features/users/usersApi";


const Sidebar = () => {
    const router = useRouter();
    const [logout, { isLoading, isSuccess, error, isError }] = useUserLogoutMutation()
    const menuItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Classes", path: "/classes" },
        { name: "Logout", path: "/auth/signin", isLogout: true }, // Added Logout
    ];


    // Logout Function
    const handleLogout = () => {
        logout()
        router.push("/auth/signin");
    };

    return (
        <div className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
            {/* Logo / Brand Name */}
            <div className="p-6">
                <h1 className="text-2xl font-extrabold tracking-wide">Gradewise</h1>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1">
                <ul className="space-y-4 px-6">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer text-lg font-medium transition duration-300 ${item.isLogout ? "text-red-400 hover:text-red-600" : "hover:text-yellow-400"
                                }`}
                            onClick={() => (item.isLogout ? handleLogout() : router.push(item.path))}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;