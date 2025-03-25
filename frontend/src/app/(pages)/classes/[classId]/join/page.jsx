'use client'

import { useJoinClassMutation } from "@/app/features/classes/classesApi";
import useAuth from "@/app/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JoinClassSection() {
    const [className, setClassName] = useState("");
    const { user, loading } = useAuth()
    const { classId } = useParams();
    const [joinClass, { isLoading, error, isSuccess }] = useJoinClassMutation()
    const router = useRouter()
    useEffect(() => {
        if (!user && !loading) {
            router.push(`/auth/signin?redirectUrl=/classes/${classId}/join`)
        }
    }, [user, loading])
    const handleJoinRequest = (e) => {
        e.preventDefault();
        if (user) {
            joinClass({ classId, studentId: user.uid })
        }
        // Handle join request logic (API call or Redux action)
        console.log("Request sent for class:", className);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 shadow-md rounded-xl border border-gray-300 w-96 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Join a Class</h2>
                <h1 className="text-black text-3xl">Class Name</h1>
                {error && <p className="text-red-600">{error.data?.message}</p>}
                <button
                    onClick={handleJoinRequest}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Send Join Request
                </button>

            </div>
        </div>
    );
}
