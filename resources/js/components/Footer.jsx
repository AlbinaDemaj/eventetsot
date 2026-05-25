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

const policyLinks = [
  { name: "Kushtet e Shërbimit", href: "/terms" },
  { name: "Politika e Privatësisë", href: "/privacy" },
  { name: "Politika e Rimbursimit", href: "/refund-policy" },
  { name: "Politika e Cookies", href: "/cookies-policy" },
];

  const paymentMethods = [
    {
      name: "Paysera",
      image: "/images/paysera.png",
      href: "https://www.paysera.com",
      className: "h-7",
    },
    {
      name: "Visa",
      image: "/images/visa.png",
      href: "https://www.visa.com",
      className: "h-6",
    },
    {
      name: "Mastercard",
      image: "/images/mastercard.png",
      href: "https://www.mastercard.com",
      className: "h-8",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[#EEEAF8] bg-[linear-gradient(135deg,#FCFBFF_0%,#F7F4FF_48%,#EEF7FF_100%)]">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#7B61FF]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#6EC3F4]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="max-w-md">
            <a href="/" className="inline-block">
              <h1 className="logo-yellowtail text-[3rem] leading-none">
                <span className="bg-[linear-gradient(135deg,#111827,#7B61FF,#6EC3F4)] bg-clip-text text-transparent">
                  eventetsot.
                </span>
              </h1>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              Kujtime eventesh, të ruajtura me stil dhe të ndara me njerëzit që
              kanë më shumë rëndësi.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/register"
                className="rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#6A4DFF)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(123,97,255,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(123,97,255,0.42)]"
              >
                Krijo eventin
              </a>

              <a
                href="/demo"
                className="rounded-2xl border border-[#E5E7EB] bg-white/75 px-5 py-3 text-sm font-semibold text-slate-700 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#7B61FF] hover:text-[#7B61FF]"
              >
                Shiko demo
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                {title}
              </p>

              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="inline-flex text-sm font-medium text-slate-600 transition hover:translate-x-1 hover:text-[#7B61FF]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/70 bg-white/65 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                © {new Date().getFullYear()} EventetSot. Të gjitha të drejtat e rezervuara.
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {policyLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-slate-500 transition hover:text-[#7B61FF]"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 lg:text-right">
                Pagesa të sigurta
              </p>

             <div className="flex flex-wrap items-center gap-2 sm:gap-3">
  {paymentMethods.map((method) => (
    <a
      key={method.name}
      href={method.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={method.name}
      className="
        flex h-9 w-[58px] items-center justify-center
        rounded-lg border border-[#ECE7FF]
        bg-white shadow-[0_6px_18px_rgba(15,23,42,0.05)]
        transition hover:-translate-y-1 hover:border-[#C4B5FD]

        sm:h-14 sm:w-24
        sm:rounded-2xl
        sm:shadow-[0_8px_24px_rgba(15,23,42,0.06)]
      "
    >
      <img
        src={method.image}
        alt={method.name}
        className="
          max-h-4 max-w-[42px] object-contain

          sm:max-h-8
          sm:max-w-[76px]
        "
        loading="lazy"
      />
    </a>
  ))}
</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}