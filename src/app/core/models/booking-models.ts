export interface BookingRequest {
  flightNumber: string;
  passengerCount: number;
  fullName: string;
  email: string;
  documentNumber: string;
}
export interface BookingResponse {
  bookingReference: string;
}
