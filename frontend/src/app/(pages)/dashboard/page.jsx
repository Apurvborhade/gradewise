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
import { Bookmark, ChevronRight, Plus, Trophy, TrendingUp, MessageSquare, Users } from 'lucide-react';

const classCardColors = [
  'bg-gradient-to-br from-blue-500 to-indigo-600',
  'bg-gradient-to-br from-purple-500 to-fuchsia-600',
  'bg-gradient-to-br from-emerald-500 to-teal-600',
  'bg-gradient-to-br from-amber-500 to-orange-600',
  'bg-gradient-to-br from-rose-500 to-pink-600',
  'bg-gradient-to-br from-indigo-500 to-violet-600',
  'bg-gradient-to-br from-cyan-500 to-sky-600',
  'bg-gradient-to-br from-lime-500 to-green-600'
];

const colorVariants = {
  primary: 'bg-gradient-to-r from-indigo-600 to-purple-600',
  secondary: 'bg-gradient-to-r from-cyan-500 to-blue-600',
  success: 'bg-gradient-to-r from-emerald-500 to-teal-600',
  warning: 'bg-gradient-to-r from-amber-500 to-orange-600',
  danger: 'bg-gradient-to-r from-rose-500 to-pink-600',
  info: 'bg-gradient-to-r from-sky-500 to-cyan-600'
};

export default function Dashboard() {
    const { user, loading } = useAuth();
    const { data: leaderboardStudents, isLoading: LeaderboardLoading } = useGetLeaderboardQuery();
    const [className, setClassName] = useState("");
    const { data: classes, isLoading, refetch } = useGetClassesQuery({
        userId: user?.uid,
        limit: 3
    }, {
        skip: !user?.uid
    });

    const [createClass, { isLoading: classCreating, isSuccess: successCreatingClass }] = useCreateClassMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createClass({ facultyId: user?.user_id, className }).unwrap();
    };

    useEffect(() => {
        if (successCreatingClass) {
            setClassName("");
            toast.success('Class created successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                theme: "dark",
                transition: Bounce,
            });
            refetch();
        }
    }, [successCreatingClass]);

    const getRandomColorClass = () => {
        return classCardColors[Math.floor(Math.random() * classCardColors.length)];
    };

    if (user?.role === 'student') {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Fixed Sidebar */}
                <div className="fixed inset-y-0 left-0 z-10 w-64">
                    <Sidebar />
                </div>
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col ml-64 min-h-screen">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <section className="bg-white rounded-2xl shadow-lg p-5">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                            My Classes
                                        </h2>
                                        <Link href="/classes" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                                            <span className="font-medium">View all</span>
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </Link>
                                    </div>

                                    {isLoading ? (
                                        <div className="flex justify-center py-12">
                                            <Loader className="stroke-indigo-600" />
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {classes?.length > 0 ? (
                                                classes.map((cls, index) => (
                                                    <div key={index} className={`${getRandomColorClass()} rounded-xl shadow-md text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                                                        <div className="p-5">
                                                            <div className="flex justify-between items-start">
                                                                <h3 className="text-lg font-bold truncate">{cls.className}</h3>
                                                                <Bookmark className="h-5 w-5 text-white/80" />
                                                            </div>
                                                            <div className="text-xs bg-white/20 rounded-full px-3 py-1 inline-block mt-2">
                                                                Started {new Date(cls.startDate).toLocaleDateString()}
                                                            </div>
                                                            <p className="text-sm my-4 line-clamp-2 opacity-90">Join this class to access learning materials and assignments.</p>
                                                            <Link href={`/classes/${cls.id}`}>
                                                                <button className="w-full bg-white/20 hover:bg-white/30 text-sm py-2 rounded-lg transition-colors">
                                                                    View Faculty
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-full text-center py-8">
                                                    <p className="text-gray-500">You're not enrolled in any classes yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <section className="bg-white rounded-2xl shadow-lg p-5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 rounded-lg ${colorVariants.primary} text-white`}>
                                                <Trophy className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">Leaderboard</h3>
                                        </div>
                                        
                                        <div className="flex flex-col items-center mb-6">
                                            <div className="relative h-40 w-40">
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-3xl font-bold text-indigo-600">{user?.xp || 0}</span>
                                                    <span className="text-sm text-gray-500 mt-1">Your XP</span>
                                                </div>
                                                <svg className="h-full w-full" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="45"
                                                        fill="none"
                                                        stroke="#6366f1"
                                                        strokeWidth="8"
                                                        strokeDasharray="283"
                                                        strokeDashoffset={283 - (283 * Math.min(user?.xp || 0, 100)) / 100}
                                                        transform="rotate(-90 50 50)"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="grid grid-cols-12 text-sm font-medium pb-2 border-b border-gray-100">
                                                <div className="col-span-1 text-gray-500">#</div>
                                                <div className="col-span-7 text-gray-500">Student</div>
                                                <div className="col-span-4 text-right text-gray-500">Score</div>
                                            </div>

                                            {LeaderboardLoading ? (
                                                <div className="flex justify-center py-4">
                                                    <Loader className="stroke-indigo-600" size={20} />
                                                </div>
                                            ) : leaderboardStudents?.length === 0 ? (
                                                <p className="text-center py-4 text-gray-500">No students in leaderboard yet</p>
                                            ) : (
                                                leaderboardStudents?.slice(0, 5).map((student, index) => (
                                                    <div key={student.id} className="grid grid-cols-12 items-center py-3 px-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                                                        <div className={`col-span-1 font-medium ${index < 3 ? 'text-indigo-600' : 'text-gray-600'}`}>
                                                            {index + 1}
                                                        </div>
                                                        <div className="col-span-7 flex items-center gap-3">
                                                            <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200 items-center justify-center">
                                                                {student.username?.charAt(0).toUpperCase() || 'U'}
                                                            </div>
                                                            <span className="truncate font-medium">{student.username || 'Unknown'}</span>
                                                        </div>
                                                        <div className="col-span-4 text-right font-semibold text-indigo-600">
                                                            {student.xp} XP
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>

                                    <section className="bg-white rounded-2xl shadow-lg p-5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 rounded-lg ${colorVariants.success} text-white`}>
                                                <TrendingUp className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">Weekly Progress</h3>
                                        </div>

                                        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
                                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                                                <div key={index} className="flex flex-col">
                                                    <span className="text-gray-500 mb-1">{day}</span>
                                                    <span className="font-medium text-gray-700">
                                                        {Math.floor(Math.random() * 20) + 5}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="h-40 relative">
                                            <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                                                <defs>
                                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                                <path
                                                    d="M0,60 C25,40 50,80 75,60 C100,40 125,20 150,40 C175,60 200,30 225,50 C250,70 275,40 300,60 L300,120 L0,120 Z"
                                                    fill="url(#gradient)"
                                                    stroke="#10b981"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>
                                    </section>
                                </div>

                                <AssignmentSection />
                            </div>

                            <div className="space-y-6">
                                <section className="bg-white rounded-2xl shadow-lg p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${colorVariants.info} text-white`}>
                                            <MessageSquare className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Study Assistant</h3>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                                        <div className="bg-indigo-100 p-3 rounded-full mb-4">
                                            <MessageSquare className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <h4 className="text-lg font-medium text-gray-700 mb-2">Coming Soon</h4>
                                        <p className="text-center text-gray-500 text-sm">
                                            Our AI assistant will help you with questions and study tips.
                                        </p>
                                    </div>
                                </section>

                                <section className="bg-white rounded-2xl shadow-lg p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${colorVariants.warning} text-white`}>
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Study Groups</h3>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                                        <div className="bg-amber-100 p-3 rounded-full mb-4">
                                            <Users className="h-6 w-6 text-amber-600" />
                                        </div>
                                        <h4 className="text-lg font-medium text-gray-700 mb-2">Coming Soon</h4>
                                        <p className="text-center text-gray-500 text-sm">
                                            Collaborate with peers in dedicated study groups.
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Fixed Sidebar */}
                <div className="fixed inset-y-0 left-0 z-10 w-64">
                    <Sidebar />
                </div>
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col ml-64 min-h-screen">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <section className="bg-white rounded-2xl shadow-lg p-5">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                            My Classes
                                        </h2>
                                        <Link href="/classes" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                                            <span className="font-medium">View all</span>
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </Link>
                                    </div>

                                    {isLoading ? (
                                        <div className="flex justify-center py-12">
                                            <Loader className="stroke-indigo-600" />
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {classes?.length > 0 ? (
                                                classes.map((cls, index) => (
                                                    <div key={index} className={`${getRandomColorClass()} rounded-xl shadow-md text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                                                        <div className="p-5">
                                                            <div className="flex justify-between items-start">
                                                                <h3 className="text-lg font-bold truncate">{cls.className}</h3>
                                                                <Bookmark className="h-5 w-5 text-white/80" />
                                                            </div>
                                                            <div className="text-xs bg-white/20 rounded-full px-3 py-1 inline-block mt-2">
                                                                Started {new Date(cls.startDate).toLocaleDateString()}
                                                            </div>
                                                            <p className="text-sm my-4 line-clamp-2 opacity-90">Manage your class and track student progress.</p>
                                                            <Link href={`/classes/${cls.id}`}>
                                                                <button className="w-full bg-white/20 hover:bg-white/30 text-sm py-2 rounded-lg transition-colors">
                                                                    View Class
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-full text-center py-8">
                                                    <p className="text-gray-500">You haven't created any classes yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </section>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <section className="bg-white rounded-2xl shadow-lg p-5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 rounded-lg ${colorVariants.primary} text-white`}>
                                                <Trophy className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">Top Students</h3>
                                        </div>
                                        
                                        <div className="flex flex-col items-center mb-6">
                                            <div className="relative h-40 w-40">
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-3xl font-bold text-indigo-600">{user?.xp || 0}</span>
                                                    <span className="text-sm text-gray-500 mt-1">Your XP</span>
                                                </div>
                                                <svg className="h-full w-full" viewBox="0 0 100 100">
                                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="45"
                                                        fill="none"
                                                        stroke="#6366f1"
                                                        strokeWidth="8"
                                                        strokeDasharray="283"
                                                        strokeDashoffset={283 - (283 * Math.min(user?.xp || 0, 100)) / 100}
                                                        transform="rotate(-90 50 50)"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="grid grid-cols-12 text-sm font-medium pb-2 border-b border-gray-100">
                                                <div className="col-span-1 text-gray-500">#</div>
                                                <div className="col-span-7 text-gray-500">Student</div>
                                                <div className="col-span-4 text-right text-gray-500">Score</div>
                                            </div>

                                            {LeaderboardLoading ? (
                                                <div className="flex justify-center py-4">
                                                    <Loader className="stroke-indigo-600" size={20} />
                                                </div>
                                            ) : leaderboardStudents?.length === 0 ? (
                                                <p className="text-center py-4 text-gray-500">No students in leaderboard yet</p>
                                            ) : (
                                                leaderboardStudents?.slice(0, 5).map((student, index) => (
                                                    <div key={student.id} className="grid grid-cols-12 items-center py-3 px-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                                                        <div className={`col-span-1 font-medium ${index < 3 ? 'text-indigo-600' : 'text-gray-600'}`}>
                                                            {index + 1}
                                                        </div>
                                                        <div className="col-span-7 flex items-center gap-3">
                                                            <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200 items-center justify-center">
                                                                {student.username?.charAt(0).toUpperCase() || 'U'}
                                                            </div>
                                                            <span className="truncate font-medium">{student.username || 'Unknown'}</span>
                                                        </div>
                                                        <div className="col-span-4 text-right font-semibold text-indigo-600">
                                                            {student.xp} XP
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>

                                    <section className="bg-white rounded-2xl shadow-lg p-5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 rounded-lg ${colorVariants.secondary} text-white`}>
                                                <Plus className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">Create New Class</h3>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Class Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="className"
                                                    placeholder="e.g. Advanced Calculus"
                                                    value={className}
                                                    onChange={(e) => setClassName(e.target.value)}
                                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={classCreating}
                                                className={`w-full ${colorVariants.primary} text-white font-medium py-3 px-4 rounded-xl hover:shadow-md transition-all flex items-center justify-center`}
                                            >
                                                {classCreating ? (
                                                    <>
                                                        <Loader className="stroke-white mr-2" size={20} />
                                                        Creating...
                                                    </>
                                                ) : (
                                                    'Create Class'
                                                )}
                                            </button>
                                        </form>
                                    </section>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <section className="bg-white rounded-2xl shadow-lg p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${colorVariants.info} text-white`}>
                                            <MessageSquare className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Teaching Assistant</h3>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                                        <div className="bg-indigo-100 p-3 rounded-full mb-4">
                                            <MessageSquare className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <h4 className="text-lg font-medium text-gray-700 mb-2">Coming Soon</h4>
                                        <p className="text-center text-gray-500 text-sm">
                                            AI-powered assistance for classroom management.
                                        </p>
                                    </div>
                                </section>

                                <section className="bg-white rounded-2xl shadow-lg p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${colorVariants.warning} text-white`}>
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800">Faculty Resources</h3>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                                        <div className="bg-amber-100 p-3 rounded-full mb-4">
                                            <Users className="h-6 w-6 text-amber-600" />
                                        </div>
                                        <h4 className="text-lg font-medium text-gray-700 mb-2">Coming Soon</h4>
                                        <p className="text-center text-gray-500 text-sm">
                                            Teaching materials and collaboration tools.
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        );
    }
}
