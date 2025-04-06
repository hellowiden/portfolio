// src/app/components/Openers/Openers.tsx

import { FiMail, FiBriefcase, FiFolder } from 'react-icons/fi';
import HoverCard from '../HoverCard/HoverCard';

const cardData = [
  {
    title: 'Get in Touch',
    subtitle: "Let's Connect",
    description: 'Open to collaboration and new opportunities.',
    icon: <FiMail className="text-2xl" />,
    buttonLabel: 'Contact Me',
    buttonRoute: '/contact',
  },
  {
    title: 'My Projects',
    subtitle: 'Case Studies',
    description:
      'All future projects will be presented here, highlighting ongoing work and creative direction.',
    icon: <FiFolder className="text-2xl" />,
    buttonLabel: 'View Projects',
    buttonRoute: '/projects',
  },
  {
    title: 'My Experiences',
    subtitle: 'Professional Journey',
    description:
      'Explore my journey and how each role shaped the skills and insights I bring today.',
    icon: <FiBriefcase className="text-2xl" />,
    buttonLabel: 'View Experiences',
    buttonRoute: '/experiences',
  },
];

export default function Openers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <HoverCard key={index} {...card} />
      ))}
    </div>
  );
}
