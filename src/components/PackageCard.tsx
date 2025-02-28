
import { CalendarClock, MapPin, Building, Star, PlaneTakeoff, Bed, CreditCard, ShieldCheck, ShoppingCart } from 'lucide-react';
import { Package } from '@/types';

interface PackageCardProps {
  packageData: Package;
  featured?: boolean;
  onAddToCart?: () => void;
  onView?: () => void;
}

const PackageCard = ({ packageData, featured = false, onAddToCart, onView }: PackageCardProps) => {
  const { 
    id, 
    title, 
    description, 
    image, 
    location, 
    hospital, 
    price, 
    rating, 
    reviewCount, 
    duration, 
    treatment,
    includes 
  } = packageData;

  return (
    <div className={`medictrip-card group ${featured ? 'border-medictrip-300' : ''}`}>
      {/* Card Image */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transition duration-500 group-hover:scale-105"
        />
        
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-medictrip-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">
              Featured
            </span>
          </div>
        )}

        <div className="absolute top-4 right-4">
          <span className="medictrip-badge-primary">
            {treatment}
          </span>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-5 space-y-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
            <span className="ml-1 text-xs text-gray-500">({reviewCount})</span>
          </div>
        </div>
        
        {/* Location and Hospital */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Building className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{hospital}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CalendarClock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
        
        {/* Includes */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Package includes:</p>
          <div className="grid grid-cols-2 gap-2">
            {includes.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-medictrip-500 rounded-full mr-2"></div>
                <span className="text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-medictrip-700">${price.toLocaleString()}</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={onAddToCart} 
              className="medictrip-button-secondary text-sm py-2 px-3 flex items-center"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add
            </button>
            <button 
              onClick={onView}
              className="medictrip-button-primary text-sm py-2 px-4"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
