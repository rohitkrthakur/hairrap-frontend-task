interface HeroProps {
  title: string;
  subtitle?: string;
  background?: string;
}

export default function Hero({
  title,
  subtitle,
  background = "/assets/bg.jpg",
}: HeroProps) {
  return (
    <section
      className="relative h-56 w-full flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
