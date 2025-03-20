"use client";

import Sidebar from "../../components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-[#f0f8ff]"> {/* Light Blue Background */}
            
            {/* Sidebar Component */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                
                {/* Header Component */}
                <Header />

                {/* Main Content */}
                <div className="flex-1 flex p-6 gap-6"> 
                    {/* Left Section with Two Boxes */}
                    <div className="flex flex-col w-1/2 gap-6"> 
                        <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-2">Actual Marksheet of Student</h2>
                            <div className="bg-pink-300 p-4 rounded-lg shadow-md h-40 flex justify-center items-center">
                                📊 Chart Placeholder
                            </div>
                        </div>
                        <div className="bg-purple-100 p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-2">Feedback</h2>
                            <ul className="list-disc pl-5">
                                <li className="text-green-700 font-semibold">✔ Strong grasp of the subject.</li>
                                <li className="text-yellow-600 font-semibold">⚠ Minor improvements needed.</li>
                                <li className="text-blue-700 font-semibold">📌 Focus on problem-solving skills.</li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* AI Chatbot Section on the Right */}
                    <div className="w-1/2 bg-blue-200 p-6 rounded-lg shadow-lg flex flex-col items-center h-full">
                        <h2 className="text-lg font-semibold mb-2">AI Tutor Chat</h2>
                        <div className="bg-black w-full h-96 rounded-lg flex flex-col items-center justify-center p-4">
                            <div className="flex space-x-2 mb-2">
                                <div className="w-6 h-6 bg-white"></div>
                                <div className="w-6 h-6 bg-white"></div>
                            </div>
                            <div className="w-16 h-6 bg-white mb-2"></div>
                            <div className="w-20 h-8 bg-white"></div>
                        </div>
                    </div>
                </div>

                {/* Footer Component */}
                <Footer />
            </div>
        </div>
    );
}
