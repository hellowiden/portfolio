//src/app/components/IntroductionSection/IntroductionSection.tsx

import React from 'react';

function IntroductionSection() {
  return (
    <>
      <section className="grid items-center h-[500] rounded-xl p-6 text-center bg-zinc-100 dark:bg-zinc-700  border-zinc-300 dark:border-zinc-600">
        <div className="grid gap-4">
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100">
            Wisdom Creates Wealth.
          </h1>
          <p className="text-md text-zinc-700 dark:text-zinc-200">
            True success is not about chasing profits, but about mastering the
            principles that make wealth inevitable.
          </p>
        </div>
      </section>
    </>
  );
}

export default IntroductionSection;
