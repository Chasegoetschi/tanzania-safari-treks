import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const TanzaniaSafaris = () => {
  const safariPackages = [
    {
      title: "3-Day Taste of Tanzania",
      duration: "3 Days",
      groupSize: "2-6 People",
      price: "$1,200",
      rating: "4.8",
      description: "Perfect introduction to Tanzania's wildlife in Tarangire and Ngorongoro",
    },
    {
      title: "4-Day Mid-Range Wilderness",
      duration: "4 Days",
      groupSize: "2-6 People",
      price: "$1,600",
      rating: "4.7",
      description: "Experience the best parks with comfortable mid-range accommodations",
    },
    {
      title: "5-Day Mid-Range Best of Tanzania",
      duration: "5 Days",
      groupSize: "2-6 People",
      price: "$2,200",
      rating: "4.9",
      description: "Comprehensive tour covering Serengeti, Ngorongoro, and Tarangire",
    },
    {
      title: "6-Day Mid-Range Highlights of Tanzania",
      duration: "6 Days",
      groupSize: "2-8 People",
      price: "$2,800",
      rating: "5.0",
      description: "Extended safari exploring all major northern circuit parks",
    },
    {
      title: "7-Day Mid-Range Epic Adventure",
      duration: "7 Days",
      groupSize: "2-8 People",
      price: "$3,400",
      rating: "4.9",
      description: "Ultimate mid-range safari with plenty of time in each park",
    },
    {
      title: "7-Day Tanzania Luxury All-Inclusive",
      duration: "7 Days",
      groupSize: "2-6 People",
      price: "$5,500",
      rating: "5.0",
      description: "Luxury lodges and exclusive experiences throughout the northern circuit",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Tanzania Safari Packages
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our carefully curated safari experiences, from quick getaways to extended luxury adventures
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safariPackages.map((safari, index) => (
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
                    View Details
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

export default TanzaniaSafaris;
