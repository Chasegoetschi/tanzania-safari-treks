import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, MapPin } from "lucide-react";

const CulturalExperiences = () => {
  const culturalTrips = [
    {
      title: "Maasai Village Visit",
      duration: "Half Day",
      location: "Ngorongoro Area",
      description: "Immerse yourself in Maasai culture with traditional dances, homestead tours, and authentic interactions",
      price: "$80",
    },
    {
      title: "Lake Eyasi Cultural Tour",
      duration: "Full Day",
      location: "Lake Eyasi",
      description: "Visit the Hadzabe bushmen and Datoga tribes to experience ancient hunter-gatherer traditions",
      price: "$180",
    },
    {
      title: "Arusha Town Tour",
      duration: "Half Day",
      location: "Arusha City",
      description: "Explore local markets, cultural heritage centers, and the vibrant daily life of Arusha",
      price: "$60",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Cultural & Local Experiences
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with Tanzania's rich cultural heritage and local communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {culturalTrips.map((trip, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold text-primary">{trip.price}</span>
                  </div>
                  <CardTitle className="text-2xl">{trip.title}</CardTitle>
                  <CardDescription className="text-base">{trip.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{trip.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{trip.location}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => window.location.href = `/book?content_type=activity&content_name=${encodeURIComponent(trip.title)}`}
                  >
                    Book Experience
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

export default CulturalExperiences;
