
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import FeaturedPackages from '@/components/FeaturedPackages';
import Destinations from '@/components/Destinations';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <SearchBar />
        <FeaturedPackages />
        <Destinations />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
