import { ArrowRight, DollarSign, Users } from "lucide-react";
import kilimanjaroSummitImage from "@/assets/kilimanjaro-summit.png";
import kilimanjaroSignImage from "@/assets/kilimanjaro-sign.png";
import kilimanjaroNightImage from "@/assets/kilimanjaro-night.png";
import riftValleyImage from "@/assets/rift-valley.png";

const HikingAdventures = () => {
  const hikingTrips = [
    {
      title: "MOUNT KILIMANJARO - MACHAME ROUTE",
      price: "22,000",
      groupSize: "4+",
      image: kilimanjaroSummitImage,
      link: "/book?content_type=activity&content_name=MOUNT KILIMANJARO - MACHAME ROUTE"
    },
    {
      title: "MOUNT KILIMANJARO - LEMOSHO ROUTE",
      price: "25,000",
      groupSize: "2+",
      image: kilimanjaroNightImage,
      link: "/book?content_type=activity&content_name=MOUNT KILIMANJARO - LEMOSHO ROUTE"
    },
    {
      title: "MOUNT KILIMANJARO - MARANGU ROUTE",
      price: "18,000",
      groupSize: "4+",
      image: kilimanjaroSignImage,
      link: "/book?content_type=activity&content_name=MOUNT KILIMANJARO - MARANGU ROUTE"
    },
    {
      title: "MOUNT MERU ADVENTURE",
      price: "12,000",
      groupSize: "2+",
      image: riftValleyImage,
      link: "/book?content_type=activity&content_name=MOUNT MERU ADVENTURE"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src={kilimanjaroSummitImage} 
          alt="Mount Kilimanjaro summit with hikers" 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/50 to-primary/60" />

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">conquer</p>
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40" />
              
              <div className="relative h-full flex items-center justify-between px-8 md:px-12">
                <div className="text-white space-y-4">
                  <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-wide">
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

export default HikingAdventures;
