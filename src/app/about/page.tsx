//src/app/about/page.tsx
'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <div id="about" className="w-full p-6 container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
        {/* Optimized Image using Next.js `Image` component */}
        <div className="w-full min-h-[500px] max-h-auto md:max-h-none border dark:border-light rounded-xl relative overflow-hidden">
          <Image
            src="/adventure.jpg"
            alt="Descriptive Alt Text"
            fill={true}
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
              Why me?
            </h1>
            <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <strong>Because informed strategy fuels enduring success.</strong>{' '}
              With deep strategic insight and a decade of experience leading
              500+ global projects, I’ve learned that the strongest brands don’t
              demand attention—they earn trust, inspire action, and evolve with
              their audience. By blending data-driven wisdom with creative
              vision, my strategies have driven $7.5 billion in revenue growth,
              increased customer retention by 25%, and consistently delivered a
              20% sales boost. Every brand has a story. I help shape the ones
              that last.
              <br />
              <br />
              Strong brands don’t chase trends—they shape the future. I help
              organizations carve out their place as industry leaders through
              strategic branding, intuitive UX/UI design, and campaigns that
              redefine markets. By merging deep market insight with bold
              creativity, I focus on influence, perception, and meaningful
              differentiation. The result? A brand that doesn’t just stand out
              but stands the test of time.
              <br />
              <br />
              My approach blends analysis with vision. I turn complexity into
              clarity and brand potential into measurable impact. Executives
              rely on me to decode market shifts, distill insights, and navigate
              change with confidence. With a strategic yet creative mindset, I
              design brands that don’t just attract attention—they forge lasting
              connections and inspire action.
              <br />
              <br />
              Brand success isn’t just about growth—it’s about endurance. I draw
              from history, philosophy, and human behavior to craft strategies
              that stand the test of time. Partnering with me isn’t just about
              branding; it’s about gaining lasting influence and a true
              competitive edge. Let’s build a brand that becomes indispensable.
            </p>
            <Link
              href="/contact"
              className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed"
            >
              Work with me
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
