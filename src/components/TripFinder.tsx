import { MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import elephantsImage from "@/assets/elephants.jpg";
import lionImage from "@/assets/lioness-mound.png";
import safariJeepImage from "@/assets/safari-jeep.jpg";
import safariHeroImage from "@/assets/safari-hero.jpg";
import lionessSunsetImage from "@/assets/lioness-sunset.png";
import oryxImage from "@/assets/oryx.png";
import riftValleyImage from "@/assets/rift-valley.png";
import kilimanjaroSignImage from "@/assets/kilimanjaro-sign.png";
import kilimanjaroNightImage from "@/assets/kilimanjaro-night.png";
import kilimanjaroSummitImage from "@/assets/kilimanjaro-summit.png";

const TripFinder = () => {
  const expeditions = [
    {
      title: "TANZANIA HIGHLIGHTS SAFARI",
      location: "Serengeti National Park",
      duration: "6 Days",
      price: "From $3,000",
      image: lionessSunsetImage,
      link: "/safaris/tanzania",
    },
    {
      title: "CRATER RIM ADVENTURE",
      location: "Serengeti National Park",
      duration: "7 Days",
      price: "From $3,200",
      image: oryxImage,
      link: "/safaris/tanzania",
    },
    {
      title: "NDUTU MIGRATION EXPERIENCE",
      location: "Southern Serengeti & Ndutu",
      duration: "6 Days",
      price: "From $4,000",
      image: riftValleyImage,
      link: "/safaris/migration",
    },
    {
      title: "MT. KILIMANJARO MARANGU ROUTE",
      location: "Kilimanjaro Trail Huts",
      duration: "5 Days",
      price: "From $12,000",
      image: kilimanjaroSignImage,
      link: "/activities/hiking",
    },
    {
      title: "MT. KILIMANJARO MACHAME ROUTE",
      location: "Kilimanjaro Trail Huts",
      duration: "6 Days",
      price: "From $12,000",
      image: kilimanjaroNightImage,
      link: "/activities/hiking",
    },
    {
      title: "MT. KILIMANJARO LEMOSHO ROUTE",
      location: "Kilimanjaro Trail Huts",
      duration: "8 Days",
      price: "From $12,000",
      image: kilimanjaroSummitImage,
      link: "/activities/hiking",
    },
    {
      title: "EXPLORE ZANZIBAR",
      location: "Mnarani Seafront Hotel, Stone Town",
      duration: "5 Days, 1 Night",
      price: "From $9,000",
      image: safariJeepImage,
      link: "/locations/zanzibar",
    },
    {
      title: "THE ZANZIBAR EXPERIENCE",
      location: "Mnarani Seafront Hotel, Stone Town",
      duration: "3 Days, 2 Nights",
      price: "From $12,000",
      image: lionImage,
      link: "/locations/zanzibar",
    },
    {
      title: "ZANZIBAR IMMERSIVE",
      location: "Mnarani Seafront Hotel, Stone Town",
      duration: "4 Days, 3 Nights",
      price: "From $15,000",
      image: elephantsImage,
      link: "/locations/zanzibar",
    },
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-primary uppercase tracking-[0.3em] mb-4">
            TRIP FINDER
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-secondary">
            DISCOVER <span className="italic font-light">your next</span> ADVENTURE
          </h2>
        </div>

        {/* Expedition Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expeditions.map((expedition, index) => (
            <Link
              key={index}
              to={expedition.link}
              className="group relative h-[450px] overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${expedition.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <div className="mb-auto">
                  <h3 className="text-xl font-serif uppercase tracking-wide leading-tight mb-4">
                    {expedition.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{expedition.location}</span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{expedition.duration}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="font-semibold">{expedition.price}</span>
                  </div>
                  
                  {/* Arrow Button */}
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripFinder;
