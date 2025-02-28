
import { useState } from 'react';
import { ChevronRight, Heart, ShieldCheck, Globe } from 'lucide-react';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-medictrip-50/60 to-transparent -z-10" />
      
      {/* Main Container */}
      <div className="medictrip-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-8 animate-fade-in-up">
            <span className="medictrip-badge-primary">
              Global Healthcare, Simplified
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Health Journey, <span className="text-medictrip-600">Worldwide</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-xl">
              Find and book the perfect medical treatment abroad. We connect you with world-class hospitals, arrange your travel, and take care of all the details.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
              <button className="medictrip-button-primary flex items-center justify-center">
                        Explore Treatments
                <ChevronRight className="ml-1 w-5 h-5" />
              </button>
              <button className="medictrip-button-secondary flex items-center justify-center">
                How It Works
              </button>
            </div>
            
            {/* Trust Factors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {[
                { icon: Heart, text: "Trusted by 10,000+ patients" },
                { icon: ShieldCheck, text: "Accredited hospitals only" },
                { icon: Globe, text: "20+ countries worldwide" },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-medictrip-100 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-medictrip-600" />
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image/Illustration */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl animate-fade-in animate-floating">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80" 
                alt="Medical Tourism" 
                className="w-full h-auto rounded-2xl"
                onLoad={() => setIsVideoLoaded(true)}
              />
              
              {/* Floating UI Elements */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-scale-in">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">150+ Hospitals</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-scale-in delay-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-medictrip-500"></div>
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
