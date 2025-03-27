// src/app/(pages)/components_land/SolutionsSection.js
import Image from 'next/image';
import { FaBolt, FaCommentAlt, FaChartLine } from 'react-icons/fa';

export default function SolutionsSection() {
  return (
    <section id="solution" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <Image 
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Solution screenshot" 
              width={600} 
              height={400}
              className="img-fluid rounded shadow"
            /> 
          </div>
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">Our Hackathon Solution</h2>
            <p className="lead mb-4">FeedbackAI leverages cutting-edge natural language processing to automate
              grading while providing personalized, constructive feedback for each student.</p>

            <div className="solution-card p-4 bg-white rounded shadow-sm mb-4">
              <div className="d-flex">
                <div className="feature-icon success me-3">
                  <FaBolt />
                </div>
                <div>
                  <h4>Instant Grading</h4>
                  <p className="mb-0">Our AI evaluates assignments in seconds, freeing up hours of teacher
                    time each week.</p>
                </div>
              </div>
            </div>

            <div className="solution-card p-4 bg-white rounded shadow-sm mb-4">
              <div className="d-flex">
                <div className="feature-icon success me-3">
                  <FaCommentAlt />
                </div>
                <div>
                  <h4>Personalized Feedback</h4>
                  <p className="mb-0">Tailored comments address each student's specific strengths and areas
                    for improvement.</p>
                </div>
              </div>
            </div>

            <div className="solution-card p-4 bg-white rounded shadow-sm">
              <div className="d-flex">
                <div className="feature-icon success me-3">
                  <FaChartLine />
                </div>
                <div>
                  <h4>Progress Tracking</h4>
                  <p className="mb-0">Teachers get insights into class-wide trends and individual student
                    progress.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
