//src/app/components/ContactOpener/ContactOpener.tsx

'use client';

import { FiMail } from 'react-icons/fi';
import HoverCard from '../HoverCard/HoverCard';

export default function ContactOpener() {
  return (
    <HoverCard
      title="Get in Touch"
      subtitle="Let's Connect"
      description="Reach out to discuss projects, collaborations, or any inquiries."
      imageSrc="/issues.jpg"
      icon={<FiMail className="text-lg" />}
      buttonLabel="Contact Me"
      buttonRoute="/contact"
      buttonAriaLabel="Contact Me"
      heightClass="h-80"
    />
  );
}
