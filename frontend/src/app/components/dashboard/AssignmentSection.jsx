import { useState, useEffect } from "react";
import { useGetStudentAssignmentsQuery } from "@/app/features/assignments/assignmentApi";
import useAuth from "@/app/hooks/useAuth";

export default function Assignments() {
    const { user, loading } = useAuth();

    // Pagination states
    const [page, setPage] = useState(1);
    const [lastVisible, setLastVisible] = useState(null);
    const [hasMore, setHasMore] = useState(true); // Track if more pages exist

    const pageSize = 5; // Keep page size constant

    // Fetch assignments with pagination
    const { data, isLoading, isSuccess } = useGetStudentAssignmentsQuery(
        { studentId: user?.uid, page, pageSize, lastVisible },
        { skip: !user?.uid }
    );

    // Update lastVisible & hasMore when data changes
    useEffect(() => {
        if (data?.assignments?.length > 0) {
            setLastVisible(data.lastVisible);
            setHasMore(data.assignments.length === pageSize); // If less than pageSize, no more pages
        } else {
            setHasMore(false); // No more assignments
        }
    }, [data]);

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300 mt-6">
            <h1 className="text-3xl font-bold text-black mb-6 text-center">📑 Submitted Assignments</h1>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2 text-left text-black">Class Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-black">Submission Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-black">Plagiarism Report</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-black">Score</th>
                            <th className="border border-gray-300 px-4 py-2 text-left text-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan="5" className="text-center p-4">Loading...</td>
                            </tr>
                        )}
                        {isSuccess && data?.assignments?.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center p-4">No Assignments Found</td>
                            </tr>
                        )}
                        {isSuccess && data?.assignments?.map((assignment) => (
                            <tr key={assignment.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 text-black">{assignment.className}</td>
                                {/* <td className="border border-gray-300 px-4 py-2 text-black">{assignment.submissionDate. || "N/A"}</td> */}
                                <td className="border border-gray-300 px-4 py-2">
                                    <span className={assignment.assignment.plagiarismReport && plagiarismReport.length !== 0 ? "text-green-600" : "text-red-600"}>
                                        {assignment.plagiarismReport && assignment.plagiarismReport.length !== 0 ? 'Available' : 'Not Available'}
                                    </span>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-black">{assignment.score}/10</td>
                                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                        View Assignment
                                    </button>
                                    <button className="bg-black text-white px-4 py-2 rounded-lg transition">
                                        View Report
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Section */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg transition ${
                        page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                    ◀ Previous
                </button>

                <span className="text-black font-medium">Page {page}</span>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!hasMore}
                    className={`px-4 py-2 rounded-lg transition ${
                        !hasMore ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
}
