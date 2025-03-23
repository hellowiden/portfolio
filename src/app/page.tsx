//src/app/page.tsx
'use client';

import IntroductionSection from '@/app/components/IntroductionSection/IntroductionSection';
import ClientsCarousel from '@/app/components/ClientsCarousel/ClientsCarousel';
import ProjectOpener from '@/app/components/ProjectOpener/ProjectOpener';
import ExperienceOpener from '@/app/components/ExperienceOpener/ExperienceOpener';
import ContactOpener from '@/app/components/ContactOpener/ContactOpener';

export default function Home() {
  return (
    <div className="grid grid-rows-[500px_auto_auto_auto] gap-6 h-full container mx-auto p-6 border-x dark:border-light bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700">
      <IntroductionSection />
      <ClientsCarousel />
      <div className="grid sm:grid-cols-2 grid-rows-2 gap-6 auto-rows-fr">
        <ProjectOpener />
        <ExperienceOpener />
        <div className="sm:col-span-2  sm:row-span-2">
          <ContactOpener />
        </div>
      </div>
    </div>
  );
}
