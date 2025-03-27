// src/app/page
// "user client";


import Navigation from './landing/Navigation';
import HeroSection from './landing/HeroSection';
import ProblemsSection from './landing/ProblemsSection';
import SolutionsSection from './landing/SolutionsSection';
import ImpactSection from './landing/ImpactSection';
import TechStackSection from './landing/TechStackSection';
import DemoSection from './landing/DemoSection';
import TeamSection from './landing/TeamSection';
import ContactSection from './landing/ContactSection';
import Footer from './landing/Footer';
import ClientScripts from './landing/ClientScripts';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ProblemsSection />
        <SolutionsSection /> 
        <ImpactSection />
        <TechStackSection />
        <DemoSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      <ClientScripts />
    </>
  );
}
