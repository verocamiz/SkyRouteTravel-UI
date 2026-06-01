import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search-component/search-component';
import { BookingComponent } from './pages/booking-component/booking-component';
import { ConfirmationComponent } from './pages/confirmation-component/confirmation-component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'booking', component: BookingComponent },
   { path: 'confirmation', component: ConfirmationComponent },
];
