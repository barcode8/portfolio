
interface ClassificationStampProps {
  text?: 'TOP SECRET' | 'EYES ONLY' | 'CLASSIFIED';
  className?: string;
}

export function ClassificationStamp({ text = 'TOP SECRET', className = '' }: ClassificationStampProps) {
  return (
    <div 
      className={`absolute top-8 right-8 -rotate-15 pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      <div 
        className="font-mono text-[0.7rem] tracking-[0.4em] font-bold text-[var(--color-status-alert)] border border-[var(--color-status-alert)] px-[0.6rem] py-[0.2rem]"
        style={{ opacity: 0.12 }}
      >
        {text}
      </div>
    </div>
  );
}
