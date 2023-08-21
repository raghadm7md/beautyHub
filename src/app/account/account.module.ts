import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgOtpInputModule } from 'ng-otp-input';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ RegisterComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgOtpInputModule,
    HttpClientModule
  ]
})
export class AccountModule { }
