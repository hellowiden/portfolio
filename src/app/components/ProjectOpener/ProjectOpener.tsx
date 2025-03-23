//src/app/components/ProjectOpener/ProjectOpener.tsx

'use client';

import { FiFolder } from 'react-icons/fi';
import HoverCard from '../HoverCard/HoverCard';

export default function ProjectOpener() {
  return (
    <HoverCard
      title="My Projects"
      subtitle="Case Studies"
      description="Take a look at my most recent projects and let that become proof of what you can expect from me."
      imageSrc="/projectsopener.jpg"
      icon={<FiFolder className="text-lg" />}
      buttonLabel="View Projects"
      buttonRoute="/projects"
      buttonAriaLabel="View Projects"
    />
  );
}
