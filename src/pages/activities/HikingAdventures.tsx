import { ArrowRight, DollarSign, Users } from "lucide-react";
import hikingAdventuresImage from "@/assets/hiking-hero.png";
import hikingAdventuresCardImage from "@/assets/hiking-adventures-card.png";
import culturalExperiencesCardImage from "@/assets/cultural-experiences-card.png";
import outdoorExperiencesCardImage from "@/assets/outdoor-experiences-card.png";
import kilimanjaroSignImage from "@/assets/kilimanjaro-sign.png";
import kilimanjaroNightImage from "@/assets/kilimanjaro-night.png";
import riftValleyImage from "@/assets/rift-valley.png";

const HikingAdventures = () => {
  const hikingTrips = [
    {
      title: "HIKING ADVENTURES",
      price: "26,000",
      groupSize: "2+",
      image: hikingAdventuresCardImage,
      link: "/activities/hiking-detail"
    },
    {
      title: "CULTURAL AND LOCAL EXPERIENCES",
      price: "25,000",
      groupSize: "2+",
      image: culturalExperiencesCardImage,
      link: "/activities/cultural-detail"
    },
    {
      title: "OUTDOOR NATURE EXPERIENCES",
      price: "18,000",
      groupSize: "4+",
      image: outdoorExperiencesCardImage,
      link: "/activities/outdoor-detail"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src={hikingAdventuresImage} 
          alt="Red panda in natural habitat among foliage" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">inspiring</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            ACTIVITIES
          </h1>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {hikingTrips.map((trip, index) => (
              <div
                key={index}
                onClick={() => window.location.href = trip.link}
                className="group relative h-[200px] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
              <img
                src={trip.image}
                alt={trip.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              <div className="relative h-full flex items-center justify-between px-8 md:px-12">
                <div className="text-white space-y-4 drop-shadow-lg">
                  <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-wide [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
                    {trip.title}
                  </h2>
                  <div className="flex items-center gap-8 text-lg [text-shadow:_1px_1px_4px_rgb(0_0_0_/_80%)]">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 drop-shadow-lg" />
                      <span>From ${trip.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 drop-shadow-lg" />
                      <span>Group Size: {trip.groupSize}</span>
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

export default HikingAdventures;
