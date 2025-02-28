
export interface Package {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  hospital: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  treatment: string;
  includes: string[];
  travelDate?: string;
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  treatments: string[];
  hospitals: number;
  packages: number;
}

export interface SearchFilters {
  treatment?: string;
  location?: string;
  hospital?: string;
  doctor?: string;
  dates?: {
    startDate: Date | null;
    endDate: Date | null;
  };
  budget?: {
    min: number;
    max: number;
  };
}

export interface CartItem extends Package {
  quantity: number;
}

export interface MedicalDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  url: string;
}
