import { useEffect, useState } from "react";

export default function HeroSection() {
  const images = [
    {
      src: "https://images.pexels.com/photos/13434417/pexels-photo-13434417.jpeg",
      alt: "Dasmë elegante",
      tag: "Kujtime dasme",
      title: "Dasma të paharrueshme në një galeri elegante",
      description:
        "Ruaj momentet më të bukura të dasmës me një eksperiencë moderne dhe të organizuar për të gjithë të ftuarit.",
    },
    {
      src: "https://images.pexels.com/photos/32333369/pexels-photo-32333369.jpeg",
      alt: "Festë ditëlindjeje",
      tag: "Festë ditëlindjeje",
      title: "Ditëlindje plot gëzim dhe kujtime të bukura",
      description:
        "Lejo miqtë dhe familjen të ndajnë foto dhe video menjëherë në një album të bukur, modern dhe shumë të thjeshtë për t’u përdorur.",
    },
    {
      src: "https://images.pexels.com/photos/1120162/pexels-photo-1120162.jpeg",
      alt: "Party event",
      tag: "Momente feste",
      title: "Festat që meritojnë të ruhen me stil",
      description:
        "Nga momentet spontane te energjia e natës, çdo kujtim mblidhet në një vend elegant dhe modern për t’u rikujtuar gjithmonë.",
    },
    {
      src: "https://images.pexels.com/photos/6405665/pexels-photo-6405665.jpeg",
      alt: "Event profesional",
      tag: "Evente profesionale",
      title: "Evente profesionale me prezantim premium",
      description:
        "Një mënyrë elegante për të mbledhur përmbajtje nga eventet korporative, lansimet dhe organizimet profesionale.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden bg-[#f9f8ff]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.12),transparent_24%),linear-gradient(to_bottom,#fcfcff,#f7f8ff)]" />
      <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#7B61FF]/12 blur-3xl" />
      <div className="absolute right-[-100px] bottom-[-80px] h-[260px] w-[260px] rounded-full bg-[#F8A5C2]/12 blur-3xl" />

      <div className="relative mx-auto grid min-h-[95vh] max-w-7xl items-center gap-14 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E7DEFF] bg-white/90 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#7B61FF]" />
            Përvojë moderne për ndarjen e eventeve
          </div>

          <h1 className="mt-7 text-5xl font-black leading-[0.96] tracking-[-0.04em] text-[#111827] sm:text-6xl lg:text-7xl">
            Mblidh çdo
            <br />
            moment të bukur
            <br />
            në një{" "}
            <span className="bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] bg-clip-text text-transparent">
              eksperiencë elegante
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#667085]">
            Krijo një album modern për eventin tënd ku të ftuarit ndajnë foto dhe
            video menjëherë përmes linkut ose kodit QR. E bukur në pamje, e
            thjeshtë në përdorim dhe perfekte për kujtime që zgjasin përgjithmonë.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(123,97,255,0.22)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(123,97,255,0.30)]"
            >
              Krijo eventin
              <span className="transition duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white px-6 py-3.5 text-sm font-semibold text-[#111827] shadow-sm transition duration-300 hover:bg-[#f8fafc]"
            >
              Shiko demonstrimin
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-[#6B7280]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7B61FF]" />
              Link + Kod QR
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7B61FF]" />
              Foto dhe video
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7B61FF]" />
              Pa nevojë për aplikacion
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.14),transparent_40%)] blur-3xl" />

          <div className="absolute left-8 top-8 z-20 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#7B61FF] shadow-[0_12px_30px_rgba(17,24,39,0.08)] backdrop-blur-xl">
            EKSPERIENCË ELEGANTE PËR EVENTE
          </div>

          <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white/70 p-3 shadow-[0_30px_80px_rgba(17,24,39,0.12)] backdrop-blur-2xl">
            <div className="relative overflow-hidden rounded-[28px]">
              <div className="relative h-[600px] w-full overflow-hidden">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                      i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(17,24,39,0.58),rgba(17,24,39,0.14),transparent)]" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <div className="max-w-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">
                    {images[index].tag}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-[2rem]">
                    {images[index].title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/80 sm:text-[15px]">
                    {images[index].description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Shko te slajdi ${i + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        i === index ? "w-8 bg-white" : "w-2.5 bg-white/45"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-[20px] border border-[#EEF2F6] bg-white px-4 py-4 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm font-semibold text-[#111827]">Dasma</p>
              </div>

              <div className="rounded-[20px] border border-[#EEF2F6] bg-white px-4 py-4 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm font-semibold text-[#111827]">Ditëlindje</p>
              </div>

              <div className="rounded-[20px] border border-[#EEF2F6] bg-white px-4 py-4 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm font-semibold text-[#111827]">Festa</p>
              </div>

              <div className="rounded-[20px] border border-[#EEF2F6] bg-white px-4 py-4 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <p className="text-sm font-semibold text-[#111827]">Korporata</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}