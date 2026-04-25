export default function EventTypesSection() {
  const eventTypes = [
    {
      title: "Dasma",
      subtitle: "Momente elegante dhe kujtime që mbesin përjetë",
      image:
        "https://images.pexels.com/photos/32074999/pexels-photo-32074999.jpeg",
      badge: "Dasmë",
      accent: "from-[#7B61FF]/90 to-[#A78BFA]/90",
    },
    {
      title: "Ditëlindje",
      subtitle: "Festime plot gëzim me njerëzit më të afërt",
      image:
        "https://images.pexels.com/photos/7600387/pexels-photo-7600387.jpeg",
      badge: "Ditëlindje",
      accent: "from-[#6EC3F4]/90 to-[#93C5FD]/90",
    },
    {
      title: "Fejesa & Festa",
      subtitle: "Ruaj atmosferën, emocionin dhe çdo moment të bukur",
      image:
        "https://images.pexels.com/photos/1652353/pexels-photo-1652353.jpeg",
      badge: "Festë",
      accent: "from-[#F8A5C2]/90 to-[#FBCFE8]/90",
    },
    {
      title: "Evente private",
      subtitle: "Një prezantim premium për çdo organizim special",
      image:
        "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
      badge: "Privat",
      accent: "from-[#FDBA74]/90 to-[#FED7AA]/90",
    },
  ];

  const tags = [
    {
      label: "Dasma",
      bg: "bg-[#F4F1FF]",
      text: "text-[#6D55F6]",
      border: "border-[#E4DBFF]",
      hover: "hover:bg-[#7B61FF] hover:text-white hover:border-[#7B61FF]",
    },
    {
      label: "Ditëlindje",
      bg: "bg-[#EEF8FF]",
      text: "text-[#3498DB]",
      border: "border-[#D8EEFF]",
      hover: "hover:bg-[#56B6F7] hover:text-white hover:border-[#56B6F7]",
    },
    {
      label: "Fejesa",
      bg: "bg-[#FFF1F6]",
      text: "text-[#E87AA6]",
      border: "border-[#FFDCE8]",
      hover: "hover:bg-[#F59AB8] hover:text-white hover:border-[#F59AB8]",
    },
    {
      label: "Festa",
      bg: "bg-[#FFF4E8]",
      text: "text-[#F29A38]",
      border: "border-[#FFE1BF]",
      hover: "hover:bg-[#FFB86B] hover:text-white hover:border-[#FFB86B]",
    },
    {
      label: "Evente private",
      bg: "bg-[#F6F4FF]",
      text: "text-[#7B61FF]",
      border: "border-[#E8DFFF]",
      hover: "hover:bg-[#8A6FFF] hover:text-white hover:border-[#8A6FFF]",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#fcfbff] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.10),transparent_22%),linear-gradient(to_bottom,#ffffff,#f8f8ff)]" />
      <div className="absolute left-[-100px] top-[-40px] h-[220px] w-[220px] rounded-full bg-[#7B61FF]/10 blur-3xl" />
      <div className="absolute right-[-70px] bottom-[-50px] h-[220px] w-[220px] rounded-full bg-[#F8A5C2]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#E5DDFF] bg-white/85 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-[0_10px_30px_rgba(123,97,255,0.08)] backdrop-blur-xl">
            Ideale për çdo festë
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-[-0.04em] text-[#0F172A] sm:text-5xl">
            E krijuar për{" "}
            <span className="bg-[linear-gradient(135deg,#7B61FF_0%,#8F7DFF_30%,#6EC3F4_70%,#F8A5C2_100%)] bg-clip-text text-transparent">
              çdo lloj eventi
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Nga dasmat te ditëlindjet dhe eventet private, krijo një përvojë
            elegante ku çdo moment ruhet bukur dhe ndahet lehtë me të ftuarit.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {eventTypes.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]"
            >
              <div className="relative h-[430px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.80),rgba(15,23,42,0.26),transparent)]" />

                <div className="absolute left-5 top-5">
                  <span
                    className={`rounded-full bg-gradient-to-r ${item.accent} px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg`}
                  >
                    {item.badge}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-[1.7rem] font-bold leading-tight text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/80">
                    {item.subtitle}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition duration-300 group-hover:bg-white/20">
                    Shiko stilin
                    <span className="transition duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {tags.map((item, i) => (
            <button
              key={i}
              className={`rounded-full border px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)] ${item.bg} ${item.text} ${item.border} ${item.hover}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}