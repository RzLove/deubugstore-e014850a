import { useCallback, useEffect, useRef, useState } from "react";
import {
  Flame,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Volume2,
  VolumeX,
  ShoppingCart,
  ArrowRight,
  MessagesSquare,
} from "lucide-react";
import { PurchaseModal } from "./PurchaseModal";
import { games } from "@/lib/games";
import { useNavigate } from "@tanstack/react-router";

export function PopularGames() {
  const [selected, setSelected] = useState(0);
  const [muted, setMuted] = useState(true);
  const [fadeKey, setFadeKey] = useState(0);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const current = games[selected];

  const select = (i: number) => {
    if (i === selected) return;
    setSelected(i);
    setFadeKey((k) => k + 1);
  };

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  const toggleFullscreen = () => {
    const el = playerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const [trailerFailed, setTrailerFailed] = useState(false);

  // Reset error state and sync mp4 audio when game or mute changes
  useEffect(() => {
    setTrailerFailed(false);
  }, [selected]);
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted, selected]);

  const trailerKind: "video" | "iframe-drive" | "iframe-yt" | "none" =
    current.trailerVideo
      ? "video"
      : current.trailerIframe
      ? "iframe-drive"
      : current.trailer
      ? "iframe-yt"
      : "none";

  const ytSrc =
    trailerKind === "iframe-yt"
      ? `https://www.youtube.com/embed/${current.trailer}?autoplay=1&mute=${
          muted ? 1 : 0
        }&loop=1&playlist=${current.trailer}&controls=0&modestbranding=1&playsinline=1&rel=0`
      : null;

  const driveSrc =
    trailerKind === "iframe-drive"
      ? `${current.trailerIframe}?autoplay=1`
      : null;

  // Drive iframe cannot be controlled — hide mute button for it
  const canControlAudio = trailerKind === "video" || trailerKind === "iframe-yt";

  return (
    <section className="mx-auto mt-20 max-w-[1280px] px-4 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        {/* Left — pitch */}
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
            <span className="text-primary drop-shadow-[0_0_25px_rgba(124,58,237,0.6)]">
              Deu Bug Store
            </span>
            <br />
            <span className="text-white">a melhor loja</span>
            <br />
            <span className="text-white/50">de produtos digitais</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/60">
            A nossa loja se destaca como a referência no mercado, oferecendo uma ampla
            variedade de produtos digitais com{" "}
            <a className="text-primary underline underline-offset-4">preços competitivos</a>{" "}
            e qualidade incomparável.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() =>
                document
                  .getElementById("catalogo")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-primary px-6 text-sm font-bold text-white shadow-[0_0_30px_-6px_rgba(124,58,237,0.9)] transition hover:bg-primary/90"
            >
              Ver produtos <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => window.open("https://discord.gg/yWTY2Y83Ha", "_blank")}
              className="inline-flex h-12 items-center gap-2 rounded-[10px] border border-white/10 bg-[#0c0c10] px-6 text-sm font-semibold text-white transition hover:border-primary/60"
            >
              <MessagesSquare className="h-4 w-4" /> Discord
            </button>
          </div>
        </div>

        {/* Right — carousel + player */}
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-black text-primary shadow-[0_0_20px_-4px_rgba(124,58,237,0.8)]">
              <Flame className="h-4 w-4" />
            </div>
            <div>
              <div className="font-display text-base font-bold text-white">
                Jogos populares
              </div>
              <div className="text-xs text-white/50">
                Selecione um jogo e assista ao trailer
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/80 text-white backdrop-blur transition hover:border-primary/60 hover:text-primary sm:grid"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] p-3">
              <div
                ref={scrollerRef}
                className="flex gap-3 overflow-x-auto scroll-smooth px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {games.map((g, i) => (
                  <button
                    key={g.id}
                    onClick={() => select(i)}
                    className={`group relative shrink-0 overflow-hidden rounded-[10px] border-2 transition ${
                      i === selected
                        ? "border-primary shadow-[0_0_25px_-2px_rgba(124,58,237,0.9)]"
                        : "border-white/5 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={g.cover}
                      alt={g.name}
                      loading="lazy"
                      width={128}
                      height={192}
                      className="h-[192px] w-[128px] object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Próximo"
              className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/80 text-white backdrop-blur transition hover:border-primary/60 hover:text-primary sm:grid"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Player */}
          <div
            ref={playerRef}
            className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_60px_-20px_rgba(124,58,237,0.7)]"
          >
            {trailerFailed || trailerKind === "none" ? (
              <img
                key={fadeKey}
                src={current.cover}
                alt={current.name}
                className="absolute inset-0 h-full w-full object-cover animate-in fade-in duration-500"
              />
            ) : trailerKind === "video" ? (
              <video
                key={fadeKey}
                ref={videoRef}
                src={current.trailerVideo}
                autoPlay
                muted={muted}
                loop
                playsInline
                onError={() => setTrailerFailed(true)}
                className="absolute inset-0 h-full w-full object-cover animate-in fade-in duration-500"
              />
            ) : trailerKind === "iframe-drive" ? (
              <iframe
                key={fadeKey}
                src={driveSrc!}
                title={`${current.name} trailer`}
                allow="autoplay; fullscreen"
                allowFullScreen
                onError={() => setTrailerFailed(true)}
                className="absolute inset-0 h-full w-full border-0 animate-in fade-in duration-500"
              />
            ) : (
              <iframe
                key={fadeKey}
                src={ytSrc!}
                title={`${current.name} trailer`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
                onError={() => setTrailerFailed(true)}
                className="absolute inset-0 h-[calc(100%+120px)] w-[calc(100%+1px)] -top-[60px] animate-in fade-in duration-500"
              />
            )}

            {/* Top-right controls */}
            <div className="absolute right-3 top-3 z-20 flex gap-2">
              <button
                onClick={toggleFullscreen}
                aria-label="Tela cheia"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-black/70 text-white backdrop-blur transition hover:border-primary/60"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
              {canControlAudio && (
                <button
                  onClick={() => {
                    setMuted((m) => !m);
                    if (trailerKind === "iframe-yt") setFadeKey((k) => k + 1);
                  }}
                  aria-label={muted ? "Ativar som" : "Silenciar"}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white transition hover:bg-primary/90"
                >
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
              )}
            </div>

            {/* Bottom gradient + info */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-end justify-between gap-3 p-5">
              <div>
                <div className="font-display text-xl font-extrabold text-white">
                  {current.name}
                </div>
                <div className="mt-1 font-display text-3xl font-extrabold text-white">
                  {current.discountedPrice}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsPurchaseModalOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-primary px-4 text-sm font-bold text-white shadow-[0_0_24px_-4px_rgba(124,58,237,0.9)] transition hover:bg-primary/90"
                >
                  <ShoppingCart className="h-4 w-4" /> Comprar agora
                </button>
                <button
                  onClick={() =>
                    navigate({ to: "/game/$id", params: { id: current.id.toString() } })
                  }
                  className="inline-flex h-11 items-center rounded-[10px] border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white backdrop-blur transition hover:border-primary/60"
                >
                  Ver mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onOpenChange={setIsPurchaseModalOpen}
        productName={current.name}
      />
    </section>
  );
}
