
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, Calendar, FileText, Search, ShoppingCart, Upload, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Get cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('medictrip-cart') || '[]');
    setCartCount(cart.length);

    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('medictrip-cart') || '[]');
      setCartCount(updatedCart.length);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  const handleNavigation = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleCartClick = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    navigate('/cart');
  };

  const handleDocumentUpload = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    navigate('/documents');
  };

  const navItems = [
    { label: 'Find Treatments', icon: Search, path: '/' },
    { label: 'Destinations', icon: Calendar, path: '/destinations' },
    { label: 'How It Works', icon: FileText, path: '/how-it-works' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md py-4',
        isScrolled ? 'bg-white/90 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="medictrip-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/public/Logo.png" alt="MedTrip" className="w-8 h-8 mr-4" />
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-medictrip-600 to-medictrip-800">
              MedTrip
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button 
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-medictrip-600 transition-colors"
              >
                <item.icon className="w-4 h-4 mr-1" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleDocumentUpload}
              className="relative flex items-center text-sm font-medium text-gray-700 hover:text-medictrip-600 transition-colors"
            >
              <Upload className="w-5 h-5 mr-1" />
              <span>Upload Documents</span>
            </button>
            
            <button 
              onClick={handleCartClick}
              className="relative text-gray-700 hover:text-medictrip-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-medictrip-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-medictrip-600 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-medictrip-100 flex items-center justify-center text-medictrip-600">
                    <User className="w-4 h-4" />
                  </div>
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/documents" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Documents
                    </Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Bookings
                    </Link>
                    <button 
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/signin"
                className="medictrip-button-primary text-sm py-2 flex items-center"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={handleDocumentUpload}
              className="text-gray-700 hover:text-medictrip-600 transition-colors"
            >
              <Upload className="w-5 h-5" />
            </button>
            
            <button 
              onClick={handleCartClick}
              className="relative text-gray-700 hover:text-medictrip-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-medictrip-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t animate-fade-in">
          <div className="p-4 space-y-4">
            {navItems.map((item) => (
              <button 
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-medictrip-600 w-full text-left"
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
              {user ? (
                <>
                  <Link to="/profile" className="w-full text-left py-2 text-base font-medium text-gray-700 hover:text-medictrip-600">
                    My Profile
                  </Link>
                  <Link to="/documents" className="w-full text-left py-2 text-base font-medium text-gray-700 hover:text-medictrip-600">
                    My Documents
                  </Link>
                  <Link to="/bookings" className="w-full text-left py-2 text-base font-medium text-gray-700 hover:text-medictrip-600">
                    My Bookings
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="w-full text-left py-2 text-base font-medium text-gray-700 hover:text-medictrip-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link 
                  to="/signin"
                  className="w-full medictrip-button-primary flex items-center justify-center"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
