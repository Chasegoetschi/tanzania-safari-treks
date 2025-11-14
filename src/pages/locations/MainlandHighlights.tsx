import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const MainlandHighlights = () => {
  const locations = [
    {
      title: "Serengeti National Park",
      description: "The world's most famous wildlife reserve, home to the Great Migration and the Big Five",
      highlights: ["Great Migration", "Big Five", "Endless Plains", "Hot Air Balloons"],
    },
    {
      title: "Ngorongoro Crater",
      description: "UNESCO World Heritage Site with the world's largest intact volcanic caldera",
      highlights: ["Dense Wildlife", "Crater Floor", "Black Rhinos", "Maasai Culture"],
    },
    {
      title: "Tarangire National Park",
      description: "Famous for massive elephant herds and spectacular baobab trees",
      highlights: ["Elephant Herds", "Baobab Trees", "Tarangire River", "Bird Watching"],
    },
    {
      title: "Lake Manyara National Park",
      description: "Diverse ecosystems from alkaline lake to dense woodlands with tree-climbing lions",
      highlights: ["Tree Climbing Lions", "Flamingos", "Hot Springs", "Diverse Habitats"],
    },
    {
      title: "Arusha",
      description: "Gateway city to northern safari circuit with vibrant markets and coffee plantations",
      highlights: ["Coffee Tours", "Local Markets", "Mount Meru Views", "Cultural Centers"],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Mainland Highlights
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore Tanzania's incredible mainland destinations and national parks
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {locations.map((location, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <CardTitle className="text-2xl mb-2">{location.title}</CardTitle>
                      <CardDescription className="text-base">{location.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {location.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => window.location.href = `/book?content_type=location&content_name=${encodeURIComponent(location.title)}`}
                  >
                    Explore Location
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainlandHighlights;
