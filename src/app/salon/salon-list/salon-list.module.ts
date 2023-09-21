import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalonListPageRoutingModule } from './salon-list-routing.module';

import { SalonListPage } from './salon-list.page';
import { ServiceDetailsComponent } from '../salon-services/service-details/service-details.component';
import { SalonServicesPage } from '../salon-services/salon-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalonListPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [SalonListPage , SalonServicesPage , ServiceDetailsComponent]
})
export class SalonListPageModule {}
