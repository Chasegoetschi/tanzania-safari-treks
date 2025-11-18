import { ArrowRight, DollarSign, Users } from "lucide-react";
import safariHeroImage from "@/assets/safari-hero.jpg";
import elephantsImage from "@/assets/elephants.jpg";
import lionsImage from "@/assets/lions-savanna.png";
import zebraImage from "@/assets/zebras.png";

const MainlandHighlights = () => {
  const locations = [
    {
      title: "MAINLAND HIGHLIGHTS",
      price: "26,000",
      groupSize: "2+",
      image: safariHeroImage,
      link: "/book?content_type=location&content_name=Serengeti National Park"
    },
    {
      title: "SERENGETI EXPEDITION",
      price: "32,000",
      groupSize: "4+",
      image: lionsImage,
      link: "/book?content_type=location&content_name=Serengeti National Park"
    },
    {
      title: "NGORONGORO CRATER",
      price: "28,000",
      groupSize: "2+",
      image: elephantsImage,
      link: "/book?content_type=location&content_name=Ngorongoro Crater"
    },
    {
      title: "TARANGIRE ADVENTURE",
      price: "24,000",
      groupSize: "4+",
      image: zebraImage,
      link: "/book?content_type=location&content_name=Tarangire National Park"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src={safariHeroImage} 
          alt="Mainland Highlights" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">discover</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            LOCATIONS
          </h1>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {locations.map((location, index) => (
              <div
                key={index}
                onClick={() => window.location.href = location.link}
                className="group relative h-[200px] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <img
                  src={location.image}
                  alt={location.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="relative h-full flex items-center justify-between px-8 md:px-12">
                  <div className="text-white space-y-4">
                    <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wide">
                      {location.title}
                    </h2>
                    <div className="flex items-center gap-8 text-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        <span>From ${location.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>Group Size: {location.groupSize}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainlandHighlights;
