import { motion } from 'framer-motion';

interface BracketCornersProps {
  size?: number;
  thickness?: number;
  color?: string;
  offset?: number;
}

export function BracketCorners({
  size = 10,
  thickness = 1.5,
  color = '#FFB000',
  offset = 8
}: BracketCornersProps) {
  const cornerStyle = {
    position: 'absolute' as const,
    width: `${size}px`,
    height: `${size}px`,
    borderColor: color,
    borderStyle: 'solid',
    pointerEvents: 'none' as const,
    zIndex: 10
  };

  const transition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
    mass: 0.5
  };

  return (
    <>
      <motion.span 
        initial={{ x: -offset, y: -offset, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={transition}
        style={{ ...cornerStyle, top: 0, left: 0, borderTopWidth: `${thickness}px`, borderLeftWidth: `${thickness}px`, borderBottomWidth: 0, borderRightWidth: 0 }} 
      />
      <motion.span 
        initial={{ x: offset, y: -offset, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={transition}
        style={{ ...cornerStyle, top: 0, right: 0, borderTopWidth: `${thickness}px`, borderRightWidth: `${thickness}px`, borderBottomWidth: 0, borderLeftWidth: 0 }} 
      />
      <motion.span 
        initial={{ x: offset, y: offset, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={transition}
        style={{ ...cornerStyle, bottom: 0, right: 0, borderBottomWidth: `${thickness}px`, borderRightWidth: `${thickness}px`, borderTopWidth: 0, borderLeftWidth: 0 }} 
      />
      <motion.span 
        initial={{ x: -offset, y: offset, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={transition}
        style={{ ...cornerStyle, bottom: 0, left: 0, borderBottomWidth: `${thickness}px`, borderLeftWidth: `${thickness}px`, borderTopWidth: 0, borderRightWidth: 0 }} 
      />
    </>
  );
}
