"use client";
import React, { useEffect, useRef } from "react";
import { skillGroups } from "@/data/skills";

const UNIT = 150; // pixels per lattice cell edge
const FOV = 620; // perspective strength
const BOND = Math.sqrt(3) / 4; // nearest-neighbour distance in the diamond cubic lattice

// Some atoms stand for a technology. Names must match items in skills.js so the click can link to them.
const SKILLS = ["LangGraph", "PyTorch", "Pinecone", "FastAPI", "MLflow", "LangChain", "TensorFlow", "Docker"];
const SPOT_SECONDS = 2.1; // how long each skill takes its turn in the spotlight
const SIGNALS = 3; // faint pulses travelling along the bonds

const groupOf = (name) => skillGroups.find((g) => g.items.includes(name))?.group ?? "";

// The diamond cubic crystal structure: atoms on a face-centred cubic grid plus a second
// grid shifted by (1/4, 1/4, 1/4). Each atom bonds to its four nearest neighbours.
const buildLattice = () => {
  const fcc = [
    [0, 0, 0],
    [0, 0.5, 0.5],
    [0.5, 0, 0.5],
    [0.5, 0.5, 0],
  ];
  const atoms = [];
  for (let cx = 0; cx < 2; cx++)
    for (let cy = 0; cy < 2; cy++)
      for (let cz = 0; cz < 2; cz++)
        for (const [x, y, z] of fcc) {
          atoms.push([cx + x, cy + y, cz + z]);
          atoms.push([cx + x + 0.25, cy + y + 0.25, cz + z + 0.25]);
        }

  const centre = atoms
    .reduce((sum, a) => [sum[0] + a[0], sum[1] + a[1], sum[2] + a[2]], [0, 0, 0])
    .map((v) => v / atoms.length);
  const points = atoms.map((a) => [a[0] - centre[0], a[1] - centre[1], a[2] - centre[2]]);

  const bonds = [];
  const neighbours = points.map(() => []);
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = Math.hypot(
        points[i][0] - points[j][0],
        points[i][1] - points[j][1],
        points[i][2] - points[j][2]
      );
      if (Math.abs(d - BOND) < 0.02) {
        bonds.push([i, j]);
        neighbours[i].push(j);
        neighbours[j].push(i);
      }
    }
  }

  // spread the skill atoms evenly through the lattice
  const skillAtoms = SKILLS.map((_, k) => Math.floor(((k + 0.5) * points.length) / SKILLS.length));
  return { points, bonds, neighbours, skillAtoms };
};

// The hero's crystal. Decorative with one shortcut: click a skill atom to jump to Technologies.
// Hidden on small screens, a still frame for reduced motion, paused while off screen.
const HeroGrid = () => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { points, bonds, neighbours, skillAtoms } = buildLattice();

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let last = 0;
    let lastTime = 0;
    let projected = [];
    let hovered = -1; // index into SKILLS, or -1
    const lean = { x: 0, y: 0, tx: 0, ty: 0 }; // smoothed cursor influence, -1..1

    // pulses that hop from atom to atom along the bonds
    const signals = Array.from({ length: SIGNALS }, (_, k) => {
      const from = Math.floor((k + 0.3) * (points.length / SIGNALS));
      return { from, to: neighbours[from][0], start: k * 0.9, duration: 0.9 };
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (p, yaw, pitch) => {
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x1 = p[0] * cosY + p[2] * sinY;
      const z1 = -p[0] * sinY + p[2] * cosY;
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      const y2 = p[1] * cosX - z1 * sinX;
      const z2 = p[1] * sinX + z1 * cosX;
      const scale = FOV / (FOV + z2 * UNIT);
      return { x: width / 2 + x1 * UNIT * scale, y: height / 2 + y2 * UNIT * scale, depth: z2, scale };
    };

    const label = (text, x, y) => {
      ctx.font = '11px "JetBrains Mono", ui-monospace, monospace';
      const w = ctx.measureText(text).width + 14;
      const h = 20;
      let lx = x + 12;
      if (lx + w > width - 2) lx = x - 12 - w;
      const ly = Math.max(2, Math.min(height - h - 2, y - h - 6));
      ctx.fillStyle = "rgba(24, 24, 24, 0.92)";
      ctx.strokeStyle = "rgba(139, 112, 246, 0.6)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(lx, ly, w, h, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.textBaseline = "middle";
      ctx.fillText(text, lx + 7, ly + h / 2 + 0.5);
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const t = time / 1000;

      lean.x += (lean.tx - lean.x) * 0.05;
      lean.y += (lean.ty - lean.y) * 0.05;
      const yaw = (reduceMotion ? 0.7 : t * 0.16) + lean.x * 0.35;
      const pitch = 0.5 + (reduceMotion ? 0 : Math.sin(t * 0.21) * 0.12) + lean.y * 0.25;

      projected = points.map((p) => project(p, yaw, pitch));

      // bonds
      ctx.lineWidth = 0.9;
      for (const [i, j] of bonds) {
        const a = projected[i];
        const b = projected[j];
        const near = (a.depth + b.depth) / 2;
        const alpha = 0.1 + ((near + 0.9) / 1.8) * 0.3;
        ctx.strokeStyle = `rgba(139, 112, 246, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // signals: small bright pulses hopping along the bonds
      if (!reduceMotion) {
        for (const s of signals) {
          let progress = (t - s.start) / s.duration;
          while (progress >= 1) {
            const options = neighbours[s.to].filter((n) => n !== s.from);
            const next = options[Math.floor(Math.random() * options.length)] ?? s.from;
            s.from = s.to;
            s.to = next;
            s.start += s.duration;
            progress = (t - s.start) / s.duration;
          }
          const a = projected[s.from];
          const b = projected[s.to];
          const x = a.x + (b.x - a.x) * progress;
          const y = a.y + (b.y - a.y) * progress;
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 7);
          glow.addColorStop(0, "rgba(167, 139, 250, 0.85)");
          glow.addColorStop(1, "rgba(167, 139, 250, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // atoms, far to near
      const isSkill = new Map(skillAtoms.map((atom, k) => [atom, k]));
      const order = projected.map((_, i) => i).sort((m, n) => projected[m].depth - projected[n].depth);
      const spot = reduceMotion ? -1 : Math.floor(t / SPOT_SECONDS) % SKILLS.length;
      const phase = (t % SPOT_SECONDS) / SPOT_SECONDS; // 0..1 through the current turn
      const pulse = Math.sin(Math.PI * phase); // fades in then out

      for (const i of order) {
        const p = projected[i];
        const k = (p.depth + 0.9) / 1.8; // 0 far .. 1 near
        const mix = (i % 7) / 6;
        const skillIndex = isSkill.get(i);
        const isHovered = skillIndex !== undefined && skillIndex === hovered;
        const isSpot = skillIndex !== undefined && skillIndex === spot;
        let radius = (1.3 + k * 1.9) * p.scale;
        let alpha = 0.25 + k * 0.6;

        if (skillIndex !== undefined) {
          radius += 1.2 * p.scale; // skill atoms are slightly larger
          alpha = Math.min(1, alpha + 0.2);
        }
        if (isSpot) {
          radius += pulse * 2.2;
          // a ring that grows and fades through the turn
          ctx.strokeStyle = `rgba(167, 139, 250, ${0.5 * (1 - phase)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6 + phase * 16, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (isHovered) radius += 2;

        ctx.fillStyle =
          isSpot || isHovered
            ? "rgba(196, 181, 253, 0.98)"
            : `rgba(${Math.round(96 + 43 * mix)}, ${Math.round(165 - 73 * mix)}, 250, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // labels: the spotlight skill fades in and out, the hovered one stays
      if (spot >= 0 && pulse > 0.15 && spot !== hovered) {
        const p = projected[skillAtoms[spot]];
        ctx.globalAlpha = Math.min(1, pulse * 1.6);
        label(SKILLS[spot], p.x, p.y);
        ctx.globalAlpha = 1;
      }
      if (hovered >= 0) {
        const p = projected[skillAtoms[hovered]];
        label(`${SKILLS[hovered]}  →`, p.x, p.y);
      }
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 33) return; // ~30 fps is plenty for a slow turn
      last = now;
      lastTime = now;
      draw(now);
    };

    // hover and click on skill atoms
    const hitTest = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let found = -1;
      let best = 16;
      skillAtoms.forEach((atom, k) => {
        const p = projected[atom];
        if (!p) return;
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < best) {
          best = d;
          found = k;
        }
      });
      return found;
    };
    const onCanvasMove = (event) => {
      const found = hitTest(event);
      if (found !== hovered) {
        hovered = found;
        canvas.style.cursor = found >= 0 ? "pointer" : "default";
        if (reduceMotion) draw(lastTime);
      }
    };
    const onCanvasLeave = () => {
      hovered = -1;
      canvas.style.cursor = "default";
      if (reduceMotion) draw(lastTime);
    };
    const onCanvasClick = () => {
      if (hovered < 0) return;
      const name = SKILLS[hovered];
      window.dispatchEvent(new CustomEvent("select-tech", { detail: { name, group: groupOf(name) } }));
      document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" });
    };

    // the whole crystal leans slightly toward the cursor
    const onPointerMove = (event) => {
      lean.tx = (event.clientX / window.innerWidth - 0.5) * 2;
      lean.ty = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    observer.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);

    canvas.addEventListener("pointermove", onCanvasMove);
    canvas.addEventListener("pointerleave", onCanvasLeave);
    canvas.addEventListener("click", onCanvasClick);

    if (reduceMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onPointerMove);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onCanvasMove);
      canvas.removeEventListener("pointerleave", onCanvasLeave);
      canvas.removeEventListener("click", onCanvasClick);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute hidden lg:block"
      style={{ right: "4%", top: "50%", width: 400, height: 400, transform: "translateY(-50%)" }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default HeroGrid;
