import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Palmtree, Clock, Star } from "lucide-react";

const ZanzibarIslands = () => {
  const beachPackages = [
    {
      title: "5-Day Beach Getaway",
      duration: "5 Days",
      price: "$1,400",
      rating: "4.8",
      description: "Relax on pristine beaches with snorkeling and spice tours included",
    },
    {
      title: "6-Day Island Adventure",
      duration: "6 Days",
      price: "$1,800",
      rating: "4.9",
      description: "Extended beach stay with Stone Town tours and water sports activities",
    },
    {
      title: "7-Day Luxury Escape",
      duration: "7 Days",
      price: "$3,200",
      rating: "5.0",
      description: "Ultimate luxury experience with private beach access and fine dining",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Zanzibar Islands
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Paradise beaches, turquoise waters, and rich Swahili culture await
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beachPackages.map((pkg, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-semibold">{pkg.rating}</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                  </div>
                  <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                  <CardDescription className="text-base">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => window.location.href = `/book?content_type=location&content_name=${encodeURIComponent(pkg.title)}`}
                  >
                    Book Island Escape
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

export default ZanzibarIslands;
