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
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    const initialBubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: Math.random() * 30 + 10,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 4,
    }));
    
    // Use requestAnimationFrame to avoid direct setState in effect
    requestAnimationFrame(() => {
      setBubbles(initialBubbles);
    });

    const interval = setInterval(() => {
      setBubbles((prev) => {
        const newBubble: Bubble = {
          id: Date.now(),
          left: `${Math.random() * 100}%`,
          width: Math.random() * 30 + 10,
          delay: 0,
          duration: Math.random() * 3 + 4,
        };
        return [...prev.slice(-14), newBubble];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: bubble.left,
            width: `${bubble.width}px`,
            height: `${bubble.width}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
            background: `radial-gradient(circle at 30% 30%, oklch(62.8% 0.25 25 / 30%), transparent)`,
            animation: 'riseNeoNoir 6s ease-in infinite',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes riseNeoNoir {
          0% {
            bottom: -50px;
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            bottom: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
