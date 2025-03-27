// src/app/(pages)/components_land/ImpactSection.js
export default function ImpactSection() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Measurable Impact</h2>
          <p className="lead text-muted">Our prototype has already shown promising results in pilot testing</p>
        </div>

        <div className="row text-center">
          <div className="col-md-3 col-6 mb-5">
            <div className="impact-number">70%</div>
            <div className="impact-label">Reduction in grading time</div>
          </div>
          <div className="col-md-3 col-6 mb-5">
            <div className="impact-number">5x</div>
            <div className="impact-label">More feedback per student</div>
          </div>
          <div className="col-md-3 col-6 mb-5">
            <div className="impact-number">90%</div>
            <div className="impact-label">Teacher satisfaction</div>
          </div>
          <div className="col-md-3 col-6 mb-5">
            <div className="impact-number">100%</div>
            <div className="impact-label">SDG 4 Alignment</div>
          </div>
        </div>

        <div className="text-center mt-3">
          <a href="#demo" className="btn btn-hackathon btn-lg px-5">
            <i className="fas fa-play-circle me-2"></i> See It In Action
          </a>
        </div>
      </div>
    </section>
  );
}