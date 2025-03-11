'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function IntroductionSection() {
  return (
    <section
      id="home"
      className="w-full h-[500px] border dark:border-light rounded-xl container mx-auto bg-cover bg-center overflow-hidden flex items-end relative gap-2"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/ads.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative w-full grid grid-cols-[1fr_auto] grid-rows-[min-content, min-content] gap-4 bg-white/75 dark:bg-zinc-800/75 backdrop-blur-md p-6 text-zinc-900 dark:text-white">
        {/* Row 1, Column 1 */}
        <div className="flex items-center gap-3">
          <Image
            src="/MW.png"
            alt="Marcus Widén"
            width={50}
            height={50}
            className="rounded-xl border border-zinc-300 dark:border-zinc-700"
            priority
          />
          <h1 className="text-xl font-medium">Marcus Widén</h1>
        </div>

        {/* Row 1, Column 2 */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="#contact"
            className="flex items-center gap-2 text-sm dark:border-dark  text-black/60 rounded hover:text-black dark:text-white/50  dark:hover:text-white transition hover:text-opacity-80 dark:hover:text-opacity-80"
          >
            Work with me
          </Link>
          <Link
            href="/resume.pdf"
            download
            className="flex items-center gap-2 text-sm dark:border-dark  text-black/60 rounded hover:text-black dark:text-white/50  dark:hover:text-white transition hover:text-opacity-80 dark:hover:text-opacity-80"
          >
            Download resume
          </Link>
        </div>

        {/* Row 2: Spans both columns on small screens, one column on medium+ screens */}
        <div className="col-span-2 md:col-span-1">
          <div className="text-3xl font-bold">
            Terraforming Brands, Shaping Legacies
          </div>
          <p className="opacity-80 tracking-wide max-w-[900px]">
            Your brand deserves more than recognition—it needs authority. I
            craft strategic branding, full-stack solutions, and market
            positioning that make businesses stand out, earn trust, and drive
            real results.
            <Link
              href="/about"
              className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition ml-2"
            >
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
