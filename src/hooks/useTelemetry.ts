import { useState, useEffect } from 'react';

export function useTelemetry(sequence: string[]) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex >= sequence.length) {
      setIsComplete(true);
      return;
    }

    const delay = Math.random() * (850 - 200) + 200;
    
    const timeout = setTimeout(() => {
      setLines(prev => [...prev, sequence[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentIndex, sequence]);

  return { lines, isComplete };
}
