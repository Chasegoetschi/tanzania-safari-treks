import { useState } from "react";
import { MapPin, Clock, DollarSign, Users, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import elephantsImage from "@/assets/elephants.jpg";
import lionImage from "@/assets/lion.jpg";
import safariJeepImage from "@/assets/safari-jeep.jpg";
import safariHeroImage from "@/assets/safari-hero.jpg";
import giraffeImage from "@/assets/giraffe-sunset.png";
import giraffePatternImage from "@/assets/giraffe-pattern.png";
import riverCruiseImage from "@/assets/river-cruise.png";
import zebrasImage from "@/assets/zebras.png";
import cheetahImage from "@/assets/cheetah.png";
import lionCloseupImage from "@/assets/lion-closeup.png";
import giraffeFeedingImage from "@/assets/giraffe-feeding.png";

const TanzaniaSafaris = () => {
  const [selectedLocation, setSelectedLocation] = useState("LOCATION");
  const [selectedLength, setSelectedLength] = useState("LENGTH");

  const safaris = [
    {
      title: "TASTE OF TANZANIA",
      location: "Ngorongoro Crater",
      duration: "3 Days",
      price: "From $800",
      groupSize: "Group Size: 2+",
      image: giraffePatternImage,
    },
    {
      title: "MID-RANGE WILDERNESS",
      location: "Ngorongoro Crater",
      duration: "4 Days",
      price: "From $1,000",
      groupSize: "Group Size: 2+",
      image: riverCruiseImage,
    },
    {
      title: "MID-RANGE BEST OF TANZANIA",
      location: "Serengeti National Park",
      duration: "5 days",
      price: "From $2,000",
      groupSize: "Group Size: 2+",
      image: zebrasImage,
    },
    {
      title: "MID-RANGE TANZANIA HIGHLIGHTS",
      location: "Serengeti National Park",
      duration: "6 Days",
      price: "From $3,000",
      groupSize: "Group Size: 2+",
      image: cheetahImage,
    },
    {
      title: "CRATER RIM ADVENTURE",
      location: "Serengeti National Park",
      duration: "7 Days",
      price: "From $3,200",
      groupSize: "Group Size: 2+",
      image: lionCloseupImage,
    },
    {
      title: "TANZANIA LUXURY ALL-INCLUSIVE",
      location: "Serengeti National Park",
      duration: "7 Days",
      price: "From $4,000",
      groupSize: "Group Size: 2+",
      image: giraffeFeedingImage,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${giraffeImage})`, backgroundPosition: 'center 75%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/70 to-primary/80" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">breathtaking</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            TANZANIA
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            SAFARIS
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
                <Button 
                  variant="outline" 
                  className="bg-primary text-white hover:bg-primary/90 hover:text-white border-none px-8 py-6 uppercase tracking-wider"
                >
                  {selectedLocation}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem onClick={() => setSelectedLocation("All Locations")}>
                  All Locations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLocation("Serengeti")}>
                  Serengeti
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLocation("Ngorongoro")}>
                  Ngorongoro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLocation("Tarangire")}>
                  Tarangire
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-primary text-white hover:bg-primary/90 hover:text-white border-none px-8 py-6 uppercase tracking-wider"
                >
                  {selectedLength}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-[100]">
                <DropdownMenuItem onClick={() => setSelectedLength("All Lengths")}>
                  All Lengths
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLength("3-4 Days")}>
                  3-4 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLength("5-6 Days")}>
                  5-6 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedLength("7+ Days")}>
                  7+ Days
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Safari Cards */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {safaris.map((safari, index) => (
              <div
                key={index}
                className="group relative h-[200px] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${safari.image})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

                {/* Content */}
                <div className="relative h-full flex items-center justify-between px-8 text-white">
                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-wide">
                      {safari.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white" />
                        <span>{safari.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-white" />
                        <span className="font-semibold">{safari.price}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white" />
                        <span>{safari.duration}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-white" />
                        <span>{safari.groupSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Button */}
                  <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110 flex-shrink-0">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TanzaniaSafaris;
