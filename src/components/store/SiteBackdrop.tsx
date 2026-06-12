import bg from "@/assets/deu-bug-fundo-site.png.asset.json";

/**
 * Global site background — official Deu Bug Store artwork.
 * Fixed, cover, with a translucent black overlay for legibility.
 */
export function SiteBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050508]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bg.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
      {/* Legibility overlay — heavier on mobile */}
      <div className="absolute inset-0 bg-black/50 sm:bg-black/35" />
    </div>
  );
}
