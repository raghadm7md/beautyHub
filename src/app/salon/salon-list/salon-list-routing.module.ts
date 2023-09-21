import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalonServicesPage } from '../salon-services/salon-services.page';
import { ServiceDetailsComponent } from '../salon-services/service-details/service-details.component';

import { SalonListPage } from './salon-list.page';

const routes: Routes = [
  {
    path: '',
    component: SalonListPage
  },
  {
    path: 'service/:id',
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
export class SalonListPageRoutingModule {}
