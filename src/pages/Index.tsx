import Hero from "@/components/Hero";
import About from "@/components/About";
import Safaris from "@/components/Safaris";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import RebrandingDialog from "@/components/RebrandingDialog";

const Index = () => {
  return (
    <div className="min-h-screen">
      <RebrandingDialog />
      <Hero />
      <About />
      <Safaris />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Index;
