import Hero from "@/components/Hero";
import About from "@/components/About";
import Safaris from "@/components/Safaris";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Safaris />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Index;
