//src/app/page.tsx
'use client';

import IntroductionSection from '@/app/components/IntroductionSection/IntroductionSection';
import ClientsCarousel from '@/app/components/ClientsCarousel/ClientsCarousel';
import ProjectOpener from '@/app/components/ProjectOpener/ProjectOpener';
import ExperienceOpener from '@/app/components/ExperienceOpener/ExperienceOpener';
import ContactOpener from '@/app/components/ContactOpener/ContactOpener';

export default function Home() {
  return (
    <div className="container mx-auto h-full w-full p-6 border-x dark:border-light backdrop-blur-md bg-zinc-100/80 dark:bg-zinc-900/80">
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
