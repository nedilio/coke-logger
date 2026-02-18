"use client";

import { useEffect, useState, useRef } from "react";

interface Bubble {
  id: number;
  left: string;
  width: number;
  delay: number;
  duration: number;
}

export function BubblesBg() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    // Generate initial bubbles on client only (avoids hydration mismatch)
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      const initialBubbles: Bubble[] = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        width: Math.random() * 40 + 20, // 20-60px
        delay: Math.random() * 4,
        duration: Math.random() * 2 + 3, // 3-5s
      }));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Initial state must be set client-side to prevent SSR hydration mismatch
      setBubbles(initialBubbles);
    }

    // Create new bubbles periodically
    const interval = setInterval(() => {
      setBubbles((prev) => {
        const newBubble: Bubble = {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
          width: Math.random() * 40 + 20,
          delay: 0,
          duration: Math.random() * 2 + 3,
        };
        // Keep max 20 bubbles
        return [...prev.slice(-19), newBubble];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: bubble.left,
            width: `${bubble.width}px`,
            height: `${bubble.width}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
