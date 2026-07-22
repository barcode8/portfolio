import { useEffect } from 'react';

export function useKeyboardNav(onTabSelect: (id: number) => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      switch (e.key) {
        case '1':
          onTabSelect(0);
          break;
        case '2':
          onTabSelect(1);
          break;
        case '3':
          onTabSelect(2);
          break;
        case '4':
          onTabSelect(3);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTabSelect]);
}
