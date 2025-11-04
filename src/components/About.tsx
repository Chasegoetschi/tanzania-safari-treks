import { MapPin, Users, Award, Shield } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: MapPin,
      title: "Local Expertise",
      description: "Born and raised in Tanzania, we know every hidden gem and wildlife hotspot",
    },
    {
      icon: Users,
      title: "Expert Guides",
      description: "Professional, certified guides with decades of combined safari experience",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized as one of Tanzania's premier safari tour operators",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Your safety and comfort are our top priorities on every adventure",
    },
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Gateway to Wild Africa
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            With over 15 years of experience, we craft authentic safari experiences that connect you 
            with Tanzania's incredible wildlife and breathtaking landscapes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
