import { motion } from 'framer-motion';
import { BracketCorners } from '../ui/BracketCorners';
import { RedactionBlock } from '../ui/RedactionBlock';
import { TerminalScramble } from '../ui/TerminalScramble';
import { useDossier } from '../../contexts/DossierContext';

const TIMELINE = [
  { year: '2024', text: 'Programme activation', status: 'past' },
  { year: '2025', text: 'Core modules & initial hackathons', status: 'past' },
  { year: '2026', text: 'Advanced systems & specialisations', status: 'active' },
  { year: '2027', text: 'Expected graduation', status: 'future' }
];

const MODULES = [
  { code: 'HACK-01', name: 'Smart India Hackathon', status: 'COMPLETED', statusColor: 'var(--color-status-online)', desc: 'Backend Developer (Sep-Nov 2025). Heavy Metal Pollution Index REST API, MongoDB dashboard tracking groundwater pollution across 2 states.' },
  { code: 'HACK-02', name: 'XLR-8 Hackathon', status: 'COMPLETED', statusColor: 'var(--color-status-online)', desc: 'Backend Developer (July 2025). Hierarchy employee data management platform with JSON-based storage.' },
  { code: 'HACK-03', name: 'Shodhotsav 2024', status: 'COMPLETED', statusColor: 'var(--color-status-online)', desc: 'Frontend Developer, Finalist. Responsive E-Sports event-management application.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

export function AcademicDirectives() {
  const { isDecrypted } = useDossier();
  return (
    <div className="flex flex-col h-full space-y-6 relative z-10">
      {/* Header */}
      <div className="flex justify-between text-[var(--color-text-secondary)] font-mono text-xs tracking-widest border-b border-[var(--color-border-subtle)] pb-2 shrink-0">
        <span>ACADEMIC FILE: MI6/ACAD/AD-04/2026</span>
        <span>CREDENTIAL DOSSIER</span>
      </div>

      <TerminalScramble 
        text="ACADEMIC DIRECTIVES"
        as="h2"
        className="font-display text-4xl md:text-5xl tracking-normal text-[var(--color-text-primary)] mt-2"
      />

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar pb-4">
        
        {/* PANEL A & TIMELINE */}
        <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6">
          
          <div className="relative bg-[var(--color-panel-deep)] border border-[var(--color-border-mid)] p-6">
            <BracketCorners size={12} thickness={2} color="var(--color-amber)" />
            
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2 mb-6">
              <span className="font-display text-xl tracking-normal text-[var(--color-text-primary)] mt-1">
                PRIMARY CREDENTIAL
              </span>
              <span className="font-mono text-xs text-[var(--color-status-online)] tracking-widest">
                ● ON TRACK
              </span>
            </div>

            <div className="mb-8">
              <span className="font-mono text-xs tracking-[0.14em] text-[var(--color-text-muted)] uppercase mb-1 block">
                QUALIFICATION
              </span>
              <div className="font-sans text-[1.4rem] font-semibold text-[var(--color-text-primary)] leading-[1.2] mb-1">
                Bachelor of Computer Applications
              </div>
              <div className="font-mono text-sm text-[var(--color-amber)] tracking-[0.05em]">
                CGPA: 8.4/10
              </div>
            </div>

            <div className="space-y-0 border-t border-[var(--color-border-subtle)] pt-4">
              <div className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-widest w-32">INSTITUTION</span>
                {isDecrypted ? (
                  <span className="font-mono text-sm text-[var(--color-status-online)] flex-1 text-right tracking-[0.05em] animate-pulse">
                    VIVEKANANDA INSTITUTE OF PROFESSIONAL STUDIES, NEW DELHI
                  </span>
                ) : (
                  <RedactionBlock width="120px" className="flex-1" />
                )}
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-widest w-32">PROGRAMME LENGTH</span>
                <span className="font-mono text-sm text-[var(--color-text-primary)] flex-1 text-right">3 YEARS</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-widest w-32">YEAR ACTIVATED</span>
                <span className="font-mono text-sm text-[var(--color-text-primary)] flex-1 text-right">2024</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-widest w-32">EXPECTED COMPLETE</span>
                <span className="font-mono text-sm text-[var(--color-text-primary)] flex-1 text-right">2027</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="font-mono text-xs text-[var(--color-text-muted)] tracking-widest w-32">CURRENT STANDING</span>
                <span className="font-mono text-sm text-[var(--color-text-primary)] flex-1 text-right">YEAR 3</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-panel-deep)] border border-[var(--color-border-mid)] p-6">
            <div className="space-y-0 relative ml-2">
              <div className="absolute top-2 bottom-2 left-1 w-px bg-[var(--color-border-subtle)]" />
              
              {TIMELINE.map((item, idx) => {
                const isLast = idx === TIMELINE.length - 1;
                const isPast = item.status === 'past';
                const isActive = item.status === 'active';
                

                return (
                  <div key={idx} className={`relative pl-8 ${isLast ? '' : 'pb-6'}`}>
                    <div 
                      className={`absolute left-0 w-2.5 h-2.5 rounded-full -ml-[4px] mt-0.5 border ${
                        isActive ? 'bg-[var(--color-amber)] border-[var(--color-amber)] shadow-[0_0_8px_rgba(255,176,0,0.6)] z-10' :
                        isPast ? 'bg-[#152030] border-[#3A5060]' :
                        'bg-[#080C14] border-[#152030]'
                      }`}
                    />
                    <div className="flex items-start flex-col sm:flex-row sm:items-center">
                      <span className={`font-mono text-sm w-12 shrink-0 ${isActive ? 'text-[var(--color-amber)] font-bold' : 'text-[var(--color-text-secondary)]'}`}>
                        {item.year}
                      </span>
                      <span className={`font-sans text-base ml-0 sm:ml-4 mt-1 sm:mt-0 ${isActive ? 'text-[var(--color-text-primary)] font-semibold' : 'text-[var(--color-text-muted)]'}`}>
                        {item.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PANEL B */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="bg-[var(--color-panel-deep)] border border-[var(--color-border-mid)] p-6 pb-2">
            
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2 mb-6">
              <span className="font-display text-xl tracking-normal text-[var(--color-text-primary)] mt-1">
                FIELD OPERATIONS & HACKATHONS
              </span>
              <span className="font-mono text-xs text-[var(--color-text-secondary)] tracking-widest uppercase">
                3 OPERATIONS
              </span>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {MODULES.map((mod, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex pl-4 border-l border-[var(--color-border-subtle)] hover:border-[var(--color-amber)] transition-colors duration-200">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-[4px] h-[4px] mr-3 rounded-full" style={{ backgroundColor: mod.statusColor }} />
                        <span className="font-mono text-xs text-[var(--color-text-muted)] mr-3 tracking-widest">{mod.code}</span>
                        <div className="h-[12px] w-px bg-[var(--color-border-mid)] mr-3" />
                        <span className="font-mono text-base font-semibold text-[var(--color-text-primary)]">{mod.name}</span>
                      </div>
                      <span className="font-mono text-[0.60rem] tracking-[0.15em]" style={{ color: mod.statusColor }}>
                        {mod.status}
                      </span>
                    </div>
                    <div className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {mod.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center text-[var(--color-text-muted)] font-mono text-xs tracking-widest">
            <RedactionBlock width="100%" className="mr-4 max-w-[200px]" />
            <span className="truncate">ADDITIONAL RECORDS REDACTED PER PRIVACY DIRECTIVE 2026-08</span>
          </div>
        </div>
      </div>
    </div>
  );
}
