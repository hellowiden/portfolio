'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function IntroductionSection() {
  return (
    <section
      id="home"
      className="w-full h-[500px] bg-cover bg-center overflow-hidden flex items-end relative gap-2"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/shake3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative w-full grid grid-cols-[1fr_auto] grid-rows-[min-content, min-content] gap-4 bg-white/75 dark:bg-zinc-800/75 backdrop-blur-md p-6 text-zinc-900 dark:text-white">
        {/* Row 1: Full Width */}
        <div className="col-span-2">
          <h1 className="text-3xl font-semibold">
            Elevating Brands, Engineering Impact
          </h1>
          <p className="opacity-80 tracking-wide">
            In a world where attention is power, your brand must be more than
            visible—it must be undeniable. I specialize in strategic branding,
            full-stack development, and market positioning that commands trust
            and influence. My expertise ensures your business stands out,
            resonates deeply, and drives measurable success.
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

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="#contact"
            className="flex items-center gap-2 p-2 text-sm border dark:border-dark bg-green text-white rounded hover:bg-green-700 dark:hover:bg-green-800 transition dark:text-white hover:text-opacity-80 dark:hover:text-opacity-80"
          >
            Work With Me
          </Link>
          <Link
            href="/resume.pdf"
            download
            className="flex items-center gap-2 p-2 text-sm border dark:border-dark bg-green text-white rounded hover:bg-green-700 dark:hover:bg-green-800 transition dark:text-white hover:text-opacity-80 dark:hover:text-opacity-80"
          >
            Download Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
