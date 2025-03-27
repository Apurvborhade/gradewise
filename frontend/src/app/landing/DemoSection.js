// src/app/(pages)/components_land/DemoSection.js
export default function DemoSection() {
  return (
    <section id="demo" className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">See It In Action</h2>
          <p className="lead text-muted">Watch our prototype transform teacher workflows</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="ratio ratio-16x9 rounded shadow-lg overflow-hidden">
              <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="FeedbackAI Demo"
                allowFullScreen></iframe>
            </div>

            <div className="row mt-5 g-4">
              <div className="col-md-6">
                <div className="p-4 bg-light rounded h-100">
                  <h4 className="mb-3">For Teachers</h4>
                  <ul className="timeline">
                    <li className="timeline-item">
                      <h5>Upload Assignments</h5>
                      <p>Simply drag and drop student submissions in any format</p>
                    </li>
                    <li className="timeline-item">
                      <h5>Personal Feedback or Remarks</h5>
                      <p>Make any adjustments to the generated comments</p>
                    </li>
                    <li className="timeline-item">
                      <h5>Send to Students</h5>
                      <p>Distribute with one click through your preferred platform</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 bg-light rounded h-100">
                  <h4 className="mb-3">For Students</h4>
                  <ul className="timeline">
                    <li className="timeline-item">
                      <h5>Receive Feedback</h5>
                      <p>Get detailed, personalized comments on your work</p>
                    </li>
                    <li className="timeline-item">
                      <h5>Understand Mistakes by Plagiarism</h5>
                      <p>Clear explanations of errors with improvement suggestions</p>
                    </li>
                    <li className="timeline-item">
                      <h5>Track Progress</h5>
                      <p>See your growth over time with actionable insights</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}