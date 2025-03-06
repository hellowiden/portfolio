import React from 'react';
import Image from 'next/image';
import AnimatedBackground from '@/app/components/AnimatedBackground/AnimatedBackground';

function IntroductionSection() {
  return (
    <section
      id="home"
      className="relative w-full grid gap-6 p-6 transition-all items-center justify-center text-center overflow-hidden"
    >
      <AnimatedBackground /> {/* Animated background applied here */}
      <div className="relative z-10">
        <div
          className="w-40 h-40 rounded-full overflow-hidden border-2 border-zinc-600 mx-auto"
          aria-label="Profile Picture"
        >
          <Image
            src="/MW.png"
            alt="Marcus Widén"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-4xl font-bold tracking-wide">Marcus Widén</div>
        <div className="text-md tracking-wide font-normal leading-relaxed text-zinc-900 max-w-xl mx-auto">
          Hi, I’m Marcus Widén. I’m passionate about helping businesses thrive
          through strategic planning, user-focused design, and creative
          problem-solving. Let’s work together to turn your ideas into impactful
          solutions.
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="rounded-md border px-6 py-3 text-sm font-light transition border-zinc-600 bg-black text-white">
            Contact
          </button>
          <button className="rounded-md border px-6 py-3 text-sm font-light transition border-zinc-600 bg-black text-white">
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
}

export default IntroductionSection;
