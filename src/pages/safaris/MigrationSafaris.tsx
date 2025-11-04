import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Star } from "lucide-react";

const MigrationSafaris = () => {
  const migrationPackages = [
    {
      title: "7-Day Wildebeest Migration",
      duration: "7 Days",
      groupSize: "2-8 People",
      price: "$3,800",
      rating: "5.0",
      description: "Witness the greatest wildlife spectacle on Earth during the annual migration",
    },
    {
      title: "8-Day Mid-Range Ndutu Migration",
      duration: "8 Days",
      groupSize: "2-6 People",
      price: "$4,200",
      rating: "4.9",
      description: "Experience the calving season in Ndutu with incredible predator action",
    },
    {
      title: "10-Day Wildebeest Migration",
      duration: "10 Days",
      groupSize: "2-8 People",
      price: "$5,500",
      rating: "5.0",
      description: "Extended migration safari following the herds across the Serengeti",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Serengeti & Migration Safaris
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow the Great Migration and witness nature's most spectacular wildlife event
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {migrationPackages.map((safari, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-semibold">{safari.rating}</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{safari.price}</span>
                  </div>
                  <CardTitle className="text-2xl">{safari.title}</CardTitle>
                  <CardDescription className="text-base">{safari.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{safari.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{safari.groupSize}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Book Now
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

export default MigrationSafaris;
