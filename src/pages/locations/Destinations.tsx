import { ArrowRight, DollarSign, Users } from "lucide-react";
import activitiesHeroImage from "@/assets/activities-hero.jpg";
import kilimanjaroSummitImage from "@/assets/kilimanjaro-summit.png";
import zanzibarBeachImage from "@/assets/zanzibar-beach.png";
import lionSavannaImage from "@/assets/lions-savanna.png";

const Destinations = () => {
  const destinations = [
    {
      title: "NORTHERN CIRCUIT",
      price: "26,000",
      groupSize: "4+",
      image: kilimanjaroSummitImage,
      link: "/locations/northern-circuit"
    },
    {
      title: "ZANZIBAR ISLANDS",
      price: "22,000",
      groupSize: "2+",
      image: zanzibarBeachImage,
      link: "/locations/zanzibar"
    },
    {
      title: "MAINLAND HIGHLIGHTS",
      price: "32,000",
      groupSize: "4+",
      image: lionSavannaImage,
      link: "/locations/mainland"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src={activitiesHeroImage} 
          alt="Destinations Hero" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">explore the</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            DESTINATIONS
          </h1>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {destinations.map((destination, index) => (
              <div
                key={index}
                onClick={() => window.location.href = destination.link}
                className="group relative h-[200px] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="relative h-full flex items-center justify-between px-8 md:px-12">
                  <div className="text-white space-y-4">
                    <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wide">
                      {destination.title}
                    </h2>
                    <div className="flex items-center gap-8 text-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        <span>From ${destination.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>Group Size: {destination.groupSize}</span>
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

export default Destinations;
