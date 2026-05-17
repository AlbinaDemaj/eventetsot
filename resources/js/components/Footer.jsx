export default function Footer() {
  const footerLinks = {
    Platforma: [
      { name: "Si funksionon", href: "/#how-it-works" },
      { name: "Llojet e eventeve", href: "/#event-types" },
      { name: "Demonstrimi", href: "/demo" },
    ],
    Kompania: [
      { name: "Rreth nesh", href: "/about" },
      { name: "Kontakt", href: "/contact" },
      { name: "Blogu", href: "/blogs" },
    ],
  };

  return (
    <footer className="border-t border-[#EEEAF8] bg-[#FCFBFF]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="/">
              <h1 className="logo-yellowtail text-[2.6rem] leading-none">
                <span className="bg-[linear-gradient(135deg,#111827,#7B61FF,#6EC3F4)] bg-clip-text text-transparent">
                  eventetsot.
                </span>
              </h1>
            </a>

            <p className="mt-3 text-sm text-slate-500">
              Kujtime eventesh, të ruajtura me stil.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="/register"
                className="rounded-xl bg-[#7B61FF] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6A4DFF]"
              >
                Krijo eventin
              </a>

              <a
                href="/demo"
                className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#7B61FF] hover:text-[#7B61FF]"
              >
                Demo
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {title}
              </p>

              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 transition hover:text-[#7B61FF]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#EEEAF8] pt-5 md:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EventetSot
          </p>

          <div className="flex gap-3 text-sm text-slate-500">
            <a href="#" className="transition hover:text-[#7B61FF]">
              Instagram
            </a>
            <a href="#" className="transition hover:text-[#7B61FF]">
              Facebook
            </a>
            <a href="#" className="transition hover:text-[#7B61FF]">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}