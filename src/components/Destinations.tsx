
import { useState } from 'react';
import { ChevronRight, Plus, Map } from 'lucide-react';
import { Destination } from '@/types';

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Thailand',
    image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=800&q=80',
    description: 'Known for world-class hospitals, Thailand offers affordable medical treatments with high standards of care.',
    treatments: ['Dental', 'Cosmetic', 'Orthopedic'],
    hospitals: 48,
    packages: 120
  },
  {
    id: '2',
    name: 'India',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    description: 'India\'s advanced medical technology and skilled doctors offer treatments at a fraction of Western costs.',
    treatments: ['Cardiac', 'Orthopedic', 'Fertility'],
    hospitals: 72,
    packages: 185
  },
  {
    id: '3',
    name: 'Turkey',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'Turkey bridges Europe and Asia with modern facilities and expertise in hair transplants and dental work.',
    treatments: ['Hair Transplant', 'Dental', 'Eye Surgery'],
    hospitals: 36,
    packages: 94
  },
  {
    id: '4',
    name: 'Malaysia',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80',
    description: 'Malaysia offers sophisticated healthcare with English-speaking staff and tropical recovery environments.',
    treatments: ['Cardiology', 'Oncology', 'Fertility'],
    hospitals: 28,
    packages: 76
  }
];

const Destinations = () => {
  const [activeTab, setActiveTab] = useState<string>(destinations[0].id);

  return (
    <section id="destinations-section" className="py-20">
      <div className="medictrip-container">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="medictrip-badge-primary inline-block">Global Reach</span>
          <h2 className="text-3xl font-bold">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top destinations for medical tourism, each offering unique advantages in healthcare excellence, affordability, and recovery experience.
          </p>
        </div>
        
        {/* Destination Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {destinations.map((destination) => (
            <button
              key={destination.id}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === destination.id
                  ? 'bg-medictrip-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(destination.id)}
            >
              {destination.name}
            </button>
          ))}
        </div>
        
        {/* Destination Details */}
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
              activeTab === destination.id ? 'animate-fade-in' : 'hidden'
            }`}
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="medictrip-badge-primary mb-2 inline-block">{destination.name}</span>
                <div className="flex items-center text-white text-sm mt-2">
                  <Map className="w-4 h-4 mr-1" />
                  <span>{destination.hospitals} Hospitals</span>
                  <span className="mx-2">•</span>
                  <span>{destination.packages} Packages</span>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">
                Medical Tourism in {destination.name}
              </h3>
              
              <p className="text-gray-600">
                {destination.description}
              </p>
              
              {/* Treatment Types */}
              <div>
                <h4 className="text-lg font-medium mb-3">Popular Treatments</h4>
                <div className="flex flex-wrap gap-2">
                  {destination.treatments.map((treatment) => (
                    <span 
                      key={treatment} 
                      className="medictrip-badge-secondary"
                    >
                      {treatment}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Benefits */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Why Choose {destination.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Accredited Facilities',
                    'Affordable Pricing',
                    'Reduced Wait Times',
                    'Tourism Opportunities'
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start">
                      <div className="mt-1 mr-2 flex-shrink-0 w-4 h-4 rounded-full bg-medictrip-100 flex items-center justify-center">
                        <Plus className="w-3 h-3 text-medictrip-600" />
                      </div>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="medictrip-button-primary">
                Explore {destination.name} Packages
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Destinations;
