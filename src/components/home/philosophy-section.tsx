const pillars = [
  {
    title: 'Biophilic Design',
    body: 'Every space integrates living elements — light, air, greenery, and organic forms — to foster wellbeing and a deep connection with nature.',
  },
  {
    title: 'Community-Centric Planning',
    body: 'We design neighbourhoods, not just buildings. Shared spaces, walkable streets, and thoughtful density bring communities together.',
  },
  {
    title: 'Built to Last',
    body: '25+ years of engineering excellence means every structure meets the highest standards of quality, safety, and longevity.',
  },
]

export function PhilosophySection() {
  return (
    <section
      className="py-20 md:py-28 bg-[#1A1F2E]"
      aria-labelledby="philosophy-heading"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image / visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#3D6B35]/30 via-[#242938] to-[#0F1117]">
              {/* Green accent line */}
              <div className="absolute left-0 top-8 bottom-8 w-1 bg-[#3D6B35] rounded-r-full" aria-hidden="true" />

              {/* Pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 70%, #3D6B35 0%, transparent 60%),
                                    radial-gradient(circle at 70% 30%, #C9A96E 0%, transparent 60%)`,
                }}
                aria-hidden="true"
              />

              {/* Quote card */}
              <div className="absolute bottom-8 left-8 right-8 bg-[#0F1117]/80 backdrop-blur-sm border border-[#2E3447] rounded-xl p-6">
                <p className="font-serif text-xl text-[#F5F0E8] italic leading-relaxed mb-3">
                  "To be a benchmark of excellence and creativity in construction."
                </p>
                <p className="font-sans text-xs tracking-widest uppercase text-[#C9A96E]">
                  — Axis Concept Mission
                </p>
              </div>
            </div>

            {/* Floating stat */}
            <div className="absolute -top-6 -right-6 hidden lg:flex flex-col items-center justify-center w-28 h-28 rounded-full bg-[#C9A96E] shadow-[0_8px_32px_rgba(201,169,110,0.3)]">
              <span className="font-serif text-3xl text-[#0F1117] font-semibold">20%</span>
              <span className="font-sans text-[10px] text-[#0F1117]/70 text-center leading-tight">YoY Growth</span>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-4">
              Our Philosophy
            </p>
            <h2
              id="philosophy-heading"
              className="font-serif text-4xl md:text-5xl text-[#F5F0E8] leading-tight mb-6"
            >
              Design That <em className="not-italic text-[#3D6B35]">Breathes</em>
            </h2>
            <p className="font-sans text-base text-[#A89F94] leading-relaxed mb-10">
              At Axis Concept, we believe the built environment should mirror the natural world.
              Our biophilic approach isn&apos;t an aesthetic choice — it&apos;s a commitment to the
              health, happiness, and longevity of everyone who lives and works in our spaces.
            </p>

            {/* Pillars */}
            <ul className="space-y-6" role="list">
              {pillars.map(({ title, body }) => (
                <li key={title} className="flex gap-4">
                  <div className="mt-1.5 w-1 shrink-0 rounded-full bg-[#3D6B35]" aria-hidden="true" />
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-[#F5F0E8] mb-1">{title}</h3>
                    <p className="font-sans text-sm text-[#A89F94] leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
