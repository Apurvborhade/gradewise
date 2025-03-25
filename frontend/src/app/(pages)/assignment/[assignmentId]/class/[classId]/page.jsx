"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Bounce, toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useGetAssignmentDetailsQuery, useSubmitAssignmentMutation } from "@/app/features/assignments/assignmentApi";
import useAuth from "@/app/hooks/useAuth";
import { Loader } from "@/app/components/Loader";

export default function AssignmentDetails() {
    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const { assignmentId, classId } = useParams()
    const { data: assignmentDetails, isLoading, isSuccess, error } = useGetAssignmentDetailsQuery(assignmentId, {
        skip: !assignmentId
    })
    const { user, loading } = useAuth()
    // file, studentId, assignmentId, maxScore, gradingCriteria, classId, assignmentType
    const [submitAssignment, { isLoading: assignmentSubmitting, isSuccess: assignmentSubmitSuccess, error: assignmentSubmitError }] = useSubmitAssignmentMutation()
    useEffect(() => {
        console.log(assignmentDetails)
    }, [assignmentDetails])

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            toast.error("Please select a file before submitting!", {
                position: "bottom-right",
                autoClose: 3000,
                theme: "dark",
                transition: Bounce,
            });
            return;
        }

        // Simulate file upload (Replace with API call)
        console.log("Submitting:", file.name);

        submitAssignment({ file, studentId: user?.uid, assignmentId, maxScore: 10, gradingCriteria: [], classId, assignmentType: assignmentDetails.assignmentType })

        setSubmitted(true);

        setTimeout(() => setSubmitted(false), 3000);
    };


    useEffect(() => {
        if (assignmentSubmitSuccess) {
            toast.success("Assignment submitted successfully!", {
                position: "bottom-right",
                autoClose: 3000,
                theme: "dark",
                transition: Bounce,
            });
            setFile(null)
        }
    }, [assignmentSubmitSuccess])
    return (
        <div className="flex h-screen bg-[#eef5ff]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-auto">
                {/* Header */}
                <Header />

                {/* Assignment Details Section */}
                <div className="flex justify-center items-center min-h-[80vh] p-6">
                    <div className="bg-white p-6 shadow-md rounded-xl border border-gray-300 w-full max-w-lg">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{assignmentDetails && assignmentDetails.assignmentName}</h1>
                        {/* <p className="text-gray-600 mb-4">{assignmentDetails.description ? assignmentDetails.description : null}</p> */}
                        <p className="text-red-500 font-semibold mb-6">Deadline: {assignmentDetails && assignmentDetails.dueDate ? assignmentDetails.dueDate : 'N/A'}</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <label className="block">
                                <span className="text-gray-700">Upload Your Submission</span>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="mt-1 text-gray-700 block w-full border border-gray-300 rounded-lg p-2"
                                    required
                                />
                            </label>
                            {assignmentSubmitError && <p className="text-red-600">{assignmentSubmitError?.data?.message}</p>}
                            <button
                                type="submit"
                                className="bg-indigo-600 flex items-center justify-center text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                            >
                                {assignmentSubmitting ? <Loader /> : 'Submit Assignment'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
