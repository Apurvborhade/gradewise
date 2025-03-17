"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import Sidebar from "../../components/Sidebar"; // Ensure correct path
import Footer from "../../components/Footer"; // Import Footer component
import Header from "../../components/Header"; // Import the Header component

const Assignments = () => {
    const [filter, setFilter] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state
    const router = useRouter(); // Initialize the router

    const assignments = [
        { subject: "Math", title: "Algebra Homework" },
        { subject: "Science", title: "Chemistry Lab Report" },
        { subject: "History", title: "World War II Essay" },
        { subject: "Math", title: "Geometry Problems" },
        { subject: "Physics", title: "Physics Experiment" },
    ];

    const filteredAssignments = filter
        ? assignments.filter((assignment) => assignment.subject === filter)
        : assignments;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Component */}
            <Header />

            {/* Sidebar Toggle Button (Visible on small screens) */}
            <button
                className="p-2 m-2 bg-blue-600 text-white rounded-md md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? "Close Menu" : "Open Menu"}
            </button>

            <div className="flex flex-1">
                {/* Sidebar (Hidden on small screens, visible on larger screens) */}
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden" onClick={() => setSidebarOpen(false)}></div>
                )}
                <div className={`md:block ${sidebarOpen ? "block" : "hidden"} md:w-1/4 lg:w-1/5`}>
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 p-5 md:p-10">
                    <div className="bg-yellow-500 p-6 rounded-md">
                        {/* Header Section */}
                        <div className="flex justify-between items-center mb-5">
                            <h1 className="text-2xl font-extrabold text-black">Assignments</h1>
                            <select
                                className="bg-white px-4 py-2 rounded-md shadow-sm text-black font-semibold"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="">All Subjects</option>
                                <option value="Math">Math</option>
                                <option value="Science">Science</option>
                                <option value="History">History</option>
                                <option value="Physics">Physics</option>
                            </select>
                        </div>

                        {/* Assignment List */}
                        <div className="grid gap-4 mt-4">
                            {filteredAssignments.map((assignment, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center bg-white p-4 rounded-md shadow-md"
                                >
                                    <span className="font-semibold text-black text-lg">{assignment.title}</span>
                                    <button className="bg-gray-600 text-white px-4 py-1 rounded-md font-semibold">
                                        Upload
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* See Plagiarism Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-gray-800 text-white px-6 py-2 rounded-md font-semibold shadow-lg"
                                onClick={() => router.push("/plagiarism-results")} // Navigate to plagiarism results page
                            >
                                See Plagiarism
                            </button>
                        </div>

                        {/* Total Assignments Remaining */}
                        <div className="flex justify-end mt-4">
                            <p className="text-red-600 font-extrabold text-lg">
                                Total Assignments Remaining: {filteredAssignments.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default Assignments;