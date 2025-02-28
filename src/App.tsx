
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Documents from "./pages/Documents";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Blogs from "./pages/Blogs";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import HowItWorks from "./pages/HowItWorks";
import Destinations from "./pages/Destinations";
import AllPackages from "./pages/AllPackages";
import PackageDetail from "./pages/PackageDetail";

const queryClient = new QueryClient();

const App = () => {
  // Add smooth page loading effect
  useEffect(() => {
    document.body.classList.add('pageload-fade-in');
    return () => {
      document.body.classList.remove('pageload-fade-in');
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/packages" element={<AllPackages />} />
              <Route path="/package/:id" element={<PackageDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
