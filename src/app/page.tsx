//src/app/page.tsx
'use client';

import IntroductionSection from '@/app/components/IntroductionSection/IntroductionSection';
import ClientsCarousel from '@/app/components/ClientsCarousel/ClientsCarousel';
import Openers from '@/app/components/Openers/Openers';

export default function Home() {
  return (
    <main className="container mx-auto h-full p-6 gap-6 border-x border-primary-200 bg-primary-100 text-primary-900 dark:border-secondary-700 dark:bg-secondary-900 dark:text-secondary-50">
      <div className="grid gap-6">
        <section aria-label="Introduction">
          <IntroductionSection />
        </section>

        <section aria-label="Clients">
          <ClientsCarousel />
        </section>

        <section aria-label="Projects and Experience" className="grid gap-6">
          <Openers />
        </section>
      </div>
    </main>
  );
}
