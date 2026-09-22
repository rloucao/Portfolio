const en = {
  meta: {
    title: "Rodrigo Loução — Full-stack Developer",
    description:
      "Full-stack developer in Lisbon building web apps, mobile apps and cloud infrastructure. Open to freelance work",
  },
  langSwitch: "Change language",
  status: "Open to freelance",
  nav: {
    work: "Work",
    about: "About",
    process: "Process",
    contact: "Contact",
    cta: "Get in touch",
  },
  hero: {
    eyebrow: "Full-stack developer · Lisbon",
    title: "I build for the web, for mobile, and for the infrastructure underneath.",
    lede: "I've shipped booking systems, ordering platforms and multilingual sites for real businesses, and I'm finishing my master's at NOVA FCT, focused on cloud computing and reliable systems.",
    primary: "Get in touch",
    secondary: "See my work",
    photoAlt: "Portrait of Rodrigo Loução",
    photoOpen: "View photo",
    photoClose: "Close photo",
  },
  work: {
    eyebrow: "Selected work",
    title: "Things I've built, from first sketch to production.",
    built: "What I built",
    stack: "Stack",
    visit: "Visit site",
    testing: "In testing",
    projects: {
      messenger: {
        title: "Hoppin",
        tag: "Mobile App · Distributed systems",
        summary:
          "An end-to-end encrypted iOS messenger that keeps working when the internet doesn't. Messages go phone to phone over Wi-Fi, hop between nearby phones over Bluetooth, and fall back to a relay that stores only sealed envelopes it cannot read. Built from the protocol up: app, server and website.",
        points: ["Message encryption from scratch on CryptoKit",
          "Direct phone-to-phone delivery on the local network over Bonjour and peer-to-peer Wi-Fi",
          "A Bluetooth mesh: messages hop through nearby phones, sealed in an anonymous outer layer",
          "A Python relay and certificate authority",
          "Trust-on-first-use key pinning with safety numbers, QR verification and key-change warnings that block sending until the user accepts",
          "On-device auto-translation per chat, typing suggestions in four keyboards, and an animated fluid background",
          "270+ tests across Swift and Python, run against shared protocol fixtures so both sides agree byte for byte",
        ],
      },
      mbd: {
        tag: "Website · Hospitality",
        summary:
          "An editorial website for a restaurant, a 14-room hotel and rental houses on the Alentejo coast. It's the business's only digital point of contact.",
        points: [
          "Scroll-driven motion design with GSAP and Lenis",
          "Content in four languages: Portuguese, English, German and Italian",
          "Galleries with lightboxes for every property",
          "Reservation and event-quote forms on Next.js Server Actions, with spam protection",
        ],
      },
      gda: {
        tag: "Web app · Restaurant",
        summary: "A website and management system for a beachside restaurant.",
        points: [
          "Public site with the menu and table reservations",
          "Sunbed ordering, so customers order straight from the beach",
          "Admin dashboard for bookings, finances and daily operations",
        ],
      },
      b130: {
        tag: "Web app · Booking",
        summary: "A booking and management system for a barbershop.",
        points: [
          "A fast public booking flow",
          "Admin dashboard for staff, financial reports and the live schedule",
          "Role-based access control",
          "Automated message notifications",
        ],
      },
    },
  },
  experience: {
    eyebrow: "Experience",
    title: "Where I've studied and worked.",
    workLabel: "Work",
    eduLabel: "Education",
    jobs: [
      {
        role: "Freelance Full-stack Developer",
        org: "Self-employed",
        period: "2026 — present",
        text: "I design and build full-stack web applications for businesses with Next.js, Tailwind CSS, Supabase and Stripe.",
      },
      {
        role: "Full-stack Developer",
        org: "Innova Junior Consulting",
        period: "2024 — 2025",
        text: "Built web applications in a team of four developers with Java, Spring Boot and React.",
      },
    ],
    education: [
      {
        degree: "MSc in Computer Science",
        org: "NOVA FCT · Cloud computing and reliable systems",
        period: "2025 — Sept 2027",
      },
      {
        degree: "BSc in Computer Science",
        org: "NOVA FCT",
        period: "2021 — 2025",
      },
    ],
  },
  about: {
    eyebrow: "About",
    scrub:
      "I train for Ironman triathlons. The mindset that gets you through a long ride gets you through a hard problem: patience, consistency, and refusing to stop before it's done.",
    body: [
      "I didn't start with a plan, I started with curiosity. When I began my degree I had never written a line of code; I just wanted to understand how things worked. That curiosity became a habit, and the habit became a craft.",
      "Since then I've built websites and management systems for local businesses and a peer-to-peer messaging app, and I've gone deep on distributed systems and edge computing. Away from the screen, I ride mountain trails.",
    ],
    skillsTitle: "Tools I use",
    skills: [
      { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Swift"] },
      { group: "Backend", items: ["Node.js", "Java · Spring Boot", "PostgreSQL", "Prisma", "Supabase", "MongoDB", "Java", "Kotlin"] },
      { group: "Mobile", items: ["Flutter", "Dart", "Firebase", "Swift"] },
      { group: "Infrastructure", items: ["Docker", "Kubernetes", "Git"] },
    ],
    strava: "Follow my training on Strava",
  },
  process: {
    eyebrow: "Working with me",
    title: "How a freelance project runs.",
    lede: "Four steps, the same every time, so you always know what happens next.",
    steps: [
      {
        title: "Discovery",
        text: "We talk about how your business actually works: who your customers are, what takes up your time, and what the site has to do.",
      },
      {
        title: "Design",
        text: "I design the pages, and you approve them before any code is written.",
      },
      {
        title: "Build",
        text: "I build it end to end: front end, back end, database, admin tools, and integrations like payments or email.",
      },
      {
        title: "Launch & support",
        text: "I deploy it, connect your domain, and stay around to fix issues and make changes after go-live.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Have a project?",
    lede: "Send me a message here, or email me directly.",
    name: "Name",
    email: "Email",
    message: "Message",
    namePh: "Your name",
    emailPh: "you@example.com",
    messagePh: "What are you working on?",
    send: "Send message",
    sending: "Sending…",
    sent: "Message sent. I'll get back to you soon.",
    verify: "Please complete the verification first.",
    failed: "Your message didn't go through. Try again, or email me directly.",
    emailLabel: "Email",
    locationLabel: "Based in",
    location: "Lisbon, Portugal",
    elsewhere: "Elsewhere",
  },
  footer: {
    title: "Let's build something.",
    back: "Back to top",
  },
};

export default en;
