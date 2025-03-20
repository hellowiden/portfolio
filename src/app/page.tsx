//src/app/page.tsx
'use client';

import IntroductionSection from '@/app/components/IntroductionSection/IntroductionSection';
import ClientsCarousel from '@/app/components/ClientsCarousel/ClientsCarousel';
import ProjectOpener from '@/app/components/ProjectOpener/ProjectOpener';
import ExperienceOpener from '@/app/components/ExperienceOpener/ExperienceOpener';
import ContactOpener from '@/app/components/ContactOpener/ContactOpener';

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_min-content_min-content_min-content] gap-6 h-full container mx-auto p-6 border-x dark:border-light">
      <IntroductionSection />
      <ClientsCarousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ProjectOpener />
        <ExperienceOpener />
        <div className="sm:col-span-2">
          <ContactOpener />
        </div>
      </div>
    </div>
  );
}
