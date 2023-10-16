import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserProfileComponent } from '../profile/user-profile.component';
import { AccountSettingsComponent } from '../profile/account-settings/account-settings.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, UserProfileComponent, AccountSettingsComponent]
})
export class HomePageModule {}
