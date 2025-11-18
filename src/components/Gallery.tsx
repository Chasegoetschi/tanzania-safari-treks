import elephantsImage from "@/assets/elephants.jpg";
import lionImage from "@/assets/lion.jpg";
import jeepImage from "@/assets/safari-jeep.jpg";

const Gallery = () => {
  const images = [
    { src: elephantsImage, alt: "African elephants on safari", title: "Majestic Elephants" },
    { src: lionImage, alt: "Lion in the wild", title: "King of the Jungle" },
    { src: jeepImage, alt: "Safari adventure", title: "Safari Experience" },
  ];

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-secondary mb-6 uppercase tracking-wide">
            Safari Moments
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Experience the beauty and wonder of Tanzania's wildlife through stunning moments 
            captured on our extraordinary journeys.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
