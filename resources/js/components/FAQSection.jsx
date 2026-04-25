import { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      question: "A duhet të shkarkohet ndonjë aplikacion?",
      answer:
        "Jo, nuk ka nevojë për asnjë aplikacion shtesë. Të ftuarit mund të hyjnë direkt përmes linkut ose kodit QR dhe të ndajnë foto e video menjëherë nga telefoni i tyre.",
    },
    {
      question: "Si hyjnë të ftuarit në event?",
      answer:
        "Pas krijimit të eventit, ti merr një link unik dhe një kod QR. Mjafton t’ua dërgosh të ftuarve dhe ata mund të hyjnë menjëherë në faqen e eventit.",
    },
    {
      question: "A mund të ngarkohen edhe video, apo vetëm foto?",
      answer:
        "Po, platforma mbështet si foto ashtu edhe video. Kështu çdo moment i rëndësishëm ruhet në një vend të vetëm, në mënyrë të organizuar dhe elegante.",
    },
    {
      question: "A janë private eventet dhe kujtimet e ngarkuara?",
      answer:
        "Po, privatësia është shumë e rëndësishme. Eventet reale, kodet dhe përmbajtja nuk shfaqen publikisht në homepage. Çdo event menaxhohet në hapësirën e vet.",
    },
    {
      question: "Për çfarë lloj eventesh mund të përdoret?",
      answer:
        "Platforma është ideale për dasma, ditëlindje, fejesa, festa familjare, evente private dhe organizime të tjera ku dëshiron të ruash kujtimet në mënyrë të bukur.",
    },
    {
      question: "A funksionon mirë edhe në telefon?",
      answer:
        "Po, platforma është menduar të funksionojë shumë mirë në telefon, tablet dhe desktop, që përdorimi të jetë i thjeshtë dhe i këndshëm për çdo të ftuar.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-[#fcfbff] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(123,97,255,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(248,165,194,0.16),transparent_24%),radial-gradient(circle_at_center,rgba(110,195,244,0.12),transparent_28%),linear-gradient(to_bottom,#fff,#faf7ff)]" />

      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#7B61FF]/20 blur-3xl" />
      <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-[#F8A5C2]/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-60 w-60 -translate-x-1/2 rounded-full bg-[#6EC3F4]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#E6DAFF] bg-white/80 px-4 py-2 text-sm font-semibold text-[#7B61FF] shadow-sm backdrop-blur">
              Pyetje të shpeshta
            </span>

            <h2 className="mt-6 text-3xl font-black tracking-[-0.04em] text-[#111827] sm:text-4xl lg:text-5xl">
              Gjithçka që duhet të dish
              <span className="mt-2 block bg-gradient-to-r from-[#7B61FF] via-[#A78BFA] to-[#F28BB3] bg-clip-text text-transparent">
                për eventin tënd dixhital
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-[#6B7280] sm:text-lg">
              Përgjigje të qarta dhe të shpejta për mënyrën si funksionon
              platforma, si hyjnë të ftuarit, si ruhen kujtimet dhe si
              menaxhohet privatësia e çdo eventi.
            </p>

            <div className="mt-8 rounded-[1.8rem] border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_rgba(123,97,255,0.10)] backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#7B61FF]" />
                <div className="h-3 w-3 rounded-full bg-[#F8A5C2]" />
                <div className="h-3 w-3 rounded-full bg-[#6EC3F4]" />
              </div>

              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#7B61FF]/80">
                E thjeshtë • moderne • e bukur
              </p>

              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                Krijuar për evente ku dëshiron që çdo i ftuar të ndajë
                momentet e veta me lehtësi, ndërsa ti i ruan të gjitha kujtimet
                në një vend elegant dhe të organizuar.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              const faqNumber = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={index}
                  className={`group overflow-hidden rounded-[1.7rem] border transition-all duration-300 ${
                    isOpen
                      ? "border-[#DDCFFF] bg-white shadow-[0_20px_50px_rgba(123,97,255,0.14)]"
                      : "border-[#F1EAFB] bg-white/85 shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-0.5 hover:border-[#E4D6FF] hover:shadow-[0_18px_40px_rgba(123,97,255,0.10)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-6 sm:py-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7B61FF] to-[#A78BFA] text-sm font-bold text-white shadow-[0_10px_25px_rgba(123,97,255,0.25)]">
                      {faqNumber}
                    </div>

                    <div className="flex-1 pt-1">
                      <h3 className="text-[15px] font-semibold leading-7 text-[#111827] sm:text-[17px]">
                        {item.question}
                      </h3>
                    </div>

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-[#DCCFFF] bg-gradient-to-br from-[#F3EEFF] to-[#FFF0F6] text-[#7B61FF]"
                          : "border-[#EEE8FA] bg-white text-[#7B61FF] group-hover:border-[#DACBFF] group-hover:bg-[#FAF7FF]"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[#F5EFFC] bg-gradient-to-r from-[#FCFAFF] to-[#FFF9FC] px-5 pb-6 pt-4 sm:px-6">
                        <p className="pl-0 text-sm leading-8 text-[#6B7280] sm:pl-16 sm:text-[15px]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}