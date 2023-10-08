import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal, LoadingController, ModalController } from '@ionic/angular';
import { SalonServiceService } from '../salon-service.service';
import { ISalon, IService } from '../salon.model';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';




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
  private searchSubject = new Subject<string>();
  private readonly debounceTimeMs = 1000;
  inputText: string = '';




  constructor(private modalController: ModalController,
    private salonservice : SalonServiceService,
    private activeroute : ActivatedRoute,
    private loadingCtrl: LoadingController ) { }

  ngOnInit(){
    this.salonId=this.activeroute.snapshot.paramMap.get('id')
    this._fetchsalonDetails()
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
      this.performSearch(searchValue);
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
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

  onSearch() {
    this.searchSubject.next(this.inputText);
  }

  async performSearch(searchValue: string) {
    let loading = await this.loadingCtrl.create();
    loading.present();
    this.salonservice.fetchServiceOnsearch(this.salonId,searchValue)
      .subscribe(searchResult => {
        this.servicesList = searchResult
        loading.dismiss()
      });

  }

  private _fetchsalonDetails() {
    this.salonservice.fetchSalonDetails(Number(this.salonId)).subscribe(salonDetails=>{
      this.salonDetails=salonDetails})

    this.salonservice.fetchSalonServices(Number(this.salonId)).subscribe(serviceList=>{
      this.servicesList=serviceList      
    })
  }
}
