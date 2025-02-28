
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package } from '@/types';
import { ChevronLeft, CreditCard, Lock, CheckCircle, User, MapPin, CalendarDays, ChevronsUpDown } from 'lucide-react';

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    // Load cart items from localStorage
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('medictrip-cart') || '[]');
      setCartItems(cart);
      setLoading(false);
      
      // Redirect to cart if empty
      if (cart.length === 0) {
        navigate('/cart');
      }
    };

    loadCart();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment
    setCurrentStep(3);
    // Clear cart
    localStorage.setItem('medictrip-cart', JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('cart-updated'));
  };

  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="medictrip-container">
          {/* Breadcrumb */}
          <div className="flex items-center mb-8">
            <Link to="/cart" className="flex items-center text-gray-500 hover:text-medictrip-600 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Cart
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-medictrip-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Checkout Progress */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex justify-between items-center">
                    <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-medictrip-600' : 'text-gray-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= 1 ? 'bg-medictrip-100' : 'bg-gray-100'}`}>
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-xs">Your Details</span>
                    </div>
                    <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-medictrip-200' : 'bg-gray-200'}`}></div>
                    <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-medictrip-600' : 'text-gray-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= 2 ? 'bg-medictrip-100' : 'bg-gray-100'}`}>
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <span className="text-xs">Payment</span>
                    </div>
                    <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-medictrip-200' : 'bg-gray-200'}`}></div>
                    <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-medictrip-600' : 'text-gray-400'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= 3 ? 'bg-medictrip-100' : 'bg-gray-100'}`}>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-xs">Confirmation</span>
                    </div>
                  </div>
                </div>

                {/* Step 1: Your Details */}
                {currentStep === 1 && (
                  <form className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="medictrip-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="medictrip-input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="medictrip-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="medictrip-input"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="medictrip-input"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="medictrip-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="country">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="medictrip-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="postalCode">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          className="medictrip-input"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="medictrip-button-primary"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 2: Payment Details */}
                {currentStep === 2 && (
                  <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardNumber">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                          required
                          className="medictrip-input pl-11"
                        />
                        <CreditCard className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardName">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="medictrip-input"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="expiry">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          required
                          className="medictrip-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cvv">
                          CVV
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="XXX"
                            required
                            className="medictrip-input"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <div className="text-sm text-gray-400 cursor-help" title="3-digit security code on the back of your card">?</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mb-6 p-3 bg-green-50 rounded-lg">
                      <Lock className="w-5 h-5 text-green-500 mr-2" />
                      <p className="text-sm text-green-600">Your payment information is encrypted and secure.</p>
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="medictrip-button-secondary"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="medictrip-button-primary"
                      >
                        Complete Payment
                      </button>
                    </div>
                  </form>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                      Thank you for your booking. We've sent the confirmation details to your email.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500">Booking Reference:</span>
                        <span className="font-semibold">MT-{Math.floor(Math.random() * 10000000)}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500">Booking Date:</span>
                        <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Total Amount:</span>
                        <span className="font-semibold">${calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Link to="/" className="medictrip-button-primary">
                        Return to Home
                      </Link>
                    </div>
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
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mt-1 mr-2 flex-shrink-0 w-4 h-4 rounded-full bg-medictrip-100 flex items-center justify-center">
                        <CalendarDays className="w-3 h-3 text-medictrip-600" />
                      </div>
                      <span className="text-xs text-gray-600">Free rescheduling up to 48 hours before appointment</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-2 flex-shrink-0 w-4 h-4 rounded-full bg-medictrip-100 flex items-center justify-center">
                        <Lock className="w-3 h-3 text-medictrip-600" />
                      </div>
                      <span className="text-xs text-gray-600">Secure, encrypted payments with leading providers</span>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 mr-2 flex-shrink-0 w-4 h-4 rounded-full bg-medictrip-100 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-medictrip-600" />
                      </div>
                      <span className="text-xs text-gray-600">24/7 support throughout your medical journey</span>
                    </div>
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

export default Checkout;
