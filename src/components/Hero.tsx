import { Button } from "@/components/ui/button";
import heroImage from "@/assets/lion-acacia-hero.png";
const Hero = () => {
  const scrollToTripFinder = () => {
    const element = document.getElementById("trip-finder");
    element?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroImage})`
    }} />

      
      <div className="relative z-10 container mx-auto px-4 text-center pt-24 py-[2px]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-serif text-[hsl(var(--navbar-text))] mb-8 animate-fade-in tracking-[0.15em] uppercase lg:text-8xl">
            SAFARI EXPERIENCES
          </h1>
          <p className="text-xl md:text-2xl text-white font-light mb-12 animate-fade-in leading-relaxed" style={{
          animationDelay: "0.2s"
        }}>
            Escape to the wild with our unforgettable safari tours.
          </p>
          <div className="flex justify-center animate-fade-in" style={{
          animationDelay: "0.4s"
        }}>
            <Button size="lg" onClick={scrollToTripFinder} className="text-base px-12 py-6 text-foreground border-none uppercase tracking-widest font-medium bg-white/[0.87]">
              FIND YOUR ADVENTURE
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
    </section>;
};
export default Hero;