
import React from "react";
import Link from "next/link";

const FeedbackAI = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <div className="font-sans text-gray-800 bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md py-3 sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Link href="#" className="font-bold text-blue-600 flex items-center">
                <i className="fas fa-robot mr-2"></i>
                <span>FeedbackAI</span>
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="#problem" className="hover:text-blue-600">Problem</Link>
                <Link href="#solution" className="hover:text-blue-600">Solution</Link>
                <Link href="#demo" className="hover:text-blue-600">Demo</Link>
                <Link href="#team" className="hover:text-blue-600">Team</Link>
                <Link href="/auth/signup" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all">
                  Get Started
                </Link>
              </div>
              <button className="md:hidden">
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgydi00aDRWMGgtNHpNNiAzNHYtNEg0djRIMHYyaDR2NGgydi00aDR2LTJINnpNNiA0VjBINHY0SDB2Mmg0djRoMnYtNGg0VjBINnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="bg-blue-500 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <i className="fas fa-globe mr-2"></i>Supporting UN SDG 4: Quality Education
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Teachers with AI-Powered Feedback</h1>
                <p className="text-xl mb-8">Our hackathon solution reduces teacher workload by 70% while providing students with personalized, actionable feedback to enhance learning outcomes.</p>
                <div className="flex flex-wrap gap-4">
                  <Link href="#demo" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium">View Demo</Link>
                  <Link href="#solution" className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium">How It Works</Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                  <img src="1.png" alt="Teacher using FeedbackAI" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Growing Crisis in Education</h2>
              <p className="text-xl text-gray-600">Teachers are overwhelmed, and students suffer from lack of personalized attention</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-pink-500 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-pink-100 text-pink-500 text-2xl mb-6">
                  <i className="fas fa-clock"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Time Pressure</h3>
                <p>Teachers spend 5-10 hours per week grading assignments, leaving little time for lesson planning or individual student attention.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-pink-500 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-pink-100 text-pink-500 text-2xl mb-6">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Large Class Sizes</h3>
                <p>With 30-40 students per class, personalized feedback becomes impossible to maintain consistently.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-pink-500 transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-pink-100 text-pink-500 text-2xl mb-6">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Learning Gaps</h3>
                <p>Generic feedback fails to address individual student needs, leading to widening achievement gaps.</p>
              </div>
            </div>

            <div className="text-center mt-12 pt-6">
              <div className="inline-block p-4 bg-gray-100 rounded-lg">
                <p className="font-bold mb-0">
                  <i className="fas fa-exclamation-triangle text-pink-500 mr-2"></i> This crisis disproportionately affects under-resourced schools where teacher-to-student ratios are highest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section id="solution" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Solution screenshot"
                  className="w-full rounded-lg shadow-md" />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Hackathon Solution</h2>
                <p className="text-xl mb-8">FeedbackAI leverages cutting-edge natural language processing to automate grading while providing personalized, constructive feedback for each student.</p>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-teal-400 mb-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-100 text-teal-500 text-2xl mr-4">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Instant Grading</h4>
                      <p className="mb-0">Our AI evaluates assignments in seconds, freeing up hours of teacher time each week.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-teal-400 mb-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-100 text-teal-500 text-2xl mr-4">
                      <i className="fas fa-comment-alt"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Personalized Feedback</h4>
                      <p className="mb-0">Tailored comments address each student's specific strengths and areas for improvement.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-teal-400 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-100 text-teal-500 text-2xl mr-4">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Progress Tracking</h4>
                      <p className="mb-0">Teachers get insights into class-wide trends and individual student progress.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Measurable Impact</h2>
              <p className="text-xl text-gray-600">Our prototype has already shown promising results in pilot testing</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">
              <div className="mb-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">70%</div>
                <div className="text-gray-700">Reduction in grading time</div>
              </div>
              <div className="mb-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">5x</div>
                <div className="text-gray-700">More feedback per student</div>
              </div>
              <div className="mb-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">90%</div>
                <div className="text-gray-700">Teacher satisfaction</div>
              </div>
              <div className="mb-8">
                <div className="text-5xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-gray-700">SDG 4 Alignment</div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="#demo" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold inline-flex items-center hover:bg-blue-700 transition-all">
                <i className="fas fa-play-circle mr-2"></i> See It In Action
              </Link>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Technology Stack</h2>
              <p className="text-xl text-gray-600">Built with cutting-edge tools for maximum effectiveness</p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 text-center gap-6">
              <div className="mb-8">
                <div className="text-4xl text-gray-800 opacity-80 mb-4 hover:opacity-100 hover:scale-110 transition-all">
                  <i className="fab fa-react"></i>
                </div>
                <div>React</div>
              </div>
              <div className="mb-8">
                <div className="text-4xl text-gray-800 opacity-80 mb-4 hover:opacity-100 hover:scale-110 transition-all">
                  <i className="fab fa-node"></i>
                </div>
                <div>Next.js</div>
              </div>
              <div className="mb-8">
                <div className="text-4xl text-gray-800 opacity-80 mb-4 hover:opacity-100 hover:scale-110 transition-all">
                  <i className="fab fa-node-js"></i>
                </div>
                <div>Node.js</div>
              </div>
              <div className="mb-8">
                <div className="text-4xl text-gray-800 opacity-80 mb-4 hover:opacity-100 hover:scale-110 transition-all">
                  <i className="fab fa-docker"></i>
                </div>
                <div>Docker</div>
              </div>
              <div className="mb-8">
                <div className="text-4xl text-gray-800 opacity-80 mb-4 hover:opacity-100 hover:scale-110 transition-all">
                  <i className="fab fa-css3-alt"></i>
                </div>
                <div>Tailwind</div>
              </div>
              <div className="mb-8">
                <div className="text-4xl text-gray-800 opacity-80 mb-4 hover:opacity-100 hover:scale-110 transition-all">
                  <i className="fas fa-fire"></i>
                </div>
                <div>Firebase</div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="#" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold inline-flex items-center hover:bg-blue-50 transition-all">
                <i className="fab fa-github mr-2"></i> View on GitHub
              </Link>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
              <p className="text-xl text-gray-600">Watch our prototype transform teacher workflows</p>
            </div>

            <div className="flex justify-center">
              <div className="w-full lg:w-2/3">
                <div className="relative pb-[56.25%] rounded-xl shadow-lg overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="FeedbackAI Demo"
                    allowFullScreen></iframe>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-6">For Teachers</h4>
                    <ul className="relative pl-8">
                      <li className="relative pb-8">
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div>
                        <h5 className="font-semibold mb-2">Upload Assignments</h5>
                        <p>Simply drag and drop student submissions in any format</p>
                      </li>
                      <li className="relative pb-8">
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div>
                        <h5 className="font-semibold mb-2">Personal Feedback or Remarks</h5>
                        <p>Make any adjustments to the generated comments</p>
                      </li>
                      <li className="relative">
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div>
                        <h5 className="font-semibold mb-2">Send to Students</h5>
                        <p>Distribute with one click through your preferred platform</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-6">For Students</h4>
                    <ul className="relative pl-8">
                      <li className="relative pb-8">
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div>
                        <h5 className="font-semibold mb-2">Receive Feedback</h5>
                        <p>Get detailed, personalized comments on your work</p>
                      </li>
                      <li className="relative pb-8">
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div>
                        <h5 className="font-semibold mb-2">Understand Mistakes by Plagiarism</h5>
                        <p>Clear explanations of errors with improvement suggestions</p>
                      </li>
                      <li className="relative">
                        <div className="absolute -left-8 top-0 w-4 h-4 rounded-full border-4 border-blue-600 bg-white"></div>
                        <h5 className="font-semibold mb-2">Track Progress</h5>
                        <p>See your growth over time with actionable insights</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Hackathon Team</h2>
              <p className="text-xl text-gray-600">Passionate developers and educators solving real problems</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center transition-all hover:-translate-y-2 hover:shadow-lg">
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Team member" className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Sarah Chen</h4>
                <p className="text-gray-600 mb-4">AI/ML Engineer</p>
                <p className="mb-4">Specializes in natural language processing and educational technology</p>
                <div className="mt-auto">
                  <Link href="#" className="text-blue-600 mr-4"><i className="fab fa-linkedin"></i></Link>
                  <Link href="#" className="text-blue-600"><i className="fab fa-github"></i></Link>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center transition-all hover:-translate-y-2 hover:shadow-lg">
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Team member" className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">James Rodriguez</h4>
                <p className="text-gray-600 mb-4">Full Stack Developer</p>
                <p className="mb-4">Builds scalable web applications with focus on user experience</p>
                <div className="mt-auto">
                  <Link href="#" className="text-blue-600 mr-4"><i className="fab fa-linkedin"></i></Link>
                  <Link href="#" className="text-blue-600"><i className="fab fa-github"></i></Link>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center transition-all hover:-translate-y-2 hover:shadow-lg">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Team member" className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Priya Patel</h4>
                <p className="text-gray-600 mb-4">Education Specialist</p>
                <p className="mb-4">Former teacher with expertise in curriculum development</p>
                <div className="mt-auto">
                  <Link href="#" className="text-blue-600 mr-4"><i className="fab fa-linkedin"></i></Link>
                  <Link href="#" className="text-blue-600"><i className="fab fa-github"></i></Link>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center transition-all hover:-translate-y-2 hover:shadow-lg">
                <img src="https://randomuser.me/api/portraits/men/72.jpg" alt="Team member" className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">David Kim</h4>
                <p className="text-gray-600 mb-4">Product Designer</p>
                <p className="mb-4">Creates intuitive interfaces focused on educator workflows</p>
                <div className="mt-auto">
                  <Link href="#" className="text-blue-600 mr-4"><i className="fab fa-linkedin"></i></Link>
                  <Link href="#" className="text-blue-600"><i className="fab fa-github"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-full lg:w-2/3">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Get the Code</h2>
                  <p className="text-xl text-gray-600">Access our hackathon submission and documentation</p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="institution" className="block mb-2">Institution/Organization</label>
                    <input type="text" id="institution" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="role" className="block mb-2">Your Role</label>
                    <select id="role" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="teacher">Teacher/Educator</option>
                      <option value="developer">Developer</option>
                      <option value="student">Student</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block mb-2">Message (Optional)</label>
                    <textarea id="message" rows="3" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
                  </div>
                  <div className="md:col-span-2 text-center">
                    <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold inline-flex items-center hover:bg-blue-700 transition-all">
                      <i className="fas fa-download mr-2"></i> Get Access
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="mb-8 md:mb-0">
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="fas fa-robot mr-2 text-blue-500"></i>FeedbackAI
                </h4>
                <p className="mb-4">A hackathon project dedicated to reducing teacher workload and improving student outcomes through AI.</p>
                <div className="mt-4">
                  <Link href="#" className="text-white mr-4"><i className="fab fa-twitter"></i></Link>
                  <Link href="#" className="text-white mr-4"><i className="fab fa-github"></i></Link>
                  <Link href="#" className="text-white mr-4"><i className="fab fa-linkedin"></i></Link>
                </div>
              </div>
              <div className="mb-8 md:mb-0">
                <h5 className="text-lg font-semibold mb-4">Project</h5>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">GitHub</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Documentation</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Demo</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Roadmap</Link></li>
                </ul>
              </div>
              <div className="mb-8 md:mb-0">
                <h5 className="text-lg font-semibold mb-4">Resources</h5>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white">Research</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">SDG 4</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">Teacher Survey</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white">API Docs</Link></li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-4">Hackathon Info</h5>
                <p className="text-gray-400 mb-2">Submitted for the 2023 Global Education Hackathon</p>
                <p className="text-gray-400 mb-2">Theme: AI for Education</p>
                <p className="text-gray-400">Team: EduInnovators</p>
              </div>
            </div>
            <hr className="my-8 border-gray-700" />
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-sm text-gray-400">© 2023 FeedbackAI Hackathon Project</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-400">
                  Supporting <Link href="https://sdgs.un.org/goals/goal4" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">UN Sustainable Development Goal 4</Link>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
=======
// src/app/page
// "user client";


// import Navigation from './landing/Navigation';
// import HeroSection from './landing/HeroSection';
// import ProblemsSection from './landing/ProblemsSection';
// import SolutionsSection from './landing/SolutionsSection';
// import ImpactSection from './landing/ImpactSection';
// import TechStackSection from './landing/TechStackSection';
// import DemoSection from './landing/DemoSection';
// import TeamSection from './landing/TeamSection';
// import ContactSection from './landing/ContactSection';
// import Footer from './landing/Footer';
// import ClientScripts from './landing/ClientScripts';

export default function Home() {
  return (
    <>
      {/* <Navigation /> */}
      <main>
        {/* <HeroSection />
        <ProblemsSection />
        <SolutionsSection /> 
        <ImpactSection />
        <TechStackSection />
        <DemoSection />
        <TeamSection />
        <ContactSection /> */}
      </main>
      {/* <Footer />
      <ClientScripts /> */}

    </>
  );
};

export default FeedbackAI;