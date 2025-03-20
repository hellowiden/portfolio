//src/app/page.tsx
'use client';

import IntroductionSection from '@/app/components/IntroductionSection/IntroductionSection';
import ClientsCarousel from '@/app/components/ClientsCarousel/ClientsCarousel';
import ProjectOpener from '@/app/components/ProjectOpener/ProjectOpener';
import ExperienceOpener from '@/app/components/ExperienceOpener/ExperienceOpener';
import ContactOpener from '@/app/components/ContactOpener/ContactOpener';

export default function Home() {
  return (
    <div className="grid gap-6 h-full container mx-auto p-6 border-x dark:border-light backdrop-blur-md bg-zinc-100/80 dark:bg-zinc-900/80">
      <IntroductionSection />
      <ClientsCarousel />

      {/* Dynamic Bento Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-6">
        <div className="lg:col-span-2">
          <ProjectOpener />
        </div>
        <div className="lg:col-span-2 lg:row-span-2">
          <ExperienceOpener />
        </div>
        <div className="lg:col-span-2">
          <ContactOpener />
        </div>
      </div>
    </div>
  );
}
