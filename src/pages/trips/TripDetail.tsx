import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Clock, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Trip data for TripFinder cards
const tripData: Record<string, any> = {
  "tanzania-highlights-safari": {
    id: "tanzania-highlights-safari",
    name: "TANZANIA HIGHLIGHTS SAFARI",
    location: "Serengeti National Park, Tanzania",
    duration: "6 Days",
    price: "From $3,000 per person",
    groupSize: "2+",
    overview: "Experience the best of Tanzania on this 6-day safari adventure through the iconic Serengeti National Park. Witness the incredible wildlife, stunning landscapes, and the magic of the African savanna. This carefully curated itinerary takes you through prime game viewing areas where you'll encounter lions, elephants, giraffes, and countless other species in their natural habitat.",
    accommodations: {
      luxury: "Four Seasons Safari Lodge / Singita Grumeti",
      midrange: "Serengeti Serena Safari Lodge / Kubu Kubu Tented Lodge",
      budget: "Serengeti Heritage Tented Camp / Ang'ata Migration Camp"
    },
    itinerary: [
      {
        day: 1,
        title: "DAY one",
        activities: [
          { time: "MORNING", description: "Arrive at Kilimanjaro International Airport. Meet your safari guide and transfer to Arusha for overnight." },
          { time: "AFTERNOON", description: "Relax at your lodge and prepare for the adventure ahead." },
          { time: "EVENING", description: "Welcome dinner and safari briefing with your guide." }
        ]
      },
      {
        day: 2,
        title: "DAY two",
        activities: [
          { time: "MORNING", description: "Depart Arusha and drive to Tarangire National Park, famous for its massive elephant herds." },
          { time: "DAY", description: "Full day game drive through Tarangire, spotting elephants, lions, leopards, and diverse birdlife." },
          { time: "EVENING", description: "Transfer to your lodge near Lake Manyara for dinner and overnight." }
        ]
      },
      {
        day: 3,
        title: "DAY three",
        activities: [
          { time: "MORNING", description: "Drive to the Ngorongoro Conservation Area with stops for photography along the way." },
          { time: "DAY", description: "Descend into the Ngorongoro Crater for a half-day game drive. Spot the Big Five in this unique ecosystem." },
          { time: "EVENING", description: "Ascend the crater rim and enjoy sunset views before dinner at your lodge." }
        ]
      },
      {
        day: 4,
        title: "DAY four",
        activities: [
          { time: "MORNING", description: "Journey to the Serengeti National Park, entering through the Naabi Hill Gate." },
          { time: "DAY", description: "Game drive through the Serengeti plains, watching for big cats, wildebeest, and zebras." },
          { time: "EVENING", description: "Arrive at your Serengeti camp for dinner under the stars." }
        ]
      },
      {
        day: 5,
        title: "DAY five",
        activities: [
          { time: "MORNING", description: "Early morning game drive to catch predators on the hunt at sunrise." },
          { time: "DAY", description: "Full day exploring different areas of the Serengeti. Picnic lunch in the bush." },
          { time: "EVENING", description: "Return to camp for a farewell dinner and overnight." }
        ]
      },
      {
        day: 6,
        title: "DAY six",
        activities: [
          { time: "MORNING", description: "Final morning game drive before departing the Serengeti." },
          { time: "DAY", description: "Drive back to Arusha with game viewing opportunities en route." },
          { time: "EVENING", description: "Arrive in Arusha. Transfer to airport or your hotel. End of safari." }
        ]
      }
    ],
    included: ["Park fees (for non-residents)", "All game drives as per itinerary", "Professional English-speaking driver/guide", "4x4 safari vehicle with pop-up roof", "All accommodation as per itinerary", "All meals during safari", "Bottled water during game drives", "Roundtrip airport transfers"],
    excluded: ["International flights", "Visa fees", "Travel insurance", "Tips and gratuities", "Personal expenses", "Optional activities (balloon safari, etc.)"],
    activities: ["Hot Air Balloon Safari ($550 per person)", "Maasai Village Visit ($50 per person)", "Bush Dinner ($100 per person)", "Walking Safari ($80 per person)"]
  },
  "crater-rim-adventure": {
    id: "crater-rim-adventure",
    name: "CRATER RIM ADVENTURE",
    location: "Serengeti National Park, Tanzania",
    duration: "7 Days",
    price: "From $3,200 per person",
    groupSize: "2+",
    overview: "Explore the magnificent Ngorongoro Crater and surrounding highlands on this 7-day adventure. The crater, often called 'Africa's Garden of Eden,' is home to an incredible concentration of wildlife within its volcanic walls. Combined with the endless plains of the Serengeti, this safari offers an unparalleled East African experience.",
    accommodations: {
      luxury: "Ngorongoro Crater Lodge / The Manor at Ngorongoro",
      midrange: "Ngorongoro Serena Safari Lodge / Ngorongoro Sopa Lodge",
      budget: "Rhino Lodge / Simba Campsite"
    },
    itinerary: [
      {
        day: 1,
        title: "DAY one",
        activities: [
          { time: "MORNING", description: "Arrive at Kilimanjaro International Airport. Warm welcome and transfer to Arusha." },
          { time: "AFTERNOON", description: "Check into your hotel and rest after your journey." },
          { time: "EVENING", description: "Dinner and safari briefing." }
        ]
      },
      {
        day: 2,
        title: "DAY two",
        activities: [
          { time: "MORNING", description: "Drive to Tarangire National Park for game viewing." },
          { time: "DAY", description: "Explore the park known for its ancient baobab trees and large elephant herds." },
          { time: "EVENING", description: "Transfer to your lodge for overnight." }
        ]
      },
      {
        day: 3,
        title: "DAY three",
        activities: [
          { time: "MORNING", description: "Head to Lake Manyara National Park, famous for tree-climbing lions." },
          { time: "DAY", description: "Game drive along the lake shore, spotting flamingos, hippos, and diverse birdlife." },
          { time: "EVENING", description: "Continue to the Ngorongoro highlands for overnight." }
        ]
      },
      {
        day: 4,
        title: "DAY four",
        activities: [
          { time: "MORNING", description: "Descend into the Ngorongoro Crater for a full day of game viewing." },
          { time: "DAY", description: "Explore the crater floor with its remarkable wildlife concentration including rhinos." },
          { time: "EVENING", description: "Ascend and return to your crater rim lodge." }
        ]
      },
      {
        day: 5,
        title: "DAY five",
        activities: [
          { time: "MORNING", description: "Drive to the Serengeti National Park." },
          { time: "DAY", description: "Afternoon game drive in the central Serengeti." },
          { time: "EVENING", description: "Settle into your Serengeti camp." }
        ]
      },
      {
        day: 6,
        title: "DAY six",
        activities: [
          { time: "MORNING", description: "Early sunrise game drive." },
          { time: "DAY", description: "Full day exploring different regions of the Serengeti." },
          { time: "EVENING", description: "Farewell dinner at camp." }
        ]
      },
      {
        day: 7,
        title: "DAY seven",
        activities: [
          { time: "MORNING", description: "Final game drive and departure from Serengeti." },
          { time: "DAY", description: "Drive back to Arusha." },
          { time: "EVENING", description: "Airport transfer. End of safari." }
        ]
      }
    ],
    included: ["Park fees", "All game drives", "Professional guide", "4x4 vehicle", "Accommodation", "Meals", "Water", "Transfers"],
    excluded: ["International flights", "Visa fees", "Travel insurance", "Tips", "Personal expenses", "Optional activities"],
    activities: ["Crater Rim Walk ($30 per person)", "Maasai Village Visit ($50 per person)", "Hot Air Balloon Safari ($550 per person)"]
  },
  "ndutu-migration-experience": {
    id: "ndutu-migration-experience",
    name: "NDUTU MIGRATION EXPERIENCE",
    location: "Southern Serengeti & Ndutu, Tanzania",
    duration: "6 Days",
    price: "From $4,000 per person",
    groupSize: "2+",
    overview: "Witness the great wildebeest migration calving season in the Ndutu area. From December to March, millions of wildebeest give birth on the southern Serengeti plains, attracting predators and creating one of nature's most spectacular events. This safari focuses on this incredible wildlife phenomenon.",
    accommodations: {
      luxury: "Ndutu Safari Lodge / Lake Masek Tented Camp",
      midrange: "Ndutu Wildlands Camp / Ang'ata Migration Camp",
      budget: "Ndutu Under Canvas / Mobile Camping"
    },
    itinerary: [
      {
        day: 1,
        title: "DAY one",
        activities: [
          { time: "MORNING", description: "Arrive at Kilimanjaro Airport. Transfer to Arusha." },
          { time: "AFTERNOON", description: "Rest and prepare for safari." },
          { time: "EVENING", description: "Dinner and briefing about the migration." }
        ]
      },
      {
        day: 2,
        title: "DAY two",
        activities: [
          { time: "MORNING", description: "Drive to Ngorongoro Conservation Area." },
          { time: "DAY", description: "Descend into the crater for game viewing." },
          { time: "EVENING", description: "Overnight at crater rim." }
        ]
      },
      {
        day: 3,
        title: "DAY three",
        activities: [
          { time: "MORNING", description: "Drive to the Ndutu area in southern Serengeti." },
          { time: "DAY", description: "Search for the migration herds and witness calving if in season." },
          { time: "EVENING", description: "Camp near the migration herds." }
        ]
      },
      {
        day: 4,
        title: "DAY four",
        activities: [
          { time: "MORNING", description: "Early game drive following the migration." },
          { time: "DAY", description: "Full day tracking wildebeest and watching predator action." },
          { time: "EVENING", description: "Return to camp for dinner." }
        ]
      },
      {
        day: 5,
        title: "DAY five",
        activities: [
          { time: "MORNING", description: "Another morning with the migration herds." },
          { time: "DAY", description: "Continue exploring the southern plains." },
          { time: "EVENING", description: "Final night in the wilderness." }
        ]
      },
      {
        day: 6,
        title: "DAY six",
        activities: [
          { time: "MORNING", description: "Final game drive in Ndutu area." },
          { time: "DAY", description: "Drive back to Arusha." },
          { time: "EVENING", description: "Airport transfer. End of safari." }
        ]
      }
    ],
    included: ["Park fees", "Game drives", "Guide", "Vehicle", "Accommodation", "Meals", "Water", "Transfers"],
    excluded: ["Flights", "Visa", "Insurance", "Tips", "Personal items", "Optional activities"],
    activities: ["Hot Air Balloon Safari ($600 per person)", "Walking Safari ($80 per person)", "Olduvai Gorge Visit ($40 per person)"]
  },
  "kilimanjaro-marangu": {
    id: "kilimanjaro-marangu",
    name: "MT. KILIMANJARO MARANGU ROUTE",
    location: "Kilimanjaro Trail Huts, Tanzania",
    duration: "5 Days",
    price: "From $4,000 per person",
    groupSize: "2+",
    overview: "Climb Africa's highest peak via the Marangu Route, also known as the 'Coca-Cola Route.' This is the only route with hut accommodations, making it popular for those preferring beds over tents. The 5-day journey takes you through diverse ecological zones to the summit at 5,895 meters.",
    accommodations: {
      luxury: "N/A - Mountain huts only",
      midrange: "Mandara Hut (2,700m) / Horombo Hut (3,720m) / Kibo Hut (4,703m)",
      budget: "Same hut accommodations for all"
    },
    itinerary: [
      {
        day: 1,
        title: "DAY one",
        activities: [
          { time: "MORNING", description: "Transfer from Moshi to Marangu Gate (1,860m). Complete registration." },
          { time: "DAY", description: "Trek through rainforest to Mandara Hut (2,700m). 8km, 4-5 hours." },
          { time: "EVENING", description: "Dinner and overnight at Mandara Hut." }
        ]
      },
      {
        day: 2,
        title: "DAY two",
        activities: [
          { time: "MORNING", description: "Breakfast and depart for Horombo Hut." },
          { time: "DAY", description: "Trek through moorland zone. 11km, 6-7 hours to Horombo Hut (3,720m)." },
          { time: "EVENING", description: "Rest and acclimatize. Dinner at Horombo." }
        ]
      },
      {
        day: 3,
        title: "DAY three",
        activities: [
          { time: "MORNING", description: "Depart for Kibo Hut across alpine desert." },
          { time: "DAY", description: "Steady climb to Kibo Hut (4,703m). 10km, 5-6 hours." },
          { time: "EVENING", description: "Early dinner and rest before midnight departure." }
        ]
      },
      {
        day: 4,
        title: "DAY four",
        activities: [
          { time: "MIDNIGHT", description: "Begin summit attempt at midnight." },
          { time: "MORNING", description: "Reach Gilman's Point (5,681m), then continue to Uhuru Peak (5,895m)." },
          { time: "DAY", description: "Descend to Horombo Hut for overnight. 21km total." }
        ]
      },
      {
        day: 5,
        title: "DAY five",
        activities: [
          { time: "MORNING", description: "Final descent to Marangu Gate." },
          { time: "DAY", description: "Trek through rainforest. 20km, 6-7 hours." },
          { time: "EVENING", description: "Receive summit certificates. Transfer to Moshi." }
        ]
      }
    ],
    included: ["Park fees", "Professional mountain guide", "Assistant guides", "Porters", "Cook", "Hut accommodation", "All meals on mountain", "Transfers", "Summit certificate"],
    excluded: ["Flights", "Pre/post accommodation", "Tips for crew", "Personal gear", "Travel insurance", "Visa fees"],
    activities: ["Pre-climb training hike ($50)", "Waterfall visit ($30)", "Coffee tour ($40)"]
  },
  "kilimanjaro-machame": {
    id: "kilimanjaro-machame",
    name: "MT. KILIMANJARO MACHAME ROUTE",
    location: "Kilimanjaro Trail Huts, Tanzania",
    duration: "6 Days",
    price: "From $4,000 per person",
    groupSize: "2+",
    overview: "The Machame Route, known as the 'Whiskey Route,' is the most popular path up Kilimanjaro. This scenic 6-day trek offers diverse landscapes and better acclimatization than shorter routes. Camp under the stars as you journey through rainforest, heath, alpine desert, and arctic zones to Africa's rooftop.",
    accommodations: {
      luxury: "N/A - Tent camping",
      midrange: "Quality camping equipment provided",
      budget: "Same camping for all"
    },
    itinerary: [
      {
        day: 1,
        title: "DAY one",
        activities: [
          { time: "MORNING", description: "Transfer to Machame Gate (1,800m). Begin trek through rainforest." },
          { time: "DAY", description: "Climb to Machame Camp (2,835m). 11km, 5-6 hours." },
          { time: "EVENING", description: "Camp setup. Dinner and overnight in tents." }
        ]
      },
      {
        day: 2,
        title: "DAY two",
        activities: [
          { time: "MORNING", description: "Breakfast and pack up camp." },
          { time: "DAY", description: "Trek through heath and moorland to Shira Camp (3,750m). 5km, 4-5 hours." },
          { time: "EVENING", description: "Acclimatization walk. Dinner and overnight." }
        ]
      },
      {
        day: 3,
        title: "DAY three",
        activities: [
          { time: "MORNING", description: "Continue ascending toward Lava Tower (4,630m)." },
          { time: "DAY", description: "Descend to Barranco Camp (3,960m). 10km, 6-7 hours. Great for acclimatization." },
          { time: "EVENING", description: "Rest and prepare for the Barranco Wall." }
        ]
      },
      {
        day: 4,
        title: "DAY four",
        activities: [
          { time: "MORNING", description: "Climb the Barranco Wall - a thrilling scramble." },
          { time: "DAY", description: "Trek to Karanga Camp (4,034m). 5km, 4 hours." },
          { time: "EVENING", description: "Rest and hydrate. Dinner and overnight." }
        ]
      },
      {
        day: 5,
        title: "DAY five",
        activities: [
          { time: "MORNING", description: "Short trek to Barafu Base Camp (4,673m). 4km, 3-4 hours." },
          { time: "DAY", description: "Rest, eat, and prepare for summit night." },
          { time: "EVENING", description: "Early dinner. Sleep until midnight departure." }
        ]
      },
      {
        day: 6,
        title: "DAY six",
        activities: [
          { time: "MIDNIGHT", description: "Begin summit push at midnight." },
          { time: "MORNING", description: "Reach Stella Point, then Uhuru Peak (5,895m) at sunrise." },
          { time: "DAY", description: "Descend to Mweka Gate via Mweka Camp. 22km total. Transfer to hotel." }
        ]
      }
    ],
    included: ["Park fees", "Professional guides", "Porters and cook", "Quality tents and sleeping mats", "All meals on mountain", "Transfers", "Summit certificate", "Rescue fees"],
    excluded: ["Flights", "Pre/post accommodation", "Tips", "Personal gear", "Insurance", "Visa"],
    activities: ["Pre-climb training ($50)", "Materuni Waterfall visit ($40)", "Coffee plantation tour ($35)"]
  },
  "kilimanjaro-lemosho": {
    id: "kilimanjaro-lemosho",
    name: "MT. KILIMANJARO LEMOSHO ROUTE",
    location: "Kilimanjaro Trail Huts, Tanzania",
    duration: "8 Days",
    price: "From $4,000 per person",
    groupSize: "2+",
    overview: "The Lemosho Route is considered the most scenic and successful route up Kilimanjaro. Starting from the western side, this 8-day expedition provides excellent acclimatization and stunning panoramic views. The longer duration significantly increases summit success rates while allowing you to fully appreciate Kilimanjaro's beauty.",
    accommodations: {
      luxury: "N/A - Tent camping",
      midrange: "Premium camping equipment provided",
      budget: "Same camping for all"
    },
    itinerary: [
      {
        day: 1,
        title: "DAY one",
        activities: [
          { time: "MORNING", description: "Drive from Moshi to Londorossi Gate. Complete registration." },
          { time: "DAY", description: "Trek through rainforest to Mti Mkubwa Camp (2,750m). 6km, 3-4 hours." },
          { time: "EVENING", description: "Camp in the forest. Dinner and overnight." }
        ]
      },
      {
        day: 2,
        title: "DAY two",
        activities: [
          { time: "MORNING", description: "Continue through the forest." },
          { time: "DAY", description: "Cross the Shira Ridge to Shira 1 Camp (3,500m). 8km, 5-6 hours." },
          { time: "EVENING", description: "Enjoy views of Kibo Peak. Overnight." }
        ]
      },
      {
        day: 3,
        title: "DAY three",
        activities: [
          { time: "MORNING", description: "Trek across the Shira Plateau." },
          { time: "DAY", description: "Arrive at Shira 2 Camp (3,850m). 8km, 4-5 hours." },
          { time: "EVENING", description: "Acclimatization walk. Dinner." }
        ]
      },
      {
        day: 4,
        title: "DAY four",
        activities: [
          { time: "MORNING", description: "Climb toward Lava Tower (4,630m) for acclimatization." },
          { time: "DAY", description: "Descend to Barranco Camp (3,960m). 9km, 6-7 hours." },
          { time: "EVENING", description: "Rest and prepare for tomorrow's wall." }
        ]
      },
      {
        day: 5,
        title: "DAY five",
        activities: [
          { time: "MORNING", description: "Climb the famous Barranco Wall." },
          { time: "DAY", description: "Trek to Karanga Camp (4,034m). 5km, 4-5 hours." },
          { time: "EVENING", description: "Overnight at Karanga." }
        ]
      },
      {
        day: 6,
        title: "DAY six",
        activities: [
          { time: "MORNING", description: "Continue to Barafu Base Camp (4,673m)." },
          { time: "DAY", description: "4km, 3-4 hours. Rest and prepare." },
          { time: "EVENING", description: "Early dinner. Rest before summit attempt." }
        ]
      },
      {
        day: 7,
        title: "DAY seven",
        activities: [
          { time: "MIDNIGHT", description: "Summit night begins." },
          { time: "MORNING", description: "Reach Uhuru Peak (5,895m) at sunrise." },
          { time: "DAY", description: "Descend to Millennium Camp (3,820m). Long day." }
        ]
      },
      {
        day: 8,
        title: "DAY eight",
        activities: [
          { time: "MORNING", description: "Final descent to Mweka Gate." },
          { time: "DAY", description: "10km, 3-4 hours through rainforest." },
          { time: "EVENING", description: "Certificate presentation. Transfer to Moshi." }
        ]
      }
    ],
    included: ["All park fees", "Professional guides", "Porters and cook", "Quality camping gear", "All meals", "Transfers", "Certificate", "Emergency oxygen"],
    excluded: ["International flights", "Hotel stays", "Tips for crew", "Personal equipment", "Insurance", "Visa fees"],
    activities: ["Pre-climb training hike ($50)", "Hot springs visit ($30)", "Marangu waterfall ($35)"]
  },
  "explore-zanzibar": {
    id: "explore-zanzibar",
    name: "EXPLORE ZANZIBAR",
    location: "Mnarani Seafront Hotel, Stone Town",
    duration: "5 Days, 4 Nights",
    price: "From $3,000 per person",
    groupSize: "2+",
    overview: "Discover the magic of Zanzibar on this 5-day island escape. Explore the UNESCO World Heritage Site of Stone Town, relax on pristine beaches, and immerse yourself in the rich Swahili culture. From spice plantations to dhow cruises, experience the best of the Spice Island.",
    accommodations: {
      luxury: "Park Hyatt Zanzibar / Baraza Resort & Spa",
      midrange: "Mnarani Seafront Hotel / DoubleTree by Hilton",
      budget: "Zanzibar Palace Hotel / Tembo House Hotel"
    },
    itinerary: [
      {
        day: 1,
        title: "DAY one",
        activities: [
          { time: "MORNING", description: "Arrive at Zanzibar Airport. Transfer to Stone Town." },
          { time: "AFTERNOON", description: "Check into your hotel and settle in." },
          { time: "EVENING", description: "Walking tour of Stone Town's historic streets. Dinner at a rooftop restaurant." }
        ]
      },
      {
        day: 2,
        title: "DAY two",
        activities: [
          { time: "MORNING", description: "Spice tour - visit plantations and learn about Zanzibar's aromatic heritage." },
          { time: "AFTERNOON", description: "Traditional lunch with local spices. Return to Stone Town." },
          { time: "EVENING", description: "Free time to explore the markets. Dinner at Forodhani Night Market." }
        ]
      },
      {
        day: 3,
        title: "DAY three",
        activities: [
          { time: "MORNING", description: "Transfer to the north coast beaches." },
          { time: "DAY", description: "Relax on white sand beaches. Optional water sports available." },
          { time: "EVENING", description: "Sunset dhow cruise with appetizers and drinks." }
        ]
      },
      {
        day: 4,
        title: "DAY four",
        activities: [
          { time: "MORNING", description: "Visit Prison Island (Changuu) to see giant tortoises." },
          { time: "AFTERNOON", description: "Snorkeling in crystal-clear waters." },
          { time: "EVENING", description: "Return to hotel for dinner and relaxation." }
        ]
      },
      {
        day: 5,
        title: "DAY five",
        activities: [
          { time: "MORNING", description: "Free time for shopping or beach." },
          { time: "AFTERNOON", description: "Transfer to Zanzibar Airport for departure." },
          { time: "EVENING", description: "End of tour." }
        ]
      }
    ],
    included: ["All transfers", "Accommodation", "Breakfast daily", "Stone Town tour", "Spice tour", "Prison Island trip", "Dhow cruise"],
    excluded: ["Flights", "Visa", "Lunch and dinner (except specified)", "Tips", "Personal expenses", "Optional activities"],
    activities: ["Dolphin tour ($45)", "Jozani Forest visit ($35)", "Cooking class ($60)", "Kite surfing lesson ($80)"]
  },
  "zanzibar-experience": {
    id: "zanzibar-experience",
    name: "THE ZANZIBAR EXPERIENCE",
    location: "Mnarani Seafront Hotel, Stone Town",
    duration: "3 Days, 2 Nights",
    price: "From $4,000 per person",
    groupSize: "2+",
    overview: "A perfect introduction to Zanzibar for those with limited time. This 3-day experience covers the essential highlights - Stone Town's historic charm, the famous spice plantations, and relaxing beach time. Ideal as a post-safari extension.",
    accommodations: {
      luxury: "Emerson Spice / Zanzibar Serena Hotel",
      midrange: "Mnarani Seafront Hotel / Dhow Palace Hotel",
      budget: "Zanzibar Coffee House / Chavda Hotel"
    },
    itinerary: [
      {
        day: 1,
        title: "DAY one",
        activities: [
          { time: "MORNING", description: "Arrive in Zanzibar. Transfer to Stone Town hotel." },
          { time: "AFTERNOON", description: "Guided walking tour of Stone Town - visit the Old Fort, House of Wonders, and slave market memorial." },
          { time: "EVENING", description: "Dinner at a traditional Swahili restaurant." }
        ]
      },
      {
        day: 2,
        title: "DAY two",
        activities: [
          { time: "MORNING", description: "Half-day spice tour including lunch." },
          { time: "AFTERNOON", description: "Transfer to a beach resort on the north coast." },
          { time: "EVENING", description: "Relax on the beach. Dinner at the resort." }
        ]
      },
      {
        day: 3,
        title: "DAY three",
        activities: [
          { time: "MORNING", description: "Beach time and optional water activities." },
          { time: "AFTERNOON", description: "Transfer to airport for departure." },
          { time: "EVENING", description: "End of experience." }
        ]
      }
    ],
    included: ["All transfers", "Accommodation", "Breakfast", "Stone Town tour", "Spice tour with lunch", "Beach resort access"],
    excluded: ["Flights", "Visa", "Dinners", "Tips", "Water sports", "Personal expenses"],
    activities: ["Sunset dhow cruise ($50)", "Snorkeling trip ($40)", "Prison Island visit ($35)"]
  },
  "zanzibar-immersive": {
    id: "zanzibar-immersive",
    name: "ZANZIBAR IMMERSIVE",
    location: "Mnarani Seafront Hotel, Stone Town",
    duration: "4 Days, 3 Nights",
    price: "From $5,000 per person",
    groupSize: "2+",
    overview: "An immersive Zanzibar experience that goes beyond the typical tourist trail. This 4-day journey includes cultural encounters, culinary experiences, pristine beaches, and marine adventures. Perfect for those wanting to truly understand the Spice Island.",
    accommodations: {
      luxury: "The Residence Zanzibar / Kilindi Zanzibar",
      midrange: "Mnarani Seafront Hotel / Zanzibar White Sand",
      budget: "Anna of Zanzibar / Tanzanite Beach Resort"
    },
    itinerary: [
      {
        day: 1,
        title: "DAY one",
        activities: [
          { time: "MORNING", description: "Arrive Zanzibar. VIP transfer to Stone Town." },
          { time: "AFTERNOON", description: "In-depth Stone Town tour with local historian guide." },
          { time: "EVENING", description: "Swahili cooking class and dinner with a local family." }
        ]
      },
      {
        day: 2,
        title: "DAY two",
        activities: [
          { time: "MORNING", description: "Comprehensive spice plantation tour with traditional medicine demonstration." },
          { time: "AFTERNOON", description: "Visit Jozani Forest to see red colobus monkeys." },
          { time: "EVENING", description: "Transfer to beach resort. Sunset cocktails." }
        ]
      },
      {
        day: 3,
        title: "DAY three",
        activities: [
          { time: "MORNING", description: "Early morning dolphin watching tour (seasonal)." },
          { time: "AFTERNOON", description: "Snorkeling at Mnemba Atoll - pristine coral reefs." },
          { time: "EVENING", description: "Beach barbecue dinner." }
        ]
      },
      {
        day: 4,
        title: "DAY four",
        activities: [
          { time: "MORNING", description: "Relaxation and optional spa treatments." },
          { time: "AFTERNOON", description: "Prison Island visit. Transfer to airport." },
          { time: "EVENING", description: "Departure. End of experience." }
        ]
      }
    ],
    included: ["Luxury transfers", "All accommodation", "All meals", "All tours and activities listed", "Cooking class", "Snorkeling equipment", "English guide"],
    excluded: ["International flights", "Visa", "Tips", "Spa treatments", "Personal shopping"],
    activities: ["Spa package ($150)", "Private yacht charter ($400)", "Kitesurfing lesson ($100)"]
  }
};

const TripDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const trip = slug ? tripData[slug] : null;

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Trip Not Found</h1>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    navigate(`/book?trip=${encodeURIComponent(trip.name)}&content_type=trip&content_id=${trip.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-4 text-sm text-muted-foreground">
            Home / Trips / {trip.name}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif uppercase text-secondary mb-4 pt-[50px] font-semibold">
                {trip.name}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{trip.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{trip.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span>{trip.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Group Size: {trip.groupSize}</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleBooking} 
              className="bg-accent hover:bg-accent/90 text-white uppercase tracking-wider px-8 py-6 text-base whitespace-nowrap"
            >
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
            <h2 className="text-3xl font-serif uppercase text-secondary mb-6 tracking-wide font-semibold">
              OVERVIEW
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {trip.overview}
            </p>
          </div>

          {/* Accommodation Options */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif uppercase text-secondary mb-6 tracking-wide font-semibold">
              ACCOMMODATION <span className="italic lowercase text-2xl">options</span>
            </h2>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Luxury:</span> {trip.accommodations.luxury}
              </div>
              <div>
                <span className="font-semibold">Mid-range:</span> {trip.accommodations.midrange}
              </div>
              <div>
                <span className="font-semibold">Budget:</span> {trip.accommodations.budget}
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif uppercase text-secondary mb-8 tracking-wide font-semibold">
              ITINERARY <span className="italic lowercase text-2xl">walk-through</span>
            </h2>
            
            <div className="space-y-12">
              {trip.itinerary.map((day: any) => (
                <div key={day.day}>
                  <h3 className="font-serif text-primary mb-6 font-semibold text-4xl">
                    {day.title.split(' ')[0]} <span className="italic">{day.title.split(' ')[1]}</span>
                  </h3>
                  <div className="relative pl-12 space-y-8">
                    {day.activities.map((activity: any, idx: number) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-12 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground mb-2">{activity.time}</div>
                          <p className="text-foreground/70">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Included/Excluded */}
          <div className="mb-16 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-serif uppercase text-secondary mb-6 tracking-wide font-semibold">
                INCLUDED
              </h2>
              <ul className="space-y-2">
                {trip.included.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-3xl font-serif uppercase text-secondary mb-6 tracking-wide font-semibold">
                EXCLUDED
              </h2>
              <ul className="space-y-2">
                {trip.excluded.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optional Activities */}
          {trip.activities && trip.activities.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-serif uppercase text-secondary mb-6 tracking-wide font-semibold">
                OPTIONAL ACTIVITIES
              </h2>
              <ul className="space-y-2">
                {trip.activities.map((activity: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Book Button */}
          <div className="flex justify-center pt-8">
            <Button 
              onClick={handleBooking} 
              className="bg-accent hover:bg-accent/90 text-white uppercase tracking-wider px-12 py-6 text-lg"
            >
              Book your trip
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            Questions? <button onClick={() => navigate("/#contact")} className="text-primary hover:underline">Contact Us</button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default TripDetail;
