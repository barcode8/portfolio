import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { BracketCorners } from '../ui/BracketCorners';
import { RedactionBlock } from '../ui/RedactionBlock';
import { TerminalScramble } from '../ui/TerminalScramble';
import { LiveTelemetry } from '../ui/LiveTelemetry';
import { useDossier } from '../../contexts/DossierContext';

export function ClassifiedOperations() {
  const featuredStack = ['React', 'Node.js', 'Express.js', 'MongoDB', 'Docker', 'Cloudinary'];
  const { isDecrypted } = useDossier();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["0.75deg", "-0.75deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-0.75deg", "0.75deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col h-full space-y-6 relative z-10">
      {/* Header */}
      <div className="flex justify-between text-[var(--color-text-secondary)] font-mono text-[0.60rem] tracking-widest border-b border-[var(--color-border-subtle)] pb-2 shrink-0">
        <span>OPS FILE: MI6/OPS/CO-03/2026</span>
        <span className="text-[var(--color-amber)]">CLEARANCE: ULTRA</span>
      </div>

      <TerminalScramble 
        text="CLASSIFIED OPERATIONS"
        as="h2"
        className="font-display text-4xl md:text-5xl tracking-normal text-[var(--color-text-primary)] mt-2"
      />

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar pb-4">
        
        {/* FEATURED OPERATION: VIDSHARE PANEL */}
        <div className="flex-1 flex flex-col xl:flex-row gap-6 min-w-0">
          
          <div 
            className="flex-1 shrink-0"
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              className="relative h-auto min-h-fit bg-[var(--color-panel-deep)] border border-[var(--color-amber)] p-8 pb-16"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <BracketCorners size={12} thickness={2} color="var(--color-amber)" />
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-mono tracking-widest text-[var(--color-text-muted)] border-b border-[var(--color-border-subtle)] pb-3" style={{ transform: "translateZ(20px)" }}>
                <span className="text-[var(--color-status-online)] font-semibold flex items-center">
                  <span className="mr-2">●</span> DEPLOYED
                </span>
                <span className="border-l border-[var(--color-border-subtle)] pl-4">OPERATION TYPE: BACKEND/DEVOPS PLATFORM</span>
                <span className="border-l border-[var(--color-border-subtle)] pl-4">PRIORITY: HIGH</span>
              </div>

              <div className="mb-8" style={{ transform: "translateZ(30px)" }}>
                <span className="font-display text-xl tracking-normal text-[var(--color-text-muted)] mt-1 block mb-2">
                  OPERATION:
                </span>
                <div className="border border-[var(--color-border-subtle)] p-6 bg-[var(--color-panel)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#152030] to-transparent opacity-30 pointer-events-none" />
                  <TerminalScramble 
                    text="VIDSHARE"
                    className="font-display text-5xl sm:text-7xl md:text-9xl tracking-tight text-[var(--color-text-primary)] shadow-[var(--color-amber-glow)] relative z-10"
                    style={{ textShadow: '0 0 40px rgba(255,176,0,0.12)' }}
                  />
                </div>
              </div>

              <div className="mb-4 font-display text-xl tracking-normal text-[var(--color-amber)] mt-2" style={{ transform: "translateZ(20px)" }}>
                MISSION OBJECTIVE
              </div>
              
              <div className="space-y-4 mb-8" style={{ transform: "translateZ(20px)" }}>
                <p className="font-sans text-base leading-relaxed text-[var(--color-text-primary)] max-w-[580px]">
                  Backend/DevOps video streaming platform engineered for high-throughput media ingestion. Built to handle background video processing via async media pipelines and aggregation pipelines.
                </p>
                <p className="font-sans text-sm leading-relaxed text-[var(--color-text-secondary)] max-w-[520px]">
                  Architecture routes uploads securely. Deployed on a Linux VPS behind Nginx for reverse proxying. Cloudinary integration distributes processed assets.
                </p>
              </div>
              <div className="mb-6 font-display text-xl tracking-normal text-[var(--color-amber)] mt-6" style={{ transform: "translateZ(20px)" }}>
                VISUAL INTEL: LIVE SURVEILLANCE
              </div>
              <div className="mb-8 border border-[var(--color-border-subtle)] p-1 bg-[var(--color-panel-deep)] relative overflow-hidden" style={{ transform: "translateZ(18px)" }}>
                 <BracketCorners size={6} color="var(--color-amber)" />
                 <img src="/hero.png" alt="VidShare Application Interface" className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-300 filter grayscale-[20%] sepia-[10%] hue-rotate-[-10deg]" />
              </div>
              <div className="mb-6" style={{ transform: "translateZ(18px)" }}>
                <LiveTelemetry />
              </div>

              <div className="flex flex-wrap gap-3 mb-8" style={{ transform: "translateZ(15px)" }}>
                {featuredStack.map(tag => (
                  <div key={tag} className="border border-[var(--color-amber-glow)] bg-[var(--color-amber-dim)] font-mono text-xs text-[var(--color-amber)] px-[0.60rem] py-[0.25rem] tracking-[0.1em]">
                    [{tag}]
                  </div>
                ))}
              </div>

              <div style={{ transform: "translateZ(25px)" }}>
                <a href="https://vidshare.haardik.co.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center group relative border border-[var(--color-amber)] px-5 py-3 bg-[var(--color-amber-ghost)] hover:bg-[var(--color-amber-dim)] transition-colors duration-200">
                  <BracketCorners size={6} thickness={1.5} color="var(--color-amber)" />
                  <span className="font-mono text-[0.65rem] font-bold tracking-[0.18em] text-[var(--color-amber)]">
                    <span className="mr-3 opacity-60">⬛</span> ACCESS SECURE SERVER
                  </span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* MISSION FILE DATA PANEL */}
          <div className="w-full xl:w-[280px] shrink-0 flex flex-col gap-6">
            <div className="bg-[var(--color-panel-deep)] border border-[var(--color-border-mid)] p-6 relative">
               <BracketCorners size={8} color="var(--color-border-subtle)" />
               <div className="absolute top-0 left-0 w-full flex justify-center -mt-[6px]">
                 <span className="bg-[var(--color-canvas)] px-3 font-display text-base tracking-normal text-[var(--color-text-muted)] mt-1">
                   MISSION FILE
                 </span>
               </div>
               <div className="space-y-3 mt-4">
                 <div className="flex">
                   <span className="w-20 shrink-0 font-mono text-xs text-[var(--color-text-muted)] tracking-widest">OP-ID:</span>
                   <span className="font-mono text-sm text-[var(--color-text-primary)] font-semibold">MI6-VS-001</span>
                 </div>
                 <div className="flex">
                   <span className="w-20 shrink-0 font-mono text-xs text-[var(--color-text-muted)] tracking-widest">CATEGORY:</span>
                   <span className="font-mono text-sm text-[var(--color-text-primary)]">PLATFORM</span>
                 </div>
                 <div className="flex">
                   <span className="w-20 shrink-0 font-mono text-xs text-[var(--color-text-muted)] tracking-widest">STATUS:</span>
                   <span className="font-mono text-sm text-[var(--color-text-primary)]">ACTIVE</span>
                 </div>
                 <div className="flex">
                   <span className="w-20 shrink-0 font-mono text-xs text-[var(--color-text-muted)] tracking-widest">STACK:</span>
                   <span className="font-mono text-sm text-[var(--color-text-primary)]">MERN</span>
                 </div>
                 <div className="flex items-center">
                   <span className="w-20 shrink-0 font-mono text-xs text-[var(--color-text-muted)] tracking-widest">DEPLOY:</span>
                   {isDecrypted ? (
                     <span className="font-mono text-sm text-[var(--color-status-online)] font-bold animate-pulse">VERCEL / VPS</span>
                   ) : (
                     <RedactionBlock width="64px" />
                   )}
                 </div>
                 <div className="flex pt-2 mt-2 border-t border-[var(--color-border-subtle)]">
                   <span className="w-20 shrink-0 font-mono text-xs text-[var(--color-text-muted)] tracking-widest">ACCESS:</span>
                   <span className="font-mono text-sm font-bold tracking-widest text-[var(--color-amber)]">AUTHORIZED</span>
                 </div>
               </div>
            </div>

            <div className="bg-[var(--color-panel-deep)] border border-[var(--color-amber)] p-6 relative flex flex-col items-center justify-center min-h-[240px] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#152030] to-transparent opacity-30 pointer-events-none" />
               <BracketCorners size={8} thickness={2} color="var(--color-amber)" />
               <div className="absolute top-0 left-0 w-full flex justify-center -mt-[6px]">
                 <span className="bg-[var(--color-canvas)] px-3 font-display text-base tracking-normal text-[var(--color-amber)] mt-1 relative z-10">
                   FUTURE OP
                 </span>
               </div>
               
               <div className="text-center space-y-2 relative z-10">
                 <div className="font-mono text-xs text-[var(--color-amber)] tracking-widest opacity-80 flex items-center justify-center mb-2">
                   <span>STATUS: ENCRYPTED</span>
                   <span className="animate-pulse ml-2 font-bold">_</span>
                 </div>
                 <div 
                   className="font-display text-5xl xl:text-6xl tracking-tight text-[var(--color-text-primary)] shadow-[var(--color-amber-glow)]"
                   style={{ textShadow: '0 0 40px rgba(255,176,0,0.15)' }}
                 >
                   COMING SOON
                 </div>
               </div>
            </div>          </div>
        </div>
      </div>
      
    </div>
  );
}
