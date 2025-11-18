import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Safaris = () => {
  const navigate = useNavigate();
  const safariPackages = [
    {
      title: "Serengeti Explorer",
      duration: "5 Days",
      groupSize: "2-6 People",
      price: "$2,500",
      rating: "4.9",
      description: "Witness the Great Migration and explore the endless plains of the Serengeti",
      highlights: ["Great Migration", "Big Five Safari", "Luxury Lodges", "Professional Guide"],
    },
    {
      title: "Kilimanjaro & Safari Combo",
      duration: "10 Days",
      groupSize: "2-8 People",
      price: "$4,800",
      rating: "5.0",
      description: "Summit Africa's highest peak then explore the wildlife-rich national parks",
      highlights: ["Mt. Kilimanjaro Trek", "Ngorongoro Crater", "Tarangire Safari", "All Equipment"],
    },
    {
      title: "Zanzibar Beach & Bush",
      duration: "7 Days",
      groupSize: "2-10 People",
      price: "$3,200",
      rating: "4.8",
      description: "Combine thrilling safari adventures with relaxation on pristine white beaches",
      highlights: ["Safari Parks", "Beach Resort", "Spice Tour", "Snorkeling"],
    },
  ];

  return (
    <section id="safaris" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-secondary mb-6 uppercase tracking-wide">
            Featured Safari Experiences
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Embark on extraordinary journeys through Tanzania's most iconic landscapes. 
            Each experience is crafted to create memories that last a lifetime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safariPackages.map((safari, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-muted/50">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    <span className="text-sm font-semibold text-secondary">{safari.rating}</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{safari.price}</span>
                </div>
                <CardTitle className="text-2xl font-serif text-secondary uppercase tracking-wide">{safari.title}</CardTitle>
                <CardDescription className="text-base text-foreground/70">{safari.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{safari.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{safari.groupSize}</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {safari.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-muted/20">
                <Button 
                  onClick={() => {
                    const slug = safari.title.toLowerCase().replace(/\s+/g, '-');
                    navigate(`/safaris/${slug}`);
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-white uppercase tracking-wider" 
                  size="lg"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Safaris;
