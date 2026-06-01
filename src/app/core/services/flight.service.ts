import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { API_URL } from '../config/api-config';
import { Flight, FlightSearchRequest } from '../models/flight-models';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private readonly http = inject(HttpClient);

  searchFlights(request: FlightSearchRequest): Observable<Flight[]> {
    return this.http
      .post<Flight[]>(`${API_URL}/Flights/search`, request, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<Flight[]>) =>
          response.status === 204 ? [] : (response.body ?? []),
        ),
      );
  }
}
