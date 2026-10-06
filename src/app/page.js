import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection";
import EmailSection from "../components/EmailSection";
import Footer from "../components/Footer";
import AchievementsSection from "../components/AchievementsSection";
import Skills from "@/components/Skills";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
// import './globals.css'

export default function Home() {
  return (
    <main className="flex  flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 pt-1 pb-0">
        <HeroSection />
        <AchievementsSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <Skills />
        <EducationSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
