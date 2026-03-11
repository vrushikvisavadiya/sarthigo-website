import { CitiesSection } from "@/sections/home/cities-section";
import { DriverCTASection } from "@/sections/home/driver-cta-section";
import { HeroSection } from "@/sections/home/hero-section";
import { HowItWorksSection } from "@/sections/home/how-it-works-section";
import { PackagesSection } from "@/sections/home/packages-section";
import { StatsSection } from "@/sections/home/stats-section";
import { TestimonialsSection } from "@/sections/home/testimonials-section";

const page = () => {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <CitiesSection />
      <PackagesSection />
      <StatsSection />
      <TestimonialsSection />
      <DriverCTASection />
    </>
  );
};

export default page;
