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
            I don’t just work in branding—I create meaning. With over 12 years
            and 500 projects, I’ve seen that a brand’s true value lies in its
            ability to build deep, lasting connections that drive recognition,
            loyalty, and action. My work has directly contributed to $7.5
            billion in revenue growth and organizational value. A global rebrand
            I led boosted customer retention by 25%, while my marketing
            campaigns consistently delivered a 20% sales increase.
            <br />
            <br />
            For me, branding is about connection. Successful brands aren’t just
            about aesthetics—they’re built on a deep understanding of human
            psychology. My expertise spans marketing strategy, UX/UI design, and
            rebranding, all grounded in the belief that brand promises must be
            felt, not just heard.
            <br />
            <br />
            I take a practical, results-driven approach, aligning strategy with
            creativity. I simplify complexity, help brands articulate and embody
            their purpose, and turn vision into execution. Clients trust me to
            find patterns where others see chaos and to transform obstacles into
            opportunities. Whether guiding startups or Fortune 500 companies, I
            focus on creating enduring solutions that redefine industries.
            <br />
            <br />
            Beyond business, I’m fascinated by history, philosophy, and
            creativity. I see branding as a narrative endeavor—because the best
            brands aren’t just successful, they matter. My work isn’t just about
            helping brands grow—it’s about making them meaningful, now and in
            the future.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
