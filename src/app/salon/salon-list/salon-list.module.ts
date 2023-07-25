import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalonListPageRoutingModule } from './salon-list-routing.module';

import { SalonListPage } from './salon-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalonListPageRoutingModule,
  ],
  declarations: [SalonListPage]
})
export class SalonListPageModule {}
