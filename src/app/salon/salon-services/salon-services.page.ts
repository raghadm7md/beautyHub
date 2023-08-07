import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, ModalController } from '@ionic/angular';
import { SalonServiceService } from '../salon-service.service';
import { ISalon, IService } from '../salon.model';
import { ServiceDetailsComponent } from './service-details/service-details.component';


@Component({
  selector: 'app-salon-services',
  templateUrl: './salon-services.page.html',
  styleUrls: ['./salon-services.page.scss'],
})
export class SalonServicesPage implements OnInit {

  salonDetails:ISalon
  @ViewChild(IonModal) modal: IonModal;
  salonId: string | null;
  servicesList: IService[];
  constructor(private modalController: ModalController,
    private salonservice : SalonServiceService,
    private activeroute : ActivatedRoute ) { }

  ngOnInit(){
    this.salonId=this.activeroute.snapshot.paramMap.get('id')
    this._fetchsalonDetails()
  }

  async presentModal(serviceId:number) {
    const modal = await this.modalController.create({
      component: ServiceDetailsComponent,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      handle: true,
      componentProps: {
        serviceId: serviceId,
        salonId: this.salonId 
      }
    });
    await modal.present();
  }

  dismiss() {
    this.modal.dismiss(null, 'dismiss');
  }


  confirm() {
    const person = {
      name: 'Jorge Vergara',
      age: 36,
    };
    this.modal.dismiss(person, 'confirm');
  }

  private _fetchsalonDetails() {
    this.salonservice.fetchSalonDetails(Number(this.salonId)).subscribe(salonDetails=>{
      this.salonDetails=salonDetails
    },(error)=>{

    })

    this.salonservice.fetchSalonServices(Number(this.salonId)).subscribe(serviceList=>{
      this.servicesList=serviceList      
    })
  }
}
