import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/account/auth.service';
import { UserProfileService } from '../user-profile.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  userInfo: any;

  constructor(private authservice: AuthService,
    private userProfileService: UserProfileService,
    private router: Router,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.authservice.getUserID().subscribe(user => {
      this.userInfo = user
    });

  }


  async onDeleteAccount() {
    const loading = await this.loadingCtrl.create({
      message: `Deleting Your Account`,
    });
    loading.present();
    let data={
      userID: this.userInfo.id 
    }    
    this.userProfileService.onDeleteAccount(data)
      .subscribe(accountDeleted => {
        loading.dismiss() 
        this.modalCtrl.dismiss();
        localStorage.clear();
        this.router.navigate(['/login']);
      });

  }

}
