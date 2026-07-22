import React, { useEffect, useState, useRef } from 'react';
import { useAudioHooks } from '../../hooks/useAudioHooks';

interface TerminalScrambleProps {
  text: string;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  scrambleDelay?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*&%';

export function TerminalScramble({
  text,
  as: Component = 'span',
  className = '',
  style,
  scrambleDelay = 0
}: TerminalScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const { playScramble } = useAudioHooks();
  const hasPlayed = useRef(false);

  useEffect(() => {
    let timeoutId: number;
    let frameId: number;
    
    // Reset state when text changes
    hasPlayed.current = false;
    setDisplayText('');
    
    timeoutId = window.setTimeout(() => {
      if (!hasPlayed.current) {
        playScramble();
        hasPlayed.current = true;
      }

      let iteration = 0;
      const maxIterations = text.length;
      
      const animate = () => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration < maxIterations) {
          iteration += 1 / 3; // speed
          frameId = window.requestAnimationFrame(animate);
        } else {
          setDisplayText(text); // Ensure final text is exact
        }
      };
      
      frameId = window.requestAnimationFrame(animate);
    }, scrambleDelay);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [text, playScramble, scrambleDelay]);

  return (
    <Component className={className} style={style}>
      {displayText || ' '}
    </Component>
  );
}
