// src/app/(pages)/components_land/HeroSection.js
import Image from 'next/image';
import { FaGlobe, FaPlayCircle } from 'react-icons/fa';

export default function HeroSection() {
  return (
    <section className="hero-gradient">
      <div className="hero-pattern"></div>
      <div className="container position-relative">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <span className="sdg-badge mb-3">
              <FaGlobe className="me-2" />Supporting UN SDG 4: Quality Education
            </span>
            <h1 className="display-3 fw-bold mb-4">Empowering Teachers with AI-Powered Feedback</h1>
            <p className="lead mb-4">Our hackathon solution reduces teacher workload by 70% while providing students
              with personalized, actionable feedback to enhance learning outcomes.</p>
            <div className="d-flex flex-wrap gap-3">
              <a href="#demo" className="btn btn-light btn-lg px-4">View Demo</a>
              <a href="#solution" className="btn btn-outline-light btn-lg px-4">How It Works</a>
            </div>
          </div>
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="demo-container">
              <Image 
                src="/assets/hero-image.png" 
                alt="Teacher using FeedbackAI" 
                width={600} 
                height={400}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}