
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package } from '@/types';
import { Trash2, ChevronLeft, ShoppingCart, Calendar, CalendarDays } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

interface PackageWithTravelDate extends Package {
  travelDate?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<PackageWithTravelDate[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect if not logged in
    if (!user && !loading) {
      navigate('/signin');
    } else {
      // Load cart items from localStorage
      const loadCart = () => {
        const cart = JSON.parse(localStorage.getItem('medictrip-cart') || '[]');
        setCartItems(cart);
        setLoading(false);
      };

      loadCart();
    }
  }, [user, navigate, loading]);

  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('medictrip-cart', JSON.stringify(updatedCart));
    
    // Update cart count in navbar
    window.dispatchEvent(new CustomEvent('cart-updated'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const updateTravelDate = (id: string, date: Date) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, travelDate: date.toISOString() };
      }
      return item;
    });
    
    setCartItems(updatedCart);
    localStorage.setItem('medictrip-cart', JSON.stringify(updatedCart));
    
    toast({
      title: "Travel date updated",
      description: `Your travel date has been updated to ${format(date, 'PPP')}`,
    });
  };

  const proceedToCheckout = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }

    // Check if all items have travel dates
    const missingDates = cartItems.some(item => !item.travelDate);
    if (missingDates) {
      toast({
        title: "Travel dates required",
        description: "Please select travel dates for all packages",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Insert purchases into Supabase
      for (const item of cartItems) {
        const { error } = await supabase
          .from('purchased_treatments')
          .insert({
            user_id: user.id,
            treatment_id: item.id,
            price: item.price,
            travel_date: item.travelDate,
            status: 'pending'
          });
          
        if (error) {
          console.error('Error saving purchase:', error);
          throw error;
        }
      }
      
      // Clear cart on successful purchase
      localStorage.setItem('medictrip-cart', JSON.stringify([]));
      setCartItems([]);
      window.dispatchEvent(new CustomEvent('cart-updated'));
      
      // Navigate to checkout
      navigate('/checkout');
    } catch (error) {
      console.error('Error during checkout:', error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return null; // Don't render anything while redirecting or loading
  }

  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="medictrip-container">
          {/* Breadcrumb */}
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center text-gray-500 hover:text-medictrip-600 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Treatments
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medictrip-600"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="w-16 h-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't added any medical packages to your cart yet.</p>
              <Link to="/packages" className="medictrip-button-primary inline-block">
                Browse Treatments
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-40 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{item.hospital} • {item.location}</p>
                      
                      {/* Travel Date Selection */}
                      <div className="mb-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button 
                              className="flex items-center text-sm px-3 py-1 border border-gray-200 rounded-full text-gray-700 hover:border-medictrip-500 transition-colors"
                            >
                              <CalendarDays className="w-4 h-4 mr-2 text-medictrip-500" />
                              {item.travelDate ? (
                                <span>Travel: {format(new Date(item.travelDate), 'PPP')}</span>
                              ) : (
                                <span className="text-gray-500">Select travel date</span>
                              )}
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={item.travelDate ? new Date(item.travelDate) : undefined}
                              onSelect={(date) => date && updateTravelDate(item.id, date)}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.includes.slice(0, 3).map((feature, index) => (
                          <span key={index} className="medictrip-badge-secondary">
                            {feature}
                          </span>
                        ))}
                        {item.includes.length > 3 && (
                          <span className="medictrip-badge-secondary">
                            +{item.includes.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="mt-auto pt-2 flex justify-between items-end">
                        <div className="text-sm text-gray-500">
                          Duration: <span className="font-medium">{item.duration}</span>
                        </div>
                        <div className="text-xl font-bold text-medictrip-700">
                          ${item.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Note about missing travel dates */}
                {cartItems.some(item => !item.travelDate) && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-700 flex items-start">
                    <Calendar className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">
                      Please select travel dates for all packages before proceeding to checkout. 
                      These dates help us prepare for your arrival and schedule your treatments.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-gray-600 truncate pr-2 max-w-[200px]">{item.title}</span>
                        <span className="font-medium">${item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-b border-gray-100 py-4 mb-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-medictrip-700">${calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={proceedToCheckout}
                      disabled={loading || cartItems.some(item => !item.travelDate)}
                      className={`medictrip-button-primary w-full flex justify-center items-center ${
                        (loading || cartItems.some(item => !item.travelDate)) ? 'opacity-60 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? 'Processing...' : 'Proceed to Checkout'}
                    </button>
                    <Link 
                      to="/packages" 
                      className="medictrip-button-secondary w-full flex justify-center items-center"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                  
                  <div className="mt-6 text-xs text-gray-500 text-center">
                    <p>Need assistance with your order?</p>
                    <p className="font-medium text-medictrip-600">Contact our support team</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
