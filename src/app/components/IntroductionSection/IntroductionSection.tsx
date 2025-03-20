//src/app/components/IntroductionSection/IntroductionSection.tsx

import React from 'react';

function IntroductionSection() {
  return (
    <section className="grid grid-rows-[3fr_2fr] grid-cols-1 gap-4 items-center h-[500px] rounded-xl text-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
      {/* Video takes full width in the first row */}
      <div className="row-span-1 w-full h-[250px] col-span-1">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full"
          aria-label="Promotional Video"
        >
          <source src="/ads.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content takes full width in the second row */}
      <div className="row-span-1 col-span-1 px-6">
        <h1 className="text-5xl md:text-4xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Wisdom Creates Wealth.
        </h1>
        <p className="text-lg text-zinc-800 dark:text-zinc-300">
          True success is not about chasing profits, but about mastering the
          principles that make wealth inevitable.
        </p>
      </div>
    </section>
  );
}

export default IntroductionSection;
