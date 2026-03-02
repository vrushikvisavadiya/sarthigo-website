import { SOMNATH_PACKAGES } from "@/constants/packages";

export const SOMNATH_CITY = {
  name: "Somnath",
  slug: "somnath",
  state: "Gujarat",
  tagline: "First Jyotirlinga of India",
  description:
    "Somnath is one of the holiest pilgrimage sites in India — home to the first of 12 Jyotirlingas. Located on the Arabian Sea coast in Saurashtra, Gujarat, it attracts millions of devotees every year.",
  icon: "🛕",
  heroGradient: "from-orange-950 via-primary to-primary",
  bestTimeToVisit: "October to March",
  nearestRailway: "Veraval Railway Station (6 km)",
  nearestAirport: "Diu Airport (90 km)",
  templeTimings: {
    morning: "6:00 AM – 12:00 PM",
    afternoon: "12:00 PM – 6:00 PM",
    evening: "6:00 PM – 10:00 PM",
    aarti: ["7:00 AM", "12:00 PM", "7:00 PM"],
  },
  stats: [
    { value: "20+", label: "Verified Drivers" },
    { value: "15+", label: "Routes Covered" },
    { value: "4.9★", label: "Average Rating" },
    { value: "₹999", label: "Starting Price" },
  ],
  attractions: [
    {
      id: "somnath-temple",
      name: "Somnath Jyotirlinga Temple",
      type: "Temple",
      description:
        "The sacred Jyotirlinga temple rebuilt 7 times. The evening aarti at 7 PM on the seafront is unmissable.",
      timings: "6:00 AM – 10:00 PM",
      entryFee: "Free",
      duration: "1–2 hrs",
      icon: "🛕",
      mustVisit: true,
    },
    {
      id: "bhalka-tirth",
      name: "Bhalka Tirth",
      type: "Temple",
      description:
        "The sacred spot where Lord Krishna was accidentally struck by a hunter's arrow before departing from earth.",
      timings: "6:00 AM – 8:00 PM",
      entryFee: "Free",
      duration: "30–45 min",
      icon: "🪶",
      mustVisit: true,
    },
    {
      id: "triveni-sangam",
      name: "Triveni Sangam",
      type: "Sacred Site",
      description:
        "Confluence of Hiran, Kapila and Saraswati rivers meeting the Arabian Sea. Holy bathing ghat for pilgrims.",
      timings: "Open 24hrs",
      entryFee: "Free",
      duration: "30 min",
      icon: "🌊",
      mustVisit: true,
    },
    {
      id: "somnath-beach",
      name: "Somnath Beach",
      type: "Beach",
      description:
        "Clean beach next to the temple. Stunning sunsets and the famous Baan Stambh (Arrow Pillar) pointing to Antarctica.",
      timings: "Open 24hrs",
      entryFee: "Free",
      duration: "1 hr",
      icon: "🏖️",
      mustVisit: false,
    },
    {
      id: "prabhas-patan-museum",
      name: "Prabhas Patan Museum",
      type: "Museum",
      description:
        "Archaeological museum with artifacts and sculptures from ancient Somnath spanning 2000+ years of history.",
      timings: "10:00 AM – 5:30 PM (Closed Fri)",
      entryFee: "₹10",
      duration: "45 min",
      icon: "🏛️",
      mustVisit: false,
    },
    {
      id: "veraval-harbour",
      name: "Veraval Fishing Harbour",
      type: "Landmark",
      description:
        "One of India's largest fishing harbours, 6 km from Somnath. Early morning fish market is a unique experience.",
      timings: "Best before 8:00 AM",
      entryFee: "Free",
      duration: "1 hr",
      icon: "⚓",
      mustVisit: false,
    },
  ],
  routes: [
    {
      to: "Diu",
      duration: "1.5 hrs",
      distance: "90 km",
      price: "₹1,200",
      popular: true,
      description: "Beach town + Portuguese fort — perfect day trip",
      icon: "🏖️",
    },
    {
      to: "Gir Forest",
      duration: "1 hr",
      distance: "65 km",
      price: "₹1,000",
      popular: true,
      description: "Asiatic lion safari — book 2–3 day package",
      icon: "🦁",
    },
    {
      to: "Junagadh",
      duration: "1.5 hrs",
      distance: "85 km",
      price: "₹1,100",
      popular: false,
      description: "Uparkot fort, Girnar hill & Mahabat Maqbara",
      icon: "🏰",
    },
    {
      to: "Dwarka",
      duration: "4 hrs",
      distance: "230 km",
      price: "₹3,200",
      popular: true,
      description: "Complete Saurashtra pilgrimage circuit",
      icon: "🐚",
    },
    {
      to: "Porbandar",
      duration: "2 hrs",
      distance: "120 km",
      price: "₹1,600",
      popular: false,
      description: "Birthplace of Mahatma Gandhi + Sudama Mandir",
      icon: "🕊️",
    },
    {
      to: "Veraval",
      duration: "15 min",
      distance: "6 km",
      price: "₹200",
      popular: false,
      description: "Fishing harbour & Bhalka Tirth temple",
      icon: "⚓",
    },
  ],
  faqs: [
    {
      question: "What is the best time to visit Somnath temple?",
      answer:
        "October to March is ideal. Avoid May–June (extreme heat). The evening aarti at 7 PM is the most sought-after experience — arrive by 6:30 PM for a good spot.",
    },
    {
      question: "How far is Somnath from Ahmedabad?",
      answer:
        "Somnath is approximately 400 km from Ahmedabad — around 6 hrs by road or 7–8 hrs by train via Veraval. Our drivers can arrange pickup from Ahmedabad too.",
    },
    {
      question: "Which railway station is nearest to Somnath temple?",
      answer:
        "Veraval Railway Station is the nearest, just 6 km away. Our drivers offer station pickup at all hours — just WhatsApp us your train details.",
    },
    {
      question: "Can I combine Somnath with Gir safari in one trip?",
      answer:
        "Absolutely — this is our most popular 2-day package. Day 1: Somnath darshan + beach. Day 2: Gir safari + Devaliya Park. Book the Somnath + Gir Package for the best price.",
    },
    {
      question: "Is Diu worth visiting from Somnath?",
      answer:
        "Yes! Diu is just 90 km (1.5 hrs) from Somnath. The Portuguese fort, Naida Caves and Gangeshwar Temple make it a perfect day trip. Best combined with your Somnath trip.",
    },
    {
      question: "How do I book a taxi from Somnath with Sarthigo?",
      answer:
        "Simply click 'Book via WhatsApp', send your travel dates and group size — our team connects you with a verified local driver within minutes. No app, no registration, no prepayment needed.",
    },
  ],
  packages: SOMNATH_PACKAGES,
} as const;

export type CityData = typeof SOMNATH_CITY;
