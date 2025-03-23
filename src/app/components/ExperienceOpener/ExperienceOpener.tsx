//src/app/components/ExperienceOpener/ExperienceOpener.tsx

'use client';

import { FiBriefcase } from 'react-icons/fi';
import HoverCard from '../HoverCard/HoverCard';

export default function ExperienceOpener() {
  return (
    <HoverCard
      title="My Experiences"
      subtitle="Professional Journey"
      description="Explore my professional journey and see how my experiences have shaped my expertise."
      imageSrc="/shake.jpg"
      icon={<FiBriefcase className="text-lg" />}
      buttonLabel="View Experiences"
      buttonRoute="/experiences"
      buttonAriaLabel="View Experiences"
      heightClass="h-64"
    />
  );
}
