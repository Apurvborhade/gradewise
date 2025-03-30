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
import { Bookmark, ChevronRight } from 'lucide-react';
import Image from 'next/image';

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
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-auto">
                    {/* Header Component */}
                    <Header />

                    {/* Dashboard Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Main Section */}
                            <div className="md:p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">My classes</h2>
                                    <Link href={'/classes'} className="text-blue-600 text-sm font-medium flex items-center">
                                        see all <ChevronRight className="h-4 w-4 ml-1" />
                                    </Link>
                                </div>
                                {(isLoading || loading) && <div className={'w-full flex justify-center items-center'}><Loader className={'stroke-black'} /></div>}

                                {/* Subject Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                                    {!isLoading && classes && classes.map((cls, index) => (
                                        <div key={index} className={`rounded-lg overflow-hidden border-none shadow-md bg-pink-500`}>
                                            <div className="p-4 pb-2">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-lg font-bold">{cls.className}</h3>
                                                    <Bookmark className="h-5 w-5 text-white" />
                                                </div>
                                                <div className="text-xs bg-white/20 rounded px-2 py-1 inline-block">Started {cls.startDate}</div>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-xs mb-4 line-clamp-4">Class Description</p>

                                                <button className="w-full bg-white/20 hover:bg-white/30 text-xs py-2 rounded-md">View Faculty</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Leaderboard & Scores */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:mt-5">
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

                                    <div className="card bg-white p-4">
                                        <div className="card-header">
                                            <div className="flex justify-between items-center">
                                                <h3 className="card-title">Scores</h3>
                                                <button className="text-blue-600 text-sm font-medium flex items-center">
                                                    See all <ChevronRight className="h-4 w-4 ml-1" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500">Mon</span>
                                                    <span className="font-medium">10</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500">Tue</span>
                                                    <span className="font-medium">11</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500">Wed</span>
                                                    <span className="font-medium">12</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500">Thu</span>
                                                    <span className="font-medium">13</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500">Fri</span>
                                                    <span className="font-medium">14</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500">Sat</span>
                                                    <span className="font-medium">15</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500">Sun</span>
                                                    <span className="font-medium">16</span>
                                                </div>
                                            </div>

                                            <div className="h-32 relative">
                                                <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                                                    <defs>
                                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                                        </linearGradient>
                                                    </defs>
                                                    <path
                                                        d="M0,50 C20,40 40,80 60,70 C80,60 100,30 120,40 C140,50 160,20 180,30 C200,40 220,10 240,20 C260,30 280,50 300,30 L300,100 L0,100 Z"
                                                        fill="url(#gradient)"
                                                        stroke="#3b82f6"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Assignments & Reports */}
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                                    <AssignmentSection />
                                </div>
                            </div>
                        </div>
                        {/* Right Sidebar */}
                        <div className="space-y-6 mt-3 md:mt-6">
                            <div className="card bg-white p-5 rounded-md border border-gray-300">
                                <div className="card-header">
                                    <h3 className="card-title">Class progress</h3>
                                </div>
                                <div className="card-content space-y-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="border border-gray-300 rounded-md p-3 col-span-1">
                                            <div className="text-sm font-medium">Assignments</div>
                                            <div className="text-2xl font-bold mt-1">12/15</div>
                                        </div>
                                        <div className="border border-gray-300 rounded-md p-3 col-span-1">
                                            <div className="text-sm font-medium">Average Score</div>
                                            <div className="text-2xl font-bold mt-1">85%</div>
                                        </div>
                                        <div className="border border-gray-300 rounded-md p-3 col-span-1">
                                            <div className="text-sm font-medium">Attendance</div>
                                            <div className="text-2xl font-bold mt-1">92%</div>
                                        </div>
                                        <div className="border border-gray-300 rounded-md p-3 col-span-1">
                                            <div className="text-sm font-medium">Rank</div>
                                            <div className="text-2xl font-bold mt-1">#4</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-white p-5 rounded-md border border-gray-300">
                                <div className="card-header flex flex-row items-center justify-between pb-2">
                                    <h3 className="card-title">Schedule</h3>
                                    <button className="text-blue-600 text-sm font-medium flex items-center">
                                        See all <ChevronRight className="h-4 w-4 ml-1" />
                                    </button>
                                </div>
                                <div className="card-content space-y-3">
                                    <div className="border rounded-md p-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">Chemistry Lab</h3>
                                                <p className="text-sm text-gray-500">10:00 AM - 11:30 AM</p>
                                            </div>
                                            <span className="badge badge-primary">Today</span>
                                        </div>
                                    </div>
                                    <div className="border rounded-md p-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">Physics Quiz</h3>
                                                <p className="text-sm text-gray-500">2:00 PM - 3:00 PM</p>
                                            </div>
                                            <span className="badge badge-outline">Tomorrow</span>
                                        </div>
                                    </div>
                                </div>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Section */}
                        <div className="md:p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">My classes</h2>
                                <Link href={'/classes'} className="text-blue-600 text-sm font-medium flex items-center">
                                    see all <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                            {(isLoading || loading) && <div className={'w-full flex justify-center items-center'}><Loader className={'stroke-black'} /></div>}

                            {/* Subject Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                                {!isLoading && classes && classes.map((cls, index) => (
                                    <div key={index} className={`rounded-lg overflow-hidden border-none shadow-md bg-pink-500`}>
                                        <div className="p-4 pb-2">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-bold">{cls.className}</h3>
                                                <Bookmark className="h-5 w-5 text-white" />
                                            </div>
                                            <div className="text-xs bg-white/20 rounded px-2 py-1 inline-block">Started {cls.startDate}</div>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-xs mb-4 line-clamp-4">Class Description</p>

                                            <button className="w-full bg-white/20 hover:bg-white/30 text-xs py-2 rounded-md">View Class</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Leaderboard & Scores */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:mt-5">
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

                                {/* Create Class */}
                                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                                    <div className="bg-white p-6 shadow-md rounded-xl border border-gray-100 text-black">
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
                                                className="bg-blue-600 mt-auto text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex justify-center items-center"
                                            >
                                                {classCreating ? <Loader /> : 'Create Class'}

                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    {/* Right Sidebar */}
                    <div className="space-y-6 mt-3 md:mt-6">
                        <div className="card bg-white p-5 rounded-md border border-gray-300">
                            <div className="card-header">
                                <h3 className="card-title">Class progress</h3>
                            </div>
                            <div className="card-content space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="border border-gray-300 rounded-md p-3 col-span-1">
                                        <div className="text-sm font-medium">Assignments</div>
                                        <div className="text-2xl font-bold mt-1">12/15</div>
                                    </div>
                                    <div className="border border-gray-300 rounded-md p-3 col-span-1">
                                        <div className="text-sm font-medium">Average Score</div>
                                        <div className="text-2xl font-bold mt-1">85%</div>
                                    </div>
                                    <div className="border border-gray-300 rounded-md p-3 col-span-1">
                                        <div className="text-sm font-medium">Attendance</div>
                                        <div className="text-2xl font-bold mt-1">92%</div>
                                    </div>
                                    <div className="border border-gray-300 rounded-md p-3 col-span-1">
                                        <div className="text-sm font-medium">Rank</div>
                                        <div className="text-2xl font-bold mt-1">#4</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-white p-5 rounded-md border border-gray-300">
                            <div className="card-header flex flex-row items-center justify-between pb-2">
                                <h3 className="card-title">Schedule</h3>
                                <button className="text-blue-600 text-sm font-medium flex items-center">
                                    See all <ChevronRight className="h-4 w-4 ml-1" />
                                </button>
                            </div>
                            <div className="card-content space-y-3">
                                <div className="border rounded-md p-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">Chemistry Lab</h3>
                                            <p className="text-sm text-gray-500">10:00 AM - 11:30 AM</p>
                                        </div>
                                        <span className="badge badge-primary">Today</span>
                                    </div>
                                </div>
                                <div className="border rounded-md p-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">Physics Quiz</h3>
                                            <p className="text-sm text-gray-500">2:00 PM - 3:00 PM</p>
                                        </div>
                                        <span className="badge badge-outline">Tomorrow</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    }

}