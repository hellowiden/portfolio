//src/app/components/IntroductionSection/IntroductionSection.tsx

import React from 'react';

function IntroductionSection() {
  return (
    <section className="grid grid-rows-2 grid-cols-2 gap-4 items-center h-[500px] rounded-xl p-6 text-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
      {/* Video spanning both columns in the first row */}
      <div className="row-span-1 col-span-2">
        <video className="w-full h-full rounded-lg" controls>
          <source src="/path-to-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content spanning both columns in the second row */}
      <div className="row-span-1 col-span-2 grid gap-4">
        <h1 className="text-6xl md:text-5xl sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Wisdom Creates Wealth.
        </h1>
        <p className="text-md text-zinc-800 dark:text-zinc-300">
          True success is not about chasing profits, but about mastering the
          principles that make wealth inevitable.
        </p>
      </div>
    </section>
  );
}

export default IntroductionSection;
