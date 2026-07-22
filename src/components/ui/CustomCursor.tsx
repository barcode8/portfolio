import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      // Check if hovered element is clickable
      const clickable = target.closest('a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      setIsPointer(!!clickable);
    };

    // Hide default cursor on body
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--color-amber)] rounded-full pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[var(--color-amber)] opacity-40 rounded-full pointer-events-none z-[99]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.2 : 1,
          backgroundColor: isPointer ? 'var(--color-amber-ghost)' : 'transparent'
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.2 }}
      />
    </>
  );
}
