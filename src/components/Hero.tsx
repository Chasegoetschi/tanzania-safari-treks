import { Button } from "@/components/ui/button";
import heroImage from "@/assets/safari-hero.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/60 to-secondary/80" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-serif italic text-primary mb-8 animate-fade-in drop-shadow-lg">
            Tanzania Safaris
          </h1>
          <p className="text-xl md:text-3xl text-white font-light mb-12 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Discover the wild. Find your adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" onClick={scrollToContact} className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-white">
              Plan Your Safari
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 bg-white/95 backdrop-blur-sm text-secondary border-2 border-white hover:bg-white">
              Explore More
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Hero;
