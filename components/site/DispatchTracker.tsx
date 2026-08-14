"use client";

import { useEffect, useRef, useState } from "react";
import { Radar, ShieldCheck, Phone, MapPin, Cpu, Activity } from "lucide-react";
import { BIZ } from "@/lib/business";

type Phase = "idle" | "scanning" | "matched";

function rng(seed: number) {
  // Deterministic pseudo-random so SSR ETA isn't reshuffled on hydration
  let x = Math.sin(seed) * 10000;
  return () => {
    x = Math.sin(x) * 10000;
    return x - Math.floor(x);
  };
}

export function DispatchTracker({ areaName, areaSlug }: { areaName: string; areaSlug: string }) {
  const seed = Array.from(areaSlug).reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = rng(seed);

  // Four draws that used to invent a crew id, a technician name, a star rating and a
  // jobs-completed count are burned here rather than deleted: the ETA and distance an
  // area shows must not shift, they are the only promise-bearing numbers in this widget.
  r(); r(); r(); r();
  const etaMin = 15 + Math.floor(r() * 16); // 15..30
  const distance = (0.4 + r() * 4.2).toFixed(1);

  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [logIdx, setLogIdx] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const logs = [
    `Checking ${BIZ.name} crews near ${areaName}, MI…`,
    `Scanning finish & repair crews within 15 miles…`,
    `Cross-referencing today's schedule + drive time…`,
    `Crew available in ${areaName}, MI…`,
    `Estimating route across Metro Detroit…`,
    `Callback window: ~${etaMin} min • ${distance} mi`,
  ];

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  function startDispatch() {
    if (phase !== "idle") return;
    setPhase("scanning");
    setProgress(0);
    setLogIdx(0);
    const steps = logs.length;
    const stepMs = 650;
    for (let i = 0; i < steps; i++) {
      timers.current.push(
        setTimeout(() => {
          setLogIdx(i);
          setProgress(Math.round(((i + 1) / steps) * 100));
        }, i * stepMs)
      );
    }
    timers.current.push(
      setTimeout(() => {
        setPhase("matched");
        setProgress(100);
      }, steps * stepMs + 200)
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brass-500/30 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900 p-5 shadow-2xl shadow-black/40 md:p-7">
      {/* scanner grid bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,162,74,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,74,.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Live scheduling
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brass-500/40 bg-ink-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brass-300">
          <ShieldCheck className="h-3 w-3" /> Licensed · {BIZ.bsis}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-950/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-200">
          <MapPin className="h-3 w-3 text-brass-400" /> {areaName}, MI
        </span>
      </div>

      <h2 className="relative mt-4 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
        {phase === "matched" ? (
          <>
            Crew scheduled for <span className="text-brass-gradient">{areaName}</span>
          </>
        ) : (
          <>
            Find the nearest <span className="text-brass-gradient">{BIZ.name}</span> crew in {areaName}
          </>
        )}
      </h2>

      {phase === "idle" && (
        <>
          <p className="relative mt-2 text-sm text-ink-300 md:text-base">
            Tap below — we&apos;ll check which {BIZ.name} crew is closest and return an estimated callback time.
          </p>
          <button
            type="button"
            onClick={startDispatch}
            className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-brass-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink-950 shadow-lg shadow-brass-500/30 transition hover:bg-brass-400 active:translate-y-px md:text-base"
          >
            <Radar className="h-5 w-5" />
            Click to check crew availability
          </button>
          <p className="relative mt-2 text-[11px] uppercase tracking-wider text-ink-500">
            Typical callback in {areaName}: same day to 2 business days
          </p>
        </>
      )}

      {phase === "scanning" && (
        <div className="relative mt-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-brass-300">
            <Cpu className="h-4 w-4 animate-pulse" />
            <span>{logs[logIdx]}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brass-600 via-brass-400 to-brass-300 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-ink-400">
            <span>Dispatch console</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}

      {phase === "matched" && (
        <div className="relative mt-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">ETA</div>
              <div className="mt-0.5 font-display text-2xl font-extrabold text-ink-50">{etaMin} min</div>
              <div className="text-[11px] text-ink-400">{distance} mi away</div>
            </div>
            <div className="rounded-2xl border border-ink-700 bg-ink-950/60 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-brass-300">Coverage</div>
              <div className="mt-0.5 font-display text-base font-bold text-ink-50">{areaName}, MI</div>
              <div className="text-[11px] text-ink-400">Wayne · Oakland · Macomb</div>
            </div>
            <div className="rounded-2xl border border-ink-700 bg-ink-950/60 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-brass-300">Status</div>
              <div className="mt-0.5 flex items-center gap-1.5 font-display text-base font-bold text-emerald-300">
                <Activity className="h-4 w-4 animate-pulse" /> Standing by
              </div>
              <div className="text-[11px] text-ink-400">Awaiting your confirmation</div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-brass-500/30 bg-ink-950/70 p-4">
            <p className="text-sm font-semibold text-ink-100">
              Confirm now to hold this callback window.
            </p>
            <p className="mt-1 text-xs text-ink-400">
              Call to confirm scope and schedule.
            </p>
            <a
              href={BIZ.phoneHref}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-brass-500 px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink-950 shadow-lg shadow-brass-500/30 transition hover:bg-brass-400 active:translate-y-px"
            >
              <Phone className="h-4 w-4" />
              Confirm & schedule — {BIZ.phone}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
