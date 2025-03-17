"use client";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const PlagiarismReport = () => {
    const [filter, setFilter] = useState("");

    const assignments = [
        { subject: "Math", title: "Algebra Homework", plagiarism: 45 },
        { subject: "Science", title: "Chemistry Lab Report", plagiarism: 30 },
        { subject: "History", title: "World War II Essay", plagiarism: 60 },
        { subject: "Math", title: "Geometry Problems", plagiarism: 20 },
        { subject: "Physics", title: "Physics Experiment", plagiarism: 50 },
    ];

    const filteredAssignments = filter
        ? assignments.filter((assignment) => assignment.subject === filter)
        : assignments;

    return (
        <div className="flex flex-col min-h-screen bg-[#f0f8ff]"> {/* Light blue background */}
            {/* Header */}
            <Header />

            <div className="flex flex-1">
                {/* Sidebar */}
                <div className="w-64 bg-gray-900 text-white">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <div className="bg-[#B9AC92] p-6 rounded-lg shadow-lg">
                        {/* Header Section */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold italic text-gray-900">
                                📄 View Plagiarism Reports
                            </h2>
                            <select
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
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

                        {/* Plagiarism Report Cards */}
                        <div className="space-y-6">
                            {filteredAssignments.map((assignment, index) => (
                                <div key={index} className="bg-[#f8f9fa] p-6 rounded-lg shadow-md border border-gray-300">
                                    <h3 className="text-xl font-semibold text-gray-800">📝 {assignment.title}</h3>
                                    <div className="flex justify-between mt-4">
                                        {/* Conditional Rendering for Accept/Reject */}
                                        <div className="space-x-3">
                                            {assignment.plagiarism > 40 ? (
                                                <button className="px-5 py-2 bg-gray-500 text-white rounded-lg font-semibold shadow-md">
                                                    ❌ Rejected
                                                </button>
                                            ) : (
                                                <button className="px-5 py-2 bg-green-500 text-white rounded-lg font-semibold shadow-md">
                                                    ✅ Accepted
                                                </button>
                                            )}
                                        </div>
                                        <div className="bg-[#AC1754] text-white px-6 py-2 rounded-lg font-bold shadow-md text-lg">
                                            ⚠️ Plagiarism: {assignment.plagiarism}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PlagiarismReport;
