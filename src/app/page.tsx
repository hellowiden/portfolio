//src/app/page.tsx

'use client';

import ClientsCarousel from './components/ClientsCarousel/ClientsCarousel';
import IntroductionSection from './components/IntroductionSection/IntroductionSection';
import ProjectOpener from './components/ProjectOpener/ProjectOpener';
import ExperienceOpener from './components/ExperienceOpener/ExperienceOpener';
import ContactOpener from './components/ContactOpener/ContactOpener';

export default function Home() {
  return (
    <div className="grid p-6 gap-4 container mx-auto border-x dark:border-light items-center backdrop-blur-md h-full bg-zinc-100/80 dark:bg-zinc-900/80">
      <IntroductionSection />
      <ClientsCarousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-[auto_auto] sm:grid-rows-2 gap-4 items-stretch">
        <div className="col-span-1 row-span-1 flex">
          <ProjectOpener />
        </div>
        <div className="col-span-1 row-span-1 flex">
          <ExperienceOpener />
        </div>
        <div className="col-span-1 sm:col-span-2 row-span-2 flex h-[350px]">
          <ContactOpener />
        </div>
      </div>
    </div>
  );
}
