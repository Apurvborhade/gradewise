'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import useAuth from '@/app/hooks/useAuth';
import { useGetClassDetailsQuery, useGetStudentsQuery, useGetStudentsRequestsQuery, useHandleJoinRequestsMutation } from '@/app/features/classes/classesApi';
import { useGetAllAssignmentsQuery, useGetAssignmentAcceptedQuery, useGetAssignmentRequestsQuery, useHandleAssignmentMutation, usePostNewAssignmentMutation } from '@/app/features/assignments/assignmentApi';
import Link from 'next/link';
import { Loader } from '@/app/components/Loader';
import { Bounce, toast } from 'react-toastify';

const ClassPage = () => {
    const { classId } = useParams();
    const { user } = useAuth();
    const [role, setRole] = useState(null);
    const [assignmentType, setAssignmentType] = useState("");

    const { data: students, isLoading, error } = useGetStudentsQuery(classId, {
        skip: !classId,
        refetchOnMountOrArgChange: true
    })
    const { data: classDetails, isLoading: loadingClass, error: classLoadingError } = useGetClassDetailsQuery(classId, {
        skip: !classId,
        refetchOnMountOrArgChange: true
    })
    const { data: assignmentRequests, isLoading: loadingAssignmentRequests, error: assignmentRequestsLoadingError } = useGetAssignmentRequestsQuery(classId, {
        skip: !classId,
        refetchOnMountOrArgChange: true
    })
    const { data: approvedAssignments, isLoading: loadingApprovedAssignments, error: approvedAssignmentsError } = useGetAssignmentAcceptedQuery(classId, {
        skip: !classId,
        refetchOnMountOrArgChange: true
    });
    const { data: studentRequests, isLoading: loadingStudentRequests, error: studentRequestsError } = useGetStudentsRequestsQuery(classId, {
        skip: !classId,
        refetchOnMountOrArgChange: true
    });

    const { data: assignments, isLoading: loadingAssignments, error: assignmentsLoadingError } = useGetAllAssignmentsQuery(classId, {
        skip: !classId,
        refetchOnMountOrArgChange: true
    })

    const [handleAssignment, { isLoading: RequestHandlerLoading, error: RequestHandlerError, isSuccess: RequestHanlderSuccess }] = useHandleAssignmentMutation()
    const [handleStudentReq, { isLoading: StudentReqLoading, error: StudentReqError, isSuccess: StudentReqSuccess }] = useHandleJoinRequestsMutation()


    const [newAssignment, { isLoading: postingAssignment, error: assignmentPostError }] = usePostNewAssignmentMutation()


    const [copied, setCopied] = useState(false);
    const classLink = `http://gradewise-lilac.vercel.app/classes/${classId}/join`; // Replace with actual class link

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(classLink);
            setCopied(true);

            toast.success('Copied invite link', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            setTimeout(() => setCopied(false), 2000); // Reset message after 2s
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };


    const [newAssignmentTitle, setNewAssignmentTitle] = useState('');
    const [newAssignmentDueDate, setNewAssignmentDueDate] = useState('');

    useEffect(() => {
        if (user) setRole(user.role);
    }, [user]);

    // Accept Student Request
    const approveStudent = (id) => {
        handleStudentReq({ classId, studentId: id, action: 'accept' })
    };

    // Reject Student Request
    const rejectStudent = (id) => {
        handleStudentReq({ classId, studentId: id, action: 'reject' })
    };

    // Approve Assignment Request
    const approveAssignment = (id,studentId) => {
        handleAssignment({ classId, studentId, assignmentId: id, action: 'accept' })
    };

    // Reject Assignment Request
    const rejectAssignment = (id,studentId) => {
        handleAssignment({ classId, studentId, assignmentId: id, action: 'reject' })
    };

    // Add New Assignment
    const addAssignment = async () => {
        if (classId) {
            await newAssignment({ classId, assignmentName: newAssignmentTitle, dueDate: newAssignmentDueDate, assignmentType })
        }
    };

    return (
        <div className="flex h-screen bg-[#eef5ff]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-auto">
                <Header />

                <div className="p-8">
                    {/* Class Header */}
                    <div className="flex items-center justify-between bg-white shadow-lg rounded-xl p-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-black">Class {classDetails ? classDetails.className : ''}</h1>

                        </div>
                        <div className='flex items-center gap-3'>
                            <span className="px-4 py-2 bg-gray-300 text-black text-sm font-semibold rounded-lg shadow">
                                {role === 'faculty' ? 'Faculty Panel' : 'Student'}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="bg-indigo-600 text-white px-5 cursor-pointer py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                            >
                                Invite Link
                            </button>
                        </div>
                    </div>

                    {/* Students and Assignments */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {/* Students Section */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-black">👩‍🎓 Students in Class</h2>
                            {students && (
                                <ul className="space-y-3">
                                    {students.length !== 0 ? students.map((student) => (
                                        <li key={student.id} className="flex items-center gap-4 p-3 bg-gray-100 rounded-lg">
                                            <span className="text-lg font-medium text-black">{student.username ? student.username : 'Unknown'}</span>
                                        </li>
                                    )) : (
                                        <p className="text-gray-600 my-3">No Students in class</p>
                                    )}
                                </ul>
                            )}
                        </div>

                        {/* Assignments Section */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-black">📑 Assignments</h2>
                            <ul className="space-y-3">
                                {(assignments && assignments.length !== 0) ? assignments.map((assignment) => (
                                    <li key={assignment.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                                        <div>
                                            <p className="text-lg font-medium text-black">{assignment.assignmentName}</p>
                                            <p className="text-sm text-black">Due: {assignment.dueDate ? assignment.dueDate : 'N/A'}</p>
                                        </div>
                                        <Link href={`/assignment/${assignment.id}/class/${classId}`} className="text-black hover:underline">
                                            View
                                        </Link>
                                    </li>
                                )) : (
                                    <p className='text-gray-600'>No Assignments</p>
                                )}
                            </ul>
                        </div>
                    </div>


                    {/* Faculty Panel */}
                    {role === 'faculty' && (
                        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-semibold text-black mb-4">👨‍🏫 Faculty Panel</h2>

                            {/* Manage Student Requests */}
                            <div className='flex flex-col gap-10'>
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-black mb-2">📩 Student Join Requests</h3>
                                    {studentRequests && studentRequests.length > 0 ? (
                                        <ul className="space-y-3">
                                            {studentRequests.map((req) => (
                                                <li key={req.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
                                                    {/* Student Details */}
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-gray-800">{req.username ? req.username : 'Unknown'}</span>
                                                        <span className="text-gray-600">ID: {req.id}</span>
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center space-x-4">
                                                        <button
                                                            onClick={() => approveStudent(req.id)}
                                                            className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => rejectStudent(req.id)}
                                                            className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-center">No student join requests at the moment.</p>
                                    )}
                                </div>

                                {/* Approved Assignments Section */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-black mb-2">✅ Approved Assignments</h3>
                                    {approvedAssignments && approvedAssignments.length > 0 ? (
                                        <ul className="space-y-3">
                                            {approvedAssignments.map((assignment) => {
                                                const plagiarismScores = assignment.plagiarismReport?.map(report => report.score) || [];

                                                // Get the highest plagiarism score
                                                const highestScore = plagiarismScores.length > 0 ? Math.max(...plagiarismScores) : 0;
                                                const plagiarismPercentage = (highestScore * 100).toFixed(2);

                                                // Define plagiarism score color
                                                let scoreColor = "text-green-600"; // Low risk
                                                if (highestScore > 0.5) scoreColor = "text-orange-500"; // Medium risk
                                                if (highestScore > 0.8) scoreColor = "text-red-600"; // High risk


                                                return (<li key={assignment.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
                                                    {/* Student & Assignment Details */}
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-gray-800">{assignment.username}</span>
                                                        <span className="text-gray-600">{assignment.assignmentName}</span>
                                                    </div>

                                                    {plagiarismScores.length > 0 ? (
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm text-gray-500">Plagiarism Score:</span>
                                                            <span className={`text-sm font-semibold ${scoreColor}`}>
                                                                {plagiarismPercentage}%
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-sm text-gray-500">Plagiarism Score:</span>
                                                            <span className={`text-sm font-semibold ${scoreColor}`}>
                                                                0%
                                                            </span>
                                                        </div>

                                                    )}
                                                </li>)
                                            })}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-center">No assignments have been approved yet.</p>
                                    )}
                                </div>

                                {/* Approve Assignment Requests */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-black mb-2">✅ Approve Assignment Requests</h3>
                                    {assignmentRequests && assignmentRequests.length > 0 ? (
                                        <ul className="space-y-3">
                                            {assignmentRequests && assignmentRequests.map((req) => {
                                                // Extract plagiarism scores
                                                const plagiarismScores = req.plagiarismReport?.map(report => report.score) || [];

                                                // Get the highest plagiarism score
                                                const highestScore = plagiarismScores.length > 0 ? Math.max(...plagiarismScores) : 0;
                                                const plagiarismPercentage = (highestScore * 100).toFixed(2);

                                                // Define plagiarism score color
                                                let scoreColor = "text-green-600"; // Low risk
                                                if (highestScore > 0.5) scoreColor = "text-orange-500"; // Medium risk
                                                if (highestScore > 0.8) scoreColor = "text-red-600"; // High risk

                                                return (
                                                    <li key={req.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
                                                        {/* Student & Assignment Details */}
                                                        <div className="flex flex-col">
                                                            <span className="font-semibold text-gray-800">{req.username}</span>
                                                            <span className="text-gray-600">{req.assignmentName}</span>
                                                        </div>

                                                        {/* Plagiarism Score & Actions */}
                                                        <div className="flex items-center space-x-6">
                                                            {plagiarismScores.length > 0 ? (
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="text-sm text-gray-500">Plagiarism Score:</span>
                                                                    <span className={`text-sm font-semibold ${scoreColor}`}>
                                                                        {plagiarismPercentage}%
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="text-sm text-gray-500">Plagiarism Score:</span>
                                                                    <span className={`text-sm font-semibold ${scoreColor}`}>
                                                                        0%
                                                                    </span>
                                                                </div>

                                                            )}
                                                            <button
                                                                onClick={() => approveAssignment(req.id,req.studentId)}
                                                                className="px-4 py-1 flex justify-center items-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                                            >
                                                                {RequestHandlerLoading ? <Loader /> : 'Approve'}
                                                                
                                                            </button>
                                                            <button
                                                                onClick={() => rejectAssignment(req.id,req.studentId)}
                                                                className="px-4 py-1 flex justify-center items-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                                            >
                                                                {RequestHandlerLoading ? <Loader /> : 'Reject'}
                                                            </button>
                                                        </div>
                                                    </li>
                                                );
                                            })}


                                        </ul>
                                    ) : (
                                        <p className="text-gray-500 text-center">No assignment requests at the moment.</p>
                                    )}
                                </div>
                            </div>

                            {/* Add New Assignments */}
                            <div className="text-black">
                                <h3 className="text-xl font-semibold text-black mb-2">📝 Add New Assignments</h3>
                                <input type="text" placeholder="Assignment Title" className="p-2 border w-full mb-2 text-black" value={newAssignmentTitle} onChange={(e) => setNewAssignmentTitle(e.target.value)} />
                                <input type="date" className="p-2 border w-full mb-2 text-black" value={newAssignmentDueDate} onChange={(e) => setNewAssignmentDueDate(e.target.value)} />
                                <select
                                    value={assignmentType}
                                    onChange={(e) => setAssignmentType(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                                    required
                                >
                                    <option value="" disabled>Select Assignment Type</option>
                                    <option value="coding">Coding</option>
                                    <option value="subjective">Subjective</option>
                                    <option value="objective">Objective</option>
                                </select>
                                {assignmentPostError ? <p className="text-red-600">{assignmentPostError.data?.message} </p> : null}
                                <button onClick={addAssignment} className="w-full px-3 py-2 bg-blue-500 text-black rounded-lg">{postingAssignment ? <Loader className="stroke-black" /> : 'Post'}</button>
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default ClassPage;
