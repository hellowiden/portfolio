import { CgWorkAlt } from 'react-icons/cg';
import { FaGraduationCap } from 'react-icons/fa';
import React from 'react';

export const experiences = [
  {
    id: 'experience-1',
    title: 'JavaScript Developer',
    location: 'Folkuniversitetet',
    description:
      'Developing expertise in front-end and back-end web development to drive future-proof digital branding strategies and integrate cutting-edge technology into customer engagement solutions.',
    image: '/javascript-developer.jpg',
    date: 'August 2023 – June 2025',
    tags: ['Education', 'Front-End', 'Back-End'],
    type: 'education',
    icon: React.createElement(FaGraduationCap),
  },
  {
    id: 'experience-2',
    title: 'CMO',
    location: 'Airam Sweden',
    description:
      'Led a critical product launch and brand positioning initiative, driving a 25% increase in brand visibility and a 30% rise in customer engagement across digital channels.',
    image: '/cmo-airam.jpg',
    date: 'June 2022 – July 2022 (Contract/Interim Role)',
    tags: ['Marketing', 'Brand Strategy', 'Leadership'],
    type: 'work',
    icon: React.createElement(CgWorkAlt),
  },
  {
    id: 'experience-3',
    title: 'Event Coordinator',
    location: 'Yrkeshögskolan i Landskrona',
    description:
      'Completed an Event Coordinator program, where I gained a deep understanding of the event planning and management industry.',
    image: '/event-coordinator.jpg',
    date: 'August 2019 – June 2021',
    tags: ['Event Planning', 'Logistics', 'Management'],
    type: 'education',
    icon: React.createElement(FaGraduationCap),
  },
  {
    id: 'experience-4',
    title: 'CEO',
    location: 'Adsolutly',
    description:
      'Increased annual revenue by 300% over 5 years, expanding the client portfolio by 40% with tailored branding solutions for global clients.',
    image: '/ceo-adsolutly.jpg',
    date: 'August 2014 – September 2019',
    tags: ['Business Growth', 'Brand Development', 'Strategy'],
    type: 'work',
    icon: React.createElement(CgWorkAlt),
  },
];
