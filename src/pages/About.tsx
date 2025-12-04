import { MapPin, Users, Heart, Globe, Compass, Mountain, Home, Tent, Sparkles } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Joseph",
      role: "Head Safari Guide",
      description: "Born and raised in Tanzania, Joseph has over 15 years of experience leading safaris across the Serengeti and beyond. His deep knowledge of wildlife behavior and local ecosystems makes every safari unforgettable."
    },
    {
      name: "Anna",
      role: "Trip Designer",
      description: "Anna crafts personalized itineraries that blend adventure with comfort. Her attention to detail and passion for travel ensures every journey is tailored to your dreams."
    },
    {
      name: "Peter",
      role: "Operations Manager",
      description: "Peter ensures seamless logistics from start to finish. With his expertise in coordination and planning, every aspect of your trip runs smoothly."
    }
  ];

  const reasons = [
    {
      icon: Globe,
      title: "Local Expertise with Global Standards",
      description: "We combine deep local knowledge with international service standards to deliver exceptional experiences."
    },
    {
      icon: Users,
      title: "Friendly and Knowledgeable Guides",
      description: "Our guides are not just experts—they're storytellers who bring Tanzania's wilderness to life."
    },
    {
      icon: Compass,
      title: "Seamless End-to-End Logistics",
      description: "From airport pickup to your final farewell, we handle every detail so you can focus on the adventure."
    },
    {
      icon: Heart,
      title: "Commitment to Conservation & Culture",
      description: "We support local communities and conservation efforts, ensuring tourism benefits both people and wildlife."
    }
  ];

  const services = [
    {
      icon: Tent,
      title: "Private & Group Wildlife Safaris",
      description: "Experience the Big Five and beyond in exclusive private tours or join like-minded travelers on group adventures."
    },
    {
      icon: Mountain,
      title: "Kilimanjaro Treks with Professional Crew",
      description: "Summit Africa's highest peak with experienced guides, porters, and all the support you need."
    },
    {
      icon: Home,
      title: "Cultural Encounters with Respect",
      description: "Connect authentically with Maasai, Hadzabe, and other communities in meaningful, respectful exchanges."
    },
    {
      icon: Sparkles,
      title: "Beach Holidays in Zanzibar",
      description: "Unwind on pristine beaches, explore Stone Town's history, and discover the Spice Island's treasures."
    },
    {
      icon: MapPin,
      title: "Tailor-Made Itineraries to Fit Your Dream",
      description: "Every trip is customized to your preferences, timeline, and budget—your dream adventure, designed for you."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-sage-bg">
        <div className="container mx-auto px-4 text-center pt-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-wide text-secondary">
            ABOUT <span className="italic font-light">us</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Grant Expedition is a Tanzanian-owned safari company dedicated to sharing the magic of East Africa 
            with travelers from around the world. Our passion for wildlife, culture, and authentic experiences 
            drives everything we do.
          </p>
          <a 
            href="/Certificate_of_Incorporation.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-6 text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
          >
            View our Certificate of Incorporation
          </a>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif mb-4 tracking-wide text-secondary">
              MEET <span className="italic font-light">the team</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Our dedicated team brings together decades of experience and a shared love for Tanzania.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-lg bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 rounded-full bg-accent/20 mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-2xl font-serif mb-2 text-secondary">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-foreground/70 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Travel With Us */}
      <section className="py-20 bg-sage-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif mb-4 tracking-wide text-secondary">
              WHY <span className="italic font-light">travel with us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {reasons.map((reason, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-lg bg-card border border-accent/20 transition-all duration-300 hover:border-accent/40"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
                  <reason.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-secondary">
                  {reason.title}
                </h3>
                <p className="text-foreground/70 text-sm">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif mb-4 tracking-wide text-secondary">
              WHAT <span className="italic font-light">we do</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              From thrilling safaris to serene beach escapes, we offer a complete range of Tanzanian experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg bg-card border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">
                  {service.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
