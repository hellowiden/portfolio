'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div
      id="about"
      className="grid place-items-center p-8 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
    >
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="grid gap-6 max-w-4xl text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4"
        >
          <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-50">
            About Me
          </h1>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Marcus Widén is not just in branding—he creates meaning. With over
            12 years and 500 projects, he has shown that a brand’s true value
            lies in its ability to build deep, lasting connections that drive
            recognition, loyalty, and action. His work has directly contributed
            to $7.5 billion in revenue growth and organizational value. A global
            rebrand under his leadership boosted customer retention by 25%,
            while his marketing campaigns consistently delivered a 20% sales
            increase.
            <br />
            <br />
            Marcus’s approach centers on connection. Successful brands are built
            on a profound understanding of human psychology, not surface-level
            aesthetics. His expertise spans marketing strategy, UX/UI design,
            and rebranding—all grounded in the belief that brand promises must
            be felt, not just heard.
            <br />
            <br />
            His work is practical and results-driven, aligning strategy with
            creativity. Marcus simplifies complexity, ensures brands articulate
            and embody their purpose, and unites vision with execution. Clients
            value his ability to find patterns where others see chaos and turn
            obstacles into opportunities. Consulting with Marcus is about
            transformation. He helps businesses tackle high-stakes challenges,
            refining brand strategies with precision and foresight. Whether
            guiding startups or Fortune 500 companies, he focuses on creating
            enduring solutions that redefine industries.
            <br />
            <br />
            Outside of business, Marcus is fascinated by history, philosophy,
            and creativity, viewing branding as a narrative endeavor. He
            understands that great brands are driven by purpose, and this
            perspective ensures his work doesn’t just help brands grow—it makes
            them matter, now and in the future.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
