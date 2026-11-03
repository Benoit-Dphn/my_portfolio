"use client"; // nécessaire uniquement avec Next.js (App Router), sans effet ailleurs

// Page CV de Benoît Dauphin – composant React + TypeScript, sans dépendance.
// Utilisation :  import CvPage from "./CvPage";  puis  <CvPage />

import type { CSSProperties } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Entry {
  title: string;
  org?: string;
  period?: string;
  points: string[];
}

interface Cv {
  name: string;
  title: string;
  availability: string;
  contact: {
    phone: string;
    email: string;
    linkedin?: string;
    location: string;
    extra: string;
  };
  profile: string;
  projects: Entry[];
  experience: Entry[];
  education: Entry[];
  skills: { group: string; items: string[] }[];
  languages: { name: string; level: string }[];
  interests: string[];
}

// ─── Tes données : modifie uniquement cette partie ───────────────────────────
const cv: Cv = {
  name: "Benoît Dauphin",
  title: "Electrical Engineering Student",
  availability: "Available for a 30-day internship · 12 April – 29 May",
  contact: {
    phone: "+32 493 42 11 12",
    email: "dauphin.benoit.fr@gmail.com",
    linkedin: "", // colle ici l'URL de ton profil LinkedIn
    location: "Sombreffe, Belgium",
    extra: "Driving licence (since 12/2025)",
  },
  profile:
    "Third-year industrial engineering student (electrical engineering specialisation) at ECAM, looking for a 30-day internship in an electronics company. Hands-on experience in PCB design with Altium Designer and in microcontroller programming. Quick learner, comfortable working in a team in a professional environment.",
  projects: [
    {
      title: "VU meter PCB",
      org: "ECAM",
      period: "In progress",
      points: [
        "Designing the PCB of an audio VU meter in Altium Designer.",
        "Adding dedicated test points so the board can be probed with an oscilloscope or a multimeter, to ease debugging and validation.",
      ],
    },
    {
      title: "Gorillas game",
      org: "Personal project",
      points: [
        "Recreated the classic QBasic game Gorillas in Python, developed in Visual Studio.",
      ],
    },
    {
      title: "Microcontroller programming",
      points: ["Learned to program an Arduino Uno and a PIC18F46K22."],
    },
  ],
  experience: [
    {
      title: "Risk Management",
      org: "UCB",
      period: "08/2026",
      points: [
        "Contributed to a risk management team in a corporate environment.",
        "Produced a training presentation and built SharePoint site pages using Microsoft 365 tools.",
      ],
    },
    {
      title: "Delivery and customer reception",
      org: "Amo Pizza",
      period: "04/2026 – present",
      points: [
        "Delivering orders and welcoming customers.",
        "Working autonomously and staying reliable during busy periods.",
      ],
    },
  ],
  education: [
    {
      title: "Bachelor in Industrial Engineering",
      org: "ECAM",
      period: "2024 – present",
      points: ["3rd year – Electrical engineering specialisation"],
    },
    {
      title: "Upper secondary school",
      org: "Collège Saint-Guibert",
      period: "2018 – 2024",
      points: ["CESS in Science and Mathematics (06/2024)"],
    },
  ],
  skills: [
    { group: "PCB design", items: ["Altium Designer"] },
    { group: "Embedded systems", items: ["Arduino Uno", "PIC18F46K22"] },
    {
      group: "Programming",
      items: ["Python (advanced)", "C++ (basic)", "C# (basic)"],
    },
    { group: "Hardware", items: ["Soldering"] },
    {
      group: "Tools",
      items: ["Visual Studio", "Microsoft 365 (Word, PowerPoint, SharePoint)"],
    },
  ],
  languages: [
    { name: "French", level: "native" },
    { name: "English", level: "B1" },
  ],
  interests: [
    "Rugby XV – Royal Rugby Namur, D2 (2021–2024)",
    "Scouting",
    "DIY crafting",
  ],
};

// ─── Sous-composants ─────────────────────────────────────────────────────────
function Entries({ list }: { list: Entry[] }) {
  return (
    <>
      {list.map((e) => (
        <article className="entry" key={e.title}>
          <p className="when">{e.period}</p>
          <div>
            <h3>
              {e.title}
              {e.org && <span className="org">{e.org}</span>}
            </h3>
            <ul>
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </>
  );
}

// Pistes de circuit imprimé : se dessinent une seule fois au chargement
function Traces() {
  const paths = [
    { d: "M0 330H140L190 280H330L380 230H600", delay: "0s" },
    { d: "M0 250H90L140 200H260L300 160H600", delay: ".25s" },
    { d: "M120 400V360L160 320H420L470 270H600", delay: ".5s" },
    { d: "M300 0V60L340 100H480L520 140H600", delay: ".75s" },
  ];
  const vias = [
    [330, 280],
    [260, 200],
    [420, 320],
    [480, 100],
  ];
  return (
    <svg
      className="traces"
      viewBox="0 0 600 400"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {paths.map((p) => (
          <path
            key={p.d}
            pathLength={1}
            d={p.d}
            style={{ "--d": p.delay } as CSSProperties}
          />
        ))}
      </g>
      <g className="vias">
        {vias.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={8} />
        ))}
      </g>
    </svg>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CvPage() {
  const c = cv.contact;
  const contactItems: { label: string; href?: string }[] = [
    { label: c.email, href: `mailto:${c.email}` },
    { label: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
    ...(c.linkedin ? [{ label: "LinkedIn", href: c.linkedin }] : []),
    { label: c.location },
    { label: c.extra },
  ];

  return (
    <div className="cv">
      <style>{css}</style>

      <header className="hero">
        <Traces />
        <div className="hero-inner">
          <h1>{cv.name}</h1>
          <p className="role">{cv.title}</p>
          <p className="avail">{cv.availability}</p>
          <ul className="contact">
            {contactItems.map((i) => (
              <li key={i.label}>
                {i.href ? <a href={i.href}>{i.label}</a> : i.label}
              </li>
            ))}
          </ul>
          <div className="actions">
            <button
              type="button"
              className="print"
              onClick={() => window.print()}
            >
              Save as PDF
            </button>
          </div>
        </div>
      </header>

      <main>
        <div>
          <section>
            <h2>Profile</h2>
            <p className="lead">{cv.profile}</p>
          </section>
          <section>
            <h2>Technical projects</h2>
            <Entries list={cv.projects} />
          </section>
          <section>
            <h2>Work experience</h2>
            <Entries list={cv.experience} />
          </section>
          <section>
            <h2>Education</h2>
            <Entries list={cv.education} />
          </section>
        </div>

        <aside>
          <section>
            <h2>Technical skills</h2>
            {cv.skills.map((s) => (
              <div className="group" key={s.group}>
                <strong>{s.group}</strong>
                <span>{s.items.join(", ")}</span>
              </div>
            ))}
          </section>
          <section>
            <h2>Languages</h2>
            {cv.languages.map((l) => (
              <div className="lang" key={l.name}>
                <span>{l.name}</span>
                <span>{l.level}</span>
              </div>
            ))}
          </section>
          <section>
            <h2>Interests</h2>
            <ul>
              {cv.interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        </aside>
      </main>

      <footer>
        © {new Date().getFullYear()} {cv.name}
      </footer>
    </div>
  );
}

// ─── Styles (tout est préfixé par .cv pour ne pas toucher au reste du site) ───
const css = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=IBM+Plex+Sans:wght@400;500&display=swap");

.cv {
  --bg: #eef3f1; --ink: #0f2a2e; --muted: #4a6064; --mask: #0e5a4a; --mask-deep: #0a4438;
  --pad: #d2ac52; --line: #cbd8d3;
  --display: "Bricolage Grotesque", "Segoe UI", system-ui, sans-serif;
  --body: "IBM Plex Sans", "Segoe UI", system-ui, sans-serif;
  min-height: 100vh; background: var(--bg); color: var(--ink); font: 400 1.0625rem/1.65 var(--body);
}
.cv *, .cv *::before, .cv *::after { box-sizing: border-box; }
.cv a { color: inherit; text-underline-offset: 3px; }
.cv :focus-visible { outline: 3px solid var(--pad); outline-offset: 3px; }

.cv .hero { position: relative; overflow: hidden; background: var(--mask); color: #f2f7f4;
  background-image: radial-gradient(circle at 15% 0%, var(--mask-deep), transparent 60%); }
.cv .hero-inner { position: relative; z-index: 1; max-width: 68rem; margin: 0 auto; padding: 4.5rem 1.5rem 3.5rem; }
.cv h1 { margin: 0; font: 800 clamp(2.8rem, 8vw, 5.2rem)/1 var(--display); letter-spacing: -0.025em; }
.cv .role { margin: .9rem 0 0; font: 600 clamp(1.15rem, 2.6vw, 1.6rem)/1.3 var(--display); color: #cfe3da; }
.cv .avail { display: inline-block; margin: 1.8rem 0 0; padding: .45rem 1rem; border: 1.5px solid var(--pad);
  border-radius: 999px; color: #fff4d6; font-size: .98rem; }
.cv .contact { display: flex; flex-wrap: wrap; gap: .4rem 1.6rem; margin: 1.6rem 0 0; padding: 0; list-style: none; color: #dcebe4; }
.cv .actions { margin-top: 1.8rem; }
.cv button.print { font: 500 .95rem var(--body); color: #f2f7f4; background: transparent; border: 1.5px solid #8fb9ab;
  border-radius: 8px; padding: .55rem 1.1rem; cursor: pointer; }
.cv button.print:hover { background: rgba(255,255,255,.1); }

.cv .traces { position: absolute; inset: 0; width: 100%; height: 100%; }
.cv .traces path { stroke: rgba(255,255,255,.2); stroke-width: 3; stroke-dasharray: 1; stroke-dashoffset: 1;
  animation: cv-draw 2.2s cubic-bezier(.4,0,.2,1) var(--d) forwards; }
.cv .vias circle { fill: var(--mask); stroke: var(--pad); stroke-width: 3; opacity: 0; animation: cv-pop .4s ease 1.6s forwards; }
@keyframes cv-draw { to { stroke-dashoffset: 0; } }
@keyframes cv-pop { to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .cv .traces path { animation: none; stroke-dashoffset: 0; }
  .cv .vias circle { animation: none; opacity: 1; }
}

.cv main { max-width: 68rem; margin: 0 auto; padding: 3.5rem 1.5rem 4rem;
  display: grid; grid-template-columns: minmax(0, 1fr) 17rem; gap: 4rem; }
.cv h2 { margin: 0 0 1.2rem; font: 800 1.55rem/1.2 var(--display); color: var(--mask); letter-spacing: -0.01em; }
.cv section + section { margin-top: 3rem; }
.cv .lead { margin: 0; max-width: 62ch; font-size: 1.15rem; }

.cv .entry { display: grid; grid-template-columns: 8.5rem minmax(0, 1fr); gap: 1.2rem; padding: 1.3rem 0; border-top: 1px solid var(--line); }
.cv .entry:last-child { border-bottom: 1px solid var(--line); }
.cv .when { margin: .2rem 0 0; color: var(--muted); font-size: .95rem; }
.cv h3 { margin: 0; font: 600 1.2rem/1.35 var(--display); }
.cv .org { display: block; font: 500 .98rem var(--body); color: var(--mask); }
.cv ul { margin: .6rem 0 0; padding-left: 1.1rem; }
.cv li { margin: .25rem 0; max-width: 62ch; }
.cv li::marker { color: var(--pad); }

.cv aside section + section { margin-top: 2.2rem; }
.cv aside h2 { font-size: 1.2rem; }
.cv aside ul { list-style: none; padding: 0; margin: 0; }
.cv aside li { margin: 0 0 .35rem; }
.cv .group { margin: 0 0 1rem; }
.cv .group strong { display: block; font: 600 1rem var(--display); }
.cv .group span { color: var(--muted); font-size: .98rem; }
.cv .lang { display: flex; justify-content: space-between; border-bottom: 1px solid var(--line); padding: .35rem 0; }
.cv .lang span:last-child { color: var(--muted); }

.cv footer { max-width: 68rem; margin: 0 auto; padding: 0 1.5rem 3rem; color: var(--muted); font-size: .9rem; }

@media (max-width: 860px) {
  .cv main { grid-template-columns: 1fr; gap: 3rem; }
  .cv .hero-inner { padding-top: 3rem; }
}
@media (max-width: 560px) {
  .cv .entry { grid-template-columns: 1fr; gap: .2rem; }
  .cv .when { margin: 0; }
}
@media print {
  .cv { min-height: 0; background: #fff; }
  .cv .hero { background: none; color: #000; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cv .traces, .cv .actions, .cv footer { display: none; }
  .cv .role, .cv .contact { color: #333; }
  .cv .avail { border-color: #999; color: #000; }
  .cv .hero-inner { padding: 0 0 1rem; }
  .cv main { padding-top: 1rem; gap: 2rem; }
}
`;
