// src/app/(pages)/components_land/Footer.js
import { FaRobot, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="py-5 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h4 className="mb-4">
              <FaRobot className="me-2" style={{ color: 'var(--primary)' }} />FeedbackAI
            </h4>
            <p>A hackathon project dedicated to reducing teacher workload and improving student outcomes through
              AI.</p>
            <div className="mt-4">
              <a href="#" className="text-white me-3"><FaTwitter /></a>
              <a href="#" className="text-white me-3"><FaGithub /></a>
              <a href="#" className="text-white me-3"><FaLinkedin /></a>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3">Project</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50">GitHub</a></li>
              <li className="mb-2"><a href="#" className="text-white-50">Documentation</a></li>
              <li className="mb-2"><a href="#" className="text-white-50">Demo</a></li>
              <li className="mb-2"><a href="#" className="text-white-50">Roadmap</a></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50">Research</a></li>
              <li className="mb-2"><a href="#" className="text-white-50">SDG 4</a></li>
              <li className="mb-2"><a href="#" className="text-white-50">Teacher Survey</a></li>
              <li className="mb-2"><a href="#" className="text-white-50">API Docs</a></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-4">
            <h5 className="mb-3">Hackathon Info</h5>
            <p className="text-white-50">Submitted for the 2023 Global Education Hackathon</p>
            <p className="text-white-50">Theme: AI for Education</p>
            <p className="text-white-50">Team: EduInnovators</p>
          </div>
        </div>
        <hr className="my-4 bg-secondary" />
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="small mb-0">© 2023 FeedbackAI Hackathon Project</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="small mb-0">Supporting <a href="https://sdgs.un.org/goals/goal4" target="_blank"
                rel="noopener noreferrer" style={{ color: 'var(--success)' }}>UN Sustainable Development Goal 4</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}