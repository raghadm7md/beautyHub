import { Component, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { UserProfileComponent } from '../profile/user-profile.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonModal) modal: IonModal;
  
  constructor(private modalController: ModalController) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: UserProfileComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.8,
      handle: true,
      // componentProps: {
      //   serviceId: serviceId,
      //   salonId: this.salonId 
      // }
    });
    await modal.present();
  }

  dismiss() {
    this.modal.dismiss(null, 'dismiss');
  }
}
