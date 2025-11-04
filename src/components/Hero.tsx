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
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center md:text-left">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Discover the Wild Heart of Tanzania
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Embark on an unforgettable safari adventure through Africa's most spectacular landscapes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" onClick={scrollToContact} className="text-lg px-8">
              Start Your Adventure
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-foreground">
              Learn More
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
