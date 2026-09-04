import dagre, {
  type EdgeLabel,
  type GraphLabel,
  type NodeLabel,
  type Point,
} from "@dagrejs/dagre";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { concepts, domainMeta, type Domain } from "../data/concepts";
import { ancestorCountOf, reducedEdges } from "../lib/prerequisiteGraph";
import {
  MAX_PROFICIENCY,
  fillSegmentPath,
  proficiencyRatio,
} from "../lib/proficiencyFill";
import { useAuth } from "../lib/auth/useAuth";
import { useProficiency } from "../lib/useProficiency";

interface PositionedNode {
  id: string;
  title: string;
  domain: Domain;
  hasLesson: boolean;
  /** Centre of the circle. The label hangs directly below it. */
  x: number;
  y: number;
  radius: number;
  /** Title split into the lines drawn under the circle. */
  lines: string[];
  /** Width of the widest label line. */
  labelW: number;
  /** Footprint reserved in the layout: circle, gap and every label line. */
  boxW: number;
  boxH: number;
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

const FONT_SIZE = 6.5;
const LINE_HEIGHT = 7.4;
/** Average glyph advance at FONT_SIZE, used to measure labels without a DOM. */
const CHAR_WIDTH = 3.45;
/** Labels wrap rather than grow past this; a long single word may still exceed it. */
const MAX_LABEL_WIDTH = 68;
/** Circle bottom to the top of the first line of text. */
const LABEL_GAP = 3;
/** Slack around the circle so the "lesson available" ring stays inside the box. */
const RING_PAD = 4.5;

function textWidth(text: string): number {
  return text.length * CHAR_WIDTH;
}

/** Greedy wrap: fill each line until the next word would cross `limit`. */
function wrapAt(words: string[], limit: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && textWidth(candidate) > limit) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Wrap a title into the block drawn under its circle. A plain greedy pass
 * leaves a stubby last line ("Principal / Component / Analysis / (Matrix)");
 * re-wrapping at the average width the same line count allows evens the block
 * out, which reads better as a single shape under the dot.
 */
function wrapTitle(title: string): string[] {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [title];

  const lines = wrapAt(words, MAX_LABEL_WIDTH);
  if (lines.length < 2) return lines;

  const longestWord = Math.max(...words.map(textWidth));
  const balanced = Math.max(longestWord, textWidth(title) / lines.length);
  const evened = wrapAt(words, balanced);
  return evened.length === lines.length ? evened : lines;
}

function radiusFor(id: string): number {
  const ancestors = ancestorCountOf.get(id) ?? 0;
  return Math.min(4 + Math.sqrt(ancestors) * 1.6, 14);
}

/** The label block's own width, and the whole circle-plus-label footprint. */
function boxFor(radius: number, lines: string[]) {
  const labelW = Math.max(...lines.map(textWidth));
  return {
    labelW,
    boxW: Math.max((radius + RING_PAD) * 2, labelW + 4),
    boxH: (radius + RING_PAD) * 2 + LABEL_GAP + lines.length * LINE_HEIGHT,
  };
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
    nodesep: 10,
    ranksep: 34,
    marginx: 20,
    marginy: 20,
  });
  g.setDefaultEdgeLabel(() => ({}));

  // A node is the circle *and* its wrapped label — one picture. Handing dagre
  // that whole footprint is what keeps edges out of the text: routing goes
  // around the box, and an edge's endpoints land on the box border rather
  // than crossing it. Wrapping is what keeps the cost affordable; a label laid
  // out on one line would make wide ranks (20+ nodes) absurdly wide.
  const boxes = new Map<
    string,
    { lines: string[]; labelW: number; boxW: number; boxH: number }
  >();
  for (const c of nodeList) {
    const lines = wrapTitle(c.title);
    const box = { lines, ...boxFor(radiusFor(c.id), lines) };
    boxes.set(c.id, box);
    g.setNode(c.id, { width: box.boxW, height: box.boxH });
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
    const box = boxes.get(c.id)!;
    const radius = radiusFor(c.id);
    return {
      id: c.id,
      title: c.title,
      domain: c.domain,
      hasLesson: Boolean(c.embedUrl),
      // dagre centres the box; the circle sits at the top of it, label below.
      x: label.x!,
      y: label.y! - box.boxH / 2 + radius + RING_PAD,
      radius,
      lines: box.lines,
      labelW: box.labelW,
      boxW: box.boxW,
      boxH: box.boxH,
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
    const top = n.y - n.radius - RING_PAD;
    minX = Math.min(minX, n.x - n.boxW / 2);
    maxX = Math.max(maxX, n.x + n.boxW / 2);
    minY = Math.min(minY, top);
    maxY = Math.max(maxY, top + n.boxH);
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

type ViewBox = Layout["bounds"];

function centredOn(bounds: ViewBox, w: number, h: number): ViewBox {
  return {
    x: bounds.x + (bounds.w - w) / 2,
    y: bounds.y + (bounds.h - h) / 2,
    w,
    h,
  };
}

/**
 * Every view we build carries the viewport's own aspect ratio (width /
 * height), so `preserveAspectRatio` has nothing to letterbox and the viewBox
 * is exactly what you see. Aspect is null until the SVG has been measured.
 *
 * fitViewOf is the whole graph with blank margin on one axis — the zoomed-all-
 * the-way-out limit. coverViewOf is the opposite: no blank margin, the graph
 * cropped on one axis instead. The graph is roughly 3:1, so on a wide screen
 * the two are close, while on a phone fitting it would spend most of the
 * screen on emptiness. Cropping and letting people pan is the better trade.
 */
function fitViewOf(bounds: ViewBox, aspect: number | null): ViewBox {
  if (aspect === null) return bounds;
  const w = Math.max(bounds.w, bounds.h * aspect);
  return centredOn(bounds, w, w / aspect);
}

function coverViewOf(bounds: ViewBox, aspect: number | null): ViewBox {
  if (aspect === null) return bounds;
  const w = Math.min(bounds.w, bounds.h * aspect);
  return centredOn(bounds, w, w / aspect);
}

/**
 * Even filled edge to edge the labels are small, so open a step closer still,
 * and let panning and the zoom buttons take it from there.
 */
const INITIAL_EXTENT = 0.7;

function initialViewOf(bounds: ViewBox, aspect: number | null): ViewBox {
  const cover = coverViewOf(bounds, aspect);
  return centredOn(bounds, cover.w * INITIAL_EXTENT, cover.h * INITIAL_EXTENT);
}

const domainOptions: { id: Domain | "all"; label: string }[] = [
  { id: "all", label: "All domains" },
  ...(Object.entries(domainMeta) as [Domain, (typeof domainMeta)[Domain]][]).map(
    ([id, meta]) => ({ id, label: meta.label }),
  ),
];

/** A node's circle: hollow at 0/100, filled from the bottom, solid at 100/100. */
function ProficiencyDot({
  radius,
  color,
  value,
  strokeWidth = 1,
}: {
  radius: number;
  color: string;
  value: number;
  strokeWidth?: number;
}) {
  const fill = fillSegmentPath(radius, proficiencyRatio(value));

  return (
    <>
      <circle r={radius} fill="var(--panel)" />
      {fill && <path d={fill} fill={color} />}
      <circle
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity={value > 0 ? 1 : 0.75}
      />
    </>
  );
}

export function ConceptMap() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { proficiency } = useProficiency();
  const [selectedDomain, setSelectedDomain] = useState<Domain | "all">("all");
  const layout = useMemo(() => computeLayout(selectedDomain), [selectedDomain]);
  const [aspect, setAspect] = useState<number | null>(null);
  // null = "wherever the map opens": derived from the layout and the measured
  // aspect below. Panning and zooming replace it with a concrete box.
  const [viewBox, setViewBox] = useState<ViewBox | null>(null);
  const view = viewBox ?? initialViewOf(layout.bounds, aspect);
  const [renderedDomain, setRenderedDomain] = useState(selectedDomain);
  if (renderedDomain !== selectedDomain) {
    setRenderedDomain(selectedDomain);
    setViewBox(null);
  }

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const dragState = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setAspect(rect.width / rect.height);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const zoom = (factor: number) => {
    const fit = fitViewOf(layout.bounds, aspect);
    const cx = view.x + view.w / 2;
    const cy = view.y + view.h / 2;
    const w = Math.min(Math.max(view.w * factor, fit.w * 0.05), fit.w * 2.5);
    const h = w * (view.h / view.w);
    setViewBox({ x: cx - w / 2, y: cy - h / 2, w, h });
  };

  const resetView = () => setViewBox(null);

  const onBackgroundPointerDown = (e: React.PointerEvent<SVGRectElement>) => {
    (e.target as SVGRectElement).setPointerCapture(e.pointerId);
    dragState.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const onBackgroundPointerMove = (e: React.PointerEvent<SVGRectElement>) => {
    if (!dragState.current || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scale = view.w / rect.width;
    const dx = (e.clientX - dragState.current.x) * scale;
    const dy = (e.clientY - dragState.current.y) * scale;
    dragState.current = { x: e.clientX, y: e.clientY };
    setViewBox((vb) => {
      const cur = vb ?? view;
      return { ...cur, x: cur.x - dx, y: cur.y - dy };
    });
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
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="mb-3 flex shrink-0 gap-2 overflow-x-auto pb-1">
        {domainOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setSelectedDomain(opt.id)}
            className={`font-body flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
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

      <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search concepts…"
          className="font-body w-full min-w-0 max-w-xs rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <div className="font-body flex shrink-0 items-center gap-2 text-sm">
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

      <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-sm">
        <svg
          ref={svgRef}
          viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
          className="h-full w-full touch-none"
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
                <title>{`${node.title} — proficiency ${Math.round(
                  proficiency.get(node.id) ?? 0,
                )}/${MAX_PROFICIENCY}`}</title>
                {node.hasLesson && (
                  <circle
                    r={node.radius + 3.5}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={1.5}
                  />
                )}
                <ProficiencyDot
                  radius={node.radius}
                  color={domainMeta[node.domain].color}
                  value={proficiency.get(node.id) ?? 0}
                />
                {/* Paper behind the label: reserving the footprint keeps
                    edges off it in the common case, but a long diagonal
                    between ranks can still sweep across, and the node should
                    read as one opaque picture when it does. */}
                <rect
                  x={-node.labelW / 2 - 2}
                  y={node.radius + RING_PAD + LABEL_GAP - 1}
                  width={node.labelW + 4}
                  height={node.lines.length * LINE_HEIGHT + 2}
                  rx={1.5}
                  fill="var(--panel)"
                />
                <text
                  x={0}
                  y={node.radius + RING_PAD + LABEL_GAP + FONT_SIZE * 0.8}
                  fontSize={FONT_SIZE}
                  textAnchor="middle"
                  fill="var(--ink)"
                  className="font-body select-none"
                >
                  {node.lines.map((line, i) => (
                    <tspan key={i} x={0} dy={i === 0 ? 0 : LINE_HEIGHT}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="font-body mt-3 flex shrink-0 gap-x-5 overflow-x-auto pb-1 text-xs text-[var(--ink-soft)]">
        {(Object.entries(domainMeta) as [Domain, (typeof domainMeta)[Domain]][]).map(
          ([domain, meta]) => (
            <span key={domain} className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: meta.color }}
                aria-hidden="true"
              />
              {meta.label}
            </span>
          ),
        )}
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full border-[1.5px]"
            style={{ borderColor: "var(--accent)" }}
            aria-hidden="true"
          />
          Lesson available
        </span>
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
          {[0, 50, MAX_PROFICIENCY].map((value) => (
            <svg key={value} width={14} height={14} aria-hidden="true">
              <g transform="translate(7, 7)">
                <ProficiencyDot
                  radius={5.5}
                  color="var(--ink-soft)"
                  value={value}
                />
              </g>
            </svg>
          ))}
          How full = your proficiency, 0/100 to {MAX_PROFICIENCY}/{MAX_PROFICIENCY}
        </span>
        <span className="shrink-0 whitespace-nowrap">
          Bigger dot = more prerequisites lead into it
        </span>
        {!user && (
          <span className="shrink-0 whitespace-nowrap">
            Sign in to see your own progress on the map.
          </span>
        )}
      </div>
    </div>
  );
}
