import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { name: "Ballina", path: "/" },
  { name: "Evente", path: "/events" },
  { name: "Kategori", path: "/categories" },
  { name: "Rreth Nesh", path: "/about" },
  { name: "Kontakt", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#C4B5FD]/40 bg-white/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 lg:px-8 lg:py-4">
        <a href="/" className="flex min-w-0 items-center">
          <h1 className="logo-yellowtail text-[2.05rem] leading-none sm:text-[2.45rem] lg:text-[3rem]">
            <span className="bg-[linear-gradient(135deg,#111827,#7B61FF,#6EC3F4,#F8A5C2)] bg-clip-text text-transparent">
              eventetsot.
            </span>
          </h1>
        </a>

        <nav className="hidden items-center gap-2 rounded-full border border-[#E5E7EB] bg-white/70 px-2 py-2 shadow-[0_8px_24px_rgba(17,24,39,0.05)] lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="group relative rounded-full px-4 py-2.5 text-sm font-medium text-[#6B7280] transition duration-300 hover:bg-[#F9FAFB] hover:text-[#111827]"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute inset-x-3 bottom-1 h-[2px] origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,#7B61FF,#6EC3F4,#F8A5C2)] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/login"
            className="rounded-full border border-[#C4B5FD]/70 bg-white px-5 py-2.5 text-sm font-semibold text-[#111827] transition duration-300 hover:-translate-y-0.5 hover:border-[#7B61FF] hover:text-[#7B61FF] hover:shadow-[0_8px_20px_rgba(123,97,255,0.12)]"
          >
            Kyçu
          </a>

          <a
            href="/create-event"
            className="group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(123,97,255,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(123,97,255,0.30)]"
          >
            <span>Krijo Event</span>
            <span className="transition duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Hap menunë"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white text-[#111827] shadow-[0_8px_20px_rgba(17,24,39,0.06)] transition duration-300 hover:border-[#C4B5FD] hover:bg-[#F9FAFB] hover:text-[#7B61FF] lg:hidden"
        >
          {isOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-[28px] border border-[#E9D5FF]/80 bg-white/95 p-4 shadow-[0_18px_50px_rgba(17,24,39,0.10)] backdrop-blur-2xl">
          <div className="mb-4 overflow-hidden rounded-3xl border border-white/70 bg-[linear-gradient(135deg,rgba(123,97,255,0.12),rgba(110,195,244,0.12),rgba(248,165,194,0.12))] p-4">
            <p className="text-sm font-bold text-[#111827]">
              Zbulo evente të kuruara për ty
            </p>
            <p className="mt-1 text-xs leading-5 text-[#6B7280]">
              Gjej festa, koncerte, workshope dhe momente të paharrueshme pranë teje.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-[#F1F5F9] bg-[#FAFAFF] px-4 py-3 text-sm font-semibold text-[#374151] transition duration-300 hover:border-[#C4B5FD] hover:bg-white hover:text-[#7B61FF]"
              >
                <span>{link.name}</span>
                <span className="text-[#C4B5FD]">→</span>
              </a>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-2xl border border-[#C4B5FD]/70 bg-white px-4 py-3 text-center text-sm font-bold text-[#111827] transition duration-300 hover:border-[#7B61FF] hover:text-[#7B61FF]"
            >
              Kyçu
            </a>

            <a
              href="/create-event"
              onClick={() => setIsOpen(false)}
              className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] px-4 py-3 text-center text-sm font-bold text-white shadow-[0_12px_24px_rgba(123,97,255,0.22)] transition duration-300 hover:shadow-[0_16px_28px_rgba(123,97,255,0.28)]"
            >
              Krijo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}