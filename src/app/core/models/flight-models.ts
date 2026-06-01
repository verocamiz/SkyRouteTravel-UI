import { CabinClass } from './cabin-class.enum';

export interface FlightSearchRequest {
  originAirportCode: string;
  destinationAirportCode: string;
  departureDate: string;
  passengers: number;
  cabinClass: CabinClass;
}

export interface Flight {
  provider: string;
  flightNumber: string;
  originAirportCode: string;
  destinationAirportCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  cabinClass: CabinClass;
  pricePerPassenger: number;
  totalPrice: number;
}

export type SortOption = 'price-asc' | 'price-desc' | 'duration-asc' | 'departure-asc';
