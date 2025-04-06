//src/app/page.tsx
'use client';

import IntroductionSection from '@/app/components/IntroductionSection/IntroductionSection';
import ClientsCarousel from '@/app/components/ClientsCarousel/ClientsCarousel';
import ProjectOpener from '@/app/components/ProjectOpener/ProjectOpener';
import ExperienceOpener from '@/app/components/ExperienceOpener/ExperienceOpener';
import ContactOpener from '@/app/components/ContactOpener/ContactOpener';

export default function Home() {
  return (
    <main className="container mx-auto h-full p-6 gap-6 border-x border-primary-200 bg-primary-50 text-primary-900 dark:border-secondary-700 dark:bg-secondary-900 dark:text-secondary-50">
      <div className="grid gap-6">
        <section aria-labelledby="intro">
          <IntroductionSection />
        </section>

        <section aria-labelledby="clients">
          <ClientsCarousel />
        </section>

        <section
          aria-labelledby="projects-experience"
          className="grid sm:grid-rows-2 gap-6"
        >
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <ProjectOpener />
            <ExperienceOpener />
          </div>
          <ContactOpener />
        </section>
      </div>
    </main>
  );
}
