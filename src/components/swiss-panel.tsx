type PanelVariant = "hero" | "bars" | "inventory" | "frames";

const labels: Record<PanelVariant, { index: string; caption: string }> = {
  hero: { index: "16", caption: "GRID / TOPIC QUEUE" },
  bars: { index: "02", caption: "DEMAND INDEX" },
  inventory: { index: "08", caption: "TITLE MAP" },
  frames: { index: "04", caption: "PACKAGING SET" },
};

export function SwissPanel({ variant }: { variant: PanelVariant }) {
  const { index, caption } = labels[variant];

  return (
    <figure className="relative aspect-[4/3] w-full overflow-hidden border border-line/40 bg-card shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <GridLines />
      {variant === "hero" ? <HeroShapes /> : null}
      {variant === "bars" ? <BarShapes /> : null}
      {variant === "inventory" ? <InventoryShapes /> : null}
      {variant === "frames" ? <FrameShapes /> : null}
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
        <span className="font-mono text-[0.75rem] font-medium tracking-[0.14em] text-mute">
          {caption}
        </span>
        <span className="font-mono text-[0.75rem] tracking-[0.08em] text-taupe">{index}</span>
      </figcaption>
    </figure>
  );
}

function GridLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full text-line/25"
      viewBox="0 0 1600 1200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: 17 }, (_, column) => (
        <line
          key={`c-${column}`}
          x1={(column * 1600) / 16}
          y1="0"
          x2={(column * 1600) / 16}
          y2="1200"
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 13 }, (_, row) => (
        <line
          key={`r-${row}`}
          x1="0"
          y1={(row * 1200) / 12}
          x2="1600"
          y2={(row * 1200) / 12}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function HeroShapes() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 1200" aria-hidden="true">
      <circle cx="1180" cy="420" r="260" fill="var(--taupe)" />
      <rect x="180" y="360" width="520" height="16" fill="var(--ink)" />
      <rect x="180" y="420" width="320" height="8" fill="var(--line)" />
      <text
        x="180"
        y="300"
        fill="var(--ink)"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="180"
        fontWeight="700"
        letterSpacing="-8"
      >
        03
      </text>
    </svg>
  );
}

function BarShapes() {
  const bars = [220, 340, 160, 410, 280, 190, 360];
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 1200" aria-hidden="true">
      {bars.map((width, index) => (
        <rect
          key={width}
          x="200"
          y={220 + index * 88}
          width={width * 2.2}
          height="48"
          fill={index === 3 ? "var(--taupe)" : "var(--ink)"}
          opacity={index === 3 ? 1 : 0.82}
        />
      ))}
    </svg>
  );
}

function InventoryShapes() {
  const blocks = [
    { x: 160, y: 200, w: 420, h: 160 },
    { x: 620, y: 200, w: 280, h: 160 },
    { x: 940, y: 200, w: 500, h: 160 },
    { x: 160, y: 400, w: 620, h: 160 },
    { x: 820, y: 400, w: 620, h: 160 },
    { x: 160, y: 600, w: 340, h: 160 },
    { x: 540, y: 600, w: 480, h: 160 },
    { x: 1060, y: 600, w: 380, h: 160 },
  ];
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 1200" aria-hidden="true">
      {blocks.map((block, index) => (
        <rect
          key={`${block.x}-${block.y}`}
          x={block.x}
          y={block.y}
          width={block.w}
          height={block.h}
          fill={index === 4 ? "var(--taupe)" : "transparent"}
          stroke="var(--ink)"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

function FrameShapes() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 1200" aria-hidden="true">
      <rect x="240" y="220" width="640" height="420" fill="none" stroke="var(--ink)" strokeWidth="3" />
      <rect x="520" y="380" width="640" height="420" fill="var(--taupe)" />
      <rect x="520" y="380" width="640" height="420" fill="none" stroke="var(--ink)" strokeWidth="3" />
      <rect x="900" y="180" width="280" height="180" fill="var(--ink)" />
    </svg>
  );
}
