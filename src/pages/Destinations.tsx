
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Globe, Plane, Hotel, Star, Calendar, ArrowRight, Building } from 'lucide-react';

const Destinations = () => {
  const popularDestinations = [
    {
      id: '1',
      name: 'Bangkok, Thailand',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?auto=format&fit=crop&w=800&q=80',
      treatments: ['Dental', 'Cosmetic Surgery', 'Medical Checkups'],
      hospitals: 23,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Mumbai, India',
      image: 'https://images.unsplash.com/photo-1566552881530-02894747f605?auto=format&fit=crop&w=800&q=80',
      treatments: ['Orthopedic', 'Cardiac', 'Ayurveda'],
      hospitals: 31,
      rating: 4.6
    },
    {
      id: '3',
      name: 'Istanbul, Turkey',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      treatments: ['Hair Transplant', 'Dental', 'Eye Surgery'],
      hospitals: 19,
      rating: 4.7
    },
    {
      id: '4',
      name: 'Kuala Lumpur, Malaysia',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
      treatments: ['Fertility', 'Cosmetic Surgery', 'Cardiology'],
      hospitals: 15,
      rating: 4.5
    },
    {
      id: '5',
      name: 'Seoul, South Korea',
      image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80',
      treatments: ['Cosmetic Surgery', 'Dermatology', 'Dentistry'],
      hospitals: 27,
      rating: 4.9
    },
    {
      id: '6',
      name: 'Mexico City, Mexico',
      image: 'https://images.unsplash.com/photo-1518659526054-190340b15ae0?auto=format&fit=crop&w=800&q=80',
      treatments: ['Dental', 'Weight Loss', 'Orthopedic'],
      hospitals: 18,
      rating: 4.5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pageload-fade-in">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        {/* Hero Section */}
        <section className="py-12 bg-medictrip-50">
          <div className="medictrip-container">
            <div className="max-w-3xl mx-auto text-center">
              <span className="medictrip-badge-primary mb-4">Medical Tourism Destinations</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                World-Class Healthcare in Beautiful Destinations
              </h1>
              <p className="text-lg text-gray-600">
                Discover top medical tourism destinations offering high-quality healthcare
                combined with unique travel experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16">
          <div className="medictrip-container">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Popular Destinations</h2>
                <p className="text-gray-600">
                  Explore our most sought-after medical tourism destinations
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="medictrip-button-secondary flex items-center">
                  View All Destinations
                  <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularDestinations.map((destination) => (
                <div key={destination.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="relative h-56">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <MapPin className="w-5 h-5 text-medictrip-600 mr-2" />
                      <h3 className="text-xl font-semibold">{destination.name}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Building className="w-4 h-4 mr-1" />
                      <span>{destination.hospitals} Accredited Hospitals</span>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Popular Treatments:</p>
                      <div className="flex flex-wrap gap-2">
                        {destination.treatments.map((treatment, index) => (
                          <span key={index} className="medictrip-badge-secondary text-xs">
                            {treatment}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a href="#" className="medictrip-button-primary w-full flex items-center justify-center mt-2">
                      Explore Treatments
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose These Destinations */}
        <section className="py-16 bg-gray-50">
          <div className="medictrip-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose These Destinations?</h2>
              <p className="text-gray-600">
                Our featured destinations offer the perfect combination of quality healthcare, affordability, and travel experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Globe,
                  title: "International Accreditation",
                  description: "Hospitals and clinics with JCI, ISO, and other international quality certifications."
                },
                {
                  icon: Plane,
                  title: "Easy Travel Access",
                  description: "Well-connected destinations with international airports and simplified visa processes."
                },
                {
                  icon: Hotel,
                  title: "Comfortable Recovery",
                  description: "Quality accommodations and facilities specifically designed for post-treatment recovery."
                },
                {
                  icon: Calendar,
                  title: "No Long Wait Times",
                  description: "Schedule your procedure at your convenience without lengthy waiting periods."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm text-center">
                  <div className="w-16 h-16 bg-medictrip-100 text-medictrip-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="medictrip-container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Patient Experiences</h2>
              <p className="text-gray-600">
                Hear from patients who have traveled to these destinations for medical treatments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "My dental work in Bangkok was amazing! The clinic was more advanced than anything I've seen at home, and I saved over 70% on the cost.",
                  name: "Sarah Thompson",
                  from: "Canada",
                  treatment: "Dental Implants",
                  destination: "Bangkok, Thailand",
                  image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                },
                {
                  quote: "The cardiac specialists in Mumbai were world-class. My heart valve replacement surgery was successful, and the care I received was exceptional.",
                  name: "Robert Johnson",
                  from: "United Kingdom",
                  treatment: "Cardiac Surgery",
                  destination: "Mumbai, India",
                  image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80"
                },
                {
                  quote: "My hair transplant in Istanbul gave me back my confidence. The results are so natural, and the price was a fraction of what I would have paid at home.",
                  name: "Michael Chen",
                  from: "United States",
                  treatment: "Hair Transplant",
                  destination: "Istanbul, Turkey",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.from}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="text-sm text-gray-500">
                    <p>
                      <span className="font-medium">Treatment:</span> {testimonial.treatment}
                    </p>
                    <p>
                      <span className="font-medium">Destination:</span> {testimonial.destination}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-medictrip-600 text-white">
          <div className="medictrip-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Explore Your Treatment Options?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Find the perfect destination for your healthcare needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/" className="medictrip-button-primary-white">
                  Find Treatments
                </a>
                <a href="/contact-us" className="medictrip-button-secondary-white">
                  Get Expert Advice
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;
