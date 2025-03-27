// src/app/(pages)/components_land/ProblemsSection.js
import { FaClock, FaUsers, FaGraduationCap, FaExclamationTriangle } from 'react-icons/fa';

export default function ProblemsSection() {
  return (
    <section id="problem" className="problem-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">The Growing Crisis in Education</h2>
          <p className="lead text-muted">Teachers are overwhelmed, and students suffer from lack of personalized
            attention</p>
        </div>
 
        <div className="row g-4">
          <div className="col-md-4">
            <div className="problem-card p-4 h-100 bg-white rounded shadow-sm">
              <div className="feature-icon warning">
                <FaClock />
              </div>
              <h4>Time Pressure</h4>
              <p>Teachers spend 5-10 hours per week grading assignments, leaving little time for lesson
                planning or individual student attention.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="problem-card p-4 h-100 bg-white rounded shadow-sm">
              <div className="feature-icon warning">
                <FaUsers />
              </div>
              <h4>Large Class Sizes</h4>
              <p>With 30-40 students per class, personalized feedback becomes impossible to maintain
                consistently.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="problem-card p-4 h-100 bg-white rounded shadow-sm">
              <div className="feature-icon warning">
                <FaGraduationCap />
              </div>
              <h4>Learning Gaps</h4>
              <p>Generic feedback fails to address individual student needs, leading to widening achievement
                gaps.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 pt-3">
          <div className="d-inline-block p-3 bg-light rounded">
            <p className="mb-0 fw-bold"><FaExclamationTriangle className="text-warning me-2" /> This crisis
              disproportionately affects under-resourced schools where teacher-to-student ratios are highest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}