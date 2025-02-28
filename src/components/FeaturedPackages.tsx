
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PackageCard from './PackageCard';
import { Package } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const featuredPackages: Package[] = [
  {
    id: '1',
    title: 'Premium Dental Implant Package in Bangkok',
    description: 'Complete dental restoration with premium implants at Bangkok\'s top dental clinic',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    location: 'Bangkok, Thailand',
    hospital: 'Bangkok International Dental Center',
    price: 3200,
    rating: 4.9,
    reviewCount: 312,
    duration: '7-10 days',
    treatment: 'Dental',
    includes: ['Consultation', 'Implants', 'Hotel', 'Transfers', 'Interpreter', 'Follow-up']
  },
  {
    id: '2',
    title: 'Advanced Hip Replacement in Kuala Lumpur',
    description: 'Minimally invasive hip replacement surgery with fast recovery time',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    location: 'Kuala Lumpur, Malaysia',
    hospital: 'Gleneagles Medical Center',
    price: 12500,
    rating: 4.8,
    reviewCount: 187,
    duration: '14-18 days',
    treatment: 'Orthopedic',
    includes: ['Surgery', 'Implant', 'Hospital Stay', 'Physical Therapy', 'Accommodation', 'Airport Pickup']
  },
  {
    id: '3',
    title: 'Comprehensive Health Checkup in Seoul',
    description: 'Advanced medical screening and checkup package with cutting-edge technology',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
    location: 'Seoul, South Korea',
    hospital: 'Asan Medical Center',
    price: 2800,
    rating: 4.7,
    reviewCount: 254,
    duration: '3-5 days',
    treatment: 'Checkup',
    includes: ['Full Body Scan', 'Genetic Testing', 'Blood Work', 'Consulting', 'Luxury Hotel', 'Private Driver']
  }
];

const FeaturedPackages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Function to handle the "View all packages" button
  const viewAllPackages = () => {
    navigate('/packages');
  };

  // Function to add to cart
  const addToCart = (pkg: Package) => {
    // Check if user is logged in
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    
    navigate(`/package/${pkg.id}?action=add-to-cart`);
  };

  // Function to view package
  const viewPackage = (id: string) => {
    navigate(`/package/${id}`);
  };

  return (
    <section id="featured-section" className="py-20 bg-gradient-to-b from-white to-medictrip-50/30">
      <div className="medictrip-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-4">
            <span className="medictrip-badge-primary">Popular Choices</span>
            <h2 className="text-3xl font-bold">Featured Medical Packages</h2>
            <p className="text-gray-600 max-w-2xl">
              All-inclusive treatment packages with world-class medical care, comfortable accommodation, and seamless travel arrangements.
            </p>
          </div>
          <button 
            onClick={viewAllPackages}
            className="mt-4 md:mt-0 group inline-flex items-center text-medictrip-600 font-medium hover:text-medictrip-700 transition-colors"
          >
            View all packages
            <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg, index) => (
            <PackageCard 
              key={pkg.id} 
              packageData={pkg} 
              featured={index === 0}
              onAddToCart={() => addToCart(pkg)}
              onView={() => viewPackage(pkg.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
