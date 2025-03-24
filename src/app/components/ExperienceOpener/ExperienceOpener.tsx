//src/app/components/ExperienceOpener/ExperienceOpener.tsx

'use client';

import { FiBriefcase } from 'react-icons/fi';
import HoverCard from '../HoverCard/HoverCard';

export default function ExperienceOpener() {
  return (
    <HoverCard
      title="My Experiences"
      subtitle="Professional Journey"
      description="Explore my professional journey and discover how each experience has contributed to the skills, insights, and expertise I bring today."
      imageSrc="/shake.jpg"
      icon={<FiBriefcase className="text-lg" />}
      buttonLabel="View Experiences"
      buttonRoute="/experiences"
      buttonAriaLabel="View Experiences"
      heightClass="h-64"
    />
  );
}
