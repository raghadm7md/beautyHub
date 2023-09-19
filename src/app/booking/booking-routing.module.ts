import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

import { BookingPage } from './booking.page';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: 'history',
    component: BookingHistoryComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: ':seviceID',
    component: BookingPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingPageRoutingModule { }
