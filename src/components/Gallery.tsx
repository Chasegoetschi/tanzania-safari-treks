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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Capture the Wild
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the beauty and wonder of Tanzania's wildlife through stunning moments 
            captured on our safaris.
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
