import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { DesignServices } from './components/DesignServices';
import { Technologies } from './components/Technologies';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Header />
      <Hero />
      <Services />
      <DesignServices />
      <Technologies />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}
