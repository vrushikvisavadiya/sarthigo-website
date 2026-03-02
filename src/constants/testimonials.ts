export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  trip: string;
  avatar: string; // initials fallback
  date: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Ramesh Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    review:
      "Excellent service! Our driver Mahesh bhai was very punctual and knowledgeable about all the temple timings. He even helped us get early darshan at Somnath. Highly recommended for families.",
    trip: "Somnath Darshan Day Trip",
    avatar: "RP",
    date: "Jan 2026",
  },
  {
    id: "t2",
    name: "Sunita Sharma",
    location: "Jaipur, Rajasthan",
    rating: 5,
    review:
      "We booked the Somnath + Gir safari package. The driver was very professional and the car was clean AC. Gir safari was amazing. Booking through WhatsApp was super easy — no hassle at all.",
    trip: "Somnath + Gir Safari Package",
    avatar: "SS",
    date: "Feb 2026",
  },
  {
    id: "t3",
    name: "Vikram Mehta",
    location: "Surat, Gujarat",
    rating: 5,
    review:
      "Did the Saurashtra circuit with my parents. 3 days, covered Somnath, Gir, Junagadh and Dwarka. Driver was like a local guide — knew every shortcut and good dhaba. Worth every rupee.",
    trip: "Saurashtra Pilgrimage Circuit",
    avatar: "VM",
    date: "Dec 2025",
  },
  {
    id: "t4",
    name: "Priya & Ankit Joshi",
    location: "Mumbai, Maharashtra",
    rating: 4,
    review:
      "Great experience for our first pilgrimage trip to Somnath. The Diu day trip was a bonus. Driver was friendly and patient with our kids. Will definitely book again for Dwarka next time.",
    trip: "Somnath to Diu Day Trip",
    avatar: "PJ",
    date: "Jan 2026",
  },
  {
    id: "t5",
    name: "Haresh Desai",
    location: "Vadodara, Gujarat",
    rating: 5,
    review:
      "Very affordable and transparent pricing. No hidden charges at all — paid exactly what was quoted on WhatsApp. The driver waited patiently during our temple visits. 10/10 service.",
    trip: "Somnath Darshan Day Trip",
    avatar: "HD",
    date: "Feb 2026",
  },
  {
    id: "t6",
    name: "Kavita Nair",
    location: "Pune, Maharashtra",
    rating: 5,
    review:
      "I was nervous booking a local taxi but Sarthigo gave verified driver details beforehand. The driver called the evening before to confirm. Felt very safe as a solo woman traveller.",
    trip: "Somnath + Gir Safari Package",
    avatar: "KN",
    date: "Jan 2026",
  },
];
