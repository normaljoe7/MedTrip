
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { 
  Calendar, Clock, MapPin, User, FileText, 
  Plane, Hotel, Car, CreditCard, CheckCircle, 
  AlertCircle, XCircle, ChevronsLeft, ChevronsRight, 
  Download, Printer, Mail, Phone
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface Booking {
  id: string;
  treatment_title: string;
  hospital: string;
  location: string;
  start_date: string;
  end_date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  checkIn_details: {
    flight?: {
      confirmed: boolean;
      number?: string;
      arrival_time?: string;
    };
    hotel?: {
      confirmed: boolean;
      name?: string;
      check_in?: string;
    };
    transfer?: {
      confirmed: boolean;
      type?: string;
    };
  };
  treatment_details: {
    date: string;
    time: string;
    doctor: string;
    notes?: string;
  };
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: 'booking-001',
    treatment_title: 'Dental Implant Procedure',
    hospital: 'Bangkok International Dental Center',
    location: 'Bangkok, Thailand',
    start_date: '2023-07-10',
    end_date: '2023-07-17',
    status: 'upcoming',
    price: 3200,
    checkIn_details: {
      flight: {
        confirmed: true,
        number: 'TG507',
        arrival_time: '10:30 AM',
      },
      hotel: {
        confirmed: true,
        name: 'Grand Hyatt Erawan Bangkok',
        check_in: '12:00 PM',
      },
      transfer: {
        confirmed: true,
        type: 'Private Car',
      },
    },
    treatment_details: {
      date: '2023-07-12',
      time: '09:00 AM',
      doctor: 'Dr. Somchai Pattana',
      notes: 'Please arrive 30 minutes early for pre-procedure preparation.',
    },
  },
  {
    id: 'booking-002',
    treatment_title: 'Hip Replacement Surgery',
    hospital: 'Bumrungrad International Hospital',
    location: 'Bangkok, Thailand',
    start_date: '2023-05-15',
    end_date: '2023-05-30',
    status: 'completed',
    price: 12800,
    checkIn_details: {
      flight: {
        confirmed: true,
        number: 'EK384',
        arrival_time: '14:45 PM',
      },
      hotel: {
        confirmed: true,
        name: 'The Sukhothai Bangkok',
        check_in: '15:00 PM',
      },
      transfer: {
        confirmed: true,
        type: 'Medical Van',
      },
    },
    treatment_details: {
      date: '2023-05-18',
      time: '08:00 AM',
      doctor: 'Dr. Preecha Charoenkul',
      notes: 'Follow-up appointment scheduled for May 25th.',
    },
  },
  {
    id: 'booking-003',
    treatment_title: 'LASIK Eye Surgery',
    hospital: 'Seoul National University Hospital',
    location: 'Seoul, South Korea',
    start_date: '2023-06-05',
    end_date: '2023-06-10',
    status: 'cancelled',
    price: 2500,
    checkIn_details: {
      flight: {
        confirmed: false,
      },
      hotel: {
        confirmed: false,
      },
      transfer: {
        confirmed: false,
      },
    },
    treatment_details: {
      date: '2023-06-07',
      time: '10:30 AM',
      doctor: 'Dr. Park Ji-woo',
    },
  }
];

const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user && !loading) {
      navigate('/signin');
    } else {
      // In a real app, you would fetch the bookings from the database
      // For this example, we're using the mock data
      setBookings(mockBookings);
      setLoading(false);
    }
  }, [user, navigate, loading]);
  
  const handleDownloadItinerary = (bookingId: string) => {
    // This would be implemented to generate and download a PDF
    toast({
      title: "Itinerary download started",
      description: "Your itinerary is being downloaded.",
    });
  };
  
  const handlePrintItinerary = (bookingId: string) => {
    // This would open a print dialog
    toast({
      title: "Print dialog opened",
      description: "Please select your printer to continue.",
    });
  };
  
  const filteredBookings = bookings.filter(booking => booking.status === activeTab);
  
  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medictrip-600"></div>
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Bookings</h1>
          </div>
          
          {/* Tabs */}
          <div className="mb-8 border-b">
            <nav className="flex -mb-px">
              {(['upcoming', 'completed', 'cancelled'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-medictrip-600 text-medictrip-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Booking List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="flex justify-center mb-4">
                <Calendar className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No {activeTab} bookings</h3>
              <p className="text-gray-500 mb-6">You don't have any {activeTab} bookings at the moment.</p>
              {activeTab === 'upcoming' && (
                <button 
                  onClick={() => navigate('/')}
                  className="medictrip-button-primary inline-block"
                >
                  Find Treatments
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{booking.treatment_title}</h3>
                        <p className="text-gray-600 mb-2">{booking.hospital} • {booking.location}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              {new Date(booking.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                              {new Date(booking.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="w-4 h-4 mr-1" />
                            <span>${booking.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex flex-col items-end">
                        <div className="mb-2">
                          {booking.status === 'upcoming' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <Clock className="w-3 h-3 mr-1" />
                              Upcoming
                            </span>
                          )}
                          {booking.status === 'completed' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </span>
                          )}
                          {booking.status === 'cancelled' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <XCircle className="w-3 h-3 mr-1" />
                              Cancelled
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setSelectedBooking(selectedBooking?.id === booking.id ? null : booking)}
                            className="medictrip-button-secondary text-xs py-1"
                          >
                            {selectedBooking?.id === booking.id ? 'Hide Details' : 'View Details'}
                          </button>
                          {booking.status !== 'cancelled' && (
                            <>
                              <button 
                                onClick={() => handleDownloadItinerary(booking.id)}
                                className="medictrip-button-secondary text-xs py-1"
                              >
                                <Download className="w-3 h-3" />
                              </button>
                              <button 
                                onClick={() => handlePrintItinerary(booking.id)}
                                className="medictrip-button-secondary text-xs py-1"
                              >
                                <Printer className="w-3 h-3" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Details Panel */}
                  {selectedBooking?.id === booking.id && (
                    <div className="p-6 bg-gray-50 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-medictrip-600" />
                            Treatment Details
                          </h4>
                          <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
                            <div>
                              <p className="text-sm text-gray-500">Date:</p>
                              <p className="font-medium">
                                {new Date(booking.treatment_details.date).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  month: 'long', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Time:</p>
                              <p className="font-medium">{booking.treatment_details.time}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Doctor:</p>
                              <p className="font-medium">{booking.treatment_details.doctor}</p>
                            </div>
                            {booking.treatment_details.notes && (
                              <div>
                                <p className="text-sm text-gray-500">Notes:</p>
                                <p className="text-sm">{booking.treatment_details.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Right Column */}
                        <div>
                          <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <ChevronsRight className="w-5 h-5 mr-2 text-medictrip-600" />
                            Travel & Accommodation
                          </h4>
                          <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
                            {/* Flight */}
                            <div className="flex">
                              <div className="w-10 flex-shrink-0 pt-1">
                                <Plane className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center">
                                  <h5 className="font-medium">Flight</h5>
                                  {booking.checkIn_details.flight?.confirmed ? (
                                    <span className="ml-2 text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded-full">
                                      Confirmed
                                    </span>
                                  ) : (
                                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded-full">
                                      Pending
                                    </span>
                                  )}
                                </div>
                                {booking.checkIn_details.flight?.confirmed ? (
                                  <div className="text-sm mt-1">
                                    <p>Flight No: {booking.checkIn_details.flight.number}</p>
                                    <p>Arrival: {booking.checkIn_details.flight.arrival_time}</p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Flight details pending. We'll update you soon.
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Hotel */}
                            <div className="flex">
                              <div className="w-10 flex-shrink-0 pt-1">
                                <Hotel className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center">
                                  <h5 className="font-medium">Accommodation</h5>
                                  {booking.checkIn_details.hotel?.confirmed ? (
                                    <span className="ml-2 text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded-full">
                                      Confirmed
                                    </span>
                                  ) : (
                                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded-full">
                                      Pending
                                    </span>
                                  )}
                                </div>
                                {booking.checkIn_details.hotel?.confirmed ? (
                                  <div className="text-sm mt-1">
                                    <p>{booking.checkIn_details.hotel.name}</p>
                                    <p>Check-in: {booking.checkIn_details.hotel.check_in}</p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Hotel details pending. We'll update you soon.
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Transfer */}
                            <div className="flex">
                              <div className="w-10 flex-shrink-0 pt-1">
                                <Car className="w-6 h-6 text-gray-400" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center">
                                  <h5 className="font-medium">Airport Transfer</h5>
                                  {booking.checkIn_details.transfer?.confirmed ? (
                                    <span className="ml-2 text-xs bg-green-100 text-green-800 py-0.5 px-2 rounded-full">
                                      Confirmed
                                    </span>
                                  ) : (
                                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded-full">
                                      Pending
                                    </span>
                                  )}
                                </div>
                                {booking.checkIn_details.transfer?.confirmed ? (
                                  <div className="text-sm mt-1">
                                    <p>Type: {booking.checkIn_details.transfer.type}</p>
                                    <p>A driver will be waiting for you at the airport arrival area with your name.</p>
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Transfer details pending. We'll update you soon.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Contact Section */}
                      <div className="mt-6 p-4 bg-medictrip-50 rounded-lg border border-medictrip-100 flex items-start">
                        <AlertCircle className="w-5 h-5 text-medictrip-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-medium mb-1">Need assistance with your booking?</h5>
                          <p className="text-sm text-gray-600 mb-2">
                            If you have any questions or need to make changes to your booking, please contact your dedicated patient coordinator:
                          </p>
                          <div className="flex items-center text-medictrip-600 font-medium">
                            <Mail className="w-4 h-4 mr-1" />
                            <span>coordinator@medictrip.com</span>
                            <span className="mx-2">•</span>
                            <Phone className="w-4 h-4 mr-1" />
                            <span>+1 (800) 123-4567</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bookings;
