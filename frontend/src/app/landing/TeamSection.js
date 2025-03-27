// src/app/(pages)/components_land/TeamSection.js
import Image from 'next/image';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function TeamSection() {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'AI/ML Engineer',
      bio: 'Specializes in natural language processing and educational technology',
      image: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      name: 'James Rodriguez',
      role: 'Full Stack Developer',
      bio: 'Builds scalable web applications with focus on user experience',
      image: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      name: 'Priya Patel',
      role: 'Education Specialist',
      bio: 'Former teacher with expertise in curriculum development',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      name: 'David Kim',
      role: 'Product Designer',
      bio: 'Creates intuitive interfaces focused on educator workflows',
      image: 'https://randomuser.me/api/portraits/men/72.jpg'
    }
  ];

  return (
    <section id="team" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Our Hackathon Team</h2>
          <p className="lead text-muted">Passionate developers and educators solving real problems</p>
        </div>

        <div className="row justify-content-center g-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="team-card text-center p-4 bg-white rounded shadow-sm h-100">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  width={120} 
                  height={120}
                  className="team-img mb-3"
                />
                <h4>{member.name}</h4>
                <p className="text-muted">{member.role}</p>
                <p>{member.bio}</p>
                <div className="mt-auto">
                  <a href="#" className="text-primary me-2"><FaLinkedin /></a>
                  <a href="#" className="text-primary"><FaGithub /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}