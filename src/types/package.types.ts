/**
 * Package Management Types
 */

export interface Package {
  id: string;
  name: string;
  description: string;
  cityId: string;
  city?: City;
  duration: number; // in days
  nights: number;
  basePrice: number;
  maxPassengers: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  images: string[];
  isActive: boolean;
  isPremium: boolean;
  isPopular: boolean;
  badge?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface City {
  id: string;
  name: string;
  slug: string;
  state?: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePackageDto {
  name: string;
  description: string;
  cityId: string;
  duration: number;
  nights: number;
  basePrice: number;
  maxPassengers: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  images: string[];
  isPremium?: boolean;
  isPopular?: boolean;
  badge?: string;
}

export interface UpdatePackageDto {
  name?: string;
  description?: string;
  cityId?: string;
  duration?: number;
  nights?: number;
  basePrice?: number;
  maxPassengers?: number;
  highlights?: string[];
  inclusions?: string[];
  exclusions?: string[];
  itinerary?: ItineraryDay[];
  images?: string[];
  isPremium?: boolean;
  isPopular?: boolean;
  badge?: string;
  isActive?: boolean;
}

export interface PackageFilters {
  cityId?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  isPremium?: boolean;
  isPopular?: boolean;
  isActive?: boolean;
}

export interface OwnerPackageSubscription {
  id: string;
  ownerId: string;
  packageId: string;
  package: Package;
  status: "pending" | "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
  price: number;
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionDto {
  packageId: string;
  startDate: string;
  endDate: string;
}

export interface UpdateSubscriptionDto {
  status?: "pending" | "active" | "expired" | "cancelled";
  paymentStatus?: "pending" | "paid" | "failed";
  endDate?: string;
}
