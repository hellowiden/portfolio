// src/app/about/page.tsx

'use client';

import Image from 'next/image';
import { Lightbulb } from 'lucide-react';
import Button from '../components/Button/Button';

function AboutAvatar() {
  return (
    <Image
      src="/MW.png"
      alt="Profile Image"
      width={40}
      height={40}
      className="rounded-full border border-primary-200 dark:border-secondary-700"
      priority
    />
  );
}

export default function AboutPage() {
  return (
    <section className="grid container mx-auto gap-6 p-6 w-full bg-white dark:bg-secondary-800 text-primary-900 dark:text-secondary-50 border border-primary-200 dark:border-secondary-700 rounded-md hover:shadow-md hover:ring-1 hover:ring-primary-300 dark:hover:ring-offset-2 hover:ring-offset-2 transition-shadow">
      <div className="w-full h-72 relative rounded overflow-hidden border border-primary-100 dark:border-secondary-600">
        <Image
          src="/adventure.jpg"
          alt="Strategic journey imagery"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid gap-4 grid-cols-[auto_1fr_auto] items-start">
        <AboutAvatar />

        <div className="grid gap-1">
          <h2 className="text-lg font-bold tracking-tight">Marcus Widén</h2>
          <p className="text-sm opacity-80">
            Brand strategist ・ Full-stack developer
          </p>
        </div>

        <div className="grid gap-2 text-sm">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => (window.location.href = '/contact')}
            className="inline-flex items-center gap-1"
          >
            <Lightbulb size={14} /> Let’s talk strategy
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <h1 className="font-medium text-primary-900 dark:text-secondary-50">
          Why Me?
        </h1>

        <p className="text-xl font-semibold text-primary-900 dark:text-secondary-50">
          Because clarity is rare, and strategy is everything.
        </p>

        <p className="text-base leading-relaxed text-secondary-700 dark:text-primary-200">
          In a world where most chase noise, I focus on what lasts. I don’t
          build brands to go viral—I build them to endure. With over a decade of
          guiding 500+ global projects, I’ve learned one truth: the strongest
          brands don’t fight for attention. They earn trust, command influence,
          and move with precision.
          <br />
          <br />
          My approach isn’t about hype—it’s about understanding. Through deep
          strategic insight and a relentless focus on human behavior, my work
          has driven $7.5 billion in revenue growth, increased customer
          retention by 25%, and consistently delivered a 20% sales boost. But
          numbers only tell part of the story. Real success isn’t measured in
          short-term wins—it’s in the relationships brands build and the loyalty
          they sustain.
          <br />
          <br />
          I don’t sell illusions. I translate complexity into clarity,
          uncertainty into confidence. While others react to trends, I focus on
          timeless positioning, intuitive UX/UI, and brand strategies that carve
          out market leadership. My process is simple: I listen, I analyze, and
          I execute with precision. No fluff, no ego—just results.
          <br />
          <br />
          Business isn’t about chasing what’s next. It’s about shaping what’s
          inevitable. I draw from history, philosophy, and human behavior to
          craft strategies that outlast trends, outthink competitors, and
          outmaneuver uncertainty. Partnering with me isn’t just about
          branding—it’s about seeing the game for what it is and playing it to
          win.
        </p>
      </div>
    </section>
  );
}
