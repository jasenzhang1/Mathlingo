import dagre, {
  type EdgeLabel,
  type GraphLabel,
  type NodeLabel,
  type Point,
} from "@dagrejs/dagre";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { concepts, domainMeta, type Domain } from "../data/concepts";
import { ancestorCountOf, reducedEdges } from "../lib/prerequisiteGraph";

interface PositionedNode {
  id: string;
  title: string;
  domain: Domain;
  hasLesson: boolean;
  x: number;
  y: number;
  radius: number;
}

interface PositionedEdge {
  source: string;
  target: string;
  points: { x: number; y: number }[];
}

interface Layout {
  nodes: PositionedNode[];
  links: PositionedEdge[];
  neighbors: Map<string, Set<string>>;
  bounds: { x: number; y: number; w: number; h: number };
}

const CHAR_WIDTH = 4.2;

function radiusFor(id: string): number {
  const ancestors = ancestorCountOf.get(id) ?? 0;
  return Math.min(4 + Math.sqrt(ancestors) * 1.6, 14);
}

function computeLayout(domainFilter: Domain | "all"): Layout {
  const nodeList = concepts.filter(
    (c) => domainFilter === "all" || c.domain === domainFilter,
  );
  const nodeIds = new Set(nodeList.map((c) => c.id));
  const edgeList = reducedEdges.filter(
    ([u, v]) => nodeIds.has(u) && nodeIds.has(v),
  );

  const g = new dagre.graphlib.Graph<GraphLabel, NodeLabel, EdgeLabel>();
  g.setGraph({
    rankdir: "TB",
    nodesep: 26,
    ranksep: 56,
    marginx: 20,
    marginy: 20,
  });
  g.setDefaultEdgeLabel(() => ({}));

  // Give dagre just the dot's footprint, not the label's. Reserving full
  // label width would balloon any wide rank (root/leaf ranks can hold 20+
  // nodes) into an enormous width and crush the vertical aspect ratio we
  // actually want. Labels can still overlap a little in dense ranks — hover
  // highlighting and zoom make individual nodes readable regardless.
  for (const c of nodeList) {
    const r = radiusFor(c.id);
    g.setNode(c.id, { width: r * 2 + 6, height: r * 2 + 6 });
  }
  for (const [u, v] of edgeList) {
    g.setEdge(u, v);
  }

  dagre.layout(g);

  const neighbors = new Map<string, Set<string>>();
  for (const id of nodeIds) neighbors.set(id, new Set());
  for (const [u, v] of edgeList) {
    neighbors.get(u)?.add(v);
    neighbors.get(v)?.add(u);
  }

  const nodes: PositionedNode[] = nodeList.map((c) => {
    const label = g.node(c.id);
    return {
      id: c.id,
      title: c.title,
      domain: c.domain,
      hasLesson: Boolean(c.embedUrl),
      x: label.x!,
      y: label.y!,
      radius: radiusFor(c.id),
    };
  });
  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  const links: PositionedEdge[] = edgeList.map(([u, v]) => {
    const edge = g.edge(u, v);
    const points = (edge?.points ?? []).map((p: Point) => ({ x: p.x, y: p.y }));
    if (points.length === 0) {
      const a = nodeById.get(u)!;
      const b = nodeById.get(v)!;
      points.push({ x: a.x, y: a.y }, { x: b.x, y: b.y });
    }
    return { source: u, target: v, points };
  });

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const n of nodes) {
    const rightEdge = n.x + n.radius + 8 + n.title.length * CHAR_WIDTH;
    if (n.x - n.radius < minX) minX = n.x - n.radius;
    if (rightEdge > maxX) maxX = rightEdge;
    if (n.y - n.radius < minY) minY = n.y - n.radius;
    if (n.y + n.radius > maxY) maxY = n.y + n.radius;
  }
  const pad = 30;

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

const domainOptions: { id: Domain | "all"; label: string }[] = [
  { id: "all", label: "All domains" },
  ...(Object.entries(domainMeta) as [Domain, (typeof domainMeta)[Domain]][]).map(
    ([id, meta]) => ({ id, label: meta.label }),
  ),
];

export function ConceptMap() {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState<Domain | "all">("all");
  const layout = useMemo(() => computeLayout(selectedDomain), [selectedDomain]);
  const [viewBox, setViewBox] = useState(layout.bounds);
  const [renderedDomain, setRenderedDomain] = useState(selectedDomain);
  if (renderedDomain !== selectedDomain) {
    setRenderedDomain(selectedDomain);
    setViewBox(layout.bounds);
  }

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
        Math.max(vb.w * factor, layout.bounds.w * 0.05),
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
      return source === hoveredId || target === hoveredId ? 0.85 : 0.06;
    }
    return 0.4;
  }

  return (
    <div className="relative">
      <div className="mb-4 flex flex-wrap gap-2">
        {domainOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setSelectedDomain(opt.id)}
            className={`font-body flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedDomain === opt.id
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--line)] bg-[var(--panel)] text-[var(--ink-soft)] hover:text-[var(--ink)]"
            }`}
          >
            {opt.id !== "all" && (
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: domainMeta[opt.id].color }}
                aria-hidden="true"
              />
            )}
            {opt.label}
          </button>
        ))}
      </div>

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
          aria-label="Map of concepts connected by prerequisite relationships, arranged from earlier topics at the top to later topics at the bottom"
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
            {layout.links.map((link, i) => (
              <polyline
                key={i}
                points={link.points.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="var(--ink-soft)"
                strokeWidth={0.7}
                opacity={linkOpacity(link.source, link.target)}
                markerEnd="url(#arrow)"
              />
            ))}
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
                  <circle
                    r={node.radius + 3.5}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={1.5}
                  />
                )}
                <circle r={node.radius} fill={domainMeta[node.domain].color} />
                <text
                  x={node.radius + 6}
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
        <span>Bigger dot = more prerequisites lead into it</span>
      </div>
    </div>
  );
}
