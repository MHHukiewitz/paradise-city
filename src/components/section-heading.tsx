export function SectionHeading({
  kicker,
  title,
  lead,
  light = false,
}: {
  kicker: string;
  title: string;
  lead?: string;
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${light ? "text-sand" : ""}`}>
      <p className={`font-label text-[11px] ${light ? "text-gold" : "text-sunset"}`}>{kicker}</p>
      <h2 className={`mt-3 text-3xl leading-tight font-medium sm:text-4xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {lead ? (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-sand/80" : "text-muted-foreground"}`}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
