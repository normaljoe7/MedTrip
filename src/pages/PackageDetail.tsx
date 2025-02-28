
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package } from '@/types';
import { 
  Star, 
  Calendar, 
  MapPin, 
  Building, 
  Clock, 
  Check, 
  ShoppingCart, 
  ChevronLeft, 
  Users, 
  Award, 
  CreditCard,
  CalendarRange,
  Info
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Check if we came from "add to cart" action
  const shouldAddToCart = new URLSearchParams(location.search).get('action') === 'add-to-cart';

  useEffect(() => {
    if (id) {
      fetchPackageDetails(id);
    }
  }, [id]);

  const fetchPackageDetails = async (packageId: string) => {
    setLoading(true);
    try {
      // Try to get package from Supabase first
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .eq('id', packageId)
        .single();
      
      if (error) {
        throw error;
      }

      if (data) {
        // Transform to match our Package type
        const transformedData: Package = {
          id: data.id,
          title: data.title,
          description: data.description || 'No description available',
          image: data.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
          location: data.location || 'Unknown',
          hospital: data.hospital || 'Unknown',
          price: data.price,
          rating: data.rating || 4.5,
          reviewCount: data.review_count || 100,
          duration: data.duration || '7-10 days',
          treatment: data.treatment_type || 'Medical',
          includes: data.includes || ['Consultation', 'Treatment', 'Accommodation']
        };
        setPackageData(transformedData);
      } else {
        // Fallback to hardcoded data
        const fallbackPackage = fallbackPackages.find(pkg => pkg.id === packageId);
        if (fallbackPackage) {
          setPackageData(fallbackPackage);
        } else {
          toast({
            title: "Package not found",
            description: "The requested package could not be found.",
            variant: "destructive",
          });
          navigate('/packages');
        }
      }
    } catch (error) {
      console.error('Error fetching package details:', error);
      // Try to get from fallback data
      const fallbackPackage = fallbackPackages.find(pkg => pkg.id === packageId);
      if (fallbackPackage) {
        setPackageData(fallbackPackage);
      } else {
        toast({
          title: "Error loading package",
          description: "Could not load package details.",
          variant: "destructive",
        });
        navigate('/packages');
      }
    } finally {
      setLoading(false);
      
      // Auto-show calendar if coming from "add to cart" action
      if (shouldAddToCart) {
        setShowCalendar(true);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!packageData) return;
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }

    if (!selectedDate) {
      toast({
        title: "Select travel date",
        description: "Please select your preferred travel date before adding to cart",
        variant: "destructive",
      });
      setShowCalendar(true);
      return;
    }
    
    // Add travel date to the package
    const packageWithDate = {
      ...packageData,
      travelDate: selectedDate.toISOString()
    };
    
    const cart = JSON.parse(localStorage.getItem('medictrip-cart') || '[]');
    const isAlreadyInCart = cart.some((item: Package) => item.id === packageData.id);
    
    if (!isAlreadyInCart) {
      cart.push(packageWithDate);
      localStorage.setItem('medictrip-cart', JSON.stringify(cart));
      
      // Update cart count in navbar
      window.dispatchEvent(new CustomEvent('cart-updated'));
      
      toast({
        title: "Added to cart",
        description: `${packageData.title} has been added to your cart`,
      });
      
      // Navigate to cart
      navigate('/cart');
    } else {
      toast({
        title: "Already in cart",
        description: "This package is already in your cart",
        variant: "destructive",
      });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col pageload-fade-in">
        <Navbar />
        <main className="flex-grow pt-28 pb-16">
          <div className="medictrip-container">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medictrip-600"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex flex-col pageload-fade-in">
        <Navbar />
        <main className="flex-grow pt-28 pb-16">
          <div className="medictrip-container">
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Package Not Found</h2>
              <p className="text-gray-600 mb-8">The package you're looking for doesn't exist or has been removed.</p>
              <button 
                onClick={goBack}
                className="medictrip-button-primary"
              >
                Go Back
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="medictrip-container">
          {/* Breadcrumb */}
          <div className="flex items-center mb-6">
            <button 
              onClick={goBack} 
              className="flex items-center text-gray-500 hover:text-medictrip-600 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package Details */}
            <div className="lg:col-span-2">
              {/* Package Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{packageData.title}</h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-medictrip-500" />
                    {packageData.location}
                  </div>
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-1 text-medictrip-500" />
                    {packageData.hospital}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" />
                    <span>{packageData.rating}</span>
                    <span className="ml-1 text-gray-500">({packageData.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Package Image */}
              <div className="mb-8 rounded-xl overflow-hidden">
                <img 
                  src={packageData.image} 
                  alt={packageData.title} 
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Treatment Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Treatment Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-medictrip-50 p-5 rounded-lg flex items-start">
                    <div className="w-10 h-10 bg-medictrip-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Calendar className="w-5 h-5 text-medictrip-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Duration</h3>
                      <p>{packageData.duration}</p>
                    </div>
                  </div>
                  <div className="bg-medictrip-50 p-5 rounded-lg flex items-start">
                    <div className="w-10 h-10 bg-medictrip-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="w-5 h-5 text-medictrip-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Treatment Type</h3>
                      <p>{packageData.treatment}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-gray-700 mb-4">{packageData.description}</p>
                  
                  <h3 className="font-semibold mb-3">This Package Includes:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {packageData.includes.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hospital Details */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-medictrip-600" />
                    Hospital Information
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">{packageData.hospital}</h4>
                    <p className="text-gray-700 mb-4">
                      This hospital is renowned for its excellence in {packageData.treatment.toLowerCase()} procedures, 
                      featuring state-of-the-art facilities and internationally trained medical staff.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      JCI Accredited
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      ISO Certified
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      International Patients Department
                    </span>
                  </div>
                </div>

                {/* Treatment Process */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-medictrip-600" />
                    Treatment Process
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-medictrip-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-medictrip-600 font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Initial Consultation</h4>
                        <p className="text-gray-700">
                          Meet with the specialist to discuss your condition and treatment options.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-medictrip-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-medictrip-600 font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Pre-Treatment Preparation</h4>
                        <p className="text-gray-700">
                          Complete necessary tests and prepare for your procedure.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-medictrip-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-medictrip-600 font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Treatment/Procedure</h4>
                        <p className="text-gray-700">
                          Undergo your treatment with our expert medical team.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-medictrip-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-medictrip-600 font-medium">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Recovery & Follow-up</h4>
                        <p className="text-gray-700">
                          Recover comfortably with follow-up appointments to ensure optimal results.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-32">
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-500 text-sm">Starting from</p>
                      <p className="text-3xl font-bold text-medictrip-700">${packageData.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full">
                      <Check className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Available</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Duration: {packageData.duration}</span>
                  </div>
                </div>

                {/* Select Date */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3 flex items-center">
                    <CalendarRange className="w-5 h-5 mr-2 text-medictrip-600" />
                    Select Travel Date
                  </h3>
                  
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <button 
                        className="w-full flex items-center justify-between border border-gray-300 rounded-md p-3 text-left"
                      >
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span className="text-gray-500">Select your preferred date</span>
                        )}
                        <Calendar className="w-5 h-5 text-gray-500" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  {selectedDate && (
                    <div className="mt-3 text-sm text-gray-600 flex items-start">
                      <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                      <p>
                        Your treatment period will start around this date. 
                        A care coordinator will contact you to confirm exact schedule.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={handleAddToCart}
                    className="medictrip-button-primary w-full flex items-center justify-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                  
                  <a 
                    href="#" 
                    className="medictrip-button-secondary w-full flex items-center justify-center"
                  >
                    <Award className="w-5 h-5 mr-2" />
                    Get a Personalized Quote
                  </a>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                  <div className="flex items-start">
                    <CreditCard className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Secure payment through our platform with multiple payment options
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Flexible scheduling with free date changes up to 14 days before arrival
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Fallback data in case Supabase fails
const fallbackPackages: Package[] = [
  {
    id: '1',
    title: 'Premium Dental Implant Package in Bangkok',
    description: 'This comprehensive dental implant package includes everything you need for a successful dental restoration. You\'ll receive premium quality dental implants at Bangkok\'s leading dental center, known for its state-of-the-art technology and world-class dental professionals. The package includes initial consultation, 3D scans, implant surgery, abutment placement, and final crown installation. You\'ll also enjoy comfortable accommodations near the clinic, airport transfers, and a personal interpreter to ensure smooth communication throughout your treatment journey.',
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
    description: 'This advanced hip replacement package offers a minimally invasive surgical approach for faster recovery and reduced pain. At Gleneagles Medical Center in Kuala Lumpur, you\'ll be treated by orthopedic surgeons who specialize in joint replacement procedures using the latest techniques and implants. The comprehensive package includes pre-operative assessments, the surgical procedure, hospital stay, and an extensive physical therapy program to ensure optimal recovery. You\'ll recover in comfort at a partner hotel with medical staff available for assistance. The package also includes airport pickup, local transportation, and a dedicated care coordinator to assist you throughout your medical journey.',
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
    description: 'Experience the most advanced medical screening technology available with this comprehensive health checkup package at Asan Medical Center in Seoul. This package utilizes cutting-edge diagnostic equipment to provide a thorough assessment of your overall health status. The examination includes full body MRI and CT scans, advanced blood analysis, genetic predisposition testing, cancer marker screening, and cardiovascular evaluation. You\'ll stay in a luxury hotel and have a private driver to transport you between appointments. After your examinations, you\'ll receive a detailed consultation with English-speaking specialists who will explain your results and provide personalized health recommendations.',
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
    description: 'Achieve freedom from glasses and contact lenses with this comprehensive LASIK eye surgery package at the renowned Dünyagöz Hospital in Istanbul. The package includes pre-operative assessments to determine your eligibility, the latest bladeless LASIK technology for precise vision correction, and post-operative medications and follow-up care. You\'ll recover in a comfortable hotel with beautiful views of the city, and enjoy airport transfers and a guided city tour when you\'re feeling up to it. Your package also includes 6 months of post-operative support to ensure optimal healing and vision results.',
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
    description: 'Transform your appearance with this comprehensive cosmetic surgery package at Médica Sur Hospital in Mexico City. This package can be customized to include various procedures such as facelift, rhinoplasty, breast augmentation, or liposuction, performed by board-certified plastic surgeons with extensive experience in aesthetic procedures. You\'ll recover in a private luxury villa with a personal nurse to assist with your post-operative care. The package includes all necessary pre-operative tests, the surgical procedure, anesthesia, hospital stay, medications, and multiple follow-up appointments to monitor your healing process.',
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
    description: 'This comprehensive IVF package at Jaslok Hospital in Mumbai offers hope to couples struggling with fertility issues. The package includes an initial fertility assessment for both partners, hormonal testing, ultrasound monitoring, egg retrieval, sperm processing, embryo culture, and embryo transfer. You\'ll be cared for by a team of experienced reproductive endocrinologists who maintain high success rates compared to global standards. The package includes a comfortable hotel stay near the hospital, translation services for seamless communication, and local transportation for all your appointments. Your treatment will be personalized based on your specific fertility challenges to maximize your chances of success.',
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
    description: 'This comprehensive cardiac care package at Mount Elizabeth Hospital in Singapore offers coronary artery bypass grafting (CABG) performed by leading cardiovascular surgeons in Asia. The package includes thorough pre-operative cardiac evaluation, the surgical procedure, intensive care unit stay, post-operative hospital room, medications, and extensive cardiac rehabilitation program. Mount Elizabeth Hospital is equipped with the latest cardiac monitoring and surgical technology, ensuring you receive the highest standard of care. You\'ll be supported by a multidisciplinary team including cardiologists, cardiac surgeons, anesthesiologists, and specialized cardiac nurses, all working together to ensure the best possible outcome for your heart health.',
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
    description: 'Experience the latest advancements in regenerative medicine with this stem cell therapy package at Cancun Regenerative Medicine Center. This cutting-edge treatment uses your body\'s own healing mechanisms to address various degenerative conditions including osteoarthritis, autoimmune disorders, and chronic inflammation. The package includes initial consultations, comprehensive lab work, stem cell harvesting, processing and activation, and the treatment procedure. You\'ll recover at a beautiful beach resort with views of the Caribbean Sea, allowing you to combine your medical treatment with a relaxing vacation. The package also includes follow-up care to monitor your progress and ensure optimal results from your therapy.',
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
    description: 'This comprehensive bariatric surgery package at Phuket International Hospital offers a long-term solution for significant weight loss. The package includes pre-operative medical assessments, nutritional evaluations, the surgical procedure (gastric sleeve, gastric bypass, or adjustable gastric band), hospital stay, and extensive follow-up care. You\'ll work with a multidisciplinary team including bariatric surgeons, nutritionists, and psychological support professionals who will guide you through your weight loss journey. The package includes luxury accommodation during your recovery, nutritional counseling to help you adapt to your new eating habits, and a support program that continues even after you return home, ensuring long-term success with your weight management goals.',
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

export default PackageDetail;
