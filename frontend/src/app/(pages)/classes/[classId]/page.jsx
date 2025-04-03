'use client';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Sidebar from '@/app/components/Sidebar';
import Header from '@/app/components/Header';
import useAuth from '@/app/hooks/useAuth';
import { useGetClassDetailsQuery, useGetStudentsQuery, useGetStudentsRequestsQuery, useHandleJoinRequestsMutation } from '@/app/features/classes/classesApi';
import { useGetAllAssignmentsQuery, useGetAssignmentAcceptedQuery, useGetAssignmentRequestsQuery, useHandleAssignmentMutation, usePostNewAssignmentMutation } from '@/app/features/assignments/assignmentApi';
import Link from 'next/link';
import { Loader } from '@/app/components/Loader';
import { Bounce, toast } from 'react-toastify';
import { Calendar, CheckCircle, Eye, FileText, Plus,XCircle } from 'lucide-react';
import Image from 'next/image';

const ClassPage = () => {
    const { classId } = useParams();
    const [activeTab, setActiveTab] = useState("pending")
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
    const approveAssignment = (id, studentId) => {
        handleAssignment({ classId, studentId, assignmentId: id, action: 'accept' })
    };

    // Reject Assignment Request
    const rejectAssignment = (id, studentId) => {
        handleAssignment({ classId, studentId, assignmentId: id, action: 'reject' })
    };

    // Add New Assignment
    const addAssignment = async () => {
        if (classId) {
            await newAssignment({ classId, assignmentName: newAssignmentTitle, dueDate: newAssignmentDueDate, assignmentType })
        }
    };
    const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false)
    const modalRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsCreateAssignmentOpen(false)
            }
        }

        if (isCreateAssignmentOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isCreateAssignmentOpen])

    return (
        <div className="flex h-screen bg-[#eef5ff]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-auto">
                <Header />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Class Header */}
                        <div className="card bg-white p-5 rounded-md">
                            <div className="card-header">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-4xl font-extrabold text-black">{classDetails ? classDetails.className : ''}</h1>
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
                            </div>
                        </div>
                        {/* Students and Assignments */}
                        <div className="card bg-white p-5">
                            {role === 'faculty' && (
                                <div className="card-header flex flex-row items-center justify-between">
                                    <h3 className="card-title">Assignments</h3>
                                    <button className="btn btn-primary bg-indigo-500 rounded-md cursor-pointer text-white px-3 py-2 flex items-center" onClick={() => setIsCreateAssignmentOpen(true)}>
                                        <Plus className="h-4 w-4 mr-2" /> Create Assignment
                                    </button>
                                    {isCreateAssignmentOpen && (
                                        <div className="fixed inset-0 bg-overlay flex items-center justify-center z-50">
                                            <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-lg font-semibold">Create New Assignment</h3>
                                                    <button
                                                        className="text-gray-500 hover:text-gray-700"
                                                        onClick={() => setIsCreateAssignmentOpen(false)}
                                                    >
                                                        &times;
                                                    </button>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label htmlFor="assignmentName" className="block text-sm font-medium text-gray-700">
                                                            Assignment Name
                                                        </label>
                                                        <input id="assignmentName" className="input" placeholder="Enter assignment name" value={newAssignmentTitle} onChange={(e) => setNewAssignmentTitle(e.target.value)} />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label htmlFor="assignmentType" className="block text-sm font-medium text-gray-700">
                                                                Assignment Type
                                                            </label>
                                                            <select id="assignmentType" className="select" value={assignmentType}
                                                                onChange={(e) => setAssignmentType(e.target.value)}>
                                                                <option value="coding">Coding</option>
                                                                <option value="subjective">Subjective</option>
                                                                <option value="objective">Objective</option>
                                                            </select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                                                Due Date
                                                            </label>
                                                            <input id="dueDate" type="date" className="input" value={newAssignmentDueDate} onChange={(e) => setNewAssignmentDueDate(e.target.value)} />
                                                        </div>
                                                    </div>

                                                </div>
                                                {assignmentPostError ? <p className='text-red-500 mt-5'>{assignmentPostError?.data?.message}</p> : null}
                                                <div className="flex justify-end gap-2 mt-6">
                                                    <button className="btn btn-outline border cursor-pointer border-gray-200 p-2 rounded-md" onClick={() => setIsCreateAssignmentOpen(false)}>
                                                        Cancel
                                                    </button>
                                                    <button className="btn btn-primary p-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 rounded-md text-white" onClick={addAssignment}>{postingAssignment ? <Loader /> : 'Create Assignment'}</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="card-content">
                                <div className="space-y-4">
                                    {/* Assignments Section */}
                                    <div className="bg-white py-6 rounded-xl ">
                                        <ul className="space-y-3">
                                            {(assignments && assignments.length !== 0) ? assignments.map((assignment) => (
                                                <div key={assignment.id} className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg">
                                                    <div className="flex items-center gap-4">
                                                        <div className="bg-blue-100 p-2 rounded-md">
                                                            <FileText className="h-6 w-6 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium">{assignment.assignmentName}</h3>
                                                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="h-3 w-3" /> Due: {assignment.dueDate}
                                                                </span>
                                                                <span className="rounded-full border border-gray-300 px-2 text-black">{assignment.assignmentType}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <div className="text-sm font-medium">Submissions</div>
                                                            <div className="text-sm text-gray-500">
                                                                33/62
                                                            </div>
                                                        </div>
                                                        <Link href={`/assignment/${assignment.id}/class/${classId}`}>
                                                            <button className="btn cursor-pointer rounded-md border border-gray-200 px-2 py-1 btn-outline btn-sm flex items-center gap-1">
                                                                <Eye className="h-4 w-4 mr-1" /> View
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                                // <li key={assignment.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                                                //     <div>
                                                //         <p className="text-lg font-medium text-black">{assignment.assignmentName}</p>
                                                //         <p className="text-sm text-black">Due: {assignment.dueDate ? assignment.dueDate : 'N/A'}</p>
                                                //     </div>
                                                //     <Link href={`/assignment/${assignment.id}/class/${classId}`} className="text-black hover:underline">
                                                //         View
                                                //     </Link>
                                                // </li>
                                            )) : (
                                                <p className='text-gray-600'>No Assignments</p>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Faculty Panel */}
                        {role === 'faculty' && (
                            <div className="card bg-white p-5 rounded-md">
                                <div className="card-header">
                                    <h3 className="card-title">Assignment Submissions</h3>
                                </div>

                                <div className="card-content">
                                    <div className="flex border-b mb-4">
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${activeTab === "pending"
                                                ? "border-b-2 border-blue-500 text-blue-600"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                            onClick={() => setActiveTab("pending")}
                                        >
                                            Pending Review
                                        </button>
                                        <button
                                            className={`px-4 py-2 text-sm font-medium ${activeTab === "accepted"
                                                ? "border-b-2 border-blue-500 text-blue-600"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                            onClick={() => setActiveTab("accepted")}
                                        >
                                            Accepted
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {(activeTab === "pending") && (
                                            <div>
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
                                                                <div
                                                                    key={req.id}
                                                                    className="flex items-center justify-between p-3 bg-white border rounded-lg"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                                                            <Image
                                                                                src={req.avatar || "/placeholder.svg"}
                                                                                alt={req.username}
                                                                                fill
                                                                                className="aspect-square object-cover"
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="font-medium">{req.assignmentName}</h3>
                                                                            <p className="text-xs text-gray-500">{req.username}</p>
                                                                            <div className="flex items-center gap-3 mt-1">
                                                                                {plagiarismScores.length > 0 ? (
                                                                                    <span className="badge badge-outline bg-red-50 text-red-600">
                                                                                        Plagiarism: {plagiarismPercentage}
                                                                                    </span>

                                                                                ) : (
                                                                                    <span className="badge badge-outline bg-red-50 text-red-600">
                                                                                        Plagiarism: 0%
                                                                                    </span>
                                                                                )}
                                                                                <span className="badge badge-outline">Score: {req.score}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex items-center gap-2">
                                                                        <button className="btn btn-outline btn-sm flex items-center gap-1">
                                                                            <Eye className="h-4 w-4 mr-1" /> View
                                                                        </button>
                                                                        <button className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 text-green-500 hover:text-green-600 hover:bg-green-50"
                                                                            onClick={() => { approveAssignment(req.id, req.studentId) }}>
                                                                            {RequestHandlerLoading ? <Loader /> : <CheckCircle className="h-4 w-4" />}

                                                                        </button>
                                                                        <button onClick={() => rejectAssignment(req.id, req.studentId)} className="h-8 w-8 flex items-center justify-center rounded-md border border-gray-300 text-red-500 hover:text-red-600 hover:bg-red-50">
                                                                            {RequestHandlerLoading ? <Loader /> : <XCircle className="h-4 w-4" />}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                // <li key={req.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
                                                                //     {/* Student & Assignment Details */}
                                                                //     <div className="flex flex-col">
                                                                //         <span className="font-semibold text-gray-800">{req.username}</span>
                                                                //         <span className="text-gray-600">{req.assignmentName}</span>
                                                                //     </div>

                                                                //     {/* Plagiarism Score & Actions */}
                                                                //     <div className="flex items-center space-x-6">
                                                                //         {plagiarismScores.length > 0 ? (
                                                                //             <div className="flex items-center space-x-2">
                                                                //                 <span className="text-sm text-gray-500">Plagiarism Score:</span>
                                                                //                 <span className={`text-sm font-semibold ${scoreColor}`}>
                                                                //                     {plagiarismPercentage}%
                                                                //                 </span>
                                                                //             </div>
                                                                //         ) : (
                                                                //             <div className="flex items-center space-x-2">
                                                                //                 <span className="text-sm text-gray-500">Plagiarism Score:</span>
                                                                //                 <span className={`text-sm font-semibold ${scoreColor}`}>
                                                                //                     0%
                                                                //                 </span>
                                                                //             </div>

                                                                //         )}
                                                                //         <button
                                                                //             onClick={() => approveAssignment(req.id, req.studentId)}
                                                                //             className="px-4 py-1 flex justify-center items-center bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                                                //         >
                                                                //             {RequestHandlerLoading ? <Loader /> : 'Approve'}

                                                                //         </button>
                                                                //         <button
                                                                //             onClick={() => rejectAssignment(req.id, req.studentId)}
                                                                //             className="px-4 py-1 flex justify-center items-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                                                //         >
                                                                //             {RequestHandlerLoading ? <Loader /> : 'Reject'}
                                                                //         </button>
                                                                //     </div>
                                                                // </li>
                                                            );
                                                        })}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-500 text-center">No assignment requests at the moment.</p>
                                                )}
                                            </div>
                                        )}

                                        {activeTab === "accepted" && (
                                            <div>
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


                                                            return (
                                                                <div
                                                                    key={assignment.id}
                                                                    className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <div>
                                                                            <h3 className="font-medium">{assignment.assignmentName}</h3>
                                                                            <p className="text-xs text-gray-500">{assignment.username}</p>
                                                                            <div className="flex items-center gap-3 mt-1">
                                                                                {plagiarismScores.length > 0 ? (
                                                                                    <span className="text-xs px-2 py-1 rounded-full border border-gray-200 badge badge-outline bg-green-50 text-green-600">
                                                                                        Plagiarism: {plagiarismPercentage}%
                                                                                    </span>
                                                                                ) : (
                                                                                    <span className="text-xs px-2 py-1 rounded-full border border-gray-200 badge badge-outline bg-green-50 text-green-600">
                                                                                        Plagiarism: 0%
                                                                                    </span>

                                                                                )}
                                                                                <span className="badge badge-outline text-xs border border-gray-200 px-2 py-1 rounded-full">Score: {assignment.score}/10</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <button className="btn btn-outline btn-sm flex items-center gap-1">
                                                                        <Eye className="h-4 w-4 mr-1" /> View
                                                                    </button>
                                                                </div>
                                                            )
                                                        })}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-500 text-center">No assignments have been approved yet.</p>
                                                )}

                                            </div>
                                        )}

                                    </div>
                                </div>




                            </div>
                        )}

                    </div>
                    {/* Students Section */}
                    <div className="space-y-6">
                        <div className="card bg-white rounded-md p-5">
                            <div className="card-header">
                                <h3 className="card-title">Students</h3>
                            </div>
                            <div className="card-content mt-3">
                                <div className="space-y-3">
                                    {students && students.length != 0 ? (
                                        <>
                                            {students && students.map((student) => (
                                                <div key={student.id} className="flex items-center justify-between p-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                                                            <Image
                                                                src={student.avatar || "/placeholder.svg"}
                                                                alt={student.username}
                                                                fill
                                                                className="aspect-square object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-sm font-medium">{student.username}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </>
                                    ) : (
                                        <p>No students joined class yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Manage Student Requests */}
                        {role === 'faculty' && (
                            <div className="card bg-white rounded-md p-5">
                                <div className="card-header">
                                    <h3 className="card-title">Join Requests</h3>
                                </div>
                                <div className="card-content">
                                    {studentRequests && studentRequests.length > 0 ? (
                                        <div className="space-y-3 ">
                                            {studentRequests.map((req) => (
                                                <div key={req.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                                            <Image
                                                                src={req.avatar || "/placeholder.svg"}
                                                                alt={req.username}
                                                                fill
                                                                className="aspect-square object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium">{req.username}</h3>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => approveStudent(req.id)}
                                                            className="h-8 w-8 flex items-center cursor-pointer justify-center rounded-md border border-gray-300 text-green-500 hover:text-green-600 hover:bg-green-50">
                                                            <CheckCircle className="h-4 w-4" />
                                                        </button>
                                                        <button onClick={() => rejectStudent(req.id)} className="h-8 w-8 flex items-center cursor-pointer justify-center rounded-md border border-gray-300 text-red-500 hover:text-red-600 hover:bg-red-50">
                                                            <XCircle className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-start mt-3">No student join requests at the moment.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div >
    );
};

export default ClassPage;
