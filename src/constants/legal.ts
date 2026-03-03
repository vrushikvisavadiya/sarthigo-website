export type LegalSection = {
  title: string;
  content: (string | { type: "list"; items: string[] })[];
};

export const PRIVACY_POLICY: {
  lastUpdated: string;
  sections: LegalSection[];
} = {
  lastUpdated: "March 2026",
  sections: [
    {
      title: "1. Information We Collect",
      content: [
        "When you use Sarthigo, we may collect the following information:",
        {
          type: "list",
          items: [
            "Contact details — name, mobile number and email address when you submit a booking or inquiry form.",
            "Trip details — destination, travel dates, number of passengers and vehicle preferences.",
            "Device information — browser type, IP address and pages visited via standard server logs.",
            "WhatsApp conversations — booking messages sent via WhatsApp are subject to WhatsApp's own privacy policy.",
          ],
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "We use the information collected to:",
        {
          type: "list",
          items: [
            "Connect you with a verified local driver for your trip",
            "Confirm and manage your booking",
            "Respond to your queries and support requests",
            "Improve our website and services",
            "Send relevant updates about your booking via WhatsApp or SMS",
          ],
        },
        "We do not sell, rent or trade your personal information to any third party for marketing purposes.",
      ],
    },
    {
      title: "3. Driver Data",
      content: [
        "Drivers who register on Sarthigo provide additional information including vehicle details, license number, RC book and insurance documents. This information is used solely for verification and to display your profile to potential customers.",
      ],
    },
    {
      title: "4. Payments",
      content: [
        "Sarthigo does not process any online payments. All payments are made directly in cash to the driver after the trip. We do not collect or store any payment card information.",
      ],
    },
    {
      title: "5. Cookies",
      content: [
        "Our website uses minimal cookies to improve your browsing experience. These include session cookies deleted when you close your browser and analytics cookies to understand how visitors use the site. You can disable cookies in your browser settings.",
      ],
    },
    {
      title: "6. Third-Party Services",
      content: [
        "We use the following third-party services:",
        {
          type: "list",
          items: [
            "WhatsApp — for booking communication (Meta Platforms, Inc.)",
            "Vercel — for website hosting and analytics",
            "Google Analytics — to understand website traffic (optional, can be disabled)",
          ],
        },
      ],
    },
    {
      title: "7. Data Retention",
      content: [
        "We retain your booking and contact information for up to 12 months after your last interaction with us. You may request deletion of your data at any time by contacting us.",
      ],
    },
    {
      title: "8. Your Rights",
      content: [
        "You have the right to:",
        {
          type: "list",
          items: [
            "Access the personal data we hold about you",
            "Request correction of inaccurate data",
            "Request deletion of your data",
            "Withdraw consent at any time",
          ],
        },
      ],
    },
    {
      title: "9. Children's Privacy",
      content: [
        "Our services are not directed at children under 13 years of age. We do not knowingly collect personal information from children.",
      ],
    },
    {
      title: "10. Changes to This Policy",
      content: [
        "We may update this privacy policy from time to time. We will notify users of significant changes by posting a notice on our website. Continued use of our services after changes constitutes acceptance of the updated policy.",
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: {
  lastUpdated: string;
  sections: LegalSection[];
} = {
  lastUpdated: "March 2026",
  sections: [
    {
      title: "1. About Sarthigo",
      content: [
        "Sarthigo is a local taxi and tour booking platform connecting travellers with verified local drivers in Somnath, Dwarka, Gir, Junagadh and surrounding pilgrimage cities in Gujarat, India. We are a lead generation and booking facilitation platform — not a transportation company.",
      ],
    },
    {
      title: "2. Booking Process",
      content: [
        "All bookings are made via WhatsApp or our website contact form. A booking is confirmed only when:",
        {
          type: "list",
          items: [
            "You have received a confirmation message from us or your driver",
            "The driver details — name, vehicle, number — have been shared with you",
          ],
        },
        "Sarthigo reserves the right to cancel or reschedule a booking in case of driver unavailability, force majeure or circumstances beyond our control.",
      ],
    },
    {
      title: "3. Payments",
      content: [
        "Sarthigo does not collect any payment from travellers. All payments are made directly in cash to the driver after completion of the trip. The fare quoted at the time of booking is final unless the itinerary is changed by the traveller. Additional charges may apply for extra stops, waiting time beyond 30 minutes, or toll and parking fees not included in the package.",
      ],
    },
    {
      title: "4. Cancellation Policy",
      content: [
        {
          type: "list",
          items: [
            "Cancellations 24+ hours before trip — Free, no charges apply.",
            "Cancellations 6–24 hours before trip — 25% of quoted fare may be charged as compensation to the driver.",
            "Cancellations less than 6 hours before trip or no-show — 50% of quoted fare may be charged.",
          ],
        },
      ],
    },
    {
      title: "5. Driver Conduct",
      content: [
        "All drivers on Sarthigo are expected to:",
        {
          type: "list",
          items: [
            "Maintain a clean, well-serviced vehicle",
            "Arrive on time at the agreed pickup location",
            "Behave professionally and respectfully at all times",
            "Not charge fares higher than the quoted amount",
            "Not deviate from the agreed itinerary without passenger consent",
          ],
        },
      ],
    },
    {
      title: "6. Traveller Responsibilities",
      content: [
        "As a traveller, you agree to:",
        {
          type: "list",
          items: [
            "Provide accurate pickup location, date and time",
            "Be available at the pickup point at the confirmed time",
            "Treat the driver and vehicle with respect",
            "Not engage in any illegal activity during the trip",
            "Pay the agreed fare in full at the end of the trip",
          ],
        },
      ],
    },
    {
      title: "7. Limitation of Liability",
      content: [
        "Sarthigo acts solely as a platform connecting travellers and drivers. We are not liable for:",
        {
          type: "list",
          items: [
            "Accidents, injuries or damages during the trip",
            "Loss or theft of personal belongings",
            "Delays caused by traffic, weather or road conditions",
            "Disputes between travellers and drivers regarding fare or conduct",
          ],
        },
        "Our maximum liability in any case shall not exceed the total booking value of the disputed trip.",
      ],
    },
    {
      title: "8. Driver Subscription Terms",
      content: [
        "Drivers who subscribe to Sarthigo paid plans agree to:",
        {
          type: "list",
          items: [
            "Pay the monthly subscription fee on time",
            "Maintain valid license, RC and insurance at all times",
            "Respond to booking inquiries within 30 minutes",
            "Not misrepresent their vehicle type, capacity or availability",
          ],
        },
        "Sarthigo reserves the right to suspend or remove a driver's listing if complaints are received or verification documents expire.",
      ],
    },
    {
      title: "9. Intellectual Property",
      content: [
        "All content on this website — including text, images, logos and design — is the property of Sarthigo and may not be copied, reproduced or distributed without written permission.",
      ],
    },
    {
      title: "10. Governing Law",
      content: [
        "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Gujarat, India.",
      ],
    },
  ],
};
