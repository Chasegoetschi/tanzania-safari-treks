import Hero from "@/components/Hero";
import About from "@/components/About";
import SafariIntro from "@/components/SafariIntro";
import TripFinder from "@/components/TripFinder";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import RebrandingDialog from "@/components/RebrandingDialog";

const Index = () => {
  return (
    <div className="min-h-screen">
      <RebrandingDialog />
      <Hero />
      <SafariIntro />
      <TripFinder />
      <About />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Index;
