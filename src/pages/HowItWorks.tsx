
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Calendar, CreditCard, Plane, Building, MessageCircle, ArrowRight, CheckCircle, ShieldCheck, Award, BadgeCheck, Shield } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        {/* Hero Section */}
        <section className="py-12 bg-medictrip-50">
          <div className="medictrip-container">
            <div className="max-w-3xl mx-auto text-center">
              <span className="medictrip-badge-primary mb-4">How It Works</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your Journey to Better Health Made Simple
              </h1>
              <p className="text-lg text-gray-600">
                MedicTrip makes it easy to find and book quality medical treatments abroad. 
                We handle all the details so you can focus on your health.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="medictrip-container">
            <div className="max-w-5xl mx-auto">
              <div className="space-y-16">
                {[
                  {
                    icon: Search,
                    title: "1. Find Your Treatment",
                    description: "Search for your desired medical procedure and discover top-rated clinics and hospitals worldwide.",
                    features: [
                      "Compare prices across multiple destinations",
                      "Read verified patient reviews and testimonials",
                      "View detailed provider profiles and credentials"
                    ],
                    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                  },
                  {
                    icon: Calendar,
                    title: "2. Get a Free Quote",
                    description: "Receive personalized quotes based on your medical needs, including treatment, accommodation, and travel costs.",
                    features: [
                      "No-obligation cost estimates",
                      "Transparent pricing with no hidden fees",
                      "Multiple options to fit your budget"
                    ],
                    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
                  },
                  {
                    icon: MessageCircle,
                    title: "3. Consult & Plan",
                    description: "Connect with healthcare providers for virtual consultations and work with our team to plan your trip.",
                    features: [
                      "Pre-treatment virtual consultations with doctors",
                      "Personalized treatment plan based on your needs",
                      "Dedicated care coordinator for support throughout the process"
                    ],
                    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                  },
                  {
                    icon: CreditCard,
                    title: "4. Book & Pay Securely",
                    description: "Reserve your treatment and travel arrangements with our secure payment system.",
                    features: [
                      "Flexible payment options including installment plans",
                      "Secure encryption for all financial transactions",
                      "Transparent cancellation and refund policies"
                    ],
                    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                  },
                  {
                    icon: Plane,
                    title: "5. Travel with Confidence",
                    description: "Receive detailed pre-trip instructions and enjoy our airport pickup service upon arrival.",
                    features: [
                      "Comprehensive pre-travel information package",
                      "Airport pickup and transportation to your accommodation",
                      "Local SIM card and emergency contact information"
                    ],
                    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80"
                  },
                  {
                    icon: Building,
                    title: "6. Treatment & Recovery",
                    description: "Get your procedure done by qualified professionals with our support available 24/7 during your stay.",
                    features: [
                      "Accompaniment to your medical appointments",
                      "Translation services during doctor consultations",
                      "Comfortable recovery accommodations with necessary amenities"
                    ],
                    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                  },
                ].map((step, index) => (
                  <div key={index} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                    <div className="w-full md:w-1/2">
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-80 object-cover rounded-xl shadow-sm"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mr-4">
                          <step.icon className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold">{step.title}</h2>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-medictrip-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Safety Section */}
        <section className="py-16 bg-medictrip-50">
          <div className="medictrip-container">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your Safety is Our Priority</h2>
              <p className="text-lg text-gray-600">
                MedicTrip only partners with internationally accredited hospitals and clinics. All healthcare providers in our network have been thoroughly vetted for quality, safety, and patient satisfaction.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              <div className="bg-white px-6 py-8 rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-center">JCI Accredited</h3>
              </div>
              <div className="bg-white px-6 py-8 rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-center">ISO Certified</h3>
              </div>
              <div className="bg-white px-6 py-8 rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mb-4">
                  <BadgeCheck className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-center">TEMOS Certified</h3>
              </div>
              <div className="bg-white px-6 py-8 rounded-lg shadow-sm flex flex-col items-center">
                <div className="w-16 h-16 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-center">MTQUA Certified</h3>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="medictrip-container">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Ready to Start Your Medical Journey?</h2>
                  <p className="text-gray-600 mb-6 md:mb-0">
                    Find the best treatment options tailored to your needs and budget.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/" className="medictrip-button-primary flex items-center justify-center">
                    Find Treatments
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                  <a href="/contact-us" className="medictrip-button-secondary flex items-center justify-center">
                    Talk to an Expert
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
