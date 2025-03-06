'use client';

import React from 'react';

function IntroductionSection() {
  return (
    <section className="w-full bg-zinc-900 p-6 grid gap-4 text-zinc-100">
      <div className="grid place-items-center">
        <div className="w-32 h-32 bg-zinc-700 rounded-full">Image</div>
      </div>
      <div className="text-center text-xl font-semibold">Marcus Widén</div>
      <div className="text-center text-zinc-400 max-w-lg mx-auto">
        Hi, I’m Marcus Widén. I’m passionate about helping businesses thrive
        through strategic planning, user-focused design, and creative
        problem-solving. Let’s work together to turn your ideas into impactful
        solutions.
      </div>
      <div className="flex justify-center gap-4">
        <button className="px-4 py-2 bg-zinc-700 text-zinc-100 rounded-lg hover:bg-zinc-600">
          Contact
        </button>
        <button className="px-4 py-2 bg-zinc-700 text-zinc-100 rounded-lg hover:bg-zinc-600">
          Download Resume
        </button>
      </div>
    </section>
  );
}

export default IntroductionSection;
