//src/app/components/IntroductionSection/IntroductionSection.tsx

'use client';

function IntroductionSection() {
  return (
    <section className="grid grid-rows-2 w-full h-[500px] rounded-xl text-center overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700">
      {/* Video in the first row */}
      <div className="w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          aria-label="Promotional Video"
        >
          <source src="/ads.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content in the second row */}
      <div className="grid place-items-center px-6">
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
