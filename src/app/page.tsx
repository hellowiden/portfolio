//src/app/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import About from './components/About/About';
import IntroductionSection from './components/IntroductionSection/IntroductionSection';
import ClientsCarousel from './components/ClientsCarousel/ClientsCarousel';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <>
      <IntroductionSection />
      <ClientsCarousel />
      <About />
    </>
  );
}
