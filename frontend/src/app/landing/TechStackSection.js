// src/app/(pages)/components_land/TechStackSection.js
import { FaReact, FaNodeJs, FaDocker, FaCss3Alt, FaFire } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';

export default function TechStackSection() {
  return (
    <section className="tech-stack py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Our Technology Stack</h2>
          <p className="lead text-muted">Built with cutting-edge tools for maximum effectiveness</p>
        </div>

        <div className="row text-center">
          <div className="col-4 col-md-2 mb-5">
            <div className="tech-icon">
              <FaReact />
            </div>
            <div>React</div>
          </div>
          <div className="col-4 col-md-2 mb-5">
            <div className="tech-icon">
              <SiNextdotjs />
            </div>
            <div>Next.js</div>
          </div>
          <div className="col-4 col-md-2 mb-5">
            <div className="tech-icon">
              <FaNodeJs />
            </div>
            <div>Node.js</div>
          </div>
          <div className="col-4 col-md-2 mb-5">
            <div className="tech-icon">
              <FaDocker />
            </div>
            <div>Docker</div>
          </div>
          <div className="col-4 col-md-2 mb-5">
            <div className="tech-icon">
              <FaCss3Alt />
            </div>
            <div>Tailwind</div>
          </div>
          <div className="col-4 col-md-2 mb-5">
            <div className="tech-icon">
              <FaFire />
            </div>
            <div>Firebase</div>
          </div>
        </div>

        <div className="text-center mt-3">
          <a href="#" className="btn btn-outline-primary btn-lg px-5">
            <i className="fab fa-github me-2"></i> View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}