"use client";
import Link from 'next/link';
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useCreateClassMutation, useGetClassesQuery } from '@/app/features/classes/classesApi';
import useAuth from '@/app/hooks/useAuth';
import { Loader } from '@/app/components/Loader';
import AssignmentSection from '@/app/components/dashboard/AssignmentSection';
import { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';

export default function Dashboard() {
    const { user, loading } = useAuth()
    
    const [isOpen, setIsOpen] = useState(false);
    const [className, setClassName] = useState("");
    const [assignmentType, setAssignmentType] = useState("");
    const { data: classes, isLoading, isSuccess, refetch } = useGetClassesQuery({
        userId: user?.uid,
        limit: 3
    }, {
        skip: !user?.uid
    })

    const [createClass, { isLoading: classCreating, error: errorCreatingClass, isSuccess: successCreatingClass }] = useCreateClassMutation()

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle class creation logic (API call or Redux action)
        createClass({ facultyId: user?.uid, className })
    };
    useEffect(() => {
        if (successCreatingClass) {
            setClassName("")
            toast.success('Class created successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }, [classCreating, successCreatingClass])
    if (user?.role === 'student') {
        return (
            <div className="flex h-screen bg-[#eef5ff]">
                {/* Sidebar Component */}
                <Sidebar isOpen={isOpen} />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-auto">
                    {/* Header Component */}
                    <Header />

                    {/* Dashboard Content */}
                    <div className="flex flex-wrap p-6 gap-6">
                        {/* Main Section */}
                        <div className="flex-1 flex flex-col gap-6">
                            <h1 className="text-4xl font-bold text-black">Dashboard</h1>
                            <Link href="/classes" className=' text-black bold'>See All</Link>

                            {/* Subject Cards */}
                            {(isLoading || loading) && <div className={'w-full flex justify-center items-center'}><Loader className={'stroke-black'} /></div>}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {!isLoading && classes && classes.map((subject, index) => (
                                    <div key={index} className="bg-white flex justify-between items-center p-6 shadow-md rounded-xl border border-gray-300">
                                        <h2 className="text-2xl font-bold text-gray-800">{subject.className}</h2>
                                        <Link href={`/classes/${subject.id}`}>
                                            <button className="mt-3 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900 cursor-pointer transition duration-300">
                                                View Class
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Leaderboard & Scores */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Link href="/leaderboard">
                                    <div className="bg-white p-6 shadow-md rounded-xl border border-gray-300 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                                        <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
                                        <p className="text-gray-500">Top students ranking</p>
                                    </div>
                                </Link>
                                <Link href="/scores">
                                    <div className="bg-white p-6 shadow-md rounded-xl border border-gray-300 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                                        <h2 className="text-2xl font-bold text-gray-800">Scores</h2>
                                        <p className="text-gray-500">Weekly performance graph</p>
                                    </div>
                                </Link>
                            </div>

                            {/* Assignments & Reports */}
                            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                                <AssignmentSection />
                            </div>
                        </div>

                    </div>

                    {/* Footer Component */}
                    <Footer />
                </div>
            </div>
        );
    } else {
        return <div className="flex h-screen bg-[#eef5ff]">
            {/* Sidebar Component */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-auto">
                {/* Header Component */}
                <Header />

                {/* Dashboard Content */}
                <div className="flex flex-wrap p-6 gap-6">
                    {/* Main Section */}
                    <div className="flex-1 flex flex-col gap-6">
                        <h1 className="text-4xl font-bold text-black">Dashboard</h1>
                        <Link href="/classes" className=' text-black bold'>See All</Link>

                        {/* Subject Cards */}
                        {(isLoading || loading) && <div className={'w-full flex justify-center items-center'}><Loader className={'stroke-black'} /></div>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {!isLoading && classes && classes.map((subject, index) => (
                                <div key={index} className="bg-white flex justify-between items-center p-6 shadow-md rounded-xl border border-gray-300">
                                    <h2 className="text-2xl font-bold text-gray-800">{subject.className}</h2>
                                    <Link href={`/classes/${subject.id}`}>
                                        <button className="mt-3 bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900 cursor-pointer transition duration-300">
                                            View Class
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Leaderboard & Scores */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Link href="/leaderboard">
                                <div className="bg-white p-6 shadow-md rounded-xl border border-gray-300 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                                    <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
                                    <p className="text-gray-500">Top students ranking</p>
                                </div>
                            </Link>
                            <div className="bg-white p-6 shadow-md rounded-xl border border-gray-300 text-black">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Class</h2>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        placeholder="Enter class name"
                                        value={className}
                                        onChange={(e) => setClassName(e.target.value)}
                                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />

                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex justify-center items-center"
                                    >
                                        {classCreating ? <Loader /> : 'Create Class'}

                                    </button>
                                </form>
                            </div>
                        </div>


                    </div>

                </div>

                {/* Footer Component */}
                <Footer />
            </div>
        </div>
    }

}