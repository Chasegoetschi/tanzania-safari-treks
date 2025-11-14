import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Moon, Wind } from "lucide-react";

const OutdoorExperiences = () => {
  const outdoorTrips = [
    {
      title: "Hot Air Balloon Experience",
      icon: Wind,
      duration: "3-4 Hours",
      location: "Serengeti",
      description: "Soar above the Serengeti plains at sunrise for breathtaking aerial views of wildlife",
      price: "$550",
    },
    {
      title: "Lake Manyara Canoeing",
      icon: Waves,
      duration: "2-3 Hours",
      location: "Lake Manyara",
      description: "Paddle peacefully along the lake shore observing hippos and diverse birdlife",
      price: "$120",
    },
    {
      title: "Night Game Drive",
      icon: Moon,
      duration: "2-3 Hours",
      location: "Various Parks",
      description: "Discover nocturnal wildlife with spotlights revealing creatures of the night",
      price: "$80",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Outdoor & Nature Experiences
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Unique outdoor adventures that showcase Tanzania's natural beauty
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {outdoorTrips.map((trip, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <trip.icon className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold text-primary">{trip.price}</span>
                  </div>
                  <CardTitle className="text-2xl">{trip.title}</CardTitle>
                  <CardDescription className="text-base">{trip.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{trip.location}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => window.location.href = `/book?content_type=activity&content_name=${encodeURIComponent(trip.title)}`}
                  >
                    Book Adventure
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

export default OutdoorExperiences;
