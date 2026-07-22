import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SEQUENCE = [
  "> INITIALIZING SECURE UPLINK...",
  "> LOADING KERNEL: ARCH_LINUX_X86_64...",
  "> DECRYPTING OPERATIVE DOSSIER [HAARDIK AGGARWAL]...",
  "> VERIFYING CLEARANCE: LEVEL-1 OPERATIVE...",
  "> ACCESS GRANTED."
];

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    // 1.8s total loading time
    const totalDuration = 1800;
    
    // Progress bar animation
    const startTime = Date.now();
    let animFrame: number;
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);
      
      if (pct < 100) {
        animFrame = requestAnimationFrame(animateProgress);
      } else {
        setIsFlashing(true);
        setTimeout(() => {
          onComplete();
        }, 150); // Short delay so the flash begins before exit animation
      }
    };
    animFrame = requestAnimationFrame(animateProgress);

    // Text sequence
    const intervals: ReturnType<typeof setTimeout>[] = [];
    SEQUENCE.forEach((line, index) => {
      // distribute them across the first 85% of duration
      const delay = (index / SEQUENCE.length) * totalDuration * 0.85;
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
      intervals.push(t);
    });

    return () => {
      cancelAnimationFrame(animFrame);
      intervals.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#05080F] flex flex-col items-center justify-center pointer-events-auto"
      initial={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0.01, filter: 'brightness(2) contrast(1.5)' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-2xl px-6 flex flex-col gap-6 font-display tracking-widest text-[var(--color-amber)]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        
        <div className="flex flex-col gap-2 min-h-[160px] justify-end">
          {lines.map((line, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="text-sm md:text-base font-bold drop-shadow-[0_0_8px_rgba(255,176,0,0.6)]"
            >
              {line}
            </motion.div>
          ))}
          {/* Blinking cursor */}
          {progress < 100 && (
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="w-3 h-4 bg-[var(--color-amber)] shadow-[0_0_8px_rgba(255,176,0,0.6)] mt-1"
            />
          )}
        </div>

        <div className="w-full h-1 bg-[#152030] relative overflow-hidden mt-4">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[var(--color-amber)] shadow-[0_0_15px_rgba(255,176,0,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs font-mono text-[var(--color-text-muted)] tracking-[0.2em] uppercase">
          <span>SYS_INIT // BOOT_SEQ</span>
          <span>{Math.floor(progress)}%</span>
        </div>

      </div>

      {/* The Flash Overlay */}
      {isFlashing && (
        <motion.div 
          className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay"
          initial={{ opacity: 0, scaleY: 0.01 }}
          animate={{ opacity: [0, 1, 0], scaleY: [0.01, 1, 0.01] }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(255,255,255,1)_50%)] bg-[length:100%_4px]" />
        </motion.div>
      )}
    </motion.div>
  );
}
