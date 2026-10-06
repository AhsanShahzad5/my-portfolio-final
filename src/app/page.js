import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StackSection from "@/components/StackSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EmailSection from "@/components/EmailSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-clip bg-[#121212]">
      <Navbar />
      <div className="mx-auto max-w-[77rem] px-6 pt-20 sm:px-10">
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ExperienceSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
