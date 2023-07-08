import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalonServicesPage } from './salon-services.page';
import { ServiceDetailsComponent } from './service-details/service-details.component';

const routes: Routes = [
  {
    path: '',
    component: SalonServicesPage
  },
  {
    path: 'service-details',
    component: ServiceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalonServicesPageRoutingModule {}
