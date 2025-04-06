// src/app/components/Openers/Openers.tsx

import { FiMail, FiBriefcase, FiFolder } from 'react-icons/fi';
import HoverCard from '../HoverCard/HoverCard';

const cardData = [
  {
    title: 'My Projects',
    subtitle: 'Case Studies',
    description:
      'All future projects will be presented here, highlighting ongoing work and creative direction.',
    icon: <FiFolder className="text-lg" />,
    buttonLabel: 'View Projects',
    buttonRoute: '/projects',
  },
  {
    title: 'My Experiences',
    subtitle: 'Professional Journey',
    description:
      'Explore my journey and how each role shaped the skills and insights I bring today.',
    icon: <FiBriefcase className="text-lg" />,
    buttonLabel: 'View Experiences',
    buttonRoute: '/experiences',
  },
  {
    title: 'Get in Touch',
    subtitle: "Let's Connect",
    description: 'Open to collaboration and new opportunities.',
    icon: <FiMail className="text-lg" />,
    buttonLabel: 'Contact Me',
    buttonRoute: '/contact',
  },
];

export default function Openers() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-[1fr_2fr] gap-6">
      <HoverCard {...cardData[0]} />
      <HoverCard {...cardData[1]} />
      <div className="sm:col-span-2">
        <HoverCard {...cardData[2]} />
      </div>
    </div>
  );
}
