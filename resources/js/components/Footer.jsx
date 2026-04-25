export default function Footer() {
  const footerLinks = {
    Platforma: ["Si funksionon", "Llojet e eventeve", "Demonstrimi"],
    Kompania: ["Rreth nesh", "Kontakt", "Blogu"],
    Ligjore: ["Privatësia", "Kushtet", "Cookies"],
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#EEEAF8] bg-[#FCFBFF]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.06),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.05),transparent_22%)]" />
      <div className="absolute left-[-80px] top-[-30px] h-[180px] w-[180px] rounded-full bg-[#7B61FF]/8 blur-3xl" />
      <div className="absolute right-[-60px] bottom-[-40px] h-[180px] w-[180px] rounded-full bg-[#F8A5C2]/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.8fr]">
          {/* Brand */}
          <div className="max-w-md">
            <a href="/" className="inline-block">
              <h3 className="text-2xl font-black tracking-tight text-[#111827]">
                Eventet
                <span className="ml-1 bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] bg-clip-text text-transparent">
                  Sot
                </span>
              </h3>
            </a>

            <p className="mt-3 text-sm font-medium text-slate-500">
              Kujtime eventesh, të ruajtura me stil
            </p>

            <p className="mt-6 text-sm leading-7 text-slate-600">
              Një mënyrë moderne dhe elegante për të mbledhur foto dhe video nga
              çdo event, në një hapësirë private, të bukur dhe të organizuar për
              ty dhe për të ftuarit e tu.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#"
                className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(123,97,255,0.20)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(123,97,255,0.28)]"
              >
                Krijo eventin
              </a>

              <a
                href="#"
                className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-semibold text-[#111827] transition duration-300 hover:border-[#DCCFFF] hover:bg-[#F8F6FF] hover:text-[#7B61FF]"
              >
                Shiko demonstrimin
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {title}
              </p>

              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-medium text-slate-600 transition duration-300 hover:text-[#7B61FF]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-[#F1EDF9] pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} EventetSot. Të gjitha të drejtat e rezervuara.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E3F5] bg-white text-sm font-semibold text-slate-500 transition duration-300 hover:border-[#DCCFFF] hover:text-[#7B61FF]"
              >
                Ig
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E3F5] bg-white text-sm font-semibold text-slate-500 transition duration-300 hover:border-[#D8EEFF] hover:text-[#56B6F7]"
              >
                Fb
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E3F5] bg-white text-sm font-semibold text-slate-500 transition duration-300 hover:border-[#FFDCE8] hover:text-[#E87AA6]"
              >
                In
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}