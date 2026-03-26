import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useSpring(0, { stiffness: 500, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 40 });
  
  const outerX = useSpring(0, { stiffness: 250, damping: 30 });
  const outerY = useSpring(0, { stiffness: 250, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      outerX.set(e.clientX);
      outerY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isSelectable = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a");
      
      setIsPointer(!!isSelectable);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    // Simple touch detection
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true);
      return;
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY, outerX, outerY]);

  if (!isVisible || isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
      {/* Inner Dot */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* Outer Ring */}
      <motion.div
        style={{ x: outerX, y: outerY }}
        animate={{
          scale: isMouseDown ? 0.8 : isPointer ? 1.5 : 1,
          opacity: 1,
        }}
        className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full -translate-x-1/2 -translate-y-1/2"
      >
        {isPointer && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 border border-white/20 rounded-full animate-ping"
          />
        )}
      </motion.div>

      {/* HUD Lines (Crosshair feel) */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-20"
      >
        <div className="absolute w-[2px] h-4 bg-white -top-6 left-0" />
        <div className="absolute w-[2px] h-4 bg-white -bottom-0 left-0 translate-y-2" />
        <div className="absolute w-4 h-[2px] bg-white -left-6 top-0" />
        <div className="absolute w-4 h-[2px] bg-white -right-0 top-0 translate-x-2" />
      </motion.div>
    </div>
  );
};
