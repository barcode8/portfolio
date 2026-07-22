
interface RedactionBlockProps {
  width?: string;
  className?: string;
}

export function RedactionBlock({ width = '60px', className = '' }: RedactionBlockProps) {
  return (
    <span 
      className={`inline-block bg-[var(--color-border-mid)] rounded-sm ${className}`}
      style={{ width, height: '0.8em', verticalAlign: 'middle', userSelect: 'none' }}
      aria-hidden="true"
    />
  );
}
