"use client";
import Link from 'next/link';
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useCreateClassMutation, useGetClassesQuery, useGetLeaderboardQuery } from '@/app/features/classes/classesApi';
import useAuth from '@/app/hooks/useAuth';
import { Loader } from '@/app/components/Loader';
import AssignmentSection from '@/app/components/dashboard/AssignmentSection';
import { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';

export default function Dashboard() {
    const { user, loading } = useAuth()
    const { data: leaderboardStudents, isLoading: LeaderboardLoading, isSuccess: LeaderboardSuccess } = useGetLeaderboardQuery()
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle class creation logic (API call or Redux action)

        const response = await createClass({ facultyId: user?.user_id, className }).unwrap()
        console.log(user?.user_id)
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

    useEffect(() => {
        console.log(user)
    }, [user])
    const leaderboard = [
        { id: 1, name: "James Anderson", avatar: "/placeholder.svg?height=40&width=40", score: 360 },
        { id: 2, name: "Olivia Bennett", avatar: "/placeholder.svg?height=40&width=40", score: 320 },
        { id: 3, name: "Ethan Miller", avatar: "/placeholder.svg?height=40&width=40", score: 290 },
        { id: 4, name: "Lucas Wright", avatar: "/placeholder.svg?height=40&width=40", score: 275 },
        { id: 5, name: "Emma Carter", avatar: "/placeholder.svg?height=40&width=40", score: 250 },
    ]


    if (user?.role === 'student') {
        return (
            <div className="flex h-screen bg-[#eef5ff]">
                {/* Sidebar Component */}
                <Sidebar  />

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
                                    <div key={index} className="bg-white flex flex-col justify-between items-start p-6 shadow-md rounded-xl border border-gray-300">
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
                            <div className="grid grid-cols-1 sm:grid-cols-auto gap-6">
                                <div className="card bg-white text-black p-4  border-gray-600 rounded-md">
                                    <div className="card-header">
                                        <h3 className="card-title font-bold text-2xl">Leaderboard</h3>
                                    </div>
                                    <div className="card-content">
                                        <div className="flex justify-center mb-4">
                                            <div className="relative h-32 w-32">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-2xl font-bold text-blue-500">{user ? user.xp : 0}</span>
                                                </div>
                                                <svg className="h-full w-full" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="none"
                                                        stroke="#3b82f6"
                                                        strokeWidth="10"
                                                        strokeDasharray="251.2"
                                                        strokeDashoffset={user ? `${user.xp}` : '30'}
                                                        transform="rotate(-90 50 50)"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="grid grid-cols-12 text-sm font-medium pb-1">
                                                <div className="col-span-1">#</div>
                                                <div className="col-span-7">Student</div>
                                                <div className="col-span-4 text-right">Score</div>
                                            </div>

                                            {leaderboardStudents && leaderboardStudents.length === 0 && <p>No Students in leaderboard :(</p>}
                                            {leaderboardStudents && leaderboardStudents.map((student, index) => (
                                                <div
                                                    key={student.id}
                                                    className="grid grid-cols-12 items-center py-2 px-2 rounded-md text-sm bg-white"
                                                >
                                                    <div className="col-span-1 font-medium">{index + 1}</div>
                                                    <div className="col-span-7 flex items-center gap-2">
                                                        <div className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full">
                                                            {/* <Image
                                                                src={student.avatar || "/placeholder.svg"}
                                                                alt={student.name}
                                                                fill
                                                                className="aspect-square object-cover"
                                                            /> */}
                                                        </div>
                                                        <span className="truncate">{student.username ? student.username : 'Unknown'}</span>
                                                    </div>
                                                    <div className="col-span-4 text-right font-semibold">{student.xp}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* <Link href="/scores">
                                    <div className="bg-white p-6 shadow-md rounded-xl border border-gray-300 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                                        <h2 className="text-2xl font-bold text-gray-800">Scores</h2>
                                        <p className="text-gray-500">Weekly performance graph</p>
                                    </div>
                                </Link> */}
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
                                <div key={index} className="bg-white flex flex-col justify-between items-start p-6 shadow-md rounded-xl border border-gray-300">
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
                        <div className="grid grid-cols-1 sm:grid-cols-auto gap-6">
                            <div className="card bg-white text-black p-4  border-gray-600 rounded-md">
                                <div className="card-header">
                                    <h3 className="card-title font-bold text-2xl">Leaderboard</h3>
                                </div>
                                <div className="card-content mt-5">

                                    <div className="space-y-2">

                                        {leaderboardStudents && leaderboardStudents.length === 0 ? <p>No Students in leaderboard.</p> : (
                                            <div className="grid grid-cols-12 text-sm font-medium pb-1">
                                                <div className="col-span-1">#</div>
                                                <div className="col-span-7">Student</div>
                                                <div className="col-span-4 text-right">Score</div>
                                            </div>
                                        )}

                                        {leaderboardStudents && leaderboardStudents.map((student, index) => (
                                            <div
                                                key={student.id}
                                                className="grid grid-cols-12 items-center py-2 px-2 rounded-md text-sm bg-white"
                                            >
                                                <div className="col-span-1 font-medium">{index + 1}</div>
                                                <div className="col-span-7 flex items-center gap-2">
                                                    {/* <div className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full"> */}
                                                    {/* <Image
                                                                src={student.avatar || "/placeholder.svg"}
                                                                alt={student.name}
                                                                fill
                                                                className="aspect-square object-cover"
                                                            /> */}
                                                    {/* </div> */}
                                                    <span className="truncate">{student.username ? student.username : 'Unknown'}</span>
                                                </div>
                                                <div className="col-span-4 text-right font-semibold">{student.xp}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

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
                                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex justify-center items-center"
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