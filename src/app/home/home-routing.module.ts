import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePage,
  // }
  {
    path: 'tab-nav',
    component: HomePage,
    children: [
      {
        path: 'salons',
        loadChildren: () => import('../salon/salon-list/salon-list.module').then( m => m.SalonListPageModule)
      },
      {
        path: 'booking',
    loadChildren: () => import('../booking/booking.module').then( m => m.BookingPageModule)
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tab-nav/salons',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
