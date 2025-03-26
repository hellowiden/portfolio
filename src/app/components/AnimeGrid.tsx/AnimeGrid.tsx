// components/AnimeGrid.tsx
'use client';
import { useEffect, useState } from 'react';
import anime from 'animejs';

const AnimeGrid = () => {
  const [gridSize, setGridSize] = useState({ columns: 0, rows: 0, total: 1 });

  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const handleStagger = (index: number) => {
    anime({
      targets: '.grid-item',
      backgroundColor: randomColor(),
      delay: anime.stagger(50, {
        grid: [gridSize.columns, gridSize.rows],
        from: index,
      }),
    });
  };

  const calculateGrid = () => {
    const columns = Math.floor(window.innerWidth / 50);
    const rows = Math.floor(window.innerHeight / 50);
    setGridSize({ columns, rows, total: columns * rows });
  };

  useEffect(() => {
    calculateGrid();
    window.addEventListener('resize', calculateGrid);

    return () => window.removeEventListener('resize', calculateGrid);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <div
        id="grid"
        className="grid w-screen h-screen"
        style={{
          gridTemplateColumns: `repeat(${gridSize.columns}, minmax(50px, 1fr))`,
          gridTemplateRows: `repeat(${gridSize.rows}, minmax(50px, 1fr))`,
        }}
      >
        {Array.from({ length: gridSize.total }, (_, i) => (
          <div
            key={i}
            className="grid-item relative w-full h-full bg-white cursor-pointer hover:opacity-80"
            onClick={() => handleStagger(i)}
          >
            <div className="absolute inset-0 border border-black" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeGrid;
