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
import { Bookmark, ChevronRight, Plus, Trophy, BarChart2, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function Dashboard() {
    const { user, loading } = useAuth()
    const { data: leaderboardStudents, isLoading: LeaderboardLoading, isSuccess: LeaderboardSuccess } = useGetLeaderboardQuery()
    const [isOpen, setIsOpen] = useState(false);
    const [className, setClassName] = useState("");
    const [assignmentType, setAssignmentType] = useState("");
    const { data: classes, isLoading, isError: ClassNotFound, isSuccess, refetch } = useGetClassesQuery({
        userId: user?.uid,
        limit: 3
    }, {
        skip: !user?.uid
    })

    const [createClass, { isLoading: classCreating, error: errorCreatingClass, isSuccess: successCreatingClass }] = useCreateClassMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            refetch();
        }
    }, [classCreating, successCreatingClass])

    const cardColors = [
        'from-blue-500 to-blue-600',
        'from-purple-500 to-purple-600',
        'from-emerald-500 to-emerald-600',
        'from-amber-500 to-amber-600',
        'from-rose-500 to-rose-600',
        'from-indigo-500 to-indigo-600'
    ];

    if (user?.role === 'student') {
        return (
            <div className="flex h-screen bg-gray-50">
                {/* Sidebar Component */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header Component */}
                    <Header />

                    {/* Dashboard Content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Welcome Section */}
                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
                                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user?.username || 'Student'}!</h1>
                                        <p className="opacity-90">Keep up the good work. You're making great progress!</p>
                                    </div>

                                    {/* My Classes Section */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                                <Bookmark className="h-5 w-5 text-blue-600" />
                                                My Classes
                                            </h2>
                                            <Link href={'/classes'} className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700 transition-colors">
                                                View all <ChevronRight className="h-4 w-4 ml-1" />
                                            </Link>
                                        </div>
                                        
                                        {(isLoading || loading) && (
                                            <div className="w-full flex justify-center items-center py-10">
                                                <Loader className="stroke-blue-500" />
                                            </div>
                                        )}

                                        {/* Subject Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {ClassNotFound && (
                                                <div className="col-span-3 py-8 text-center">
                                                    <p className="text-lg text-gray-600">No classes found</p>
                                                    <p className="text-sm text-gray-500 mt-1">Ask your faculty for a class invite link.</p>
                                                </div>
                                            )}
                                            
                                            {!isLoading && classes && classes.map((cls, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`rounded-xl overflow-hidden shadow-md bg-gradient-to-br ${cardColors[index % cardColors.length]} hover:shadow-lg transition-shadow duration-300`}
                                                >
                                                    <div className="p-5 text-white">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="text-lg font-bold truncate">{cls.className}</h3>
                                                            <Bookmark className="h-5 w-5 text-white/80" />
                                                        </div>
                                                        <div className="text-xs bg-white/20 rounded-full px-3 py-1 inline-block mt-2">
                                                            Started {cls.startDate}
                                                        </div>
                                                    </div>
                                                    <div className="p-4 bg-white/10 backdrop-blur-sm">
                                                        <p className="text-xs text-white/90 mb-4 line-clamp-2">Class description goes here</p>
                                                        <Link href={`/classes/${cls.id}`}>
                                                            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-xs py-2 rounded-lg transition-colors duration-200">
                                                                View Faculty
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Leaderboard Card */}
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                    <Trophy className="h-5 w-5 text-amber-500" />
                                                    Leaderboard
                                                </h3>
                                                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    Your Rank: #{leaderboardStudents?.findIndex(s => s.id === user?.uid) + 1 || '--'}
                                                </span>
                                            </div>
                                            
                                            <div className="flex flex-col items-center mb-6">
                                                <div className="relative h-32 w-32 mb-3">
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <span className="text-3xl font-bold text-blue-600">{user?.xp || 0}</span>
                                                    </div>
                                                    <svg className="h-full w-full" viewBox="0 0 100 100">
                                                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                                                        <circle
                                                            cx="50"
                                                            cy="50"
                                                            r="45"
                                                            fill="none"
                                                            stroke="#3b82f6"
                                                            strokeWidth="8"
                                                            strokeDasharray="283"
                                                            strokeDashoffset={283 - (283 * (user?.xp || 0) / 100)}
                                                            transform="rotate(-90 50 50)"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-gray-600">Your XP Points</p>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="grid grid-cols-12 text-xs font-medium text-gray-500 pb-2 border-b">
                                                    <div className="col-span-1">#</div>
                                                    <div className="col-span-8">Student</div>
                                                    <div className="col-span-3 text-right">XP</div>
                                                </div>

                                                {leaderboardStudents && leaderboardStudents.length === 0 && (
                                                    <p className="text-center text-gray-500 py-4">No students in leaderboard yet</p>
                                                )}
                                                
                                                {leaderboardStudents && leaderboardStudents.slice(0, 5).map((student, index) => (
                                                    <div
                                                        key={student.id}
                                                        className={`grid grid-cols-12 items-center py-2 px-3 rounded-lg text-sm ${student.id === user?.uid ? 'bg-blue-50' : 'bg-white'}`}
                                                    >
                                                        <div className="col-span-1 font-medium text-gray-700">
                                                            {index + 1}
                                                        </div>
                                                        <div className="col-span-8 flex items-center gap-3">
                                                            <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
                                                                {student.avatar && (
                                                                    <Image
                                                                        src={student.avatar}
                                                                        alt={student.username}
                                                                        fill
                                                                        className="aspect-square object-cover"
                                                                    />
                                                                )}
                                                            </div>
                                                            <span className="truncate font-medium">
                                                                {student.username || 'Unknown'}
                                                                {student.id === user?.uid && (
                                                                    <span className="ml-2 text-xs text-blue-600">(You)</span>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="col-span-3 text-right font-semibold text-gray-800">
                                                            {student.xp}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Progress Card */}
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                    <BarChart2 className="h-5 w-5 text-emerald-500" />
                                                    Weekly Progress
                                                </h3>
                                                <button className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700 transition-colors">
                                                    Details <ChevronRight className="h-4 w-4 ml-1" />
                                                </button>
                                            </div>
                                            
                                            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-6">
                                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                                    <div key={day} className="flex flex-col items-center">
                                                        <span className="text-gray-500 mb-1">{day}</span>
                                                        <div className="w-full bg-gray-100 rounded-t-sm h-24 relative">
                                                            <div 
                                                                className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm"
                                                                style={{ height: `${Math.random() * 80 + 20}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="font-medium text-gray-800 mt-1">{Math.floor(Math.random() * 20) + 5}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">This Week's Summary</h4>
                                                <div className="grid grid-cols-3 gap-2 text-center">
                                                    <div className="bg-white p-2 rounded shadow-xs">
                                                        <p className="text-xs text-gray-500">Classes</p>
                                                        <p className="font-bold text-blue-600">3</p>
                                                    </div>
                                                    <div className="bg-white p-2 rounded shadow-xs">
                                                        <p className="text-xs text-gray-500">Assignments</p>
                                                        <p className="font-bold text-emerald-600">5</p>
                                                    </div>
                                                    <div className="bg-white p-2 rounded shadow-xs">
                                                        <p className="text-xs text-gray-500">XP Earned</p>
                                                        <p className="font-bold text-amber-600">120</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assignments Section */}
                                    <AssignmentSection />
                                </div>
                                
                                {/* Right Sidebar */}
                                <div className="space-y-6">
                                    {/* Quick Actions */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                                        <div className="space-y-3">
                                            <button className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                                                <span>Submit Assignment</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                            <button className="w-full flex items-center justify-between p-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                                                <span>View Grades</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                            <button className="w-full flex items-center justify-between p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                                                <span>Join New Class</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Chat Bot */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                <MessageSquare className="h-5 w-5 text-indigo-500" />
                                                Study Assistant
                                            </h3>
                                            <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                                                Beta
                                            </span>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                                            <div className="bg-white p-4 rounded-full inline-block shadow-xs mb-3">
                                                <MessageSquare className="h-8 w-8 text-indigo-500" />
                                            </div>
                                            <h4 className="font-medium text-gray-800 mb-1">Coming Soon</h4>
                                            <p className="text-sm text-gray-500">Our AI study assistant is under development</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    } else {
        // Faculty Dashboard
        return (
            <div className="flex h-screen bg-gray-50">
                {/* Sidebar Component */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header Component */}
                    <Header />

                    {/* Dashboard Content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Welcome Section */}
                                    <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome, Professor {user?.username || ''}!</h1>
                                        <p className="opacity-90">You have {classes?.length || 0} active classes this semester.</p>
                                    </div>

                                    {/* My Classes Section */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                                <Bookmark className="h-5 w-5 text-indigo-600" />
                                                My Classes
                                            </h2>
                                            <Link href={'/classes'} className="text-indigo-600 text-sm font-medium flex items-center hover:text-indigo-700 transition-colors">
                                                View all <ChevronRight className="h-4 w-4 ml-1" />
                                            </Link>
                                        </div>
                                        
                                        {(isLoading || loading) && (
                                            <div className="w-full flex justify-center items-center py-10">
                                                <Loader className="stroke-indigo-500" />
                                            </div>
                                        )}

                                        {/* Subject Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {ClassNotFound && (
                                                <div className="col-span-3 py-8 text-center">
                                                    <p className="text-lg text-gray-600">You haven't created any classes yet</p>
                                                </div>
                                            )}
                                            
                                            {!isLoading && classes && classes.map((cls, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`rounded-xl overflow-hidden shadow-md bg-gradient-to-br ${cardColors[index % cardColors.length]} hover:shadow-lg transition-shadow duration-300`}
                                                >
                                                    <div className="p-5 text-white">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="text-lg font-bold truncate">{cls.className}</h3>
                                                            <Bookmark className="h-5 w-5 text-white/80" />
                                                        </div>
                                                        <div className="text-xs bg-white/20 rounded-full px-3 py-1 inline-block mt-2">
                                                            {cls.students?.length || 0} students
                                                        </div>
                                                    </div>
                                                    <div className="p-4 bg-white/10 backdrop-blur-sm">
                                                        <p className="text-xs text-white/90 mb-4 line-clamp-2">Class code: {cls.id}</p>
                                                        <Link href={`/classes/${cls.id}`}>
                                                            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-xs py-2 rounded-lg transition-colors duration-200">
                                                                Manage Class
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Leaderboard Card */}
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                    <Trophy className="h-5 w-5 text-amber-500" />
                                                    Top Students
                                                </h3>
                                                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    {leaderboardStudents?.length || 0} students
                                                </span>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <div className="grid grid-cols-12 text-xs font-medium text-gray-500 pb-2 border-b">
                                                    <div className="col-span-1">#</div>
                                                    <div className="col-span-8">Student</div>
                                                    <div className="col-span-3 text-right">XP</div>
                                                </div>

                                                {leaderboardStudents && leaderboardStudents.length === 0 && (
                                                    <p className="text-center text-gray-500 py-4">No students data available</p>
                                                )}
                                                
                                                {leaderboardStudents && leaderboardStudents.slice(0, 5).map((student, index) => (
                                                    <div
                                                        key={student.id}
                                                        className="grid grid-cols-12 items-center py-2 px-3 rounded-lg text-sm bg-white hover:bg-gray-50"
                                                    >
                                                        <div className="col-span-1 font-medium text-gray-700">
                                                            {index + 1}
                                                        </div>
                                                        <div className="col-span-8 flex items-center gap-3">
                                                            <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200">
                                                                {student.avatar && (
                                                                    <Image
                                                                        src={student.avatar}
                                                                        alt={student.username}
                                                                        fill
                                                                        className="aspect-square object-cover"
                                                                    />
                                                                )}
                                                            </div>
                                                            <span className="truncate font-medium">
                                                                {student.username || 'Unknown'}
                                                            </span>
                                                        </div>
                                                        <div className="col-span-3 text-right font-semibold text-gray-800">
                                                            {student.xp}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Create Class Card */}
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                    <Plus className="h-5 w-5 text-emerald-500" />
                                                    Create New Class
                                                </h3>
                                            </div>
                                            
                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div>
                                                    <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Class Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="className"
                                                        placeholder="e.g. Computer Science 101"
                                                        value={className}
                                                        onChange={(e) => setClassName(e.target.value)}
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                                
                                                <button
                                                    type="submit"
                                                    disabled={classCreating}
                                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                                >
                                                    {classCreating ? (
                                                        <>
                                                            <Loader className="stroke-white mr-2" />
                                                            Creating...
                                                        </>
                                                    ) : (
                                                        'Create Class'
                                                    )}
                                                </button>
                                            </form>
                                            
                                            <div className="mt-6 pt-6 border-t border-gray-100">
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Tips</h4>
                                                <ul className="space-y-2 text-sm text-gray-600">
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-indigo-500">•</span>
                                                        <span>Use descriptive class names</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-indigo-500">•</span>
                                                        <span>You can add students after creation</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-indigo-500">•</span>
                                                        <span>Each class gets a unique join code</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Right Sidebar */}
                                <div className="space-y-6">
                                    {/* Quick Actions */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Faculty Tools</h3>
                                        <div className="space-y-3">
                                            <button className="w-full flex items-center justify-between p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
                                                <span>Create Assignment</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                            <button className="w-full flex items-center justify-between p-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                                                <span>Grade Submissions</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                            <button className="w-full flex items-center justify-between p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                                                <span>View Analytics</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Recent Activity */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                                        </div>
                                        <div className="space-y-4">
                                            {[1, 2, 3].map((item) => (
                                                <div key={item} className="flex items-start gap-3">
                                                    <div className="bg-blue-100 p-2 rounded-full">
                                                        <Trophy className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800">New assignment submitted</p>
                                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}
