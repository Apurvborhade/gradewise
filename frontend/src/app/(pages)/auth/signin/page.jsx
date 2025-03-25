"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import { FcGoogle } from "react-icons/fc";
import { useUserSigninMutation } from "@/app/features/users/usersApi";
import { Loader } from "@/app/components/Loader";
import { Bounce, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin, { isLoading, error, isSuccess, isError }] = useUserSigninMutation()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirectUrl')
  const router = useRouter()
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      email, password
    }
    await signin(formData)
  }
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setEmail("")
      setPassword("")
      toast.success('User Logged in', {
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
      if (redirectUrl) {
        router.push(redirectUrl)
      } else {
        router.push('/dashboard')
      }
    }
  }, [isSuccess, isLoading, error])
  return (
    <>
      <div className="w-full flex min-h-screen">
        {/* Left Section */}
        <div className="w-1/2 bg-green-400 flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold text-black">GradeWise</h1>
          <img src="/assests/illustration.png" alt="Illustration" className="w-4/5 mt-5" />
        </div>

        {/* Right Section */}
        <form onSubmit={handleFormSubmit} className="w-1/2 flex flex-col justify-center items-center px-14 bg-white">
          {/* Header Navigation */}
          <header className="flex w-full justify-end space-x-6 mb-6">
            <Link href="/auth/signup" className="text-lg font-medium text-black">Sign up</Link>
            <Link href="/about-us" className="text-lg font-medium text-black">About Us</Link>
          </header>

          {/* Login Form */}
          <h1 className="text-4xl font-bold text-black mb-2">GradeWise</h1>
          <p className="text-gray-600 mb-5">Please enter your login details below</p>

          {/* Email Input */}
          <div className="w-[90%] flex flex-col mb-4">
            <label className="text-lg text-black font-medium">Email</label>
            <input
              type="email"
              className="w-full border text-black rounded-md px-4 py-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="w-[90%] flex flex-col mb-4 text-black">
            <label className="text-lg font-medium">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-4 py-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-red-600 mt-4">{error.data?.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <Link href="/forgot-password" className="text-blue-500 text-sm mb-4">Forgot your password?</Link>

          {/* Sign-in Button */}
          <button className="flex justify-center items-center w-[90%] bg-black text-white py-2 rounded-md hover:bg-gray-900 transition">
            {isLoading ? <Loader /> : 'Sign in'}
          </button>

          {/* Divider */}
          <div className="flex items-center w-[90%] my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500">Or continue</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Login */}
          <button className="w-[90%] border flex items-center justify-center py-2 rounded-md hover:bg-gray-100 transition text-black">
            <FcGoogle size={20} className="mr-2" /> Log in with Google
          </button>

          {/* Sign Up Link */}
          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
