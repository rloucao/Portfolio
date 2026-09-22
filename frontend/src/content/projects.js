// Language-independent project data. Copy for each project lives in
// en.js / pt.js under `work.projects[id]`, so both languages stay in sync.
export const PROJECTS = [
  {
    // TODO: add a url once the app ships. Name and copy live in en.js / pt.js.
    id: "messenger",
    status: "testing",
    image: "/videos/hoppin.jpg",
    video: "/videos/hoppin.mp4",
    portrait: true, // phone screen recording
    stack: ["Swift", "Next.js 16", "TypeScript", "Tailwind CSS v4"],
  },
  {
    id: "mbd",
    title: "Museu da Batata Doce",
    image: "/videos/mbd.jpg",
    video: "/videos/mbd.mp4",
    url: "https://museubatatadoce.com",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "GSAP", "Resend"],
  },
  {
    id: "gda",
    title: "Grão d'Areia",
    image: "/videos/gda.jpg",
    video: "/videos/gda.mp4",
    url: "https://graodareia.com",
    stack: ["Next.js 15", "TypeScript", "PostgreSQL", "Tailwind CSS", "Recharts"],
  },
  {
    id: "b130",
    title: "Barbearia 130",
    image: "/videos/b130.jpg",
    video: "/videos/b130.mp4",
    url: "https://barbearia130.com",
    stack: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Recharts"],
  },
];

export const LINKS = {
  email: "rodrigoloucao570@gmail.com",
  github: "https://github.com/rloucao",
  linkedin: "https://www.linkedin.com/in/rodrigo-lou%C3%A7%C3%A3o-347666268/",
  strava: "https://www.strava.com/athletes/142855329",
};
