import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowUp } from "react-icons/fa";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="w-full bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Social Media Links */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition duration-300"
                    >
                        <FaFacebook size={24} />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition duration-300"
                    >
                        <FaTwitter size={24} />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition duration-300"
                    >
                        <FaInstagram size={24} />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition duration-300"
                    >
                        <FaLinkedin size={24} />
                    </a>
                </div>

                {/* Navigation Links */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="/privacy-policy" className="text-gray-400 hover:text-white transition duration-300">
                        Privacy Policy
                    </a>
                    <a href="/terms-of-service" className="text-gray-400 hover:text-white transition duration-300">
                        Terms of Service
                    </a>
                    <a href="/contact" className="text-gray-400 hover:text-white transition duration-300">
                        Contact Us
                    </a>
                </div>

                {/* Copyright Text */}
                <div className="text-center text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} GradeWise. All rights reserved.</p>
                </div>

                {/* Back to Top Button */}
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                >
                    <FaArrowUp size={20} />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
    