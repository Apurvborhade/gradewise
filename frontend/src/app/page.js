"use client";
import Link from "next/link";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import Header from "./components/Header"; // Import Header component
import Footer from "./components/Footer"; // Import Footer component

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-100">

        {/* Header Component */}
        <Header />

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to GradeWise</h1>
            <p className="text-gray-600 mb-6">Your smart learning platform</p>

            {/* Navigation Buttons */}
            <div className="space-y-3">
              <Link href={'/auth/signin'}>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                  Sign In
                </button>
              </Link>

              <Link href={'/auth/signup'}>
                <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
                  Sign Up
                </button>
              </Link>

              <Link href={'/SubmitAssignment'}>
                <button className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition">
                  Assignment Submission
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* Footer Component */}
        <Footer />

      </div>
    </div>
  );
}
