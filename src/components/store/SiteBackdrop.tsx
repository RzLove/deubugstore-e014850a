/**
 * Global decorative backdrop: circuit traces, glitch pixels, radial glows.
 * Fixed behind all content, non-interactive, all CSS/SVG (no images).
 */
export function SiteBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050508]"
    >
      {/* Radial glows */}
      <div className="absolute -left-40 top-[10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_70%)] blur-2xl" />
      <div className="absolute right-[-10%] top-[40%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(57,255,20,0.10),transparent_70%)] blur-2xl" />
      <div className="absolute left-[30%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.12),transparent_70%)] blur-2xl" />

      {/* Circuit board pattern (SVG, tiled) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.45]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit"
            width="220"
            height="220"
            patternUnits="userSpaceOnUse"
          >
            <g
              fill="none"
              stroke="#2A2638"
              strokeWidth="1"
            >
              <path d="M0 40 H80 V10 H160 V70 H220" />
              <path d="M0 120 H40 V180 H140 V140 H220" />
              <path d="M30 0 V60 H110 V120" />
              <path d="M180 0 V40 H200 V100" />
              <path d="M70 220 V170 H150 V200 H220" />
            </g>
            <g fill="#2A2A36">
              <circle cx="80" cy="10" r="2" />
              <circle cx="160" cy="70" r="2" />
              <circle cx="40" cy="180" r="2" />
              <circle cx="140" cy="140" r="2" />
              <circle cx="110" cy="120" r="2" />
              <circle cx="200" cy="100" r="2" />
              <circle cx="150" cy="200" r="2" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Edge fade so circuit is subtler in the center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050508_85%)]" />

      {/* Glitch pixel fragments */}
      <div className="absolute inset-0">
        {[
          { c: "left-[2%] top-[8%] w-10 h-1.5 bg-primary", d: "0s" },
          { c: "left-[4%] top-[22%] w-6 h-1 bg-neon-cyan", d: "0.4s" },
          { c: "left-[1%] top-[55%] w-12 h-1 bg-neon-green", d: "1.1s" },
          { c: "left-[3%] top-[78%] w-8 h-1.5 bg-neon-red", d: "0.7s" },
          { c: "left-[6%] bottom-[6%] w-10 h-1 bg-primary", d: "1.6s" },
          { c: "right-[2%] top-[12%] w-10 h-1.5 bg-neon-green", d: "0.2s" },
          { c: "right-[5%] top-[33%] w-6 h-1 bg-neon-red", d: "1.3s" },
          { c: "right-[3%] top-[60%] w-12 h-1 bg-neon-cyan", d: "0.9s" },
          { c: "right-[6%] bottom-[18%] w-8 h-1.5 bg-primary", d: "0.5s" },
          { c: "right-[2%] bottom-[4%] w-10 h-1 bg-neon-green", d: "1.8s" },
          { c: "left-[40%] top-[3%] w-4 h-1 bg-neon-cyan", d: "1.0s" },
          { c: "left-[55%] bottom-[3%] w-6 h-1 bg-primary", d: "0.6s" },
        ].map((p, i) => (
          <span
            key={i}
            className={`absolute opacity-40 ${p.c}`}
            style={{ animation: `glitch-blink 4s ${p.d} infinite steps(1)` }}
          />
        ))}
      </div>
    </div>
  );
}
