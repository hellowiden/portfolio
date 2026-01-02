// src/app/components/Openers/Openers.tsx

import { FiMail, FiBriefcase, FiFolder } from 'react-icons/fi';
import HoverCard from '../HoverCard/HoverCard';

const cardData = [
  {
    title: 'My Projects',
    description:
      'All future projects will be presented here, highlighting ongoing work and creative direction.',
    icon: <FiFolder className="text-2xl" />,
    buttonLabel: 'View Projects',
    buttonRoute: '/projects',
  },
  {
    title: 'My Experiences',
    description:
      'Explore my journey and how each role shaped the skills and insights I bring today.',
    icon: <FiBriefcase className="text-2xl" />,
    buttonLabel: 'View Experiences',
    buttonRoute: '/experiences',
  },
  {
    title: 'Get in Touch',
    description:
      'Experianced any issues with my portfolio, want to collaborate / offer me a job or just wanna chat? Lets get started here!',
    icon: <FiMail className="text-2xl" />,
    buttonLabel: 'Contact Me',
    buttonRoute: '/contact',
  },
];

export default function Openers() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {cardData.map((card, index) => (
        <HoverCard
          key={index}
          title={card.title}
          description={card.description}
          icon={card.icon}
          buttonLabel={card.buttonLabel}
          buttonRoute={card.buttonRoute}
        />
      ))}
    </div>
  );
}
