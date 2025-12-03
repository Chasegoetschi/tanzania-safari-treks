import { ArrowRight, DollarSign, Users } from "lucide-react";
import kilimanjaroSummitImage from "@/assets/kilimanjaro-summit.png";
import kilimanjaroNightImage from "@/assets/kilimanjaro-night.png";
import riftValleyImage from "@/assets/rift-valley.png";
const NorthernCircuit = () => {
  const peaks = [{
    title: "NORTHERN CIRCUIT MOUNTAINS",
    price: "26,000",
    groupSize: "4+",
    image: kilimanjaroSummitImage,
    link: "/book?trip=Mount%20Kilimanjaro&content_type=location"
  }, {
    title: "KILIMANJARO EXPEDITION",
    price: "28,000",
    groupSize: "2+",
    image: kilimanjaroNightImage,
    link: "/book?trip=Mount%20Kilimanjaro&content_type=location"
  }, {
    title: "MOUNT MERU TREK",
    price: "18,000",
    groupSize: "4+",
    image: riftValleyImage,
    link: "/book?trip=mount%20meru%20climbing&content_type=location"
  }];
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src={kilimanjaroSummitImage} alt="Northern Circuit Mountains" className="absolute inset-0 w-full h-full object-cover object-center" />

        <div className="relative z-10 text-center text-white px-4">
          <p className="text-2xl md:text-3xl italic font-light mb-2">stunning</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif uppercase tracking-wide">
            MOUNTAINS    
          </h1>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {peaks.map((peak, index) => <div key={index} onClick={() => window.location.href = peak.link} className="group relative h-[200px] overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <img src={peak.image} alt={peak.title} className="absolute inset-0 w-full h-full object-cover" />
                
                <div className="relative h-full flex items-center justify-between px-8 md:px-12">
                  <div className="text-white space-y-4">
                    <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wide">
                      {peak.title}
                    </h2>
                    <div className="flex items-center gap-8 text-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        <span>From ${peak.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>Group Size: {peak.groupSize}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>
    </div>;
};
export default NorthernCircuit;