"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import { FcGoogle } from "react-icons/fc";
import { useUserSigninMutation } from "@/app/features/users/usersApi";
import { Loader } from "@/app/components/Loader";
import { Bounce, toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

function SigninForm() {
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
    try {
      const response = await signin(formData).unwrap()
      if (response?.token) {
        // ✅ Manually set cookie in the browser
        document.cookie = `token=${response.token}; path=/; Secure; SameSite=None`;

      }
    } catch (error) {
      console.log(error?.data?.message);
    }
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
  }, [isSuccess, isLoading])
  return (
    <>
      <div className="w-full flex min-h-screen">
        {/* Left Section */}
        <div className="w-1/2 bg-green-400  flex-col justify-center items-center p-10 md:flex hidden">
          <h1 className="text-4xl font-bold text-black">GradeWise</h1>
          <img src="/assests/illustration.png" alt="Illustration" className="w-4/5 mt-5" />
        </div>

        {/* Right Section */}
        <form onSubmit={handleFormSubmit} className="md:w-1/2 w-full flex flex-col justify-center items-center px-14 bg-white">
          {/* Header Navigation */}
          <header className="flex w-full justify-end space-x-6 mb-6">
            <Link href="/auth/signup" className="text-lg font-medium text-black">Sign up</Link>
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


          {/* Sign-in Button */}
          <button className="flex justify-center items-center w-[90%] bg-black text-white py-2 rounded-md hover:bg-gray-900 transition">
            {isLoading ? <Loader /> : 'Sign in'}
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

export default function Signin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SigninForm />
    </Suspense>
  );
}
