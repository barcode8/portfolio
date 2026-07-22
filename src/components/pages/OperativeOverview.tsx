import React, { useState } from 'react';
import { MapPin, Phone } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { BracketCorners } from '../ui/BracketCorners';
import { RedactionBlock } from '../ui/RedactionBlock';
import { TerminalScramble } from '../ui/TerminalScramble';
import { useDossier } from '../../contexts/DossierContext';
import { useAudioHooks } from '../../hooks/useAudioHooks';

export function OperativeOverview() {
  const skills = ['JavaScript', 'Python', 'C', 'C++', 'Node.js', 'Express.js', 'MongoDB', 'React', 'Tailwind CSS', 'Docker', 'Linux', 'Nginx', 'Git'];
  const { isDecrypted } = useDossier();
  const { playHover, playDeploy } = useAudioHooks();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <motion.div 
      initial={{ scale: 0.98, opacity: 0, filter: 'blur(4px)' }}
      animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col h-full space-y-4 relative z-10"
    >
      {/* Header */}
      <div className="flex justify-between text-[var(--color-text-secondary)] font-mono text-xs tracking-widest border-b border-[var(--color-border-subtle)] pb-2 shrink-0">
        <span>FILE REF: MI6/PERS/OV-01/2026</span>
        <span className="text-[var(--color-status-alert)]">CLASSIFICATION: TOP SECRET</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* PANEL A: ID CARD */}
        <div 
          className="relative w-full lg:w-[440px] shrink-0" 
          style={{ perspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div 
            className="w-full h-full bg-[var(--color-panel-deep)] border border-[var(--color-border-mid)] p-6 flex flex-col relative"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <BracketCorners size={12} thickness={2} color="var(--color-amber)" />
            
            <div className="flex items-center justify-between mb-8 border-b border-[var(--color-border-subtle)] pb-2" style={{ transform: "translateZ(20px)" }}>
              <span className="font-display text-xl tracking-normal text-[var(--color-text-primary)] mt-1">
                OPERATIVE PROFILE CARD
              </span>
              <span className="font-mono text-xs text-[var(--color-amber)]">● ● ●</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-8 items-start sm:items-center" style={{ transform: "translateZ(30px)" }}>
              <div className={`w-[120px] h-[140px] sm:w-[140px] sm:h-[160px] shrink-0 bg-[#05080F] border flex flex-col items-center justify-center overflow-hidden relative transition-colors duration-500 ${isDecrypted ? 'border-[var(--color-amber)] shadow-[0_0_15px_rgba(255,176,0,0.2)]' : 'border-[#152030]'}`}>
                {isDecrypted ? (
                  <img 
                    src="/haardik-aggarwal.jpeg" 
                    alt="Operative Profile" 
                    className="w-full h-full object-cover rounded-sm grayscale-[0.2] contrast-125" 
                  />
                ) : (
                  <div className="font-mono text-xs tracking-widest text-center text-[var(--color-text-ghost)] flex flex-col items-center justify-center w-full h-full">
                    <span>PHOTO</span>
                    <span className="my-2">───</span>
                    <span>REDACTED</span>
                  </div>
                )}
                {isDecrypted && (
                  <>
                    <div className="absolute inset-0 bg-[var(--color-amber)] mix-blend-overlay opacity-20 pointer-events-none rounded-sm" />
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-40" />
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none rounded-sm" />
                  </>
                )}
              </div>
              <div className="flex flex-col justify-center min-w-0 flex-1">
                <span className="font-mono text-xs tracking-[0.14em] text-[var(--color-text-muted)] uppercase mb-1">
                  OPERATIVE DESIGNATION
                </span>
                <div className="font-mono text-lg font-bold text-[var(--color-text-primary)] tracking-widest mb-3 flex items-center gap-2 h-6 truncate">
                  {isDecrypted ? (
                    <span className="animate-pulse text-[var(--color-status-online)]">HAARDIK AGGARWAL</span>
                  ) : (
                    <>H<RedactionBlock width="40px" /> A<RedactionBlock width="50px" /></>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 mb-1">
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)] font-mono text-sm">
                    <MapPin size={14} className="text-[var(--color-amber)]" />
                    <span>DELHI, INDIA</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-text-secondary)] font-mono text-sm">
                    <Phone size={14} className="text-[var(--color-amber)]" />
                    <span>+91 9667090639</span>
                  </div>
                </div>
                
                <span className="font-mono text-xs tracking-[0.14em] text-[var(--color-text-muted)] uppercase mt-3 mb-1">
                  ROLE
                </span>
                <span className="font-sans text-base text-[var(--color-text-primary)] font-semibold">
                  Backend/DevOps Developer
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-[var(--color-border-subtle)] border-t border-[var(--color-border-subtle)] mt-auto" style={{ transform: "translateZ(10px)" }}>
              <div className="bg-[var(--color-panel-deep)] p-3 border-l-2 border-[var(--color-amber)]">
                <span className="block font-mono text-[0.65rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase mb-1">CLEARANCE LEVEL</span>
                <span className="block font-mono text-[0.85rem] font-semibold text-[var(--color-amber)]">DEV INITIATE</span>
              </div>
              <div className="bg-[var(--color-panel-deep)] p-3 border-l-2 border-[var(--color-amber)]">
                <span className="block font-mono text-[0.65rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase mb-1">STATUS</span>
                <span className="block font-mono text-[0.85rem] font-semibold text-[var(--color-amber)]">● AVAILABLE</span>
              </div>
              <div className="bg-[var(--color-panel-deep)] p-3 border-l-2 border-[var(--color-border-mid)]">
                <span className="block font-mono text-[0.65rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase mb-1">ACTIVATED</span>
                <span className="block font-mono text-[0.85rem] font-semibold text-[var(--color-text-primary)]">2025-10</span>
              </div>
              <div className="bg-[var(--color-panel-deep)] p-3 border-l-2 border-[var(--color-border-mid)]">
                <span className="block font-mono text-[0.65rem] tracking-[0.12em] text-[var(--color-text-muted)] uppercase mb-1">STATION</span>
                <span className="block font-mono text-[0.85rem] font-semibold text-[var(--color-text-primary)]">REMOTE / FIELD</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* PANELS B & C */}
        <div className="flex-1 flex flex-col gap-6 min-w-0 overflow-y-auto custom-scrollbar">
          
          {/* PANEL B: INTELLIGENCE BRIEF */}
          <div className="relative flex-1 bg-[var(--color-panel-deep)] border border-[var(--color-border-mid)] p-6">
            <BracketCorners size={8} thickness={1.5} color="var(--color-border-subtle)" />
            
            <div className="flex items-center mb-6">
              <TerminalScramble 
                text="INTELLIGENCE BRIEF"
                as="span"
                className="font-display text-[1.4rem] tracking-normal text-[var(--color-amber)] whitespace-nowrap mr-4 mt-1"
              />
              <div className="flex-1 h-px bg-[var(--color-border-subtle)] mr-4" />
              <span className="font-mono text-[0.55rem] font-light text-[var(--color-text-secondary)] opacity-60 tracking-[0.2em] whitespace-nowrap">
                EYES ONLY
              </span>
            </div>

            <div className="space-y-4 font-sans text-base leading-relaxed text-[var(--color-text-primary)]">
              <p>
                Operative specialising in high-performance web architecture. Proficient in
                backend/DevOps development, cloud infrastructure, and mission-critical system
                design. Demonstrated capability across modern JavaScript ecosystems and
                Linux-native tooling.
              </p>
              <p>
                Currently seeking new operational assignments. Prior deployments include
                scalable video platforms with asynchronous cloud processing pipelines.
                Operates under Arch Linux with Hyprland WM in all field environments.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.04 }}
                  className="border border-[var(--color-amber-glow)] bg-[var(--color-amber-dim)] font-mono text-[0.58rem] text-[var(--color-amber)] px-[0.55rem] py-[0.2rem] tracking-[0.1em]"
                >
                  [{skill}]
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <button 
                onClick={() => { playDeploy(); setIsModalOpen(true); }}
                onMouseEnter={playHover}
                className="w-full sm:w-auto px-6 py-3 border border-[var(--color-amber)] text-[var(--color-amber)] text-lg tracking-[0.1em] transition-all duration-300 hover:bg-[var(--color-amber-ghost)] hover:shadow-[0_0_15px_rgba(255,176,0,0.4)]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                [ ESTABLISH SECURE COMMS ]
              </button>
            </div>
          </div>

          {/* PANEL C: SECURITY AUTHORISATIONS */}
          <div className="relative shrink-0 bg-[var(--color-panel-deep)] border border-[var(--color-border-mid)] p-6 pt-8 flex flex-col justify-center">
             <BracketCorners size={8} thickness={1.5} color="var(--color-border-subtle)" />
             <div className="absolute top-0 left-0 w-full flex justify-center -mt-[6px]">
               <span className="bg-[var(--color-canvas)] px-3 font-display text-base tracking-normal text-[var(--color-text-muted)] mt-1">
                 SECURITY AUTHORISATIONS
               </span>
             </div>
             
             <div className="flex flex-wrap gap-4 items-center justify-center">
                <div className="border border-[var(--color-amber)] bg-[var(--color-amber-ghost)] font-mono text-[0.65rem] font-semibold tracking-[0.15em] text-[var(--color-amber)] px-[0.75rem] py-[0.28rem] relative">
                  <BracketCorners size={5} color="var(--color-amber)" />
                  ULTRA
                </div>
                <div className="border border-[var(--color-status-alert)] bg-[#CC444410] font-mono text-[0.65rem] font-semibold tracking-[0.15em] text-[var(--color-status-alert)] px-[0.75rem] py-[0.28rem] relative">
                  <BracketCorners size={5} color="var(--color-status-alert)" />
                  EYES ONLY
                </div>
                <div className="border border-[var(--color-status-info)] bg-[#4488CC10] font-mono text-[0.65rem] font-semibold tracking-[0.15em] text-[var(--color-status-info)] px-[0.75rem] py-[0.28rem] relative">
                  <BracketCorners size={5} color="var(--color-status-info)" />
                  SCI
                </div>
                <div className="border border-[var(--color-border-subtle)] bg-[var(--color-panel)] font-mono text-[0.65rem] font-semibold tracking-[0.15em] text-[var(--color-text-muted)] px-[0.75rem] py-[0.28rem] relative">
                  <BracketCorners size={5} color="var(--color-border-subtle)" />
                  CLASSIFIED
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* PANEL D: DEPLOYMENT STATUS STRIP */}
      <div className="w-full h-[52px] bg-[var(--color-panel-deep)] border border-[var(--color-border-mid)] flex items-center shrink-0">
        <div className="flex-1 flex items-center h-full px-4 border-r border-[var(--color-border-subtle)] min-w-0">
           <span className="font-mono text-[0.65rem] text-[var(--color-text-muted)] tracking-widest mr-3 shrink-0">SPECIALISATION:</span>
           <span className="font-mono text-xs text-[var(--color-text-primary)] truncate">Backend/DevOps Development</span>
        </div>
        <div className="flex-1 flex items-center h-full px-4 border-r border-[var(--color-border-subtle)] min-w-0">
           <span className="font-mono text-[0.65rem] text-[var(--color-text-muted)] tracking-widest mr-3 shrink-0">PRIMARY STACK:</span>
           <span className="font-mono text-xs text-[var(--color-text-primary)] truncate">React · Node.js · Express.js · MongoDB · Docker</span>
        </div>
        <div className="flex-1 flex items-center h-full px-4 border-r border-[var(--color-border-subtle)] hidden xl:flex min-w-0">
           <span className="font-mono text-[0.65rem] text-[var(--color-text-muted)] tracking-widest mr-3 shrink-0">ENVIRONMENT:</span>
           <span className="font-mono text-xs text-[var(--color-text-primary)] truncate">Arch Linux / Hyprland WM</span>
        </div>
        <div className="flex-1 flex items-center h-full px-4 min-w-0">
           <span className="font-mono text-[0.65rem] text-[var(--color-text-muted)] tracking-widest mr-3 shrink-0">AVAILABILITY:</span>
           <span className="font-mono text-xs text-[var(--color-status-online)] truncate">IMMEDIATE DEPLOYMENT</span>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-[#080C14]/80"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#0D1520] border border-[var(--color-amber)] p-6 md:p-8 shadow-[0_0_40px_rgba(255,176,0,0.15)]"
            >
              <BracketCorners size={16} thickness={2} color="var(--color-amber)" />
              
              <div className="border-b border-[var(--color-border-subtle)] pb-4 mb-6">
                <TerminalScramble 
                  text=">>> DECRYPTING CONTACT PROTOCOLS..."
                  as="h3"
                  className="font-mono text-[var(--color-amber)] text-sm md:text-base tracking-[0.15em] font-semibold"
                />
              </div>

              <motion.div 
                className="space-y-4 mb-8"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {[
                  { label: 'UPLINK_01: GITHUB // AUTHORIZED', href: 'https://github.com/barcode8' },
                  { label: 'UPLINK_02: LINKEDIN // SECURE', href: 'https://www.linkedin.com/in/haardikaggarwal/' },
                  { label: 'UPLINK_03: EMAIL // ENCRYPTED', href: 'mailto:haardikaggarwal78@gmail.com' }
                ].map((link, i) => (
                  <motion.a 
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playDeploy()}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ x: 5 }}
                    className="block p-4 border border-[var(--color-border-subtle)] bg-[var(--color-panel)] font-mono text-[0.75rem] text-[var(--color-text-secondary)] hover:text-[var(--color-amber)] hover:border-[var(--color-amber)] hover:bg-[var(--color-amber-ghost)] transition-colors duration-200"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>

              <button 
                onClick={() => { playDeploy(); setIsModalOpen(false); }}
                onMouseEnter={playHover}
                className="w-full py-3 border border-[var(--color-border-mid)] text-[var(--color-text-secondary)] font-mono text-[0.7rem] tracking-[0.2em] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200"
              >
                [ CLOSE CONNECTION ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
