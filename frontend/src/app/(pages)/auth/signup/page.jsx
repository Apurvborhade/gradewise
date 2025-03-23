"use client";
import { useEffect, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useUserSignupMutation } from "@/app/features/users/usersApi";
import { Bounce, toast } from "react-toastify";
import { Loader } from "@/app/components/Loader";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signup, { isLoading, error, isSuccess }] = useUserSignupMutation()
    const router = useRouter()

    useEffect(() => {
        if(isSuccess && !isLoading) {
            toast.success('User Registered Successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            setEmail("")
            setPassword("")
            setRole("")
            setUsername("")
            router.push('/dashboard')
        }
    }, [isSuccess,isLoading])
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formBody = {
            role,
            username,
            email,
            password
        }

        await signup(formBody)

    }
    return (
        <div className="flex h-screen w-full bg-gray-50">
            {/* Left Side - Illustration */}
            <div className="w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-10">
                <div className="w-full h-full flex items-center justify-center">
                    <img
                        src="/assests/illustration.png"
                        alt="Illustration"
                        className="w-4/5 transform transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </div>

            {/* Right Side - Signup Form */}

            <form className="w-1/2 bg-white flex flex-col justify-center px-20 shadow-lg" onSubmit={handleFormSubmit}>
                <h1 className="text-4xl font-semibold text-black mb-2">GradeWise</h1>

                <p className="text-gray-600 mb-8">Create an account to get started</p>

                {/* Role Selection */}
                <select
                    className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                    text-black"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="">Select role</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>

                {/* Input Fields */}
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                    text-black"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                    text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                    text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <p className="text-red-600 mb-4">{error.data?.message}</p>
                )}
                {/* Sign Up Button */}
                <button className="flex justify-center items-center w-full bg-blue-500 text-white py-3 rounded-lg mb-4 hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95">
                    {isLoading ? <Loader /> : 'Sign up'}
                </button>

                <div className="text-center text-gray-500 my-4">Or continue with</div>

                {/* Google Sign Up */}
                <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95
                text-black">
                    <FcGoogle size={20} /> Sign up with Google
                </button>

                {/* Already have an account? */}
                <p className="text-gray-600 text-center mt-6">
                    Already have an account?{" "}
                    <Link href={'/auth/signin'}>
                        <span
                            className="text-blue-500 cursor-pointer hover:underline"
                        >
                            Log in
                        </span>
                    </Link>
                </p>
            </form>

        </div>
    );
}

