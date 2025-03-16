//src/app/page.tsx

'use client';

import IntroductionSection from '@/app/components/IntroductionSection/IntroductionSection';
import ClientsCarousel from '@/app/components/ClientsCarousel/ClientsCarousel';
import ProjectOpener from '@/app/components/ProjectOpener/ProjectOpener';
import ExperienceOpener from '@/app/components/ExperienceOpener/ExperienceOpener';
import ContactOpener from '@/app/components/ContactOpener/ContactOpener';

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr , min-content , 1fr] gap-6 w-full h-full p-6 items-start container mx-auto border-x dark:border-light backdrop-blur-md bg-zinc-100/80 dark:bg-zinc-900/80">
      <IntroductionSection />
      <ClientsCarousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-3 sm:grid-rows-2 gap-6">
        <div className="col-span-1 row-span-1">
          <ProjectOpener />
        </div>
        <div className="col-span-1 row-span-1">
          <ExperienceOpener />
        </div>
        <div className=" col-span-1 sm:col-span-2 row-span-1">
          <ContactOpener />
        </div>
      </div>
    </div>
  );
}
