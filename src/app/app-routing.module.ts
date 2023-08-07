import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./account/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'salons',
    loadChildren: () => import('./salon/salon-list/salon-list.module').then( m => m.SalonListPageModule)
  },
  {
    path: 'salon-service/:id',
    loadChildren: () => import('./salon/salon-services/salon-services.module').then( m => m.SalonServicesPageModule)
  },
  {
    path: 'salon-services',
    loadChildren: () => import('./salon/salon-services/salon-services.module').then( m => m.SalonServicesPageModule)
  },
  {
    path: 'booking/:seviceID',
    loadChildren: () => import('./salon/booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
