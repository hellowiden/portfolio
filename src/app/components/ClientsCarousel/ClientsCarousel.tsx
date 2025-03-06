'use client';

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

export default function ClientBanner() {
  const clientsData = [
    { name: 'IPG', url: 'https://www.ipg.com' },
    { name: 'Publicis Groupe', url: 'https://www.publicisgroupe.com' },
    { name: 'Omnicom Group Inc.', url: 'https://www.omnicomgroup.com' },
    { name: 'WPP plc', url: 'https://www.wpp.com' },
    { name: 'Dentsu Group Inc.', url: 'https://www.dentsu.com' },
    { name: 'Havas Group', url: 'https://www.havas.com' },
    { name: 'Ogilvy', url: 'https://www.ogilvy.com' },
    { name: 'Airam', url: 'https://www.airam.com' },
    {
      name: 'Green Furniture Concept',
      url: 'https://www.greenfurnitureconcept.com',
    },
    { name: 'Saatchi & Saatchi', url: 'https://www.saatchi.com' },
    { name: 'Droga5', url: 'https://www.droga5.com' },
    { name: 'TBWA\\Worldwide', url: 'https://www.tbwa.com' },
    { name: 'BBDO Worldwide', url: 'https://www.bbdo.com' },
    { name: 'Leo Burnett', url: 'https://www.leoburnett.com' },
    { name: 'Grey Group', url: 'https://www.grey.com' },
    { name: 'VMLY&R', url: 'https://www.vmlyr.com' },
    { name: 'McCann Worldgroup', url: 'https://www.mccannworldgroup.com' },
    { name: 'AKQA', url: 'https://www.akqa.com' },
    { name: 'Weber Shandwick', url: 'https://www.webershandwick.com' },
    { name: 'FCB Global', url: 'https://www.fcb.com' },
    { name: 'Hill+Knowlton Strategies', url: 'https://www.hkstrategies.com' },
    { name: 'Geometry Global', url: 'https://www.geometry.com' },
    { name: 'R/GA', url: 'https://www.rga.com' },
    { name: 'Cheil Worldwide', url: 'https://www.cheil.com' },
    { name: 'Isobar', url: 'https://www.isobar.com' },
    { name: 'Edelman', url: 'https://www.edelman.com' },
    { name: 'BlueFocus Communication Group', url: 'https://www.bluefocus.net' },
  ];

  return (
    <section
      id="clients"
      className="w-full border rounded-md text-center py-4 border-light dark:border-dark dark:bg-black relative"
    >
      <Marquee gradient={false} speed={50}>
        {clientsData.map((client, index) => (
          <motion.a
            key={`client-${index}`}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 font-medium text-black dark:text-white relative group"
            aria-label={`Client: ${client.name}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {client.name}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-light w-0 group-hover:w-full"
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}
      </Marquee>
    </section>
  );
}
