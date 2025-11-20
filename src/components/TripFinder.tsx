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
import zanzibarStonetownImage from "@/assets/zanzibar-stonetown.png";
import zanzibarBeachImage from "@/assets/zanzibar-beach.png";
import zanzibarExperienceImage from "@/assets/zanzibar-experience.png";
const TripFinder = () => {
  const expeditions = [{
    title: "TANZANIA HIGHLIGHTS SAFARI",
    location: "Serengeti National Park",
    duration: "6 Days",
    price: "From $3,000",
    image: lionessSunsetImage,
    link: "/safaris/tanzania"
  }, {
    title: "CRATER RIM ADVENTURE",
    location: "Serengeti National Park",
    duration: "7 Days",
    price: "From $3,200",
    image: oryxImage,
    link: "/safaris/tanzania"
  }, {
    title: "NDUTU MIGRATION EXPERIENCE",
    location: "Southern Serengeti & Ndutu",
    duration: "6 Days",
    price: "From $4,000",
    image: riftValleyImage,
    link: "/safaris/migration"
  }, {
    title: "MT. KILIMANJARO MARANGU ROUTE",
    location: "Kilimanjaro Trail Huts",
    duration: "5 Days",
    price: "From $4,000",
    image: kilimanjaroSignImage,
    link: "/activities/hiking"
  }, {
    title: "MT. KILIMANJARO MACHAME ROUTE",
    location: "Kilimanjaro Trail Huts",
    duration: "6 Days",
    price: "From $4,000",
    image: kilimanjaroNightImage,
    link: "/activities/hiking"
  }, {
    title: "MT. KILIMANJARO LEMOSHO ROUTE",
    location: "Kilimanjaro Trail Huts",
    duration: "8 Days",
    price: "From $4,000",
    image: kilimanjaroSummitImage,
    link: "/activities/hiking"
  }, {
    title: "EXPLORE ZANZIBAR",
    location: "Mnarani Seafront Hotel, Stone Town",
    duration: "5 Days, 1 Night",
    price: "From $3,000",
    image: zanzibarStonetownImage,
    link: "/locations/zanzibar"
  }, {
    title: "THE ZANZIBAR EXPERIENCE",
    location: "Mnarani Seafront Hotel, Stone Town",
    duration: "3 Days, 2 Nights",
    price: "From $4,000",
    image: zanzibarExperienceImage,
    link: "/locations/zanzibar"
  }, {
    title: "ZANZIBAR IMMERSIVE",
    location: "Mnarani Seafront Hotel, Stone Town",
    duration: "4 Days, 3 Nights",
    price: "From $5,000",
    image: zanzibarBeachImage,
    link: "/locations/zanzibar"
  }];
  return <section id="trip-finder" className="py-20 bg-trip-bg scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-primary uppercase tracking-[0.3em] mb-4">
            TRIP FINDER
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-secondary">
            DISCOVER <span className="italic font-light font-serif">your next</span> ADVENTURE
          </h2>
        </div>

        {/* Expedition Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expeditions.map((expedition, index) => <Link key={index} to={expedition.link} className="group relative h-[450px] overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 block">
              {/* Background Image */}
              <img src={expedition.image} alt={expedition.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black/25" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <div className="mb-auto">
                  <h3 className="font-serif font-semibold uppercase tracking-wide leading-tight mb-4 text-4xl my-0 pt-0">
                    {expedition.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    <span className="font-semibold text-lg">{expedition.location}</span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    <span className="font-semibold text-lg">{expedition.duration}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-5 h-5 text-primary" strokeWidth={2.5} />
                    <span className="font-semibold text-lg">{expedition.price}</span>
                  </div>
                  
                  {/* Arrow Button */}
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                      <ArrowRight className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>)}
        </div>
      </div>
    </section>;
};
export default TripFinder;