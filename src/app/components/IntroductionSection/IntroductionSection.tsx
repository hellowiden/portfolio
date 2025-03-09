'use client';

import Image from 'next/image';

export default function IntroductionSection() {
  return (
    <section
      id="home"
      className="w-full h-[500px] grid place-items-end bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/shake.jpg')" }}
    >
      <div className="w-full  grid gap-6 bg-black bg-opacity-70 backdrop-blur-md p-6">
        <div className="grid gap-4 text-white w-full max-w-3xl">
          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <Image
              src="/MW.png"
              alt="Marcus Widén"
              width={100}
              height={100}
              className="rounded-full border"
            />
            <div className="grid gap-1">
              <h1 className="text-3xl font-bold">Marcus Widén</h1>
              <span className="text-sm bg-gray-800/70 px-3 py-1 rounded-md opacity-80">
                Brand Developer
              </span>
            </div>
          </div>
          <p className="opacity-80">
            I’m passionate about helping businesses thrive through strategic
            planning, user-focused design, and creative problem-solving. Let’s
            work together to turn your ideas into impactful solutions.
          </p>
          <div className="grid grid-cols-[min-content,auto] items-start gap-4">
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
            <a
              href="/resume.pdf"
              download
              className=" transition hover:text-white"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
