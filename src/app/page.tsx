// src/app/page.tsx
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';

export default async function Home() {
  return (
    <>
      <Header />
      <About />
      <Footer />
    </>
  );
}
