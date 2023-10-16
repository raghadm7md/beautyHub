import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../account/auth.service';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent  implements OnInit {
  userInfo: any;

  constructor(private router: Router,
   private modalCtrl: ModalController,
   private authservice: AuthService,
   private modalController: ModalController) { }

  ngOnInit() {
    this.authservice.getUserID().subscribe(user =>this.userInfo = user);
  }

  async presentModal() {
    this.modalCtrl.dismiss(); 
    const modal = await this.modalController.create({
      component: AccountSettingsComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.8,
      handle: true,
    });
    await modal.present();
  }

  logOut(){
    this.modalCtrl.dismiss();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
