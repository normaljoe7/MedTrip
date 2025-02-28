
import { X, Search, Calendar, CreditCard, Plane, Building, MessageCircle } from 'lucide-react';

interface HowItWorksPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksPopup = ({ isOpen, onClose }: HowItWorksPopupProps) => {
  if (!isOpen) return null;

  const steps = [
    {
      icon: Search,
      title: "1. Find Your Treatment",
      description: "Search for your desired medical procedure and discover top-rated clinics and hospitals worldwide."
    },
    {
      icon: Calendar,
      title: "2. Get a Free Quote",
      description: "Receive personalized quotes based on your medical needs, including treatment, accommodation, and travel costs."
    },
    {
      icon: MessageCircle,
      title: "3. Consult & Plan",
      description: "Connect with healthcare providers for virtual consultations and work with our team to plan your trip."
    },
    {
      icon: CreditCard,
      title: "4. Book & Pay Securely",
      description: "Reserve your treatment and travel arrangements with our secure payment system."
    },
    {
      icon: Plane,
      title: "5. Travel with Confidence",
      description: "Receive detailed pre-trip instructions and enjoy our airport pickup service upon arrival."
    },
    {
      icon: Building,
      title: "6. Treatment & Recovery",
      description: "Get your procedure done by qualified professionals with our support available 24/7 during your stay."
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">How MedicTrip Works</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-8">
            <p className="text-gray-600">
              MedicTrip makes it easy to find and book quality medical treatments abroad. We handle all the details so you can focus on your health.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="border rounded-lg p-5 hover:border-medictrip-500 hover:shadow-md transition-all">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-medictrip-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Your Safety is Our Priority</h3>
            <p className="text-gray-600 mb-4">
              MedicTrip only partners with internationally accredited hospitals and clinics. All healthcare providers in our network have been thoroughly vetted for quality, safety, and patient satisfaction.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white px-4 py-2 rounded border">
                <img src="https://via.placeholder.com/80x30?text=JCI" alt="JCI Accredited" className="h-7" />
              </div>
              <div className="bg-white px-4 py-2 rounded border">
                <img src="https://via.placeholder.com/80x30?text=ISO" alt="ISO Certified" className="h-7" />
              </div>
              <div className="bg-white px-4 py-2 rounded border">
                <img src="https://via.placeholder.com/80x30?text=TEMOS" alt="TEMOS Certified" className="h-7" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
          <button onClick={onClose} className="medictrip-button-secondary">
            Close
          </button>
          <button className="medictrip-button-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPopup;
