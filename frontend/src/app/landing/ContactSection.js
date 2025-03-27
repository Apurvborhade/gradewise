// src/app/(pages)/components_land/ContactSection.js
import { FaDownload } from 'react-icons/fa';

export default function ContactSection() {
  return (
    <section id="contact" className="py-5 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3">Get the Code</h2>
              <p className="lead text-muted">Access our hackathon submission and documentation</p>
            </div>

            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="col-12">
                <label htmlFor="institution" className="form-label">Institution/Organization</label>
                <input type="text" className="form-control" id="institution" />
              </div>
              <div className="col-12">
                <label htmlFor="role" className="form-label">Your Role</label>
                <select className="form-select" id="role">
                  <option value="teacher">Teacher/Educator</option>
                  <option value="developer">Developer</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="message" className="form-label">Message (Optional)</label>
                <textarea className="form-control" id="message" rows="3"></textarea>
              </div>
              <div className="col-12 text-center">
                <button type="submit" className="btn btn-hackathon px-5">
                  <FaDownload className="me-2" /> Get Access
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}