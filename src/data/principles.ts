import { Principle } from "@/types";

export const principles: Principle[] = [
  {
    id: "P1",
    title: "Lead with Accessible Expertise",
    manifesto: "Complexity becomes confidence through clarity.",
    description:
      "Invite trust by showing up with deep medical expertise and craftsmanship, translating complexity into accessible guidance that enables confident decisions.",
    icon: "🧭",
    accentColor: "#1B61D1",
    accentColorLight: "rgba(27, 97, 209, 0.1)",
    dos: [
      {
        title: "Use analogies for clarity",
        detail:
          "Explain medical data through relatable daily concepts.",
      },
      {
        title: "Be modular to adapt",
        detail:
          "This principle should be relevant from simple refractive markets to markets that offer a complete medical suite of services.",
      },
      {
        title: "Offer space to course-correct",
        detail:
          "When offering AI-style advice, always offer space and options to course-correct when the suggestions aren't hitting.",
      },
    ],
    donts: [
      {
        title: "Don't force treatments on patients",
        detail:
          "Never force a specific treatment or product on a patient because 'I'm the expert'. Always make the customer feel they are in charge of their own choices.",
      },
      {
        title: "Don't leave decisions entirely to the customer",
        detail:
          "They need to be presented with options, expertise and reasoning, and feel the expertise that EssilorLuxottica brings.",
      },
      {
        title: "Don't overpromise",
        detail:
          "Don't pose ourselves as the only experts. Clarify we are part of a larger health ecosystem.",
      },
    ],
  },
  {
    id: "P2",
    title: "See the Person, Serve the Vision",
    manifesto: "Every product unlocks potential, not corrects a deficit.",
    description:
      "Observe the person's full life context and frame every product and service not as the correction for a deficit, but as a tool to unlock their unique potential.",
    icon: "👁️",
    accentColor: "#C792D8",
    accentColorLight: "rgba(199, 146, 216, 0.15)",
    dos: [
      {
        title: "Capture needs from full life context",
        detail:
          "Capture in a structured way the needs based on the full life context and automate this into generating solutions — through a human interface with human touch.",
      },
      {
        title: "Track evolving life context",
        detail:
          "Keep track of people's life context — be aware that it is in flux and always changing. Passions and preferences are evolving.",
      },
      {
        title: "Explain product relevance personally",
        detail:
          "In the conversational UI while browsing, each suggested product should have a tagline underneath it that explains why this is relevant for this specific customer.",
      },
    ],
    donts: [
      {
        title: "Don't improvise or guess",
        detail:
          "If you don't know the customer, do not try to guess. Don't impro.",
      },
      {
        title: "Don't overload with data",
        detail:
          "Share no more than 1–2 pieces of data on one topic. Manage someone's cognitive load.",
      },
      {
        title: "Don't over-explain the technology",
        detail:
          "Don't focus too much on explaining the technology and ingenuity behind a product.",
      },
    ],
  },
  {
    id: "P3",
    title: "Fold Care into Every Interaction",
    manifesto: "Routine becomes ritual when wrapped in warmth.",
    description:
      "Thread wellness through every moment, transforming routine into something generous with warmth and unexpected delight.",
    icon: "💝",
    accentColor: "#92D89C",
    accentColorLight: "rgba(146, 216, 156, 0.18)",
    dos: [
      {
        title: "Offer comfort during wait times",
        detail:
          "When someone has to wait, offer a drink or a short wellness treatment (if possible, free).",
      },
      {
        title: "Create a calm environment",
        detail:
          "Through light, scent and sound — even though the store or space might be busy, it should feel calm and not rushed.",
      },
      {
        title: "Allow opting in and out",
        detail:
          "Always allow for opting in and out of wellness experiences. A level of agency is required.",
      },
    ],
    donts: [
      {
        title: "Don't separate wellness and healthcare",
        detail:
          "They can be successfully woven together. Don't treat them as completely separate.",
      },
      {
        title: "Don't act on stereotypes",
        detail:
          "Act based on past input and understanding of the profile, not on stereotypes.",
      },
      {
        title: "Don't go overboard",
        detail:
          "Small gestures of wellness can go a long way. Don't overdo it.",
      },
    ],
  },
  {
    id: "P4",
    title: "Celebrate Momentum to Fuel Confidence",
    manifesto: "Progress revealed is confidence earned.",
    description:
      "Reveal progress as it happens, honouring steps both small and significant to build confidence through visible change, not distant goals.",
    icon: "🚀",
    accentColor: "#FFC943",
    accentColorLight: "rgba(255, 201, 67, 0.15)",
    dos: [
      {
        title: "Show the long view",
        detail:
          "Explain health and style over the long-term, show change over time during the visit through experiences and real-life use cases, and frame this into a 'time journey'.",
      },
      {
        title: "Offer small lifestyle tips",
        detail:
          "Don't just suggest big medical interventions — offer small lifestyle tips too.",
      },
      {
        title: "Track long-term progress",
        detail:
          "Keep track of long-term progress rather than emphasise temporary dips. Encourage and celebrate consistency whenever possible.",
      },
    ],
    donts: [
      {
        title: "Don't scare people about aging",
        detail:
          "Don't talk negatively about age-related health issues. Requires excellent training.",
      },
      {
        title: "Don't push for progress",
        detail:
          "Allow people to progress at their own pace. Don't try to force faster progress.",
      },
      {
        title: "Don't overwhelm with information",
        detail:
          "Don't overwhelm customers with too much input and information.",
      },
    ],
  },
  {
    id: "P5",
    title: "Invite Trust, Never Assume It",
    manifesto: "Consent is the foundation, not an afterthought.",
    description:
      "Ensure consent grounds every moment, building relationships with customers and patients founded on transparency, where the customer feels safe, seen, and held throughout.",
    icon: "🤝",
    accentColor: "#FF7F50",
    accentColorLight: "rgba(255, 127, 80, 0.15)",
    dos: [
      {
        title: "Give control back",
        detail:
          "Make it easy for users to view, edit, or delete their shared information. Make customers feel safe around our usage of their data.",
      },
      {
        title: "Design all UIs to be patient-facing",
        detail:
          "All UIs (even designed for professionals) should be designed to be patient-facing — they can always be turned around to show something.",
      },
      {
        title: "Never hide information",
        detail:
          "Having someone sit in front of the patient and accessing things about them that the patient can't see creates distrust. Especially with people who have low trust in the medical world. Practice trauma-informed design.",
      },
    ],
    donts: [
      {
        title: "Don't use data without consent",
        detail:
          "Never bring up personal information from customer IDs without the client having given consent to access or use it.",
      },
      {
        title: "Don't make consent overly complicated",
        detail:
          "Signing 60 pages of documentation is not a clear way to ask for consent or explain data usage.",
      },
      {
        title: "Don't assume everyone wants to share",
        detail:
          "Always check in and use language that invites people to share boundaries. Assume nothing about willingness to share information.",
      },
    ],
  },
  {
    id: "P6",
    title: "Pair Intelligence with Reassurance",
    manifesto: "Technology serves best when it feels human.",
    description:
      "Design technology around human needs, supporting different levels of comfort and ensuring guidance is always available when it matters most.",
    icon: "🧠",
    accentColor: "#1B3277",
    accentColorLight: "rgba(27, 50, 119, 0.12)",
    dos: [
      {
        title: "Make sure technology works",
        detail:
          "Set the bar really high. If in doubt, do not deliver the feature. Extensive testing in different situations is mandatory, as is a roadmap of iterations and updates.",
      },
      {
        title: "Design for all comfort levels",
        detail:
          "It needs to be accessible for the least tech-savvy person. Design for all levels of technology comfort.",
      },
      {
        title: "Make tech simple and portable",
        detail:
          "Use of own device should be an option. Hand-off to a session started at home or continuing at home should be possible.",
      },
    ],
    donts: [
      {
        title: "Don't use tech just because we can",
        detail:
          "Don't create vanity features. Always start from real and documented user needs.",
      },
      {
        title: "Don't let tech feel cold",
        detail:
          "Don't use too much technology that can be felt as distant and cold.",
      },
      {
        title: "Don't make technology the focus",
        detail:
          "Frame technology as a tool for enabling customers, not as the main attraction.",
      },
    ],
  },
];
