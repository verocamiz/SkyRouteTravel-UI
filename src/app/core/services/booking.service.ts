import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api-config';
import { BookingRequest, BookingResponse } from '../models/booking-models';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);
  createBooking(request: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${API_URL}/Bookings`, request);
  }
}
