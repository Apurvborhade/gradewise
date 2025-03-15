"use client";
import Link from "next/link";
export default function Home() {

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome to GradeWise</h1>
          <p className="text-gray-600 mb-4">Your smart learning platform</p>

          {/* Sign In Button */}
          <Link href={'/auth/signin'}>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded mb-3 hover:bg-blue-600 transition"
            >
              Sign In
            </button>
          </Link>

          {/* Sign Up Button */}
          <Link href={'/auth/signup'}>
            <button
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Sign Up
            </button>
          </Link>


        </div>
      </div>
      <div >
        hello
      </div>
    </>
  );
}
