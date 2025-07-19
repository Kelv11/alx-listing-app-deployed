// Card component props
export interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
}

// Button component props
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
export interface Address {
  state: string;
  city: string;
  country: string;
}

export interface Offers {
  bed: string;
  shower: string;
  occupants: string;
}

export interface PropertyProps {
  id: string;
  name: string;
  address: Address;
  rating: number;
  category: string[];
  price: number;
  offers: Offers;
  image: string;
  discount: string;
}

// interfaces/index.ts

export interface AddressProps {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface PropertyProps {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[]; // Additional images for gallery
  rating: number;
  price: number;
  Address: AddressProps;
  category: string[];
  amenities?: string[];
  reviews?: ReviewProps[];
  host?: HostProps;
}

export interface ReviewProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface HostProps {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  responseRate: number;
  responseTime: string;
}

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
}
