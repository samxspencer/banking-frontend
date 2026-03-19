export default function About() {
  return (
    <div className="min-h-screen bg-cream pt-32 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-semibold tracking-wide text-brown mb-12">
          About BankingCore
        </h1>

        {/* Content Block */}
        <div className="bg-white/80 backdrop-blur-sm border border-brown/10 rounded-xl p-12 shadow-sm space-y-10">

          <p className="text-lg leading-relaxed text-brown">
            BankingCore is a full‑stack financial architecture built to
            demonstrate secure, structured account management with clarity and
            restraint.
          </p>

          <p className="text-lg leading-relaxed text-brown/80">
            Designed with a British heritage private banking aesthetic, the
            system integrates Spring Boot and React into a disciplined
            financial infrastructure that prioritises stability, precision, and
            institutional control.
          </p>

          <p className="text-lg leading-relaxed text-brown/80">
            The visual language reflects private wealth management principles —
            understated typography, burgundy accents, ivory foundations, and
            carefully balanced spacing.
          </p>

        </div>
      </div>
    </div>
  );
}