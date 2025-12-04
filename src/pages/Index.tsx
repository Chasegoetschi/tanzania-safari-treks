import Hero from "@/components/Hero";
import SafariIntro from "@/components/SafariIntro";
import TripFinder from "@/components/TripFinder";
import Contact from "@/components/Contact";
import RebrandingDialog from "@/components/RebrandingDialog";

const Index = () => {
  return (
    <div className="min-h-screen">
      <RebrandingDialog />
      <Hero />
      <SafariIntro />
      <TripFinder />
      <Contact />
    </div>
  );
};

export default Index;
