//src/app/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ClientsCarousel from './components/ClientsCarousel/ClientsCarousel';
import IntroductionSection from './components/IntroductionSection/IntroductionSection';
import ProjectOpener from './components/ProjectOpener/ProjectOpener';
import ExperienceOpener from './components/ExperienceOpener/ExperienceOpener';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') return null;

  return (
    <>
      <main className="grid p-6 border-x dark:border-light items-center h-full bg-zinc-100 dark:bg-zinc-800">
        <IntroductionSection />
        <ClientsCarousel />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProjectOpener />
          <ExperienceOpener />
        </div>
      </main>
    </>
  );
}
