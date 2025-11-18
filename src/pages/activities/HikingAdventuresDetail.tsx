import { ArrowRight, DollarSign, Users, Calendar } from "lucide-react";
import hikingAdventuresCardImage from "@/assets/hiking-adventures-card.png";

const HikingAdventuresDetail = () => {
  const packages = [
    {
      title: "MOUNT MERU",
      price: "8,500",
      duration: "1 Day",
      groupSize: "2-8",
      description: "Perfect for beginners, explore local trails with experienced guides",
    },
    {
      title: "MOUNT KILIMANJARO",
      price: "15,000",
      duration: "2 Days",
      groupSize: "2-6",
      description: "Immersive experience with overnight camping and mountain views",
    },
    {
      title: "NGORONGORO HIGHLANDS",
      price: "26,000",
      duration: "5 Days",
      groupSize: "2-4",
      description: "Ultimate hiking journey through diverse landscapes and terrains",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src={hikingAdventuresCardImage} 
          alt="Hiking adventures through scenic trails" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">exhilarating</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            HIKING ADVENTURES
          </h1>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-wide mb-4">Choose Your Adventure</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From day hikes to extended expeditions, find the perfect hiking experience for your adventure level
            </p>
          </div>

          <div className="space-y-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                onClick={() => window.location.href = `/book?content_type=activity&content_name=HIKING ADVENTURES - ${pkg.title}`}
                className="group relative h-[200px] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <img
                  src={hikingAdventuresCardImage}
                  alt={pkg.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                
                <div className="relative h-full flex items-center justify-between px-8 md:px-12">
                  <div className="text-white space-y-4">
                    <h3 className="text-3xl md:text-4xl font-serif uppercase tracking-wide [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
                      {pkg.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-6 text-base [text-shadow:_1px_1px_4px_rgb(0_0_0_/_80%)]">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 drop-shadow-lg" />
                        <span>From ${pkg.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 drop-shadow-lg" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 drop-shadow-lg" />
                        <span>Group: {pkg.groupSize}</span>
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

export default HikingAdventuresDetail;
