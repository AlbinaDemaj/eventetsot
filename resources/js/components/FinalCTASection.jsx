export default function FinalCTASection() {
  const highlights = [
    "Hyrje me link ose kod QR",
    "Foto dhe video në një vend",
    "Pa aplikacion shtesë",
    "Galeri private dhe elegante",
  ];

  return (
    <section className="relative overflow-hidden bg-[#0B1020] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.30),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.18),transparent_24%),radial-gradient(circle_at_center,rgba(110,195,244,0.14),transparent_28%),linear-gradient(to_bottom,#0b1020,#11162a)]" />
      <div className="absolute left-[-90px] top-[-70px] h-[260px] w-[260px] rounded-full bg-[#7B61FF]/25 blur-3xl" />
      <div className="absolute right-[-70px] bottom-[-80px] h-[240px] w-[240px] rounded-full bg-[#F8A5C2]/18 blur-3xl" />
      <div className="absolute left-[35%] top-[10%] h-[180px] w-[180px] rounded-full bg-[#6EC3F4]/12 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.05] px-8 py-14 shadow-[0_35px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02),rgba(255,255,255,0.04))]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.45),transparent)]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 shadow-[0_10px_30px_rgba(255,255,255,0.05)] backdrop-blur-xl">
              Gati për të krijuar diçka të paharrueshme?
            </span>

            <h2 className="mt-7 text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
              Ktheje eventin tënd
              <br />
              në një{" "}
              <span className="bg-[linear-gradient(135deg,#7B61FF_0%,#9B8CFF_30%,#6EC3F4_65%,#F8A5C2_100%)] bg-clip-text text-transparent">
                kujtim që mbetet
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/72">
              Krijo një hapësirë moderne ku të ftuarit ndajnë momentet më të
              bukura menjëherë, ndërsa ti i ruan të gjitha në një galeri private,
              elegante dhe të organizuar me stil.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#8F7DFF,#6EC3F4,#F8A5C2)] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(123,97,255,0.40)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(123,97,255,0.50)]"
              >
                Krijo eventin tani
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-sm font-semibold text-white/90 shadow-[0_10px_30px_rgba(255,255,255,0.04)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/15"
              >
                Shiko demonstrimin
              </a>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-medium text-white/78 shadow-[0_8px_20px_rgba(0,0,0,0.15)] backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center">
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>

            <p className="mt-6 text-sm leading-7 text-white/55">
              E krijuar për dasma, ditëlindje, festa dhe evente private që
              meritojnë një prezantim më të bukur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}