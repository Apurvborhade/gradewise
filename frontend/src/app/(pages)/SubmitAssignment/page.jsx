"use client";
import React, { useState } from "react";

const Assignments = () => {
    const [filter, setFilter] = useState("");

    // Sample data for assignments
    const assignments = [
        { subject: "Math", title: "Algebra Homework" },
        { subject: "Science", title: "Chemistry Lab Report" },
        { subject: "History", title: "World War II Essay" },
        { subject: "Math", title: "Geometry Problems" },
        { subject: "Physics", title: "Physics Experiment" },
    ];

    // Filter assignments by subject
    const filteredAssignments = filter
        ? assignments.filter((assignment) => assignment.subject === filter)
        : assignments;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-20 bg-gray-800 p-4 flex flex-col items-center">
                <div className="w-10 h-6 bg-white rounded-md"></div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-10">
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
                    <div className="flex flex-col gap-4">
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

                    {/* Footer Section */}
                    <div className="flex justify-between items-center mt-6">
                        <button className="bg-gray-800 text-white px-6 py-3 rounded-md shadow-md font-bold">
                            See Plagiarism
                        </button>

                        <div className="flex items-center bg-green-600 px-4 py-2 rounded-md shadow-md">
                            <span className="text-white font-bold text-lg">
                                Total submissions received: {filteredAssignments.length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assignments;
