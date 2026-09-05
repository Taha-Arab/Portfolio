import ShowcaseGrid from "@/components/ShowcaseGrid";
import ChatWidget from "@/components/ChatWidget";
import Reveal from "@/components/Reveal";
import { TwinHeroButton, TwinBanner } from "@/components/TwinTriggers";
import { showcaseItems, skillGroups, leadership, honors, education } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <ChatWidget />

      {/* Nav */}
      <header className="border-b border-neutral-900">
        <div className="mx-auto max-w-5xl px-6 md:px-8 py-5 flex items-center justify-between">
          <span className="flex items-center gap-3">
            <span className="h-11 w-11 rounded-full overflow-hidden border border-neutral-700 block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/headshot-nav-full.jpg"
                alt="Taha Arab"
                style={{ transform: "scale(2.9) translate(1%, 6%)", transformOrigin: "center" }}
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-sm font-medium tracking-widest uppercase text-neutral-400">
              Taha Arab
            </span>
          </span>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-400">
            <a href="#work" className="hover:text-sky-400 transition-colors">Work</a>
            <a href="#about" className="hover:text-sky-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-sky-400 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-sky-400 transition-colors">Contact</a>
            <a
              href="/Taha_Arab_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-neutral-700 px-4 py-1.5 text-neutral-200 hover:border-sky-500 hover:text-sky-300 transition-colors"
            >
              Résumé
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 md:px-8 pt-16 md:pt-28 pb-16 md:pb-20">
        <Reveal>
          <p className="text-sm uppercase tracking-widest text-neutral-500">
            Mechanical Engineer · Sugar Land, TX
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] max-w-3xl">
            Mechanical engineer with hands-on fabrication and technical computing skills.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Senior at the University of Houston, Cullen College of Engineering. Equipped to step into
            whatever a team is building, backed by real fabrication, testing, and computational
            engineering experience.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full bg-sky-500 text-neutral-950 px-6 py-3 text-sm font-medium hover:bg-sky-400 transition-colors"
            >
              View my work
            </a>
            <a
              href="mailto:tahaarab05@gmail.com"
              className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium hover:border-sky-500 hover:text-sky-300 transition-colors"
            >
              Get in touch
            </a>
            <TwinHeroButton />
          </div>
        </Reveal>
      </section>

      <TwinBanner />

      {/* Featured Work */}
      <section id="work" className="mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-20 border-t border-neutral-900">
        <Reveal>
          <SectionHeading eyebrow="Featured Work" title="Experience & Engineering Projects" />
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-4 text-neutral-400 max-w-2xl leading-relaxed">
            Click any card for the full write-up — problem, approach, tools, and results.
          </p>
        </Reveal>
        <div className="mt-10">
          <ShowcaseGrid items={showcaseItems} />
        </div>
      </section>

      {/* About / Education */}
      <section id="about" className="mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-20 border-t border-neutral-900">
        <Reveal>
          <SectionHeading eyebrow="Education" title="University of Houston" />
        </Reveal>
        <Reveal delay={80} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-medium text-neutral-50">{education.school}</h3>
            <p className="mt-1 text-sm text-neutral-500">{education.location}</p>
            <p className="mt-4 text-neutral-300">{education.degree}</p>
            <p className="mt-1 text-sm text-neutral-500">{education.details}</p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-neutral-500">Coursework</h4>
              <ul className="mt-3 space-y-1.5 text-sm text-neutral-400">
                {education.coursework.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-neutral-500">
                  Graduate-Level (taken alongside B.S.)
                </h4>
                <ul className="mt-3 space-y-1.5 text-sm text-neutral-400">
                  {education.graduate.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-neutral-500">
                  In Progress — Senior Year
                </h4>
                <ul className="mt-3 space-y-1.5 text-sm text-neutral-400">
                  {education.inProgress.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Technical Skills */}
      <section id="skills" className="mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-20 border-t border-neutral-900">
        <Reveal>
          <SectionHeading eyebrow="Technical Specs" title="Skills & Tools" />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 4) * 80}>
              <div className="group rounded-xl border border-neutral-800 hover:border-sky-500 p-6 md:p-8 h-full transition-colors">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-300">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-400 group-hover:border-sky-800 group-hover:text-sky-300 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-20 border-t border-neutral-900">
        <Reveal>
          <SectionHeading eyebrow="Leadership" title="Leadership & Extracurricular" />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadership.map((item, i) => (
            <Reveal key={item.org} delay={(i % 4) * 80}>
              <div className="rounded-xl border border-neutral-800 hover:border-sky-500 p-6 md:p-8 h-full transition-colors">
                <p className="text-xs uppercase tracking-widest text-neutral-500">{item.period}</p>
                <h3 className="mt-2 text-lg font-medium text-neutral-50">{item.org}</h3>
                <p className="mt-1 text-sm text-neutral-400">{item.role}</p>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-neutral-400 leading-relaxed flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Honors */}
      <section className="mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-20 border-t border-neutral-900">
        <Reveal>
          <SectionHeading eyebrow="Recognition" title="Honors & Awards" />
        </Reveal>
        <Reveal delay={80}>
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {honors.map((h) => (
              <li
                key={h}
                className="flex gap-3 text-neutral-300 hover:text-sky-300 border-b border-neutral-900 pb-3 transition-colors"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-600" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-24 border-t border-neutral-900">
        <Reveal>
          <div className="flex items-center gap-5">
            <span className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden border border-neutral-700 shrink-0 block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/headshot-nav-full.jpg"
                alt="Taha Arab"
                style={{ transform: "scale(2.45) translate(0%, 3%)", transformOrigin: "center" }}
                className="h-full w-full object-cover"
              />
            </span>
            <SectionHeading eyebrow="Contact" title="Let's build something." />
          </div>
          <p className="mt-4 text-neutral-400 max-w-2xl leading-relaxed">
            Open to relocation and eligible for U.S. government/defense contract positions.
            Reach out directly, or ask my digital twin in the chat widget below.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-8 text-neutral-300">
            <a href="mailto:tahaarab05@gmail.com" className="hover:text-sky-400 transition-colors">
              tahaarab05@gmail.com
            </a>
            <a href="tel:+18327696022" className="hover:text-sky-400 transition-colors">
              (832) 769-6022
            </a>
            <a
              href="https://www.linkedin.com/in/taha-arab"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors"
            >
              linkedin.com/in/taha-arab
            </a>
          </div>
          <div className="mt-8">
            <a
              href="/Taha_Arab_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 text-neutral-950 px-6 py-3 text-sm font-medium hover:bg-sky-400 transition-colors"
            >
              Download Résumé
              <span aria-hidden>↓</span>
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-neutral-900">
        <div className="mx-auto max-w-5xl px-6 md:px-8 py-8 text-sm text-neutral-600">
          © {new Date().getFullYear()} Taha Arab. Sugar Land, TX.
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-widest text-neutral-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-neutral-50">
        {title}
      </h2>
    </div>
  );
}
