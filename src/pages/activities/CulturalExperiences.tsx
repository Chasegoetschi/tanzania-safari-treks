import { ArrowRight, DollarSign, Users } from "lucide-react";
import giraffePatternImage from "@/assets/giraffe-pattern.png";
import giraffeFeedingImage from "@/assets/giraffe-feeding.png";
import oryxImage from "@/assets/oryx.png";

const CulturalExperiences = () => {
  const culturalTrips = [
    {
      title: "CULTURAL EXPERIENCES",
      price: "8,000",
      groupSize: "2+",
      image: giraffePatternImage,
      link: "/book?trip=cultural%20tours&content_type=activity"
    },
    {
      title: "MAASAI VILLAGE IMMERSION",
      price: "12,000",
      groupSize: "4+",
      image: giraffeFeedingImage,
      link: "/book?trip=cultural%20tours&content_type=activity"
    },
    {
      title: "TRIBAL HERITAGE TOUR",
      price: "15,000",
      groupSize: "2+",
      image: oryxImage,
      link: "/book?trip=cultural%20tours&content_type=activity"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src={giraffePatternImage} 
          alt="Cultural Experiences" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">immerse in</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            ACTIVITIES
          </h1>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {culturalTrips.map((trip, index) => (
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
                  <div className="text-white space-y-4">
                    <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wide">
                      {trip.title}
                    </h2>
                    <div className="flex items-center gap-8 text-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        <span>From ${trip.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
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

export default CulturalExperiences;
