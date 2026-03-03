export type FaqCategory = {
  id: string;
  label: string;
  icon: string;
  questions: {
    question: string;
    answer: string;
  }[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "booking",
    label: "Booking",
    icon: "📅",
    questions: [
      {
        question: "How do I book a taxi through Sarthigo?",
        answer:
          "Simply click the 'Book on WhatsApp' button, send us your destination, travel date and number of passengers. We'll connect you with a verified local driver within minutes. No app download or account needed.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "We recommend booking at least 24 hours in advance to ensure driver availability, especially during peak pilgrimage seasons (Shravan, Navratri, Diwali). However, we do accept same-day bookings subject to availability.",
      },
      {
        question: "Can I book for the same day?",
        answer:
          "Yes, same-day bookings are accepted subject to driver availability. WhatsApp us directly for the fastest response — we typically reply within 5 minutes.",
      },
      {
        question: "Is there any booking fee or platform charge?",
        answer:
          "No. Sarthigo charges zero booking fee to travellers. You only pay the driver directly after your trip — no hidden charges, no platform fee.",
      },
      {
        question: "Can I book for a group?",
        answer:
          "Absolutely. We have Innova Crysta and Tempo Traveller options for groups of up to 12 people. Mention your group size when booking and we'll arrange the right vehicle.",
      },
    ],
  },
  {
    id: "payment",
    label: "Payment",
    icon: "💵",
    questions: [
      {
        question: "Do I need to pay anything in advance?",
        answer:
          "No advance payment required. You pay the full amount directly to your driver in cash after the trip ends. Sarthigo does not collect any payment online.",
      },
      {
        question: "What payment methods does the driver accept?",
        answer:
          "Most drivers accept cash and UPI (Google Pay, PhonePe, Paytm). Confirm with your driver at the time of booking if you prefer a specific payment method.",
      },
      {
        question: "Is the quoted fare final?",
        answer:
          "Yes — the fare quoted at the time of booking is final for the agreed itinerary. Additional charges only apply if you add extra stops, extend the trip or incur toll/parking fees not included in the original package.",
      },
      {
        question: "Are there any hidden charges?",
        answer:
          "No hidden charges. Your quote includes driver charges and fuel for the agreed route. Tolls, state permits and parking are usually included in packages — confirm this at booking.",
      },
    ],
  },
  {
    id: "drivers",
    label: "Drivers",
    icon: "🚗",
    questions: [
      {
        question: "How are drivers verified on Sarthigo?",
        answer:
          "Every driver goes through manual verification before being listed. We check their driving license, vehicle RC book, insurance papers and conduct a background reference check. Only verified drivers are shown to customers.",
      },
      {
        question: "Can I request a specific driver?",
        answer:
          "Yes. If you've travelled with a Sarthigo driver before and had a great experience, just mention their name when booking and we'll try to assign the same driver.",
      },
      {
        question: "What vehicles are available?",
        answer:
          "We have Sedan (Swift Dzire, Etios), SUV (Ertiga, XL6), Innova Crysta and Tempo Traveller options. Vehicle availability depends on your city and dates.",
      },
      {
        question: "What if the driver doesn't show up?",
        answer:
          "In the rare event of a no-show, contact us immediately on WhatsApp. We will arrange an alternative driver as quickly as possible or provide a full refund if we cannot fulfil the booking.",
      },
    ],
  },
  {
    id: "trips",
    label: "Trips & Tours",
    icon: "🗺️",
    questions: [
      {
        question: "What destinations do you cover?",
        answer:
          "We currently cover Somnath, Dwarka, Gir National Park, Junagadh, Diu, Ambaji and Kutch. We are expanding to more Gujarat pilgrimage cities every month.",
      },
      {
        question: "Can I customise my tour package?",
        answer:
          "Yes. All our packages are customisable. Tell us your destinations, number of days and group size — we'll create a personalised itinerary and quote for you.",
      },
      {
        question: "Do drivers also act as guides?",
        answer:
          "Our drivers are local experts who know every temple, route and attraction in their city. While they are not certified tour guides, they are happy to share local knowledge, suggest good dhabas and help with darshan timing.",
      },
      {
        question: "Can I book an outstation trip from Somnath?",
        answer:
          "Yes. Popular outstation routes include Somnath to Dwarka, Somnath to Gir, Somnath to Diu and Somnath to Ahmedabad. Multi-day packages with night halt arrangements are also available.",
      },
      {
        question: "Is Gir Safari entry included in packages?",
        answer:
          "Gir Safari permits need to be booked separately through the official Gujarat Forest Department portal. However, our drivers are familiar with the safari process and can guide you through it.",
      },
    ],
  },
  {
    id: "cancellation",
    label: "Cancellation",
    icon: "❌",
    questions: [
      {
        question: "What is the cancellation policy?",
        answer:
          "Cancellations 24+ hours before the trip are completely free. Cancellations between 6–24 hours may incur a 25% charge. Cancellations less than 6 hours before or no-shows may incur a 50% charge as compensation to the driver.",
      },
      {
        question: "How do I cancel a booking?",
        answer:
          "Contact us via WhatsApp or call us at our support number as soon as possible. Please have your booking details ready — destination, date and driver name.",
      },
      {
        question: "What if I need to reschedule?",
        answer:
          "Rescheduling is free if done 24+ hours before the trip and subject to driver availability. Contact us on WhatsApp and we'll do our best to accommodate your new dates.",
      },
    ],
  },
  {
    id: "drivers-join",
    label: "Join as Driver",
    icon: "🚖",
    questions: [
      {
        question: "How do I register as a driver on Sarthigo?",
        answer:
          "Visit our 'Register as Driver' page, fill in your details and upload your documents. Our team will verify your documents and activate your profile within 24 hours.",
      },
      {
        question: "What documents do I need to register?",
        answer:
          "You need a valid driving license, vehicle RC book and vehicle insurance. All documents must be current and not expired.",
      },
      {
        question: "How much does it cost to join Sarthigo?",
        answer:
          "We offer a free 30-day trial. After that, plans start at ₹999/month with zero commission on bookings. You keep 100% of what your customers pay you.",
      },
      {
        question: "How do I receive bookings?",
        answer:
          "Bookings are sent directly to your WhatsApp number. No app needed. Customer sends inquiry → we notify you → you confirm directly with the customer.",
      },
      {
        question: "Can I list in multiple cities?",
        answer:
          "Yes. The Pro plan (₹1,999/month) allows listing in up to 3 cities. This is ideal for drivers who operate across Somnath, Dwarka and Gir regularly.",
      },
    ],
  },
];
