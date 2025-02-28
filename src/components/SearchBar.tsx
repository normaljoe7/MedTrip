
import { useState, useEffect } from 'react';
import { Search, MapPin, Building, User, Calendar, ArrowRight } from 'lucide-react';
import { SearchFilters } from '@/types';

const SearchBar = () => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [availableHospitals, setAvailableHospitals] = useState<string[]>([
    'Bumrungrad International', 'Apollo Hospitals', 'Acibadem Healthcare', 
    'Bangkok Hospital', 'Fortis Healthcare', 'Gleneagles', 'Seoul National University Hospital',
    'Asan Medical Center', 'Manipal Hospitals', 'Medanta', 'Memorial Hospitals'
  ]);
  
  // Default hospitals by country
  const hospitalsByCountry: Record<string, string[]> = {
    'Thailand': ['Bumrungrad International', 'Bangkok Hospital', 'Samitivej Hospital'],
    'India': ['Apollo Hospitals', 'Fortis Healthcare', 'Manipal Hospitals', 'Medanta'],
    'Turkey': ['Acibadem Healthcare', 'Memorial Hospitals', 'Medical Park Hospitals'],
    'Malaysia': ['Gleneagles', 'Pantai Hospital', 'Prince Court Medical Centre'],
    'South Korea': ['Seoul National University Hospital', 'Asan Medical Center', 'Samsung Medical Center'],
    'Singapore': ['Mount Elizabeth Hospital', 'Raffles Hospital', 'Gleneagles Singapore']
  };

  useEffect(() => {
    // Update available hospitals when location changes
    if (filters.location && hospitalsByCountry[filters.location]) {
      setAvailableHospitals(hospitalsByCountry[filters.location]);
    } else {
      // If no location is selected, show all hospitals
      setAvailableHospitals(Object.values(hospitalsByCountry).flat());
    }
  }, [filters.location]);

  const handleSearch = () => {
    console.log('Search with filters:', filters);
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div id="search-section" className="medictrip-container -mt-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 animate-slide-in-right">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Treatment Type */}
          <div className="relative">
            <button 
              onClick={() => toggleSection('treatment')}
              className="medictrip-input text-left flex items-center justify-between w-full"
            >
              <div className="flex items-center">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <span className={filters.treatment ? 'text-gray-900' : 'text-gray-500'}>
                  {filters.treatment || 'Treatment or procedure'}
                </span>
              </div>
            </button>
            
            {activeSection === 'treatment' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border p-3 z-10">
                <div className="space-y-2">
                  {['Dental', 'Orthopedic', 'Cosmetic', 'Cardiac', 'Fertility', 'General'].map((treatment) => (
                    <div 
                      key={treatment}
                      className="cursor-pointer px-3 py-2 hover:bg-gray-50 rounded-lg"
                      onClick={() => {
                        setFilters({...filters, treatment});
                        setActiveSection(null);
                      }}
                    >
                      {treatment}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Location */}
          <div className="relative">
            <button 
              onClick={() => toggleSection('location')}
              className="medictrip-input text-left flex items-center justify-between w-full"
            >
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                <span className={filters.location ? 'text-gray-900' : 'text-gray-500'}>
                  {filters.location || 'Destination country'}
                </span>
              </div>
            </button>
            
            {activeSection === 'location' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border p-3 z-10">
                <div className="space-y-2">
                  {Object.keys(hospitalsByCountry).map((location) => (
                    <div 
                      key={location}
                      className="cursor-pointer px-3 py-2 hover:bg-gray-50 rounded-lg"
                      onClick={() => {
                        setFilters({...filters, location, hospital: undefined});
                        setActiveSection(null);
                      }}
                    >
                      {location}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Hospital */}
          <div className="relative">
            <button 
              onClick={() => toggleSection('hospital')}
              className="medictrip-input text-left flex items-center justify-between w-full"
            >
              <div className="flex items-center">
                <Building className="w-4 h-4 text-gray-400 mr-2" />
                <span className={filters.hospital ? 'text-gray-900' : 'text-gray-500'}>
                  {filters.hospital || 'Hospital or clinic'}
                </span>
              </div>
            </button>
            
            {activeSection === 'hospital' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border p-3 z-10">
                <div className="space-y-2">
                  {availableHospitals.map((hospital) => (
                    <div 
                      key={hospital}
                      className="cursor-pointer px-3 py-2 hover:bg-gray-50 rounded-lg"
                      onClick={() => {
                        setFilters({...filters, hospital});
                        setActiveSection(null);
                      }}
                    >
                      {hospital}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="medictrip-button-primary flex items-center justify-center"
          >
            <span>Find Treatment</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
