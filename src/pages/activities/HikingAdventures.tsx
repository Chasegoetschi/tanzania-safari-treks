import { useState } from "react";
import { MapPin, Clock, TrendingUp, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import kilimanjaroSummitImage from "@/assets/kilimanjaro-summit.png";
import kilimanjaroSignImage from "@/assets/kilimanjaro-sign.png";
import kilimanjaroNightImage from "@/assets/kilimanjaro-night.png";
import riftValleyImage from "@/assets/rift-valley.png";

const HikingAdventures = () => {
  const [selectedLocation, setSelectedLocation] = useState("MOUNTAIN");
  const [selectedLength, setSelectedLength] = useState("LENGTH");

  const hikingTrips = [
    {
      title: "MOUNT KILIMANJARO - MACHAME ROUTE",
      location: "Kilimanjaro",
      duration: "7 Days",
      elevation: "5,895m",
      price: "From $2,200",
      image: kilimanjaroSummitImage,
    },
    {
      title: "MOUNT KILIMANJARO - LEMOSHO ROUTE",
      location: "Kilimanjaro",
      duration: "8 Days",
      elevation: "5,895m",
      price: "From $2,500",
      image: kilimanjaroNightImage,
    },
    {
      title: "MOUNT KILIMANJARO - MARANGU ROUTE",
      location: "Kilimanjaro",
      duration: "5 Days",
      elevation: "5,895m",
      price: "From $1,800",
      image: kilimanjaroSignImage,
    },
    {
      title: "MOUNT MERU ADVENTURE",
      location: "Arusha",
      duration: "4 Days",
      elevation: "4,566m",
      price: "From $1,200",
      image: riftValleyImage,
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
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary/80" />

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">conquer</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            HIKING
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            ADVENTURES
          </h2>
        </div>

        {/* Scroll Down Arrow */}
        <button className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </button>
      </section>

      {/* Sort Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground uppercase tracking-[0.3em] mb-6">
            SORT BY
          </p>

          <div className="flex justify-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-primary text-white hover:bg-primary/90 hover:text-white border-none px-8 py-6 uppercase tracking-wider">
                  {selectedLocation}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem onClick={() => setSelectedLocation("All Mountains")}>
                  All Mountains
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLocation("Kilimanjaro")}>
                  Kilimanjaro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLocation("Mount Meru")}>
                  Mount Meru
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLocation("Highlands")}>
                  Highlands
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-primary text-white hover:bg-primary/90 hover:text-white border-none px-8 py-6 uppercase tracking-wider">
                  {selectedLength}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem onClick={() => setSelectedLength("All Lengths")}>
                  All Lengths
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLength("3-5 Days")}>
                  3-5 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLength("6-7 Days")}>
                  6-7 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLength("8+ Days")}>
                  8+ Days
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Hiking Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {hikingTrips.map((trip, index) => (
              <div
                key={index}
                className="group relative h-[200px] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${trip.image})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

                {/* Content */}
                <div className="relative h-full flex items-center justify-between px-8 text-white">
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-wide">
                      {trip.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white" />
                        <span>{trip.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white" />
                        <span>{trip.duration}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-white" />
                        <span>{trip.elevation} elevation</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{trip.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Button */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
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
