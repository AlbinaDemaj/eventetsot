export default function PreviewSection() {
  const benefits = [
    "Ngarko foto dhe video në pak sekonda",
    "Hyrje e shpejtë me link ose kod QR",
    "Një galeri elegante për çdo kujtim",
  ];

  const eventTypes = ["Dasma", "Ditëlindje", "Festa", "Evente private"];

  return (
    <section className="relative overflow-hidden bg-[#fcfbff] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.14),transparent_24%),radial-gradient(circle_at_center_right,rgba(110,195,244,0.10),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(248,165,194,0.10),transparent_24%),linear-gradient(to_bottom,#ffffff,#f7f7fd)]" />
      <div className="absolute left-[-80px] top-[-30px] h-[220px] w-[220px] rounded-full bg-[#7B61FF]/12 blur-3xl" />
      <div className="absolute right-[-60px] top-[20%] h-[200px] w-[200px] rounded-full bg-[#6EC3F4]/10 blur-3xl" />
      <div className="absolute bottom-[-70px] left-[18%] h-[180px] w-[180px] rounded-full bg-[#F8A5C2]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-[#E4DAFF] bg-white/80 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-[0_10px_30px_rgba(123,97,255,0.08)] backdrop-blur-xl">
              Pamje e eksperiencës
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight tracking-[-0.04em] text-[#0F172A] sm:text-5xl">
              Një mënyrë më e bukur
              <br />
              për të ruajtur{" "}
              <span className="bg-[linear-gradient(135deg,#7B61FF_0%,#8F7DFF_35%,#6EC3F4_70%,#F8A5C2_100%)] bg-clip-text text-transparent">
                kujtimet e eventit
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Krijo një hapësirë moderne ku të ftuarit mund të ndajnë foto dhe
              video menjëherë. Çdo kujtim ruhet bukur, i organizuar dhe gati për
              t’u parë nga të gjithë në një galeri elegante.
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,#7B61FF,#6EC3F4)]" />
                  <p className="text-sm font-medium leading-7 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {eventTypes.map((item, i) => (
                <span
                  key={i}
                  className="rounded-full border border-[#E9DFFF] bg-white/85 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative mx-auto w-full max-w-[580px]">
            <div className="absolute -inset-6 rounded-[2.8rem] bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.22),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.18),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(248,165,194,0.16),transparent_40%)] blur-3xl" />

            <div className="relative rounded-[2.5rem] border border-white/70 bg-white/70 p-4 shadow-[0_34px_90px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
              <div className="mb-4 flex items-center justify-between rounded-[1.6rem] border border-[#EEE8FF] bg-white/85 px-5 py-4 shadow-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7B61FF]">
                    Galeria e eventit
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    E thjeshtë, elegante dhe moderne
                  </p>
                </div>

                <div className="rounded-full bg-[linear-gradient(135deg,#F4F1FF,#FCE7F3)] px-3 py-1 text-xs font-semibold text-[#7B61FF]">
                  Premium
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="relative overflow-hidden rounded-[1.8rem]">
                  <img
                    src="https://images.pexels.com/photos/32074999/pexels-photo-32074999.jpeg"
                    alt="Dasmë"
                    className="h-[360px] w-full object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                      Dasmë
                    </p>
                    <p className="mt-2 text-xl font-bold text-white">
                      Kujtime të ruajtura me elegancë
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="relative overflow-hidden rounded-[1.6rem]">
                    <img
                      src="https://images.pexels.com/photos/7600387/pexels-photo-7600387.jpeg"
                      alt="Ditëlindje"
                      className="h-[172px] w-full object-cover transition duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <p className="text-sm font-semibold text-white">
                        Ditëlindje
                      </p>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.6rem]">
                    <img
                      src="https://images.pexels.com/photos/1652353/pexels-photo-1652353.jpeg"
                      alt="Festë"
                      className="h-[172px] w-full object-cover transition duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <p className="text-sm font-semibold text-white">Festë</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-[#EEE8FF] bg-white/85 px-4 py-4 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9B8BE6]">
                    Qasje
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    Link + QR
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E2F3FF] bg-white/85 px-4 py-4 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#68A9D8]">
                    Ndarje
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    Ngarkim i shpejtë
                  </p>
                </div>

                <div className="rounded-2xl border border-[#FFE3ED] bg-white/85 px-4 py-4 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#E58AAE]">
                    Pamje
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    Stil premium
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}