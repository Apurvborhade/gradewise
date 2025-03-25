"use client"; // ✅ Must be the first line

import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import useAuth from "@/app/hooks/useAuth";
import { useGetClassesQuery } from "@/app/features/classes/classesApi";
import { Loader } from "@/app/components/Loader";
import { useState } from "react";
import Link from "next/link";

export default function Faculty() {
    const { user, loading } = useAuth();
    const [limit, setLimit] = useState(4);
    const { data: classes, isLoading } = useGetClassesQuery({ userId: user?.uid, limit }, {
        skip: !user?.uid
    });

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <div className="flex-1 p-6">
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">🎓 All Classes</h1>
                        {(isLoading || loading) && <div className='w-full flex justify-center items-center'><Loader className='stroke-black' /></div>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {!isLoading && classes && classes.map((subject, index) => (
                                <div key={index} className="bg-white p-6 shadow-md rounded-xl border border-gray-300 transition-transform transform hover:scale-105">
                                    <h2 className="text-2xl font-bold text-gray-800">{subject.className}</h2>
                                    <p className="text-gray-500">Started 05.03.2025</p>
                                    <Link href={`/classes/${subject.id}`}>
                                        <button className="mt-3 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                            View
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex items-center justify-end">
                            <label htmlFor="limit" className="mr-2 font-semibold text-black">Classes to Show:</label>
                            <input
                                type="number"
                                id="limit"
                                className="border border-gray-400 text-black rounded-md px-2 py-1 w-20"
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value) || 4)}
                                min={4}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
