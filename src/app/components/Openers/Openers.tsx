'use client';

import { FiMail, FiBriefcase, FiFolder } from 'react-icons/fi';
import HoverCard from '../HoverCard/HoverCard';

const openerData = [
  {
    title: 'Get in Touch',
    subtitle: "Let's Connect",
    description:
      'I’m always looking to collaborate on interesting projects with great people. Need a supportive hand? I have two!',
    imageSrc: '/issues.jpg',
    icon: <FiMail className="text-lg" />,
    buttonLabel: 'Contact Me',
    buttonRoute: '/contact',
    buttonAriaLabel: 'Contact Me',
  },
  {
    title: 'My Experiences',
    subtitle: 'Professional Journey',
    description:
      'Explore my professional journey and discover how each experience has contributed to the skills, insights, and expertise I bring today.',
    imageSrc: '/shake.jpg',
    icon: <FiBriefcase className="text-lg" />,
    buttonLabel: 'View Experiences',
    buttonRoute: '/experiences',
    buttonAriaLabel: 'View Experiences',
  },
  {
    title: 'My Projects',
    subtitle: 'Case Studies',
    description:
      'All future projects will be presented here, offering insight into ongoing work, upcoming ideas, and creative direction.',
    imageSrc: '/projectsopener.jpg',
    icon: <FiFolder className="text-lg" />,
    buttonLabel: 'View Projects',
    buttonRoute: '/projects',
    buttonAriaLabel: 'View Projects',
  },
];

export default function Openers() {
  return (
    <>
      {openerData.map((card, index) => (
        <HoverCard key={index} {...card} heightClass="h-64" />
      ))}
    </>
  );
}
