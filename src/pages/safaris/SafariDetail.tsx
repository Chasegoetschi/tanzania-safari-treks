import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Safari data - in a real app, this would come from a database or API
const safariData: Record<string, any> = {
  "taste-of-tanzania": {
    id: "taste-of-tanzania",
    name: "TASTE OF TANZANIA SAFARI",
    location: "Arusha, Tanzania",
    duration: "3 Days",
    price: "From $800 per person",
    groupSize: "2+",
    overview: "A multi-day Taste of Tanzania Safari package designed to offer an effective set menu experience of an African wildlife Safari set in the national Parks. You visit spectacular locations in the wilderness of Central Tanzania. QVCI is located inside Tarangire National Park and the best places to Taste in Arusha are located at the Great Rift Valley and around the slopes of Africa's tallest mountain, Mt. Kilimanjaro. This experience will inspire and appreciate you more-it will become one of the memories of your life and the best place to Taste in Tanzania is in the Big Five.",
    accommodations: {
      luxury: "Gianni Melia Lodge / Mount Meru Lodge / Arusha Coffee Lodge",
      midrange: "Jezan Safari Lodge / Arusha Kanna Lodge / Maziwan Homes Lodge",
      budget: "Kibosho Lodge / Tulia Boutique Hotel / Green Mountain Hotel"
    },
    itinerary: [{
      day: 1,
      title: "DAY one",
      activities: [{
        time: "MORNING",
        description: "You'll start guide will collect you from your lodge in Arusha"
      }, {
        time: "DAY",
        description: "Set out for Tarangire National Park where we'll join one's 24/7 in Africa live eco spaces that has around 450 animals, including a multitude of grazing animals (zebras, wildebeest, giraffe, buffalo, elephants, gazelles, waterbucks, etc.)"
      }, {
        time: "EVENING",
        description: "After a full day in the park, we'll return to your lodge in nature or town as you relax"
      }]
    }, {
      day: 2,
      title: "DAY two",
      activities: [{
        time: "MORNING",
        description: "You'll be picked up from your lodge in Arusha by your safari guide and drive across the Masai plains toward Tarangire National Park"
      }, {
        time: "DAY",
        description: "Play in the open land of the safari pass, you'll explore Tarangire's savannas, swamps, and the Tarangire Tower - spotting a full types of wildlife."
      }, {
        time: "EVENING",
        description: "After a full day, we'll head to your lodge to enjoy dinner and spend the night"
      }]
    }, {
      day: 3,
      title: "DAY three",
      activities: [{
        time: "MORNING",
        description: "You'll leave early for the Ngorongoro Conservation Area and descend from the crater rim into the 600m-deep caldera"
      }, {
        time: "DAY",
        description: "You'll spend the day exploring crater floor, where you might see over 25,000 larger safari animals and more than 500 bird species. A picnic lunch will be given in a safe in an area"
      }, {
        time: "EVENING",
        description: "After exploring the crater, you'll return to Arusha, arriving in the early morning"
      }]
    }],
    included: ["Park fees (for non-residents)", "All activities (unless labeled as optional)", "All accommodation (unless listed as upgrade)", "A professional driver/guide", "All transportation (unless labeled as optional)", "All Taxes/VAT", "Roundtrip airport transfer", "Meals", "Drinks"],
    excluded: ["International flights (from/to home)", "Additional accommodation before and at the end of the tour", "Tips (tipping guideline $15.00 pp per day)", "Personal items (souvenirs, travel insurance, visa fees, etc.)"],
    activities: ["Balloon Safari ($500 per person)", "Maasai Village Visit ($50 per vehicle)", "Night Game Drive Tarangire or Lake Manyara ($120 per person)", "Ngorongoro Crater Rim Walk ($30 per person)", "Visit to the Olduvai Gorge and Museum ($40 per person)"]
  },
  "mid-range-wilderness": {
    id: "mid-range-wilderness",
    name: "MID-RANGE WILDERNESS",
    location: "Arusha, Tanzania",
    duration: "4 Days",
    price: "From $1,000 per person",
    groupSize: "2+",
    overview: "Experience Tanzania's wilderness in comfort with our mid-range safari package. This 4-day adventure takes you through some of Tanzania's most spectacular national parks.",
    accommodations: {
      luxury: "Gianni Melia Lodge / Mount Meru Lodge",
      midrange: "Jezan Safari Lodge / Arusha Kanna Lodge",
      budget: "Kibosho Lodge / Tulia Boutique Hotel"
    },
    itinerary: [{
      day: 1,
      title: "DAY one",
      activities: [{
        time: "MORNING",
        description: "Pick up from your lodge in Arusha"
      }, {
        time: "DAY",
        description: "Drive to Tarangire National Park for game viewing"
      }, {
        time: "EVENING",
        description: "Return to lodge for dinner and overnight"
      }]
    }],
    included: ["Park fees (for non-residents)", "All activities (unless labeled as optional)", "Professional guide", "All transportation", "Meals and drinks"],
    excluded: ["International flights", "Tips", "Personal items"],
    activities: ["Balloon Safari ($500 per person)", "Maasai Village Visit ($50 per vehicle)"]
  }
  // Add more safari packages as needed
};
const SafariDetail = () => {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const navigate = useNavigate();
  const safari = slug ? safariData[slug] : null;
  if (!safari) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Safari Not Found</h1>
          <Button onClick={() => navigate("/safaris/tanzania")}>View All Safaris</Button>
        </div>
      </div>;
  }
  const handleBooking = () => {
    navigate(`/book?content_type=safari&content_id=${safari.id}&content_name=${encodeURIComponent(safari.name)}`);
  };
  return <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-4 text-sm text-muted-foreground">
            Home / Safari / Tanzania Safaris / {slug}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif uppercase text-secondary mb-4 pt-[50px] font-semibold">
                {safari.name}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{safari.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{safari.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span>{safari.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Group Size: {safari.groupSize}</span>
                </div>
              </div>
            </div>
            
            <Button onClick={handleBooking} className="bg-accent hover:bg-accent/90 text-white uppercase tracking-wider px-8 py-6 text-base whitespace-nowrap">
              Book your trip
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Overview */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif uppercase text-secondary mb-6 tracking-wide">
              OVERVIEW
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {safari.overview}
            </p>
          </div>

          {/* Accommodation Options */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif uppercase text-secondary mb-6 tracking-wide">
              ACCOMMODATION <span className="italic lowercase text-2xl">options</span>
            </h2>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Luxury:</span> {safari.accommodations.luxury}
              </div>
              <div>
                <span className="font-semibold">Mid-range:</span> {safari.accommodations.midrange}
              </div>
              <div>
                <span className="font-semibold">Budget:</span> {safari.accommodations.budget}
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif uppercase text-secondary mb-8 tracking-wide">
              ITINERARY <span className="italic lowercase text-2xl">walk-through</span>
            </h2>
            
            <div className="space-y-12">
              {safari.itinerary.map((day: any) => <div key={day.day}>
                  <h3 className="text-2xl font-serif text-primary mb-6">{day.title}</h3>
                  <div className="relative pl-12 space-y-8">
                    {day.activities.map((activity: any, idx: number) => <div key={idx} className="relative">
                        <div className="absolute -left-12 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground mb-2">{activity.time}</div>
                          <p className="text-foreground/70">{activity.description}</p>
                        </div>
                      </div>)}
                  </div>
                </div>)}
            </div>
          </div>

          {/* Included/Excluded */}
          <div className="mb-16 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-serif uppercase text-secondary mb-6 tracking-wide">
                INCLUDED
              </h2>
              <ul className="space-y-2">
                {safari.included.map((item: string, idx: number) => <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>
            
            <div>
              <h2 className="text-3xl font-serif uppercase text-secondary mb-6 tracking-wide">
                EXCLUDED
              </h2>
              <ul className="space-y-2">
                {safari.excluded.map((item: string, idx: number) => <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>)}
              </ul>
            </div>
          </div>

          {/* Safari Activities */}
          {safari.activities && safari.activities.length > 0 && <div className="mb-16">
              <h2 className="text-3xl font-serif uppercase text-secondary mb-6 tracking-wide">
                SAFARI ACTIVITIES <span className="italic lowercase text-2xl">options</span>
              </h2>
              <ul className="space-y-2">
                {safari.activities.map((activity: string, idx: number) => <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{activity}</span>
                  </li>)}
              </ul>
            </div>}

          {/* Book Button */}
          <div className="flex justify-center pt-8">
            <Button onClick={handleBooking} className="bg-accent hover:bg-accent/90 text-white uppercase tracking-wider px-12 py-6 text-lg">
              Book your trip
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            Questions? <button className="text-primary hover:underline">Contact Us</button>
          </p>
        </div>
      </section>
    </div>;
};
export default SafariDetail;