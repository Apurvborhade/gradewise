// src/app/(pages)/components_land/ClientScripts.js
'use client';

import { useEffect } from 'react';

export default function ClientScripts() {
  useEffect(() => {
    // Smooth scrolling
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });

    // Form submission
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest! You will receive an email with access details shortly.');
        this.reset();
      });
    }

    // Animation on scroll
    const animateOnScroll = () => {
      document.querySelectorAll('.problem-card, .solution-card, .team-card').forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const scrollPosition = window.scrollY + window.innerHeight * 0.8;

        if (scrollPosition > cardPosition) {
          card.style.opacity = '1';
        }
      });
    };

    // Initial check
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return null;
}