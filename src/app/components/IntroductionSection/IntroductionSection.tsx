'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function IntroductionSection() {
  return (
    <section
      id="home"
      className="w-full h-[500px] grid place-items-end bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/shake.jpg')" }}
    >
      <div className="w-full grid grid-cols-[1fr, min-contact] grid-rows-2 gap-2 bg-zinc-800 bg-opacity-75 backdrop-blur-md p-6 text-white">
        {/* Row 1: Spanning Both Columns */}
        <div className="col-span-2">
          <h1 className="text-3xl">Brand and Fullstack Developer</h1>
          <p className="opacity-80 tracking-wide">
            I’m passionate about helping businesses thrive through strategic
            planning, user-focused design, and creative problem-solving. Let’s
            work together to turn your ideas into impactful solutions.
          </p>
        </div>

        {/* Row 2, Column 1 */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-3">
          <Image
            src="/MW.png"
            alt="Marcus Widén"
            width={40}
            height={40}
            className="rounded-full border"
          />
          <h1 className="text-xl">Marcus Widén</h1>
        </div>

        {/* Row 2, Column 2 */}
        <div className="grid grid-cols-2 items-center text-center gap-4">
          <Link
            href="#contact"
            className="grid items-center p-1 border rounded-full transition text-sm opacity-55 hover:opacity-100 text-white"
          >
            Contact
          </Link>
          <Link
            href="/resume.pdf"
            download
            className="grid items-center p-1 border rounded-full transition text-sm opacity-55 hover:opacity-100 text-white"
          >
            Download Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
