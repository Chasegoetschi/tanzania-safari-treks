import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, DollarSign, Users, ChevronDown, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import lionImage from "@/assets/lion.jpg";
import elephantsImage from "@/assets/elephants.jpg";
import safariJeepImage from "@/assets/safari-jeep.jpg";
import lionsSavannaImage from "@/assets/lions-savanna.png";
import lionessMoundImage from "@/assets/lioness-mound-2.png";
import wildebeestZebraImage from "@/assets/wildebeest-zebra-herd.png";
import maraRiverAerialImage from "@/assets/mara-river-aerial.png";

const MigrationSafaris = () => {
  const navigate = useNavigate();
  const migrationPackages = [
    {
      title: "WESTERN CORRIDOR MIGRATION",
      location: "Serengeti Western Corridor",
      duration: "7 Days",
      groupSize: "2+",
      price: "From $3,200",
      image: lionessMoundImage,
    },
    {
      title: "NDUTU MIGRATION EXPERIENCE",
      location: "Southern Serengeti & Ndutu",
      duration: "8 Days",
      groupSize: "2+",
      price: "From $4,000",
      image: wildebeestZebraImage,
    },
    {
      title: "MARA RIVER CROSSING",
      location: "Mara River",
      duration: "10 Days",
      groupSize: "2+",
      price: "From $5,000",
      image: maraRiverAerialImage,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${lionsSavannaImage})` }}
      >
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">remarkable</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-wide leading-tight">
            SERENGETI AND<br />MIGRATION SAFARIS
          </h1>
        </div>
        <button className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white transition-transform duration-700 hover:translate-y-2">
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* Sort Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6 mb-12">
            <h2 className="text-base font-sans font-medium uppercase tracking-[0.3em] text-foreground">SORT BY</h2>
            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="w-[180px] bg-primary text-white border-none uppercase tracking-wider">
                  <SelectValue placeholder="LOCATION" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="western">Western Corridor</SelectItem>
                  <SelectItem value="ndutu">Ndutu</SelectItem>
                  <SelectItem value="mara">Mara River</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px] bg-primary text-white border-none uppercase tracking-wider">
                  <SelectValue placeholder="LENGTH" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="8">8 Days</SelectItem>
                  <SelectItem value="10">10 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Safari Cards */}
          <div className="max-w-4xl mx-auto space-y-6">
            {migrationPackages.map((safari, index) => (
              <div
                key={index}
                onClick={() => {
                  const slug = safari.title.toLowerCase().replace(/\s+/g, '-');
                  navigate(`/safaris/${slug}`);
                }}
                className="group relative h-[200px] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                {/* Background Image */}
                <img
                  src={safari.image}
                  alt={safari.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/25" />

                {/* Content */}
                <div className="relative h-full flex items-center justify-between px-8">
                  <div className="text-white space-y-4">
                    <h3 className="text-3xl md:text-4xl font-serif font-semibold uppercase tracking-wide">
                      {safari.title}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-5 h-5 text-white" />
                        <span className="font-sans font-semibold">{safari.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-5 h-5 text-white" />
                        <span className="font-sans font-semibold">{safari.duration}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-5 h-5 text-white" />
                        <span className="font-sans font-semibold">{safari.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-5 h-5 text-white" />
                        <span className="font-sans font-semibold">Group Size: {safari.groupSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Button */}
                  <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
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

export default MigrationSafaris;
