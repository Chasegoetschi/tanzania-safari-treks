import tigerImage from "@/assets/tiger.png";
const SafariIntro = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image Side */}
          <div className="relative">
            <img src={tigerImage} alt="Tiger in Tanzania" className="w-full h-[400px] object-cover rounded-lg shadow-lg" />
          </div>

          {/* Text Side */}
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Experience the wild
            </p>
            <h2 className="text-4xl md:text-5xl font-serif">
              <span className="text-copper uppercase tracking-wide font-serif font-semibold">NORTHERN TANZANIA</span>
              <br />
              <span className="text-copper italic font-serif">safari</span>{" "}
              <span className="text-copper uppercase tracking-wide font-serif font-semibold">EXCURSIONS</span>
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                At Grant Expedition, we specialize in creating spectacular safari experiences across Tanzania's most stunning landscapes.
              </p>
              <p>
                From the vast plains of <strong className="text-secondary">Serengeti</strong> to the majestic{" "}
                <strong className="text-secondary">Mount Kilimanjaro</strong>, our expertly crafted tours connect you with nature, culture, and adventure. We deliver personalized itineraries blending luxury, comfort, and authenticity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default SafariIntro;