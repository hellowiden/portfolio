// src/app/components/About/About.tsx

'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div id="about" className="p-8">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 text-center "
        >
          <h1 className="text-3xl font-medium">About me</h1>
          <p>
            Marcus Widén is not just in branding—he creates meaning. With over
            12 years and 500 projects, he has shown that a brand’s true value
            lies in its ability to build deep, lasting connections that drive
            recognition, loyalty, and action. His work has directly contributed
            to $7.5 billion in revenue growth and organizational value. A global
            rebrand under his leadership boosted customer retention by 25%,
            while his marketing campaigns consistently delivered a 20% sales
            increase. Marcus’s approach centers on connection. Successful brands
            are built on a profound understanding of human psychology, not
            surface-level aesthetics. His expertise spans marketing strategy,
            UX/UI design, and rebranding—all grounded in the belief that brand
            promises must be felt, not just heard.
          </p>

          <p>
            His work is practical and results-driven, aligning strategy with
            creativity. Marcus simplifies complexity, ensures brands articulate
            and embody their purpose, and unites vision with execution. Clients
            value his ability to find patterns where others see chaos and turn
            obstacles into opportunities. Consulting with Marcus is about
            transformation. He helps businesses tackle high-stakes challenges,
            refining brand strategies with precision and foresight. Whether
            guiding startups or Fortune 500 companies, he focuses on creating
            enduring solutions that redefine industries. Outside of business,
            Marcus is fascinated by history, philosophy, and creativity, viewing
            branding as a narrative endeavor. He understands that great brands
            are driven by purpose, and this perspective ensures his work doesn’t
            just help brands grow—it makes them matter, now and in the future.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}
