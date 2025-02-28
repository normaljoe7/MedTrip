
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PackageCard from '@/components/PackageCard';
import { Package } from '@/types';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const AllPackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    treatment: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      // First try to get packages from Supabase
      const { data, error } = await supabase
        .from('treatments')
        .select('*');
      
      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Transform data to match our Package type
        const transformedData: Package[] = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description || '',
          image: item.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
          location: item.location || 'Unknown',
          hospital: item.hospital || 'Unknown',
          price: item.price,
          rating: item.rating || 4.5,
          reviewCount: item.review_count || 100,
          duration: item.duration || '7-10 days',
          treatment: item.treatment_type || 'Medical',
          includes: item.includes || ['Consultation', 'Treatment', 'Accommodation']
        }));
        setPackages(transformedData);
      } else {
        // Fallback to hardcoded data if no treatments in Supabase
        setPackages(fallbackPackages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: "Error loading packages",
        description: "Could not load packages. Using demo data instead.",
        variant: "destructive",
      });
      // Use fallback data
      setPackages(fallbackPackages);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (pkg: Package) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    
    const cart = JSON.parse(localStorage.getItem('medictrip-cart') || '[]');
    const isAlreadyInCart = cart.some((item: Package) => item.id === pkg.id);
    
    if (!isAlreadyInCart) {
      navigate(`/package/${pkg.id}?action=add-to-cart`);
    } else {
      toast({
        title: "Already in cart",
        description: "This package is already in your cart",
        variant: "destructive",
      });
    }
  };

  const handleViewPackage = (id: string) => {
    navigate(`/package/${id}`);
  };

  const applyFilters = () => {
    let filtered = [...fallbackPackages];
    
    // Apply treatment filter
    if (filters.treatment) {
      filtered = filtered.filter(pkg => 
        pkg.treatment.toLowerCase().includes(filters.treatment.toLowerCase())
      );
    }
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(pkg => 
        pkg.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Apply price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(pkg => pkg.price >= parseInt(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(pkg => pkg.price <= parseInt(filters.maxPrice));
    }
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.hospital.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setPackages(filtered);
  };

  const resetFilters = () => {
    setFilters({
      treatment: '',
      location: '',
      minPrice: '',
      maxPrice: '',
    });
    setSearchTerm('');
    setPackages(fallbackPackages);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="medictrip-container">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">All Medical Packages</h1>
            <p className="text-gray-600">
              Browse our comprehensive selection of medical packages from top healthcare providers worldwide.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search packages..."
                  className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-medictrip-500 focus:border-medictrip-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="medictrip-button-secondary flex items-center justify-center"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
              
              <button 
                onClick={applyFilters}
                className="medictrip-button-primary"
              >
                Search
              </button>
            </div>
            
            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold flex items-center">
                    <SlidersHorizontal className="w-5 h-5 mr-2" />
                    Filter Options
                  </h3>
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-medictrip-600 hover:text-medictrip-700"
                  >
                    Reset All
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Treatment Type
                      </label>
                      <input
                        type="text"
                        name="treatment"
                        placeholder="e.g. Dental, Cardiac..."
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={filters.treatment}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        placeholder="e.g. Bangkok, Istanbul..."
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={filters.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Price ($)
                      </label>
                      <input
                        type="number"
                        name="minPrice"
                        placeholder="Min price"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={filters.minPrice}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Price ($)
                      </label>
                      <input
                        type="number"
                        name="maxPrice"
                        placeholder="Max price"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={filters.maxPrice}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {/* Results */}
          <div className="mb-8">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medictrip-600"></div>
              </div>
            ) : packages.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No packages found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                  <PackageCard 
                    key={pkg.id} 
                    packageData={pkg} 
                    onAddToCart={() => handleAddToCart(pkg)}
                    onView={() => handleViewPackage(pkg.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Fallback data in case Supabase fails or has no data
const fallbackPackages: Package[] = [
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
  },
  {
    id: '4',
    title: 'Laser Eye Surgery Package in Istanbul',
    description: 'State-of-the-art LASIK surgery for vision correction with luxury recovery stay',
    image: 'https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c?auto=format&fit=crop&w=800&q=80',
    location: 'Istanbul, Turkey',
    hospital: 'Dünyagöz Hospital',
    price: 1950,
    rating: 4.8,
    reviewCount: 423,
    duration: '3-5 days',
    treatment: 'Eye',
    includes: ['LASIK Surgery', 'Consultation', 'Accommodation', 'Airport Transfers', 'City Tour', 'Follow-up Care']
  },
  {
    id: '5',
    title: 'Cosmetic Surgery Package in Mexico City',
    description: 'Complete cosmetic transformation with experienced plastic surgeons and luxury recovery',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    location: 'Mexico City, Mexico',
    hospital: 'Médica Sur Hospital',
    price: 8500,
    rating: 4.6,
    reviewCount: 189,
    duration: '10-14 days',
    treatment: 'Cosmetic',
    includes: ['Surgery', 'Anesthesia', 'Hospital Stay', 'Luxury Recovery Villa', 'Private Nurse', 'Transportation']
  },
  {
    id: '6',
    title: 'Fertility Treatment in Mumbai',
    description: 'Comprehensive IVF package with high success rates and personalized care',
    image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=80',
    location: 'Mumbai, India',
    hospital: 'Jaslok Hospital',
    price: 5800,
    rating: 4.9,
    reviewCount: 211,
    duration: '15-20 days',
    treatment: 'Fertility',
    includes: ['IVF Procedure', 'Consultations', 'Medications', 'Hotel Stay', 'Translation Services', 'Local Transportation']
  },
  {
    id: '7',
    title: 'Heart Bypass Surgery in Singapore',
    description: 'Comprehensive cardiac care with top cardiovascular surgeons in Asia',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    location: 'Singapore',
    hospital: 'Mount Elizabeth Hospital',
    price: 28500,
    rating: 4.9,
    reviewCount: 176,
    duration: '14-21 days',
    treatment: 'Cardiac',
    includes: ['Surgery', 'ICU Stay', 'Hospital Room', 'Medications', 'Pre/Post-op Care', 'Airport Transfers']
  },
  {
    id: '8',
    title: 'Stem Cell Therapy in Cancun',
    description: 'Cutting-edge regenerative medicine treatments in a beautiful beachside location',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
    location: 'Cancun, Mexico',
    hospital: 'Cancun Regenerative Medicine Center',
    price: 15900,
    rating: 4.7,
    reviewCount: 129,
    duration: '7-10 days',
    treatment: 'Regenerative',
    includes: ['Stem Cell Treatment', 'Consultations', 'Lab Work', 'Beach Resort Stay', 'Follow-up Care', 'Transportation']
  },
  {
    id: '9',
    title: 'Weight Loss Surgery in Thailand',
    description: 'Comprehensive bariatric surgery package with extended support and follow-up',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    location: 'Phuket, Thailand',
    hospital: 'Phuket International Hospital',
    price: 11200,
    rating: 4.6,
    reviewCount: 215,
    duration: '10-14 days',
    treatment: 'Bariatric',
    includes: ['Surgery', 'Pre-op Assessment', 'Post-op Care', 'Nutritional Counseling', 'Luxury Accommodation', 'Airport Transfers']
  }
];

export default AllPackages;
