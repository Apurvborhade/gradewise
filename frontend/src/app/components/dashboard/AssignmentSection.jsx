

import { useState, useEffect } from "react";
import { useGetStudentAssignmentsQuery } from "@/app/features/assignments/assignmentApi";
import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { ChevronRight, Eye } from "lucide-react";

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
        <div className="card bg-white md:mt-4 md:p-5">
            <div className="card-header">
                <div className="flex justify-between items-center">
                    <h3 className="card-title">Assignment</h3>
                    <button className="text-blue-600 text-sm font-medium flex items-center">
                        See all <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="card-content md:my-5">
                <div className="space-y-3">


                    {isLoading && (

                            <p colSpan="5" className="text-center p-4">Loading...</p>

                    )}
                    {isSuccess && data?.assignments?.length === 0 && (
                        
                            <p colSpan="5" className="text-center p-4">No Assignments Found</p>
                        
                    )}
                    {isSuccess && data?.assignments?.map((assignment,index) => (
                        <div
                            key={assignment.id}
                            className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`text-2xl h-10 w-10 flex items-center justify-center rounded-md`}
                                >
                                    🧪
                                </div>
                                <div>
                                    <h3 className="font-medium">
                                        {index+1}. {assignment.className}
                                    </h3>
                                    <div className="flex items-center text-xs text-gray-500 gap-2">
                                        <span>{assignment.className}</span>
                                        <span>•</span>
                                        <span>level 1</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="font-medium">Score: {assignment.score}/10</div>
                                    <div className="text-xs text-red-500">Plagiarism: {assignment.plagiarismReport && assignment.plagiarismReport.length > 0 ? (
                                        <span className={Math.floor(Math.max(...assignment.plagiarismReport.map(report => report.score)) * 100) > 60 ? 'text-red-600' : `text-green-600`}>
                                            {Math.floor(Math.max(...assignment.plagiarismReport.map(report => report.score)) * 100)}%
                                        </span>
                                    ) : (
                                        <span className="text-green-600">0 %</span>
                                    )}</div>
                                </div>

                                <Link href={`/submittedAssignment/${assignment.id}`}>
                                    <button className="flex items-center gap-1 border border-gray-300 px-2 py-1 rounded-md cursor-pointer">
                                        <Eye className="h-4 w-4" /> View
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Section */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-lg transition ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                >
                    ◀ Previous
                </button>

                <span className="text-black font-medium">Page {page}</span>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!hasMore}
                    className={`px-4 py-2 rounded-lg transition ${!hasMore ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                        }`}
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
}
