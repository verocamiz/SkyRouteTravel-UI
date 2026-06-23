import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { AIRPORTS } from '../../core/data/airports-data';
import { CabinClass } from '../../core/models/cabin-class.enum';
import { Flight, FlightSearchRequest, SortOption } from '../../core/models/flight-models';
import { FlightService } from '../../core/services/flight.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-component',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe],
  templateUrl: './search-component.html',
  styleUrl: './search-component.css',
})
export class SearchComponent {
  airports = AIRPORTS;
  private fb = inject(FormBuilder);
  private flightService = inject(FlightService);
  private router = inject(Router);

  cabinClasses = [
    { value: CabinClass.Economy, label: 'Economy' },
    { value: CabinClass.Business, label: 'Business' },
    { value: CabinClass.FirstClass, label: 'First Class' },
  ];

  searchForm = this.fb.nonNullable.group({
    originAirportCode: 'EZE',
    destinationAirportCode: 'COR',
    departureDate: '2026-07-06',
    passengers: [1, [Validators.min(1), Validators.max(9)]],
    cabinClass: CabinClass.Economy,
  },
{ validators: differentAirportsValidator },  );

  loading = false;
  hasSearched = false;
  error: string | null = null;
  flights: Flight[] = [];
  sortBy: SortOption = 'price-desc';
  sortedFlights: Flight[] = [];


  onSearch(): void {
     if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

     const form = this.searchForm.getRawValue();

    const request: FlightSearchRequest = {
      originAirportCode: form.originAirportCode,
      destinationAirportCode: form.destinationAirportCode,
      departureDate: `${form.departureDate}T00:00:00`,
      passengers: Number(form.passengers),
      cabinClass: Number(form.cabinClass),
    };

    this.loading = true;
    this.hasSearched = true;
    this.error = null;
    this.flights = [];

    this.flightService.searchFlights(request).subscribe({
      next: (results) => {
        this.flights = results;
        this.applySorting();
        this.loading = false;
      },
    error: () => {
      this.error = 'Error searching flights. Please try again.';
      this.loading = false;
    },
  });
  }

  private applySorting(): void {
  const list = [...this.flights];

  switch (this.sortBy) {
    case 'price-asc':
      this.sortedFlights = list.sort((a, b) => a.totalPrice - b.totalPrice);
      break;
    case 'price-desc':
      this.sortedFlights = list.sort((a, b) => b.totalPrice - a.totalPrice);
      break;
    case 'duration-asc':
      this.sortedFlights = list.sort((a, b) => this.toMinutes(a.duration) - this.toMinutes(b.duration));
      break;
    case 'departure-asc':
      this.sortedFlights = list.sort(
        (a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
      );
      break;
  }
}
  onSortChange(event: Event): void {
    this.sortBy = (event.target as HTMLSelectElement).value as SortOption;
    this.applySorting();
  }

  cabinLabel(cabin: CabinClass): string {
    switch (cabin) {
      case CabinClass.Economy:
        return 'Economy';
      case CabinClass.Business:
        return 'Business';
      case CabinClass.FirstClass:
        return 'First Class';
      default:
        return 'Unknown';
    }
  }

  private toMinutes(duration: string): number {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours * 60 + minutes;
  }

  selectFlight(flight: Flight): void {
  const passengerCount = Number(this.searchForm.getRawValue().passengers);
  this.router.navigate(['/booking'], {
    state: { flight, passengerCount },
  });
}


}

  const differentAirportsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const origin = control.get('originAirportCode')?.value;
  const destination = control.get('destinationAirportCode')?.value;
  if (origin && destination && origin === destination) {
    return { sameAirport: true };
  }
  return null;
}
