import { CitiesSection } from "@/sections/home/cities-section";
import { DriverCTASection } from "@/sections/home/driver-cta-section";
import { HeroSection } from "@/sections/home/hero-section";
import { HowItWorksSection } from "@/sections/home/how-it-works-section";
import { PackagesSection } from "@/sections/home/packages-section";
import { StatsSection } from "@/sections/home/stats-section";
import { TestimonialsSection } from "@/sections/home/testimonials-section";
import React from "react";

const page = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <CitiesSection />
      <PackagesSection />
      <TestimonialsSection />
      <DriverCTASection />
    </>
  );
};

export default page;
