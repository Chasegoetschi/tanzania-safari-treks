import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, MapPin } from "lucide-react";

const NorthernCircuit = () => {
  const peaks = [
    {
      title: "Mount Kilimanjaro",
      elevation: "5,895m",
      description: "Africa's highest peak and the world's tallest free-standing mountain. Multiple routes available including Machame, Lemosho, Marangu, and Rongai.",
      features: ["7 Climatic Zones", "Multiple Routes", "Professional Guides", "Summit Success Support"],
    },
    {
      title: "Mount Meru",
      elevation: "4,566m",
      description: "Tanzania's second highest mountain, perfect for acclimatization before Kilimanjaro or as a standalone adventure through lush forests.",
      features: ["Wildlife Encounters", "Stunning Views", "Less Crowded", "Crater Rim Walk"],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Northern Circuit
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Conquer Tanzania's legendary mountain peaks in the Northern Circuit
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {peaks.map((peak, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <Mountain className="w-8 h-8 text-secondary" />
                    <div>
                      <CardTitle className="text-3xl">{peak.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-lg font-semibold text-secondary">{peak.elevation}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base">{peak.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {peak.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NorthernCircuit;
