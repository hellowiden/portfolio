'use client';

import * as React from 'react';

interface InteractiveGridBackgroundProps {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridBackground({
  width = 20,
  height = 20,
  squares = [80, 80],
  className,
  squaresClassName,
}: InteractiveGridBackgroundProps) {
  const [hovered, setHovered] = React.useState<[number, number] | null>(null);

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-secondary-800 dark:bg-secondary-900">
      <svg
        className={`[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] ${
          className ?? ''
        }`}
        width="100%"
        height="100%"
        viewBox={`0 0 ${squares[0] * width} ${squares[1] * height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: squares[1] }).map((_, y) =>
          Array.from({ length: squares[0] }).map((_, x) => {
            const isHovered = hovered?.[0] === x && hovered?.[1] === y;
            return (
              <rect
                key={`${x}-${y}`}
                x={x * width}
                y={y * height}
                width={width}
                height={height}
                className={`transition-colors duration-200 ease-in-out ${
                  squaresClassName ?? ''
                }`}
                fill={isHovered ? 'currentColor' : undefined}
                style={{
                  color: isHovered
                    ? 'rgb(var(--color-primary-200))'
                    : 'rgb(var(--color-secondary-700))',
                }}
                onMouseEnter={() => setHovered([x, y])}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}
