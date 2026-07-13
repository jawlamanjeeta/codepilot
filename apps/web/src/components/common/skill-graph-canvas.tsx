"use client";

import { useEffect, useRef } from "react";

type Mode = "loading" | "idle" | "syncing";

type SkillGraphCanvasProps = {
  progress: number;
  mode: Mode;
  className?: string;
};

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  mastery: number;
};

type Edge = [string, string];

const NODES: Node[] = [
  { id: "bs", label: "Binary Search", x: 0.12, y: 0.5, mastery: 74 },
  { id: "greedy", label: "Greedy", x: 0.28, y: 0.22, mastery: 83 },
  { id: "trees", label: "Trees", x: 0.28, y: 0.78, mastery: 91 },
  { id: "graphs", label: "Graphs", x: 0.5, y: 0.5, mastery: 94 },
  { id: "dp", label: "DP", x: 0.68, y: 0.18, mastery: 41 },
  { id: "treedp", label: "Tree DP", x: 0.86, y: 0.34, mastery: 33 },
  { id: "dijkstra", label: "Dijkstra", x: 0.86, y: 0.66, mastery: 61 },
  { id: "numtheory", label: "Number Theory", x: 0.5, y: 0.88, mastery: 22 },
  { id: "strings", label: "Strings", x: 0.12, y: 0.86, mastery: 58 },
  { id: "geometry", label: "Geometry", x: 0.12, y: 0.14, mastery: 19 },
];

const EDGES: Edge[] = [
  ["bs", "greedy"],
  ["bs", "graphs"],
  ["trees", "graphs"],
  ["trees", "treedp"],
  ["dp", "treedp"],
  ["graphs", "dijkstra"],
  ["graphs", "dp"],
  ["graphs", "numtheory"],
  ["strings", "trees"],
  ["geometry", "greedy"],
];

function masteryColor(mastery: number) {
  if (mastery >= 70) return "62, 213, 152";
  if (mastery >= 40) return "245, 184, 76";
  return "240, 84, 107";
}

function bfsOrder(startId: string): string[] {
  const visited = new Set<string>([startId]);
  const queue = [startId];
  const order: string[] = [];

  while (queue.length) {
    const current = queue.shift()!;
    order.push(current);
    const neighbors = EDGES.filter(([a, b]) => a === current || b === current).map(
      ([a, b]) => (a === current ? b : a),
    );
    for (const n of neighbors) {
      if (!visited.has(n)) {
        visited.add(n);
        queue.push(n);
      }
    }
  }

  for (const node of NODES) {
    if (!visited.has(node.id)) order.push(node.id);
  }

  return order;
}

export function SkillGraphCanvas({ progress, mode, className }: SkillGraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const packetsRef = useRef<{ edge: Edge; t: number; speed: number }[]>([]);
  const orderRef = useRef<string[]>(bfsOrder("bs"));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resize();
    window.addEventListener("resize", resize);

    if (packetsRef.current.length === 0) {
      packetsRef.current = EDGES.map((edge) => ({
        edge,
        t: Math.random(),
        speed: 0.15 + Math.random() * 0.15,
      }));
    }

    function pos(node: Node) {
      return { x: node.x * width, y: node.y * height };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const activeCount =
        mode === "idle"
          ? NODES.length
          : Math.max(1, Math.round((progress / 100) * NODES.length));
      const activeIds = new Set(orderRef.current.slice(0, activeCount));

      ctx.lineWidth = 1;
      EDGES.forEach(([a, b]) => {
        const nodeA = NODES.find((n) => n.id === a)!;
        const nodeB = NODES.find((n) => n.id === b)!;
        const pa = pos(nodeA);
        const pb = pos(nodeB);
        const lit = activeIds.has(a) && activeIds.has(b);
        ctx.strokeStyle = lit ? "rgba(124,140,255,0.35)" : "rgba(38,42,51,0.9)";
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      });

      if (mode !== "loading" || progress > 15) {
        packetsRef.current.forEach((packet) => {
          const [a, b] = packet.edge;
          const nodeA = NODES.find((n) => n.id === a)!;
          const nodeB = NODES.find((n) => n.id === b)!;
          if (!activeIds.has(a) || !activeIds.has(b)) return;

          packet.t += packet.speed * 0.016;
          if (packet.t > 1) packet.t = 0;

          const pa = pos(nodeA);
          const pb = pos(nodeB);
          const px = pa.x + (pb.x - pa.x) * packet.t;
          const py = pa.y + (pb.y - pa.y) * packet.t;

          ctx.beginPath();
          ctx.arc(px, py, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(124,140,255,0.9)";
          ctx.shadowColor = "rgba(124,140,255,0.8)";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      NODES.forEach((node) => {
        const p = pos(node);
        const lit = activeIds.has(node.id);
        const color = masteryColor(node.mastery);
        const radius = 6;

        if (lit) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 26);
          glow.addColorStop(0, `rgba(${color}, 0.5)`);
          glow.addColorStop(1, `rgba(${color}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 26, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = lit ? `rgb(${color})` : "#1B1E26";
        ctx.strokeStyle = lit ? `rgb(${color})` : "#262A33";
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        if (mode !== "loading") {
          ctx.font = "11px 'JetBrains Mono', monospace";
          ctx.fillStyle = lit ? "rgba(242,243,245,0.85)" : "rgba(154,161,172,0.5)";
          ctx.textAlign = "center";
          ctx.fillText(node.label, p.x, p.y - 14);
        }
      });

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mode, progress]);

  return <canvas ref={canvasRef} className={className} style={{ width: "100%", height: "100%" }} />;
}