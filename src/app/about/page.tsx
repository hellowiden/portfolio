//src/app/about/page.tsx
'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <div id="about" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
        <div className="w-full min-h-[500px] border dark:border-light rounded-xl relative overflow-hidden">
          <Image
            src="/adventure.jpg"
            alt="Descriptive Alt Text"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid gap-6 text-center md:text-left"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="grid gap-4"
          >
            <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-50">
              Why Me?
            </h1>
            <p>
              <strong>
                Because clarity is rare, and strategy is everything.
              </strong>
            </p>
            <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed">
              In a world where most chase noise, I focus on what lasts. I don’t
              build brands to go viral—I build them to endure. With over a
              decade of guiding 500+ global projects, I’ve learned one truth:
              the strongest brands don’t fight for attention. They earn trust,
              command influence, and move with precision.
              <br />
              <br />
              My approach isn’t about hype—it’s about understanding. Through
              deep strategic insight and a relentless focus on human behavior,
              my work has driven $7.5 billion in revenue growth, increased
              customer retention by 25%, and consistently delivered a 20% sales
              boost. But numbers only tell part of the story. Real success isn’t
              measured in short-term wins—it’s in the relationships brands build
              and the loyalty they sustain.
              <br />
              <br />
              I don’t sell illusions. I translate complexity into clarity,
              uncertainty into confidence. While others react to trends, I focus
              on timeless positioning, intuitive UX/UI, and brand strategies
              that carve out market leadership. My process is simple: I listen,
              I analyze, and I execute with precision. No fluff, no ego—just
              results.
              <br />
              <br />
              Business isn’t about chasing what’s next. It’s about shaping
              what’s inevitable. I draw from history, philosophy, and human
              behavior to craft strategies that outlast trends, outthink
              competitors, and outmaneuver uncertainty. Partnering with me isn’t
              just about branding—it’s about seeing the game for what it is and
              playing it to win.
            </p>
            <Link
              href="/contact"
              className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed"
            >
              If you seek strategy, let’s talk.
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
