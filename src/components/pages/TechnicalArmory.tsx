import { motion } from 'framer-motion';
import { BracketCorners } from '../ui/BracketCorners';
import { RedactionBlock } from '../ui/RedactionBlock';
import { TerminalScramble } from '../ui/TerminalScramble';

const MODULES = [
  {
    code: 'MOD-FE',
    title: 'FRONTEND SYSTEMS',
    clearance: 'UNRESTRICTED',
    color: 'var(--color-status-info)',
    skills: [
      { name: 'React', desc: 'Component Architecture · Hooks' },
      { name: 'Tailwind CSS', desc: 'Utility-First Styling' },
      { name: 'JavaScript', desc: 'Core Language · ES6+' }
    ]
  },
  {
    code: 'MOD-BE',
    title: 'BACKEND SYSTEMS',
    clearance: 'LEVEL 3',
    color: 'var(--color-status-warning)',
    skills: [
      { name: 'Node.js', desc: 'Event Loop · Async I/O' },
      { name: 'Express.js', desc: 'REST APIs · Middleware' },
      { name: 'Python', desc: 'Data Processing · Scripting' },
      { name: 'C / C++', desc: 'System Level · Memory Management' }
    ]
  },
  {
    code: 'MOD-INF',
    title: 'INFRASTRUCTURE & DB',
    clearance: 'RESTRICTED',
    color: 'var(--color-status-alert)',
    skills: [
      { name: 'MongoDB', desc: 'Document Store · Aggregation' },
      { name: 'Docker', desc: 'Containerization' },
      { name: 'Nginx', desc: 'Reverse Proxy · Web Server' }
    ]
  },
  {
    code: 'MOD-ENV',
    title: 'OPERATING ENVIRONMENT',
    clearance: 'UNRESTRICTED',
    color: 'var(--color-status-info)',
    skills: [
      { name: 'Linux', desc: 'System Administration · Shell' },
      { name: 'Git', desc: 'Version Control · CI/CD' }
    ]
  }
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

export function TechnicalArmory() {
  return (
    <div className="flex flex-col h-full space-y-6 relative z-10">
      {/* Header */}
      <div className="flex justify-between text-[var(--color-text-secondary)] font-mono text-xs tracking-widest border-b border-[var(--color-border-subtle)] pb-2 shrink-0">
        <span>LOADOUT REF: MI6/TECH/TA-02/2026</span>
        <span>MODULE COUNT: 04 ACTIVE</span>
      </div>

      <TerminalScramble 
        text="TECHNICAL ARMORY"
        as="h2"
        className="font-display text-4xl md:text-5xl tracking-normal text-[var(--color-text-primary)] mt-2"
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar"
      >
        {MODULES.map((mod, idx) => (
          <motion.div key={idx} variants={itemVariants} className="relative bg-[var(--color-panel-deep)] border border-[var(--color-border-mid)] p-6">
            <BracketCorners size={10} thickness={1.5} color="var(--color-amber-glow)" />
            
            <div className="flex justify-between items-center border-b border-[var(--color-border-subtle)] pb-3 mb-4">
              <div className="font-display text-2xl md:text-3xl tracking-normal text-[var(--color-amber)] flex items-center mt-1">
                <span className="opacity-60 mr-2 font-mono text-sm mb-1">[{mod.code}]</span>
                {mod.title}
              </div>
              <div 
                className="font-mono text-[0.60rem] tracking-[0.15em] px-2 py-0.5 border"
                style={{ borderColor: mod.color, color: mod.color, backgroundColor: `${mod.color}10` }}
              >
                {mod.clearance}
              </div>
            </div>

            <div className="space-y-4">
              {mod.skills.map((skill, sIdx) => (
                <div key={sIdx} className="pl-4 border-l-2 border-[var(--color-border-subtle)] hover:border-[var(--color-amber)] transition-colors duration-200">
                  <div className="font-mono text-base font-semibold tracking-[0.04em] text-[var(--color-text-primary)] mb-1 flex items-center">
                    <span className="text-[var(--color-amber)] mr-2 opacity-80">›</span>
                    {skill.name}
                  </div>
                  <div className="font-sans text-sm leading-relaxed text-[var(--color-text-secondary)] pl-4">
                    {skill.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex items-center text-[var(--color-text-muted)] font-mono text-xs tracking-widest pt-2 border-t border-[var(--color-border-subtle)] shrink-0">
        <RedactionBlock width="140px" className="mr-4" />
        <span>ADDITIONAL CAPABILITIES REDACTED...</span>
      </div>
    </div>
  );
}
