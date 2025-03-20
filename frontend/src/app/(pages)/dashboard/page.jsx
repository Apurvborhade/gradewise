"use client";
import Link from 'next/link';
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-[#eef5ff]">
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
                        <h1 className="text-4xl font-extrabold text-indigo-700">Dashboard</h1>
                        <Link href="/KnowYourFaculty" className=' text-black bold'>See All</Link>

                        {/* Subject Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {['Mathematics', 'Chemistry', 'Physics'].map((subject, index) => (
                                <div key={index} className="bg-white p-6 shadow-md rounded-xl border border-gray-300">
                                    <h2 className="text-2xl font-bold text-gray-800">{subject}</h2>
                                    <p className="text-gray-500">Started 05.03.2025</p>
                                    <button className="mt-3 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                        View Faculty
                                    </button>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Link href="/assignments">
                                <div className="bg-white p-6 shadow-md rounded-xl border border-gray-300 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                                    <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
                                    <p className="text-gray-500">Pending tasks</p>
                                </div>
                            </Link>
                            <Link href="/plagiarism-report">
                                <div className="bg-white p-6 shadow-md rounded-xl border border-gray-300 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                                    <h2 className="text-2xl font-bold text-gray-800">Plagiarism Report</h2>
                                    <p className="text-gray-500">Check your report</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right-Side Academic News Section */}
                    <div className="w-full lg:w-1/4 bg-white p-6 shadow-lg rounded-xl border border-gray-300">
                        <h2 className="text-2xl font-semibold text-indigo-700">Latest Academic News</h2>
                        <ul className="text-gray-700 mt-4 space-y-3">
                            {[
                                { icon: "📢", text: "New research on AI", link: "/news/ai-research" },
                                { icon: "📖", text: "Upcoming science competition", link: "/news/science-competition" },
                                { icon: "🏆", text: "Scholarship opportunities", link: "/news/scholarships" },
                                { icon: "📅", text: "Important exam schedule updates", link: "/news/exam-schedule" },
                            ].map((news, index) => (
                                <li key={index} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-sm">
                                    <span className="text-lg">{news.icon}</span>
                                    <span className="flex-1">{news.text}</span>
                                    <a href={news.link} className="text-blue-600 hover:underline text-sm">Read More →</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Component */}
                <Footer />
            </div>
        </div>
    );
}