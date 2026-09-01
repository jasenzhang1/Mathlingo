import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { concepts, domainMeta, type Domain } from "../data/concepts";

interface GraphNode extends SimulationNodeDatum {
  id: string;
  title: string;
  domain: Domain;
  hasLesson: boolean;
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  source: string;
  target: string;
}

interface Layout {
  nodes: GraphNode[];
  links: GraphLink[];
  neighbors: Map<string, Set<string>>;
  bounds: { x: number; y: number; w: number; h: number };
}

function computeLayout(): Layout {
  const nodes: GraphNode[] = concepts.map((c) => ({
    id: c.id,
    title: c.title,
    domain: c.domain,
    hasLesson: Boolean(c.embedUrl),
  }));

  const links: GraphLink[] = concepts.flatMap((c) =>
    c.prerequisites.map((prereqId) => ({ source: prereqId, target: c.id })),
  );

  const neighbors = new Map<string, Set<string>>();
  for (const node of nodes) neighbors.set(node.id, new Set());
  for (const link of links) {
    neighbors.get(link.source)?.add(link.target);
    neighbors.get(link.target)?.add(link.source);
  }

  const simulation = forceSimulation(nodes)
    .force(
      "link",
      forceLink<GraphNode, GraphLink>(links)
        .id((d) => d.id)
        .distance(42)
        .strength(0.5),
    )
    .force("charge", forceManyBody().strength(-85))
    .force("collide", forceCollide(15))
    .force("center", forceCenter(0, 0))
    .stop();

  for (let i = 0; i < 350; i++) simulation.tick();

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const node of nodes) {
    const x = node.x ?? 0;
    const y = node.y ?? 0;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const pad = 40;

  return {
    nodes,
    links,
    neighbors,
    bounds: {
      x: minX - pad,
      y: minY - pad,
      w: maxX - minX + pad * 2,
      h: maxY - minY + pad * 2,
    },
  };
}

export function ConceptMap() {
  const navigate = useNavigate();
  const layout = useMemo(() => computeLayout(), []);
  const [viewBox, setViewBox] = useState(layout.bounds);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const dragState = useRef<{ x: number; y: number } | null>(null);

  const zoom = (factor: number) => {
    setViewBox((vb) => {
      const cx = vb.x + vb.w / 2;
      const cy = vb.y + vb.h / 2;
      const w = Math.min(
        Math.max(vb.w * factor, layout.bounds.w * 0.08),
        layout.bounds.w * 2.5,
      );
      const h = w * (vb.h / vb.w);
      return { x: cx - w / 2, y: cy - h / 2, w, h };
    });
  };

  const resetView = () => setViewBox(layout.bounds);

  const onBackgroundPointerDown = (e: React.PointerEvent<SVGRectElement>) => {
    (e.target as SVGRectElement).setPointerCapture(e.pointerId);
    dragState.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const onBackgroundPointerMove = (e: React.PointerEvent<SVGRectElement>) => {
    if (!dragState.current || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = viewBox.w / rect.width;
    const scaleY = viewBox.h / rect.height;
    const dx = (e.clientX - dragState.current.x) * scaleX;
    const dy = (e.clientY - dragState.current.y) * scaleY;
    dragState.current = { x: e.clientX, y: e.clientY };
    setViewBox((vb) => ({ ...vb, x: vb.x - dx, y: vb.y - dy }));
  };

  const onBackgroundPointerUp = () => {
    dragState.current = null;
    setIsDragging(false);
  };

  const trimmedQuery = query.trim().toLowerCase();
  const matches = trimmedQuery
    ? new Set(
        layout.nodes
          .filter((n) => n.title.toLowerCase().includes(trimmedQuery))
          .map((n) => n.id),
      )
    : null;

  const activeNeighbors = hoveredId ? layout.neighbors.get(hoveredId) : null;

  function nodeOpacity(id: string) {
    if (matches) return matches.has(id) ? 1 : 0.12;
    if (hoveredId) {
      return id === hoveredId || activeNeighbors?.has(id) ? 1 : 0.2;
    }
    return 1;
  }

  function linkOpacity(source: string, target: string) {
    if (hoveredId) {
      return source === hoveredId || target === hoveredId ? 0.8 : 0.06;
    }
    return 0.35;
  }

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search concepts…"
          className="font-body w-full max-w-xs rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <div className="font-body flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => zoom(0.75)}
            aria-label="Zoom in"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)] hover:bg-[var(--accent-soft)]"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => zoom(1.3333)}
            aria-label="Zoom out"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)] hover:bg-[var(--accent-soft)]"
          >
            −
          </button>
          <button
            type="button"
            onClick={resetView}
            className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 text-[var(--ink)] hover:bg-[var(--accent-soft)]"
          >
            Reset view
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-sm">
        <svg
          ref={svgRef}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
          className="h-[70vh] w-full touch-none"
          role="img"
          aria-label="Map of concepts connected by prerequisite relationships"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-soft)" />
            </marker>
          </defs>

          <rect
            x={layout.bounds.x - layout.bounds.w * 2}
            y={layout.bounds.y - layout.bounds.h * 2}
            width={layout.bounds.w * 5}
            height={layout.bounds.h * 5}
            fill="transparent"
            onPointerDown={onBackgroundPointerDown}
            onPointerMove={onBackgroundPointerMove}
            onPointerUp={onBackgroundPointerUp}
            onPointerLeave={onBackgroundPointerUp}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          />

          <g>
            {layout.links.map((link, i) => {
              const source = link.source as unknown as GraphNode;
              const target = link.target as unknown as GraphNode;
              return (
                <line
                  key={i}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="var(--ink-soft)"
                  strokeWidth={0.6}
                  opacity={linkOpacity(source.id, target.id)}
                  markerEnd="url(#arrow)"
                />
              );
            })}
          </g>

          <g>
            {layout.nodes.map((node) => (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onPointerEnter={() => setHoveredId(node.id)}
                onPointerLeave={() => setHoveredId(null)}
                onClick={() => navigate(`/concepts/${node.id}`)}
                opacity={nodeOpacity(node.id)}
                style={{ cursor: "pointer" }}
              >
                {node.hasLesson && (
                  <circle r={9} fill="none" stroke="var(--accent)" strokeWidth={1.5} />
                )}
                <circle r={5.5} fill={domainMeta[node.domain].color} />
                <text
                  x={8}
                  y={3}
                  fontSize={6.5}
                  fill="var(--ink)"
                  className="font-body select-none"
                >
                  {node.title}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="font-body mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--ink-soft)]">
        {(Object.entries(domainMeta) as [Domain, (typeof domainMeta)[Domain]][]).map(
          ([domain, meta]) => (
            <span key={domain} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: meta.color }}
                aria-hidden="true"
              />
              {meta.label}
            </span>
          ),
        )}
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full border-[1.5px]"
            style={{ borderColor: "var(--accent)" }}
            aria-hidden="true"
          />
          Lesson available
        </span>
      </div>
    </div>
  );
}
