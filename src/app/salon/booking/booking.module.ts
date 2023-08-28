import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingPageRoutingModule } from './booking-routing.module';
import { BookingPage } from './booking.page';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [BookingPage , CartComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingPageRoutingModule,
    ReactiveFormsModule,
  ]
})
export class BookingPageModule {}
