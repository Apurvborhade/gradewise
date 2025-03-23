"use client";
import Link from "next/link";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import Header from "./components/Header"; // Import Header component
import Footer from "./components/Footer"; // Import Footer component



export default function Home() {
  
  return (
    
      <div className="flex h-screen bg-[#f0f8ff]"> {/* Light Blue Background */}

        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">

          {/* Header Component */}
          <Header />

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center border border-gray-200">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                🎓 Welcome to <span className="text-blue-600">GradeWise</span>
              </h1>
              <p className="text-gray-700 mb-6 font-medium">
                Your smart learning platform
              </p>

              {/* Navigation Buttons */}
              <div className="space-y-4">
                <Link href={'/auth/signin'}>
                  <button className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold shadow-md hover:bg-blue-600 transition">
                    🔐 Sign In
                  </button>
                </Link>

                <Link href={'/auth/signup'}>
                  <button className="w-full bg-green-500 text-white py-3 rounded-md font-semibold shadow-md hover:bg-green-600 transition">
                    📝 Sign Up
                  </button>
                </Link>

                <Link href={'/SubmitAssignment'}>
                  <button className="w-full bg-purple-500 text-white py-3 rounded-md font-semibold shadow-md hover:bg-purple-600 transition">
                    📚 Assignment Submission
                  </button>
                </Link>

                <Link href={'/plagiarism-results'}>
                  <button className="w-full bg-red-500 text-white py-3 rounded-md font-semibold shadow-md hover:bg-red-600 transition">
                    ⚠️ View Plagiarism Reports
                  </button>
                </Link>

                {/* Know Your Faculty */}
                <Link href={'/KnowYourFaculty'}>
                  <button className="w-full bg-yellow-500 text-white py-3 rounded-md font-semibold shadow-md hover:bg-yellow-600 transition">
                    🎓 Know Your Faculty
                  </button>
                </Link>

                {/* New Button for Suggestions */}
                <Link href={'/suggestions'}>
                  <button className="w-full bg-teal-500 text-white py-3 rounded-md font-semibold shadow-md hover:bg-teal-600 transition">
                    💡 Suggestions
                  </button>
                </Link>

                {/* Dashboard Button */}
                <Link href={'/dashboard'}>
                  <button className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold shadow-md hover:bg-orange-600 transition">
                    🏠 Go to Dashboard
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