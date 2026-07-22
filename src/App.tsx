import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Shield, Lock, Unlock, Volume2, VolumeX, Printer } from 'lucide-react';
import { CustomCursor } from './components/ui/CustomCursor';
import { ClassificationStamp } from './components/ui/ClassificationStamp';
import { OperativeOverview } from './components/pages/OperativeOverview';
import { TechnicalArmory } from './components/pages/TechnicalArmory';
import { ClassifiedOperations } from './components/pages/ClassifiedOperations';
import { AcademicDirectives } from './components/pages/AcademicDirectives';
import { useAudioHooks } from './hooks/useAudioHooks';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { useDossier } from './contexts/DossierContext';
import { BootSequence } from './components/ui/BootSequence';

const DOSSIER_TABS = [
  { id: 0, code: "01", label: "[ABOUT] OPERATIVE OVERVIEW", shortLabel: "ABOUT" },
  { id: 1, code: "02", label: "[SKILLS] TECHNICAL ARMORY", shortLabel: "SKILLS" },
  { id: 2, code: "03", label: "[PROJECTS] CLASSIFIED OPERATIONS", shortLabel: "PROJECTS" },
  { id: 3, code: "04", label: "[EDUCATION] ACADEMIC DIRECTIVES", shortLabel: "EDUCATION" },
] as const;

function App() {
  const [activeTabId, setActiveTabId] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const [isBooted, setIsBooted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('dossier_booted') === 'true';
    }
    return false;
  });
  const { playHover, playDeploy } = useAudioHooks();
  const { isDecrypted, toggleDecrypted, setDecrypted, isMuted, toggleMuted } = useDossier();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isBooted && !isDecrypted) {
      const timer = setTimeout(() => {
        setDecrypted(true);
      }, 1500); // 1.5 seconds of atmospheric encryption
      return () => clearTimeout(timer);
    }
  }, [isBooted, isDecrypted, setDecrypted]);

  useEffect(() => {
    const handleBeforePrint = () => setDecrypted(true);
    window.addEventListener('beforeprint', handleBeforePrint);
    return () => window.removeEventListener('beforeprint', handleBeforePrint);
  }, [setDecrypted]);

  const handleTabClick = useCallback((id: number) => {
    if (id !== activeTabId) {
      playDeploy();
      setActiveTabId(id);
    }
  }, [activeTabId, playDeploy]);

  const handlePrint = useCallback(() => {
    playDeploy();
    setDecrypted(true);
    setTimeout(() => {
      window.print();
    }, 150);
  }, [playDeploy, setDecrypted]);

  useKeyboardNav(handleTabClick);

  return (
    <>
      <AnimatePresence>
        {!isBooted && (
          <BootSequence onComplete={() => {
            sessionStorage.setItem('dossier_booted', 'true');
            setIsBooted(true);
          }} />
        )}
      </AnimatePresence>

      {/* MAIN APP SHELL */}
      <div className="flex min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)] font-sans overflow-hidden flex-col selection:bg-[var(--color-amber-glow)] selection:text-[var(--color-amber)] print:bg-white print:text-black print:overflow-visible print:h-auto print:min-h-0">
      {isClient && <CustomCursor />}
      
      {/* ── TOP NAVIGATION BAR ────────────────────────────────────────── */}
      <header className="h-[52px] border-b border-[var(--color-border-mid)] bg-[var(--color-panel-deep)] flex items-end px-2 sm:px-6 flex-shrink-0 relative z-20 print:hidden">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-[2px] mr-4 sm:mr-8 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-amber)] animate-pulse shadow-[0_0_6px_rgba(255,176,0,0.6)]" />
          <span className="font-mono font-bold text-[0.65rem] sm:text-xs tracking-widest text-[var(--color-text-primary)] flex items-center">
            <Shield className="w-3.5 h-3.5 mr-1 sm:mr-2 text-[var(--color-amber)] hidden sm:block" />
            MI6
            <span className="hidden sm:inline">&nbsp;&middot; DOSSIER</span>
          </span>
        </div>

        <nav className="flex space-x-1 h-full overflow-x-auto whitespace-nowrap scroll-smooth flex-1 custom-scrollbar hide-scrollbar">
          {DOSSIER_TABS.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                onMouseEnter={playHover}
                className={`
                  relative h-full px-5 flex items-center group transition-all duration-150
                  ${isActive 
                    ? 'bg-[var(--color-amber-dim)] text-[var(--color-amber)] border-b-2 border-[var(--color-amber)] shadow-[inset_0_-2px_12px_rgba(255,176,0,0.15)]' 
                    : 'bg-[var(--color-panel)] text-[var(--color-text-primary)] opacity-60 hover:bg-[var(--color-amber-ghost)] hover:opacity-100'}
                `}
              >
                <span className="font-mono text-[0.60rem] opacity-60 mr-2">[{tab.code}]</span>
                <span className="font-display text-lg font-medium tracking-normal mt-0.5">
                  <span className="hidden lg:inline">{tab.label}</span>
                  <span className="inline lg:hidden">{tab.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="ml-auto mb-2 flex items-center space-x-4">
          <button
            onClick={() => {
              playDeploy();
              toggleMuted();
            }}
            onMouseEnter={playHover}
            className="flex items-center space-x-2 text-[var(--color-text-secondary)] hover:text-[var(--color-amber)] transition-colors h-full px-2"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={handlePrint}
            onMouseEnter={playHover}
            className="flex items-center px-2 py-1 font-mono text-[0.55rem] tracking-widest border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-mid)] transition-all duration-300"
          >
            <Printer className="w-3 h-3 sm:mr-2" />
            <span className="hidden sm:inline">EXPORT PLAINTEXT</span>
          </button>
          <button
            onClick={() => {
              playDeploy();
              toggleDecrypted();
            }}
            onMouseEnter={playHover}
            className={`flex items-center px-2 py-1 font-mono text-[0.55rem] tracking-widest border transition-all duration-300 ${
              isDecrypted
                ? 'border-[var(--color-status-online)] text-[var(--color-status-online)] shadow-[0_0_8px_rgba(46,204,113,0.3)] bg-[rgba(46,204,113,0.1)]'
                : 'border-[var(--color-amber)] text-[var(--color-amber)] hover:bg-[var(--color-amber-ghost)]'
            }`}
          >
            {isDecrypted ? (
              <>
                <Unlock className="w-3 h-3 sm:mr-2 animate-pulse" />
                <span className="hidden sm:inline">DOSSIER DECRYPTED</span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 sm:mr-2" />
                <span className="hidden sm:inline">DECRYPT DOSSIER</span>
              </>
            )}
          </button>
          <div className="hidden sm:flex items-center text-[var(--color-text-secondary)]">
            <Lock className="w-3 h-3 mr-2" />
            <span className="font-mono text-xs tracking-[0.10em]">SECURE AES-256</span>
          </div>
        </div>
      </header>

      {/* ── PAGE CONTENT AREA ─────────────────────────────────────────── */}
      <main className="flex-1 relative overflow-hidden h-[calc(100vh-80px)] print:h-auto print:overflow-visible">
        <ClassificationStamp text="TOP SECRET" />
        
        {/* SCREEN RENDER */}
        <div className="print:hidden h-full">
          <AnimatePresence mode="wait">
            {isClient && (
            <motion.div
              key={activeTabId}
              initial={{ x: 28, opacity: 0, filter: 'blur(4px) contrast(150%) hue-rotate(-10deg)' }}
              animate={{ x: 0, opacity: 1, filter: 'blur(0px) contrast(100%) hue-rotate(0deg)' }}
              exit={{ x: -28, opacity: 0, filter: 'blur(4px) contrast(150%) hue-rotate(10deg)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0 p-4 sm:p-6 overflow-y-auto overflow-x-hidden custom-scrollbar"
            >
              {activeTabId === 0 && <OperativeOverview />}
              {activeTabId === 1 && <TechnicalArmory />}
              {activeTabId === 2 && <ClassifiedOperations />}
              {activeTabId === 3 && <AcademicDirectives />}
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        {/* PRINT ONLY RENDER */}
        <div className="hidden print:block print:w-full print:h-auto print:overflow-visible">
          <OperativeOverview />
          <TechnicalArmory />
          <ClassifiedOperations />
          <AcademicDirectives />
        </div>
      </main>

      {/* ── BOTTOM STATUS STRIP ───────────────────────────────────────── */}
      <footer className="h-[28px] border-t border-[var(--color-border-mid)] bg-[var(--color-panel-deep)] flex items-center justify-between px-2 sm:px-6 flex-shrink-0 relative z-20 print:hidden">
        <div className="flex items-center space-x-6 font-mono text-xs tracking-[0.10em] text-[var(--color-text-secondary)] hidden md:flex">
          <span className="text-xs text-[var(--color-amber)] opacity-40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            [INPUT: 1-4 TO NAVIGATE]
          </span>
          <span>TIMESTAMP: 2026.07.22 / 08:05Z</span>
          <span className="text-[var(--color-status-online)]">SYSTEM: ONLINE</span>
        </div>
        
        {/* SECURE COMMS TERMINAL */}
        <div className="flex items-center space-x-4 sm:space-x-6 font-mono text-xs tracking-[0.15em] mx-auto md:mx-0">
          <span className="text-[var(--color-amber)] animate-pulse hidden sm:inline mr-2">SECURE COMMS:</span>
          <a href="https://github.com/barcode8" target="_blank" rel="noopener noreferrer" 
             onMouseEnter={playHover} onClick={() => playDeploy()}
             className="transition-colors text-[var(--color-text-primary)] hover:text-[var(--color-amber)] cursor-pointer">
            [ GITHUB ]
          </a>
          <a href="https://www.linkedin.com/in/haardikaggarwal/" target="_blank" rel="noopener noreferrer" 
             onMouseEnter={playHover} onClick={() => playDeploy()}
             className="transition-colors text-[var(--color-text-primary)] hover:text-[var(--color-amber)] cursor-pointer">
            [ LINKEDIN ]
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" 
             onMouseEnter={playHover} onClick={() => playDeploy()}
             className="transition-colors text-[var(--color-text-primary)] hover:text-[var(--color-amber)] cursor-pointer">
            [ RESUME ]
          </a>
        </div>

        <div className="flex items-center font-mono text-xs tracking-[0.10em] text-[var(--color-text-secondary)] hidden sm:flex">
          <span className={isDecrypted ? 'text-[var(--color-status-online)]' : ''}>
            CHANNEL: {isDecrypted ? 'OPEN' : 'ENCRYPTED'}
          </span>
          <span className="ml-4 text-[var(--color-text-muted)]">
            {String(activeTabId + 1).padStart(2, '0')}/{String(DOSSIER_TABS.length).padStart(2, '0')}
          </span>
        </div>
      </footer>
      </div>
    </>
  );
}

export default App;
