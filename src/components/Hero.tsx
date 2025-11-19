import { Button } from "@/components/ui/button";
import heroImage from "@/assets/lion-acacia-hero.png";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      
      <div className="relative z-10 container mx-auto px-4 text-center pt-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 animate-fade-in tracking-[0.15em] uppercase">
            SAFARI EXPERIENCES
          </h1>
          <p className="text-xl md:text-2xl text-white font-light animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Escape to the wild with our unforgettable safari tours.
          </p>
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
