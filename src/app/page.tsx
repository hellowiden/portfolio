//src/app/page.tsx
'use client';

import IntroductionSection from '@/app/components/IntroductionSection/IntroductionSection';
import ClientsCarousel from '@/app/components/ClientsCarousel/ClientsCarousel';
import ProjectOpener from '@/app/components/ProjectOpener/ProjectOpener';
import ExperienceOpener from '@/app/components/ExperienceOpener/ExperienceOpener';
import ContactOpener from '@/app/components/ContactOpener/ContactOpener';

export default function Home() {
  return (
    <>
      <div className="grid grid-rows-[auto_min-content_min-content] gap-6 min-h-screen container mx-auto p-6 border-x dark:border-light bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700">
        <IntroductionSection />
        <ClientsCarousel />

        <div className="grid sm:grid-rows-2 gap-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <ProjectOpener />
            <ExperienceOpener />
          </div>
          <ContactOpener />
        </div>
      </div>
    </>
  );
}
