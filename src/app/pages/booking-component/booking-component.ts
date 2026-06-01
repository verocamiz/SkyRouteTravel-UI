
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AIRPORTS, isInternationalRoute } from '../../core/data/airports-data';
import { CabinClass } from '../../core/models/cabin-class.enum';
import { Flight } from '../../core/models/flight-models';
import { BookingService } from '../../core/services/booking.service';
import { BookingRequest } from '../../core/models/booking-models';
import { nationalIdValidator, passportValidator } from '../../shared/validators/document.validators';

@Component({
  selector: 'app-booking-component',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './booking-component.html',
  styleUrl: './booking-component.css',
})
export class BookingComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  flight: Flight | null = null;
  passengerCount = 1;
  loading = false;
  error: string | null = null;
  private bookingService = inject(BookingService);

  constructor() {
  const state = history.state as { flight?: Flight; passengerCount?: number };
  this.flight = state?.flight ?? null;
  this.passengerCount = state?.passengerCount ?? 1;
  if (!this.flight) {
    this.router.navigate(['/']);
    return;
  }

  this.bookingForm.controls.documentNumber.setValidators([
    Validators.required,
    this.isInternational ? passportValidator() : nationalIdValidator(),
  ]);
}

bookingForm = this.fb.nonNullable.group({
  fullName: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  documentNumber: ['', Validators.required],
});

onConfirm(): void {
  if (this.bookingForm.invalid) {
    this.bookingForm.markAllAsTouched();
    return;
  }

 if (!this.flight) {
    this.router.navigate(['/']);
    return;
  }

  const form = this.bookingForm.getRawValue();
  const request: BookingRequest = {
    flightNumber: this.flight.flightNumber,
    passengerCount: this.passengerCount,
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    documentNumber: form.documentNumber.trim(),
  };
  this.loading = true;
  this.error = null;
  this.bookingService.createBooking(request).subscribe({
    next: (response) => {
      this.loading = false;
      this.router.navigate(['/confirmation'], {
        state: {
          bookingReference: response.bookingReference,
          flight: this.flight,
          passengerCount: this.passengerCount,
        },
      });
    },
    error: () => {
      this.error = 'Unable to complete booking. Please try again.';
      this.loading = false;
    },
  });
}

cabinLabel(cabin: CabinClass): string {
  switch (cabin) {
    case CabinClass.Economy: return 'Economy';
    case CabinClass.Business: return 'Business';
    case CabinClass.FirstClass: return 'First Class';
    default: return 'Unknown';
  }
}
getCity(code: string): string {
  return AIRPORTS.find(a => a.code === code)?.city ?? code;
}

get isInternational(): boolean {
  if (!this.flight) return false;
  return isInternationalRoute(
    this.flight.originAirportCode,
    this.flight.destinationAirportCode,
  );
}
get documentLabel(): string {
  return this.isInternational ? 'Passport Number' : 'National ID';
}

}
