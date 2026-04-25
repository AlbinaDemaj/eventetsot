export default function WhyChooseUsSection() {
  const benefits = [
    {
      title: "Pa aplikacion shtesë",
      text: "Të ftuarit hyjnë menjëherë përmes linkut ose kodit QR, pa shkarkime dhe pa hapa të panevojshëm.",
      accent: "from-[#7B61FF] to-[#A78BFA]",
      bg: "bg-[#FAF8FF]",
      border: "border-[#E9E2FF]",
      icon: "✦",
    },
    {
      title: "Ngarkim i menjëhershëm",
      text: "Foto dhe video ndahen shpejt në një rrjedhë të thjeshtë dhe të bukur për çdo lloj eventi.",
      accent: "from-[#6EC3F4] to-[#93C5FD]",
      bg: "bg-[#F3FAFF]",
      border: "border-[#DDF2FF]",
      icon: "↑",
    },
    {
      title: "Album i organizuar",
      text: "Çdo kujtim ruhet në një vend të vetëm me një pamje moderne, të pastër dhe të kuruar bukur.",
      accent: "from-[#F8A5C2] to-[#FBCFE8]",
      bg: "bg-[#FFF5F8]",
      border: "border-[#FFE1EB]",
      icon: "♡",
    },
    {
      title: "Pamje elegante",
      text: "Nga dasmat te eventet private, platforma krijon një përvojë që duket bukur dhe ndihet premium.",
      accent: "from-[#FDBA74] to-[#FED7AA]",
      bg: "bg-[#FFF8F1]",
      border: "border-[#FDE7CC]",
      icon: "✧",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.08),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(248,165,194,0.08),transparent_24%),linear-gradient(to_bottom,#ffffff,#f9f9ff)]" />
      <div className="absolute left-[-90px] top-[-40px] h-[220px] w-[220px] rounded-full bg-[#7B61FF]/10 blur-3xl" />
      <div className="absolute right-[-70px] bottom-[-50px] h-[220px] w-[220px] rounded-full bg-[#F8A5C2]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          {/* LEFT */}
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-[#E7DEFF] bg-white/85 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-[0_10px_30px_rgba(123,97,255,0.08)] backdrop-blur-xl">
              Pse të na zgjedhësh
            </span>

            <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-[#0F172A] sm:text-5xl">
              Një përvojë që
              <br />
              duket{" "}
              <span className="bg-[linear-gradient(135deg,#7B61FF_0%,#8F7DFF_30%,#6EC3F4_70%,#F8A5C2_100%)] bg-clip-text text-transparent">
                më elegante
              </span>{" "}
              në çdo detaj
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Platforma nuk është vetëm e lehtë për t’u përdorur, por krijon
              edhe një ndjesi moderne, të pastër dhe premium për ty dhe për
              të gjithë të ftuarit.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#7B61FF]" />
                <p className="text-sm font-semibold text-slate-800">
                  Hyrje e shpejtë me link ose kod QR
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#6EC3F4]" />
                <p className="text-sm font-semibold text-slate-800">
                  Foto dhe video në një vend të vetëm
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F8A5C2]" />
                <p className="text-sm font-semibold text-slate-800">
                  Pamje moderne dhe premium për çdo event
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2.8rem] bg-[radial-gradient(circle_at_top,rgba(123,97,255,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.14),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(248,165,194,0.12),transparent_40%)] blur-3xl" />

            <div className="relative grid gap-5 sm:grid-cols-2">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-[2rem] border ${item.border} ${item.bg} p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(123,97,255,0.10)]`}
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/30 blur-2xl" />

                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-xl font-bold text-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="relative mt-5 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="relative mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>

                  <div className="relative mt-6 h-1.5 w-14 rounded-full bg-gradient-to-r from-[#7B61FF] via-[#6EC3F4] to-[#F8A5C2]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}