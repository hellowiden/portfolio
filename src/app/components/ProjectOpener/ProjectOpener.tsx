//src/app/components/ProjectOpener/ProjectOpener.tsx

'use client';

import { FiFolder } from 'react-icons/fi';
import HoverCard from '../HoverCard/HoverCard';

export default function ProjectOpener() {
  return (
    <HoverCard
      title="My Projects"
      subtitle="Case Studies"
      description="All future projects will be presented here, offering insight into ongoing work, upcoming ideas, and creative direction."
      imageSrc="/projectsopener.jpg"
      icon={<FiFolder className="text-lg" />}
      buttonLabel="View Projects"
      buttonRoute="/projects"
      buttonAriaLabel="View Projects"
      heightClass="h-64"
    />
  );
}
