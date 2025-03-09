'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function IntroductionSection() {
  return (
    <section
      id="home"
      className="w-full h-[500px] bg-cover bg-center overflow-hidden flex items-end"
      style={{ backgroundImage: "url('/shake.jpg')" }}
    >
      <div className="w-full grid grid-cols-[1fr_auto] grid-rows-2 gap-2 bg-white/75 dark:bg-zinc-800/75 backdrop-blur-md p-6 text-zinc-900 dark:text-white">
        {/* Row 1: Full Width */}
        <div className="col-span-2">
          <h1 className="text-3xl font-semibold">
            Brand and Fullstack Developer
          </h1>
          <p className="opacity-80 tracking-wide">
            I help businesses thrive through strategic planning, user-focused
            design, and creative problem-solving. Let’s build impactful
            solutions together.
          </p>
        </div>

        {/* Row 2, Column 1 */}
        <div className="flex items-center gap-3">
          <Image
            src="/MW.png"
            alt="Marcus Widén"
            width={40}
            height={40}
            className="rounded-full border border-zinc-300 dark:border-zinc-700"
            priority
          />
          <h1 className="text-xl font-medium">Marcus Widén</h1>
        </div>

        {/* Row 2, Column 2 */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="#contact"
            className="py-1 px-2 border border-dark dark:border-light border-bg rounded-full transition-opacity opacity-55 hover:opacity-100"
          >
            Contact
          </Link>
          <Link
            href="/resume.pdf"
            download
            className="py-1 px-2 border border-dark dark:border-light border-bg rounded-full transition-opacity opacity-55 hover:opacity-100"
          >
            Download Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
