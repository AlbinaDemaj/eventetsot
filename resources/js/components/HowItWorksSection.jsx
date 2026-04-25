export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Krijo eventin",
      text: "Hap eventin tënd në pak sekonda dhe përgatit një hapësirë elegante ku do të ruhen të gjitha kujtimet e bukura.",
      badge: "Hap i shpejtë",
      accent: "from-[#7B61FF] to-[#A78BFA]",
      soft: "bg-[#F4F1FF]",
      textColor: "text-[#7B61FF]",
      border: "border-[#E7DEFF]",
    },
    {
      number: "02",
      title: "Ndaj linkun ose kodin QR",
      text: "Të ftuarit hyjnë menjëherë përmes linkut ose kodit QR, pa aplikacione shtesë dhe pa hapa të komplikuar.",
      badge: "Qasje e lehtë",
      accent: "from-[#6EC3F4] to-[#93C5FD]",
      soft: "bg-[#EEF8FF]",
      textColor: "text-[#4C9FD1]",
      border: "border-[#DDF2FF]",
    },
    {
      number: "03",
      title: "Mblidh çdo kujtim",
      text: "Foto dhe video mblidhen në një galeri moderne, private dhe të bukur, gati për t’u parë nga të gjithë të ftuarit.",
      badge: "Kujtime të ruajtura",
      accent: "from-[#F8A5C2] to-[#FBCFE8]",
      soft: "bg-[#FFF1F6]",
      textColor: "text-[#E07AA5]",
      border: "border-[#FFD9E7]",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(110,195,244,0.08),transparent_24%),linear-gradient(to_bottom,#ffffff,#f8faff)]" />
      <div className="absolute left-[-80px] top-[8%] h-[220px] w-[220px] rounded-full bg-[#7B61FF]/10 blur-3xl" />
      <div className="absolute right-[-70px] bottom-[10%] h-[220px] w-[220px] rounded-full bg-[#F8A5C2]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#E7DEFF] bg-white px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm">
            Si funksionon
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-[#111827] sm:text-5xl">
            Vetëm{" "}
            <span className="bg-[linear-gradient(135deg,#7B61FF,#6EC3F4,#F8A5C2)] bg-clip-text text-transparent">
              3 hapa të thjeshtë
            </span>{" "}
            për të ruajtur çdo moment
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#6B7280]">
            Një rrjedhë e thjeshtë, elegante dhe moderne që e bën ndarjen e
            kujtimeve shumë të lehtë për ty dhe për të gjithë të ftuarit.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-16 hidden h-[2px] bg-[linear-gradient(90deg,rgba(123,97,255,0.18),rgba(110,195,244,0.18),rgba(248,165,194,0.18))] lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`relative rounded-[2rem] border ${step.border} bg-white/90 p-7 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(123,97,255,0.10)]`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`inline-flex rounded-full bg-gradient-to-r ${step.accent} px-4 py-2 text-xs font-semibold text-white shadow-sm`}
                  >
                    {step.badge}
                  </span>

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${step.soft} text-base font-bold ${step.textColor}`}
                  >
                    {step.number}
                  </div>
                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#111827]">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#6B7280]">
                  {step.text}
                </p>

                <div className="mt-8 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#7B61FF] via-[#6EC3F4] to-[#F8A5C2]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}