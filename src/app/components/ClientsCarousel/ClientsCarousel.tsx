'use client';

import React from 'react';
import { motion } from 'framer-motion';

function ClientsCarousel() {
  // Plain array of client names
  const clients = [
    'IPG',
    'Publicis Groupe',
    'Omnicom Group Inc.',
    'WPP plc',
    'Dentsu Group Inc.',
    'Havas Group',
    'Ogilvy',
    'Saatchi & Saatchi',
    'Droga5',
    'TBWA\\Worldwide',
    'BBDO Worldwide',
    'Leo Burnett',
    'Grey Group',
    'VMLY&R',
    'McCann Worldgroup',
    'AKQA',
    'Weber Shandwick',
    'FCB Global',
    'Hill+Knowlton Strategies',
    'Geometry Global',
    'R/GA',
    'Cheil Worldwide',
    'Isobar',
    'Edelman',
    'BlueFocus Communication Group',
  ];

  return (
    <section id="clients" className="relative text-center py-8 bg-white">
      <h2 className="text-xl font-bold mb-6 text-black dark:text-white">
        Our Clients
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
        {clients.map((client, index) => (
          <motion.div
            key={index}
            className="p-3 text-center font-medium text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-800 shadow-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {client}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ClientsCarousel;
