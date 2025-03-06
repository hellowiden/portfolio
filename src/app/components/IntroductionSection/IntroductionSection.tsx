import React from 'react';

function IntroductionSection() {
  return (
    <section
      id="home"
      className="w-full   gap-6 rounded-md bg-zinc-200 p-6 transition-all"
    >
      <div
        className="w-40 h-40 rounded-full overflow-hidden border-2 border-zinc-600"
        aria-label="Profile Picture"
      >
        <div className="w-full h-full bg-zinc-700 ">Image</div>
      </div>
      <div className="text-4xl font-bold tracking-wide">Marcus Widén</div>
      <div className=" text-md tracking-wide font-normal leading-relaxed text-zinc-400 ">
        Hi, I’m Marcus Widén. I’m passionate about helping businesses thrive
        through strategic planning, user-focused design, and creative
        problem-solving. Let’s work together to turn your ideas into impactful
        solutions.
      </div>
      <div className=" w-full grid-cols-2 gap-4 ">
        <button className="rounded-md border px-6 py-3 text-sm font-light transition border-zinc-600 bg-black text-white ">
          Contact
        </button>
        <button className="rounded-md border px-6 py-3 text-sm font-light transition border-zinc-600 bg-black text-white">
          Download Resume
        </button>
      </div>
    </section>
  );
}

export default IntroductionSection;
