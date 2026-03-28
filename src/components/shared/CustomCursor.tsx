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
      {/* Simple Crosshair (+) Cursor */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: isMouseDown ? 0.9 : isPointer ? 1.4 : 1,
          rotate: isPointer ? 90 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        {/* Vertical Line */}
        <div className="absolute w-[1.5px] h-4 bg-white -translate-x-1/2 -translate-y-1/2" />
        {/* Horizontal Line */}
        <div className="absolute w-4 h-[1.5px] bg-white -translate-x-1/2 -translate-y-1/2" />
        
        {/* Subtle Ring on hover */}
        {isPointer && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white"
          />
        )}
      </motion.div>
    </div>
  );
};
