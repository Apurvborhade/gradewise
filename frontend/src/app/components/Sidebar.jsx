"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Bell, CheckSquare, Calendar, BookOpen, Settings, LogOut, Menu } from "lucide-react"
import { useSidebar } from "@/components/sidebar-provider"
import { useUserLogoutMutation } from "../features/users/usersApi"


export default function Sidebar() {
    const pathname = usePathname()
    const { isOpen, toggle } = useSidebar()
    const [logout] = useUserLogoutMutation()
    const router = useRouter()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIfMobile()
        window.addEventListener("resize", checkIfMobile)

        return () => {
            window.removeEventListener("resize", checkIfMobile)
        }
    }, [])

    const navItems = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Classes",
            href: "/classes",
            icon: BookOpen,
        },
    ]

    const handleLogout = () => {
        logout()
        router.push("/auth/signin");
    }
    if (isMobile && !isOpen) {
        return (
            <button
                className="fixed top-4 left-4 z-50 bg-slate-800 text-white hover:bg-slate-700 p-2 rounded-md"
                onClick={toggle}
            >
                <Menu className="h-5 w-5" />
            </button>
        )
    }

    return (
        <div
            className={`bg-slate-800 text-white transition-all duration-300 z-40 ${isOpen ? "w-64" : "w-0 md:w-20"
                } ${isMobile && !isOpen ? "hidden" : ""}`}
        >
            <div className="flex flex-col h-screen">
                <div className="p-6">
                    <h1 className={`text-2xl font-bold transition-all duration-300 ${!isOpen && "md:opacity-0"}`}>Gradewise</h1>
                    {isMobile && (
                        <button className="absolute top-4 right-4 text-white hover:bg-slate-700 p-2 rounded-md" onClick={toggle}>
                            <Menu className="h-5 w-5" />
                        </button>
                    )}
                </div>

                <nav className="flex-1 px-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center py-3 px-4 rounded-md transition-colors ${pathname === item.href ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-700"
                                        }`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    <span className={`transition-all duration-300 ${!isOpen && "md:hidden"}`}>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 mt-auto">
                    <button className="w-full justify-start text-gray-300 hover:bg-slate-700 hover:text-white flex items-center py-2 px-3 rounded-md" onClick={handleLogout}>
                        <LogOut className="h-5 w-5 mr-3" />
                        <span className={`transition-all duration-300 ${!isOpen && "md:hidden"}`}>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

