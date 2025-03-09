'use client';

import Image from 'next/image';
import { useCallback } from 'react';

export default function IntroductionSection() {
  const handleContactClick = useCallback(() => {
    console.log('Contact button clicked');
  }, []);

  const handleDownloadClick = useCallback(() => {
    console.log('Download Resume button clicked');
  }, []);

  return (
    <section
      id="home"
      className="w-full h-[500px] flex flex-col justify-end bg-cover bg-center rounded overflow-hidden"
      style={{ backgroundImage: "url('/shake.jpg')" }}
    >
      <div className="grid gap-6 bg-black bg-opacity-50 backdrop-blur-md p-6">
        <div className="text-white w-full max-w-3xl flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/MW.png"
              alt="Marcus Widén"
              width={100}
              height={100}
              className="rounded-full border"
            />
            <div>
              <h1 className="text-3xl font-bold">Marcus Widén</h1>
              <span className="inline-block text-sm bg-gray-800/70 px-3 py-1 rounded-md opacity-80">
                Brand Developer
              </span>
            </div>
          </div>
          <p className="text-lg opacity-80">
            I’m passionate about helping businesses thrive through strategic
            planning, user-focused design, and creative problem-solving. Let’s
            work together to turn your ideas into impactful solutions.
          </p>
          <div className="w-full max-w-3xl flex gap-4">
            <button
              onClick={handleContactClick}
              className="flex-1 px-4 py-2 bg-white text-zinc-700 border rounded-md transition hover:bg-zinc-700 hover:text-white"
            >
              Contact
            </button>
            <button
              onClick={handleDownloadClick}
              className="flex-1 px-4 py-2 bg-white text-zinc-700 border rounded-md transition hover:bg-zinc-700 hover:text-white"
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
