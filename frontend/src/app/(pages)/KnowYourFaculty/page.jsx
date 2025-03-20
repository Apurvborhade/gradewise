"use client"; // ✅ Must be the first line

import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

// Faculty Data
const facultyData = [
    { name: "Dr. John Smith", subject: "Mathematics", email: "john.smith@example.com", image: "https://randomuser.me/api/portraits/men/1.jpg", color: "bg-yellow-200" },
    { name: "Dr. Emily Brown", subject: "Physics", email: "emily.brown@example.com", image: "https://randomuser.me/api/portraits/women/2.jpg", color: "bg-red-300" },
    { name: "Dr. William Johnson", subject: "Chemistry", email: "william.johnson@example.com", image: "https://randomuser.me/api/portraits/men/3.jpg", color: "bg-green-300" },
    { name: "Dr. Olivia Taylor", subject: "History", email: "olivia.taylor@example.com", image: "https://randomuser.me/api/portraits/women/4.jpg", color: "bg-orange-300" },
    { name: "Dr. Sophia Wilson", subject: "Computer Science", email: "sophia.wilson@example.com", image: "https://randomuser.me/api/portraits/women/5.jpg", color: "bg-blue-300" },
];

export default function Faculty() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar Component */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header Component */}
                <Header />

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-300">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center shadow-lg">🎓 Know Your Faculty</h1>

                        {/* Faculty Cards */}
                        <div className="flex flex-wrap justify-center gap-6">
                            {facultyData.map((faculty, index) => (
                                <div
                                    key={index}
                                    className="relative w-64 p-5 rounded-lg border border-gray-300 shadow-lg text-gray-900 bg-white transform transition duration-300 hover:scale-105"
                                >
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                        <img
                                            src={faculty.image}
                                            alt={faculty.name}
                                            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                                        />
                                    </div>

                                    <div className="mt-10 text-center">
                                        <h2 className="text-lg font-semibold">{faculty.name}</h2>
                                        <p className="text-gray-700 text-sm mt-1">📚 {faculty.subject}</p>
                                    </div>

                                    <div className="mt-4 flex justify-center">
                                        <a
                                            href={`mailto:${faculty.email}`}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition text-sm"
                                        >
                                            ✉️ Contact
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Component */}
                <Footer />
            </div>
        </div>
    );
}