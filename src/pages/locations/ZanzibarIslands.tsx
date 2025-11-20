import { ArrowRight, DollarSign, Users } from "lucide-react";
import zanzibarHeroImage from "@/assets/zanzibar-hero.jpg";
import zanzibarBeachImage from "@/assets/zanzibar-beach.png";
import zanzibarExperienceImage from "@/assets/zanzibar-experience.png";
import zanzibarStonetownImage from "@/assets/zanzibar-stonetown.png";

const ZanzibarIslands = () => {
  const beachPackages = [
    {
      title: "ZANZIBAR ISLANDS",
      price: "26,000",
      groupSize: "2+",
      image: zanzibarBeachImage,
      link: "/book?content_type=location&content_name=5-Day Beach Getaway"
    },
    {
      title: "BEACH PARADISE ESCAPE",
      price: "28,000",
      groupSize: "2+",
      image: zanzibarExperienceImage,
      link: "/book?content_type=location&content_name=6-Day Island Adventure"
    },
    {
      title: "STONE TOWN HERITAGE",
      price: "32,000",
      groupSize: "4+",
      image: zanzibarStonetownImage,
      link: "/book?content_type=location&content_name=7-Day Luxury Escape"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Using Design System Standards */}
      <section className="hero-section">
        <img 
          src={zanzibarHeroImage} 
          alt="Zanzibar Islands" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
        
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">discover the</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            LOCATIONS
          </h1>
        </div>
      </section>

      {/* Cards Section - Using Design System Standards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {beachPackages.map((pkg, index) => (
              <div
                key={index}
                onClick={() => window.location.href = pkg.link}
                className="group relative h-[200px] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="relative h-full flex items-center justify-between px-8 md:px-12">
                  <div className="text-white space-y-4">
                    <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wide">
                      {pkg.title}
                    </h2>
                    <div className="flex items-center gap-8 text-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        <span>From ${pkg.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>Group Size: {pkg.groupSize}</span>
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

export default ZanzibarIslands;
