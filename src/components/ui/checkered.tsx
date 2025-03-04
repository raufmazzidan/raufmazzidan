"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const CheckeredSVG = ({ size = 21, width = 720 }) => {
  const adjustedSize = size % 2 === 0 ? size + 1 : size; // Ensure size is odd
  const adjustedVerticalSize =
    Math.ceil(adjustedSize / 2) % 2 === 0
      ? Math.ceil(adjustedSize / 2) + 1
      : Math.ceil(adjustedSize / 2); // Ensure vertical size is odd

  const cellSize = width / adjustedSize;
  const height = adjustedVerticalSize * cellSize;
  const squares = [];

  for (let y = 0; y < adjustedVerticalSize; y++) {
    for (let x = 0; x < adjustedSize; x++) {
      if ((x + y) % 2 === 1) {
        squares.push(
          <rect
            key={`${x}-${y}`}
            x={x * cellSize}
            y={y * cellSize}
            width={cellSize}
            height={cellSize}
            className="fill-background"
          />
        );
      }
    }
  }

  const [position, setPosition] = useState({ x: 0, y: 0, rotate: 0, scale: 1 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        rotate: Math.random() * 360,
        scale: Math.random() + 0.8,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <motion.div
        className="absolute w-full h-full bg-gradient-to-r from-teal-500 via-[#2DAA9E] to-[#27445D] blur-3xl opacity-50"
        animate={{
          rotate: position.rotate,
          scale: position.scale,
        }}
        transition={{
          x: { duration: 2.5, ease: "easeInOut" },
          y: { duration: 0.5, ease: "easeInOut" },
          rotate: { duration: 10, ease: "easeInOut" },
          scale: { duration: 1, ease: "easeInOut" },
        }}
      />
      <svg
        width={width}
        height={height}
        className="absolute"
        viewBox={`0 0 ${width} ${height}`}
      >
        {squares}
      </svg>
    </div>
  );
};

export default CheckeredSVG;
