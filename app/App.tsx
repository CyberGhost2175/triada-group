import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { SelectedWork } from './components/SelectedWork';
import { DesignServices } from './components/DesignServices';
import { Technologies } from './components/Technologies';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <Hero />
      <Services />
      <SelectedWork />
      <DesignServices />
      <Technologies />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}
