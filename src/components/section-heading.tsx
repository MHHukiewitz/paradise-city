export function SectionHeading({
  kicker,
  title,
  lead,
  light = false,
  level = 2,
}: {
  kicker: string;
  title: string;
  lead?: string;
  light?: boolean;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={`max-w-2xl ${light ? "text-sand" : ""}`}>
      <p className={`font-label text-[11px] ${light ? "text-gold" : "text-sunset"}`}>{kicker}</p>
      <Heading className={`mt-3 text-3xl leading-tight font-medium sm:text-4xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </Heading>
      {lead ? (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-sand/80" : "text-muted-foreground"}`}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
