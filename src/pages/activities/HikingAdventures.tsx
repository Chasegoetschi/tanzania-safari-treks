import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, Clock, TrendingUp } from "lucide-react";

const HikingAdventures = () => {
  const hikingTrips = [
    {
      title: "Mount Kilimanjaro",
      difficulty: "Challenging",
      duration: "5-9 Days",
      elevation: "5,895m",
      description: "Summit Africa's highest peak via various routes including Machame, Lemosho, and Marangu",
      price: "From $1,800",
    },
    {
      title: "Mount Meru",
      difficulty: "Moderate",
      duration: "3-4 Days",
      elevation: "4,566m",
      description: "Perfect acclimatization trek with stunning views and diverse wildlife encounters",
      price: "From $1,200",
    },
    {
      title: "Ngorongoro Highlands",
      difficulty: "Easy-Moderate",
      duration: "1-2 Days",
      elevation: "2,400m",
      description: "Scenic highland walks through Maasai villages with crater rim views",
      price: "From $450",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Hiking Adventures
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Challenge yourself on Tanzania's legendary mountain trails
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hikingTrips.map((trip, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-secondary/20 text-secondary">
                      {trip.difficulty}
                    </span>
                    <Mountain className="w-6 h-6 text-secondary" />
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
                    <TrendingUp className="w-4 h-4" />
                    <span>{trip.elevation} elevation</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{trip.price}</div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Plan Your Climb
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

export default HikingAdventures;
