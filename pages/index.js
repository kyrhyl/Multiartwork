import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import ServicesGrid from '../components/home/ServicesGrid';
import ProjectsGallery from '../components/home/ProjectsGallery';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <ProjectsGallery />
      <CTASection />
    </main>
  );
}
