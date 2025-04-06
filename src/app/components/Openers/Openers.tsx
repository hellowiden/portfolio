import { FiMail, FiBriefcase, FiFolder } from 'react-icons/fi';
import HoverCard from '../HoverCard/HoverCard';

const cardData = [
  {
    title: 'My Projects',
    subtitle: 'Case Studies',
    description:
      'All future projects will be presented here, highlighting ongoing work and creative direction.',
    imageSrc: '/projectsopener.jpg',
    icon: <FiFolder className="text-lg" />,
    buttonLabel: 'View Projects',
    buttonRoute: '/projects',
  },
  {
    title: 'My Experiences',
    subtitle: 'Professional Journey',
    description:
      'Explore my journey and how each role shaped the skills and insights I bring today.',
    imageSrc: '/shake.jpg',
    icon: <FiBriefcase className="text-lg" />,
    buttonLabel: 'View Experiences',
    buttonRoute: '/experiences',
  },
  {
    title: 'Get in Touch',
    subtitle: "Let's Connect",
    description:
      'I’m always looking to collaborate on meaningful projects. Need a supportive hand? I have two!',
    imageSrc: '/issues.jpg',
    icon: <FiMail className="text-lg" />,
    buttonLabel: 'Contact Me',
    buttonRoute: '/contact',
  },
];

export default function Openers() {
  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {cardData.slice(0, 2).map((card, i) => (
          <HoverCard key={i} {...card} />
        ))}
      </div>
      <HoverCard {...cardData[2]} />
    </>
  );
}
