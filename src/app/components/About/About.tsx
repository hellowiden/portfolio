'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div
      id="about"
      className="w-full p-6 container mx-auto grid place-items-center"
    >
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="grid gap-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4"
        >
          <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-50">
            About me
          </h1>
          <p className="text-md text-zinc-700 dark:text-zinc-300 leading-relaxed">
            I don’t just build brands—I shape legacies. With over 12 years of
            experience and 500+ projects, I’ve seen firsthand that a brand’s
            true power lies in its ability to command attention, build loyalty,
            and drive decisive action. My work has directly contributed to $7.5
            billion in revenue growth and enterprise value. A global rebrand I
            led increased customer retention by 25%, while my marketing
            strategies consistently delivered a 20% sales boost.
            <br />
            <br />
            Strong brands don’t follow trends; they set the standard. I
            specialize in positioning organizations as industry leaders through
            strategic branding, UX/UI design, and market-defining campaigns. For
            me, branding is not about aesthetics alone—it’s about influence,
            perception, and creating an unshakable presence in the minds of
            customers and competitors alike.
            <br />
            <br />
            My approach is both analytical and visionary. I align strategy with
            execution, turning complexity into clarity and brand potential into
            tangible results. CEOs, executives, and leadership teams trust me to
            identify opportunities, simplify challenges, and architect brands
            that don’t just survive market shifts but dictate them.
            <br />
            <br />
            Beyond the boardroom, I draw inspiration from history, philosophy,
            and human behavior—because the best brands aren’t just profitable;
            they endure. My work isn’t just about growth—it’s about making
            brands indispensable, now and in the future.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
