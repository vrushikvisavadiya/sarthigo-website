export type Testimonial = {
  id: string;
  name: string;
  location: string;
  avatar: string; // initials
  rating: number;
  trip: string;
  review: string;
  verified: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Ramesh Patel",
    location: "Ahmedabad, Gujarat",
    avatar: "RP",
    rating: 5,
    trip: "Somnath → Dwarka → Diu (3 Days)",
    review:
      "Driver Mukeshbhai was punctual, polite and knew every temple route perfectly. He waited patiently during darshan without any extra charge. Best decision of our yatra.",
    verified: true,
  },
  {
    id: "t2",
    name: "Sunita Sharma",
    location: "Jaipur, Rajasthan",
    avatar: "SS",
    rating: 5,
    trip: "Somnath Darshan (1 Day)",
    review:
      "Booked via WhatsApp at 10 PM and got confirmation in 3 minutes. Driver arrived 10 minutes early. Vehicle was clean, AC was working. Will book again for Dwarka trip.",
    verified: true,
  },
  {
    id: "t3",
    name: "Vikram Mehta",
    location: "Surat, Gujarat",
    avatar: "VM",
    rating: 5,
    trip: "Gir Safari + Somnath (2 Days)",
    review:
      "Arranged a Gir safari entry + Somnath darshan package. Driver Hareshbhai handled everything smoothly. No haggling, no surprises — just a great trip.",
    verified: true,
  },
  {
    id: "t4",
    name: "Priya Joshi",
    location: "Pune, Maharashtra",
    avatar: "PJ",
    rating: 5,
    trip: "Somnath → Junagadh (2 Days)",
    review:
      "Travelled as a family of 6 — got a spacious Innova. Driver helped elderly parents at every step. The pay-after-trip policy gave us complete peace of mind.",
    verified: true,
  },
  {
    id: "t5",
    name: "Arvind Shah",
    location: "Mumbai, Maharashtra",
    avatar: "AS",
    rating: 5,
    trip: "Somnath Jyotirlinga Darshan",
    review:
      "I was worried about finding a trustworthy cab at Veraval station late at night. Sarthigo connected me to a verified driver who was already waiting. Exceptional service.",
    verified: true,
  },
  {
    id: "t6",
    name: "Kavita Nair",
    location: "Bangalore, Karnataka",
    avatar: "KN",
    rating: 5,
    trip: "5-Day Gujarat Pilgrimage Circuit",
    review:
      "Covered Somnath, Dwarka, Nageshwar, Beyt Dwarka and Gir in 5 days. Sarthigo arranged everything perfectly. Driver was like a local guide — knew history of every place.",
    verified: true,
  },
];
