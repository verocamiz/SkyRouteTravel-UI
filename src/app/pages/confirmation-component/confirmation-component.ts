import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Flight } from '../../core/models/flight-models';

@Component({
  selector: 'app-confirmation-component',
  imports: [RouterLink],
  templateUrl: './confirmation-component.html',
  styleUrl: './confirmation-component.css',
})
export class ConfirmationComponent {
  private router = inject(Router);

  bookingReference = '';
  flight: Flight | null = null;
  passengerCount = 1;

  constructor() {
    const state = history.state as {
      bookingReference?: string;
      flight?: Flight;
      passengerCount?: number;
    };

    this.bookingReference = state?.bookingReference ?? '';
    this.flight = state?.flight ?? null;
    this.passengerCount = state?.passengerCount ?? 1;

    if (!this.bookingReference) {
      this.router.navigate(['/']);
    }
  }
}
