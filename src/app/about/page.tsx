//src/app/about/page.tsx

'use client';

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
              <strong>
                In short, because informed strategy fuels enduring success.
              </strong>{' '}
              I don’t just build brands—I shape legacies. With a decade of
              experience leading 500+ projects internationally, I’ve proven that
              a brand’s true power lies in commanding attention, fostering
              loyalty, and driving action. My strategies have generated $7.5
              billion in revenue growth. They’ve increased customer retention by
              25% and consistently delivered a 20% sales boost.
              <br />
              <br />
              Strong brands don’t follow trends—they set the standard. I
              position organizations as industry leaders through strategic
              branding, UX/UI design, and market-defining campaigns. My focus is
              on influence, perception, and dominance. The result? An unshakable
              market presence.
              <br />
              <br />
              My approach is both analytical and visionary. I turn complexity
              into clarity and brand potential into results. Executives trust me
              to decode market shifts and simplify challenges. I architect
              brands that resonate on a deeper level.
              <br />
              <br />
              Beyond business, I draw from history, philosophy, and human
              behavior. The best brands don’t just grow—they endure. Partnering
              with me isn’t just about services; it’s about securing a
              competitive edge. Let’s make your brand indispensable.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
