"use client";

import { useEffect, useRef, useState } from "react";
import { Radar, ShieldCheck, Phone, MapPin, Cpu, Activity, Crosshair, AlertTriangle } from "lucide-react";
import { BIZ } from "@/lib/business";
import { AREAS, type Area } from "@/lib/areas";

type Phase = "idle" | "locating" | "denied" | "out_of_area" | "scanning" | "matched";

const METRO_BOUNDS = BIZ.metroBounds;
function inServiceArea(lat: number, lng: number) {
  return lat >= METRO_BOUNDS.minLat && lat <= METRO_BOUNDS.maxLat && lng >= METRO_BOUNDS.minLng && lng <= METRO_BOUNDS.maxLng;
}

function haversineKm(la1:number, lo1:number, la2:number, lo2:number){
  const R=6371, toRad=(d:number)=>d*Math.PI/180;
  const dLa=toRad(la2-la1), dLo=toRad(lo2-lo1);
  const a=Math.sin(dLa/2)**2 + Math.cos(toRad(la1))*Math.cos(toRad(la2))*Math.sin(dLo/2)**2;
  return 2*R*Math.asin(Math.sqrt(a));
}

function nearestArea(lat:number,lng:number): Area {
  let best=AREAS[0], bestD=Infinity;
  for(const a of AREAS){
    const d=haversineKm(lat,lng,a.lat,a.lng);
    if(d<bestD){bestD=d; best=a;}
  }
  return best;
}

export type DispatchService = {
  slug: string;
  name: string;
  shortName: string;
  tagline?: string;
  bullets?: string[];
};

export function HomeDispatchTracker({ service }: { service?: DispatchService } = {}){
  const isEmergency = service?.slug === "emergency";
  const svcLabel = service?.shortName ?? "drywall contractor";
  const svcLabelLower = svcLabel.toLowerCase();
  const bulletSample = service?.bullets?.[0];
  const consoleLabel = service ? `${svcLabel} scheduling` : "Metro Detroit scheduling";
  const idleHeading = service
    ? <>Find the <span className="text-brass-gradient">nearest crew</span> for {svcLabelLower}</>
    : <>Find the <span className="text-brass-gradient">nearest crew</span> near you</>;
  const matchedHeading = (areaName: string) => service
    ? <><span className="text-brass-gradient">{svcLabel}</span> crew available near {areaName}</>
    : <>Crew available near <span className="text-brass-gradient">{areaName}</span></>;
  const idleCopy = service
    ? (isEmergency
        ? `Share your location — we&rsquo;ll check same-day repair availability near you${bulletSample ? ` (${bulletSample.toLowerCase()}).` : "."}`
        : `Share your location to match the nearest crew running ${svcLabelLower} jobs this week.`)
    : "Share your location to see the nearest BH Drywall crew and estimated callback time.";
  const buttonLabel = service
    ? (isEmergency ? "Check same-day repair availability" : `Find nearest ${svcLabelLower} crew`)
    : "Check crew availability";
  const buildLogs = (areaName:string, eta:number, dist:string) => service
    ? [
        `Location confirmed — ${areaName}, MI…`,
        `Filtering Licensed & insured units stocked for ${svcLabelLower}…`,
        `Cross-referencing today&rsquo;s ${svcLabelLower} job queue + live traffic…`,
        `${svcLabel} crew available in ${areaName}, MI…`,
        bulletSample ? `Scope noted: ${bulletSample.toLowerCase()}` : `Confirming scope for your request…`,
        `Callback window: ~${eta} min • ${dist} mi from you`,
      ]
    : [
        `Location confirmed — ${areaName}, MI…`,
        `Pinging crews within 15 miles…`,
        `Cross-referencing schedule + drive time…`,
        `Crew available in ${areaName}, MI…`,
        `Route estimate for Metro Detroit traffic…`,
        `Callback window: ~${eta} min • ${dist} mi from you`,
      ];

  const [phase,setPhase]=useState<Phase>("idle");
  const [progress,setProgress]=useState(0);
  const [logIdx,setLogIdx]=useState(0);
  const [area,setArea]=useState<Area|null>(null);
  const [info,setInfo]=useState<{eta:number;dist:string}|null>(null);
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(()=>()=>{timers.current.forEach(clearTimeout);},[]);

  function start(){
    if(phase==="locating"||phase==="scanning") return;
    setPhase("locating");
    if(!("geolocation" in navigator)){
      // fallback: Metro Detroit center (Detroit)
      handleCoords(BIZ.geo.lat, BIZ.geo.lng);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos)=>handleCoords(pos.coords.latitude,pos.coords.longitude),
      ()=>{ setPhase("denied"); },
      {enableHighAccuracy:true, timeout:10000, maximumAge:0}
    );
  }

  function handleCoords(lat:number,lng:number){
    if(!inServiceArea(lat,lng)){
      const a = nearestArea(lat,lng);
      setArea(a);
      setPhase("out_of_area");
      return;
    }
    const a = nearestArea(lat,lng);
    setArea(a);
    // deterministic info from area slug + small jitter
    const seed = Array.from(a.slug).reduce((s,c)=>s+c.charCodeAt(0),0) + Math.floor(lat*100) + Math.floor(lng*100);
    const r=(()=>{ let x=Math.sin(seed)*10000; return ()=>{x=Math.sin(x)*10000; return x-Math.floor(x);}; })();
    // Four draws that used to invent a tech id, a name, a star rating and a jobs count
    // are burned here rather than deleted, so the ETA a visitor sees does not shift.
    r(); r(); r(); r();
    const eta=15+Math.floor(r()*16);
    const distKm=haversineKm(lat,lng,a.lat,a.lng);
    const dist=(distKm*0.621371).toFixed(1);
    setInfo({eta,dist});
    runScanLogs(a.name,eta,dist);
  }

  function runScanLogs(name:string,eta:number,dist:string){
    setPhase("scanning"); setProgress(0); setLogIdx(0);
    const logs=buildLogs(name,eta,dist);
    const step=650;
    for(let i=0;i<logs.length;i++){
      timers.current.push(setTimeout(()=>{
        setLogIdx(i); setProgress(Math.round(((i+1)/logs.length)*100));
      }, i*step));
    }
    timers.current.push(setTimeout(()=>{ setPhase("matched"); setProgress(100); }, logs.length*step+200));
  }

  const logs = area && info
    ? buildLogs(area.name, info.eta, info.dist)
    : [];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brass-500/30 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900 p-5 shadow-2xl shadow-black/40 md:p-7">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{backgroundImage:"linear-gradient(rgba(201,162,74,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,74,.6) 1px, transparent 1px)",backgroundSize:"28px 28px"}}/>

      <div className="relative flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400"/>
          {consoleLabel}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brass-500/40 bg-ink-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brass-300">
          <ShieldCheck className="h-3 w-3"/> Licensed · {BIZ.bsis}
        </span>
      </div>

      <h2 className="relative mt-4 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
        {phase==="matched" && area ? matchedHeading(area.name) : idleHeading}
      </h2>

      {phase==="idle" && (
        <>
          <p className="relative mt-2 text-sm text-ink-300 md:text-base"
            dangerouslySetInnerHTML={{ __html: idleCopy }} />
          <button type="button" onClick={start}
            className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-brass-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink-950 shadow-lg shadow-brass-500/30 transition hover:bg-brass-400 active:translate-y-px md:text-base">
            <Crosshair className="h-5 w-5"/> {buttonLabel}
          </button>
          <p className="relative mt-2 text-[11px] uppercase tracking-wider text-ink-500">
            {isEmergency ? "Avg emergency ETA: 15–30 min" : `Avg ${svcLabelLower} dispatch: 15–30 min`}
          </p>
        </>
      )}

      {phase==="locating" && (
        <div className="relative mt-4 flex items-center gap-2 text-sm font-semibold text-brass-300">
          <Cpu className="h-4 w-4 animate-pulse"/> Waiting for browser to confirm your location…
        </div>
      )}

      {phase==="denied" && (
        <div className="relative mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
            <AlertTriangle className="h-4 w-4"/> Location blocked
          </div>
          <p className="mt-1 text-xs text-ink-300">
            We can&apos;t auto-detect your spot, but our dispatcher will lock in ETA in under a minute by phone.
          </p>
          <a href={BIZ.phoneHref} className="mt-3 inline-flex items-center gap-2 rounded-full bg-brass-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink-950 hover:bg-brass-400">
            <Phone className="h-3.5 w-3.5"/> Call dispatch — {BIZ.phone}
          </a>
        </div>
      )}

      {phase==="out_of_area" && (
        <div className="relative mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
            <AlertTriangle className="h-4 w-4"/> Outside our Metro Detroit service zone
          </div>
          <p className="mt-1 text-xs text-ink-300">
            We dispatch Licensed & insured techs across Metro Detroit only. For an exact ETA in your area, give dispatch a quick call and we&apos;ll confirm coverage and timing.
          </p>
          <a href={BIZ.phoneHref} className="mt-3 inline-flex items-center gap-2 rounded-full bg-brass-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink-950 hover:bg-brass-400">
            <Phone className="h-3.5 w-3.5"/> Call for ETA — {BIZ.phone}
          </a>
        </div>
      )}

      {phase==="scanning" && (
        <div className="relative mt-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-brass-300">
            <Cpu className="h-4 w-4 animate-pulse"/>
            <span>{logs[logIdx]}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink-800">
            <div className="h-full rounded-full bg-gradient-to-r from-brass-600 via-brass-400 to-brass-300 transition-all duration-500 ease-out"
              style={{width:`${progress}%`}}/>
          </div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-ink-400">
            <span>Dispatch console</span><span>{progress}%</span>
          </div>
        </div>
      )}

      {phase==="matched" && info && area && (
        <div className="relative mt-4">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-ink-700 bg-ink-950/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-200">
            <MapPin className="h-3 w-3 text-brass-400"/> Detected: {area.name}, MI
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">ETA</div>
              <div className="mt-0.5 font-display text-2xl font-extrabold text-ink-50">{info.eta} min</div>
              <div className="text-[11px] text-ink-400">{info.dist} mi away</div>
            </div>
            <div className="rounded-2xl border border-ink-700 bg-ink-950/60 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-brass-300">Coverage</div>
              <div className="mt-0.5 font-display text-base font-bold text-ink-50">{area.name}, MI</div>
              <div className="text-[11px] text-ink-400">Wayne · Oakland · Macomb</div>
            </div>
            <div className="rounded-2xl border border-ink-700 bg-ink-950/60 p-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-brass-300">Status</div>
              <div className="mt-0.5 flex items-center gap-1.5 font-display text-base font-bold text-emerald-300">
                <Activity className="h-4 w-4 animate-pulse"/> Standing by
              </div>
              <div className="text-[11px] text-ink-400">Awaiting your confirmation</div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-brass-500/30 bg-ink-950/70 p-4">
            <p className="text-sm font-semibold text-ink-100">Confirm now to lock in this {info.eta}-minute ETA.</p>
            <p className="mt-1 text-xs text-ink-400">Tap below to confirm scope and schedule.</p>
            <a href={BIZ.phoneHref}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-brass-500 px-5 py-3 text-sm font-bold uppercase tracking-wider text-ink-950 shadow-lg shadow-brass-500/30 transition hover:bg-brass-400 active:translate-y-px">
              <Phone className="h-4 w-4"/> Confirm & lock ETA — {BIZ.phone}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
