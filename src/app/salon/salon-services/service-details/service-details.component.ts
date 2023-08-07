import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BookingService } from '../../booking/booking.service';
import { SalonServiceService } from '../../salon-service.service';
import { ISalon, IService, IStylist } from '../../salon.model';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit {

  @Input() serviceId: number;
  @Input() salonId: number
  serviceDetails: IService
  allPage: boolean = false
  salonDetails: ISalon;
  StylistList: IStylist[];
  isAlertOpen = false;
  public alertButtons = ['OK'];
  stylistForm: FormGroup;

  constructor(private router: Router, private modalCtrl: ModalController,
    private activatedroute: ActivatedRoute,
    private salonservice: SalonServiceService,
    private bookingservise : BookingService) { }

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.allPage = params['allPage']
        this.serviceId = params['serviceId']
        this.salonId = params['id']
      }
    })
    this._fetchServiceDetails()
    

    this.stylistForm = new FormGroup({
      stylistName: new FormControl(null, Validators.required),
    });
  }

  viewServiceDetailsPage() {
    this.router.navigate([`/salon-service/${this.salonId}/service-details`, { allPage: true, serviceId: this.serviceId }])
    this.modalCtrl.dismiss();
  }

  // setOpen(isOpen: boolean) {
  // if (!this.allPage){
  //   this.modalCtrl.dismiss();
  // }
  //   if (this.serviceDetails.isAvailable) {
  //     this.router.navigate(['/booking'])
  //   } else {
  //     this.isAlertOpen = isOpen;

  //   }
  // }

  selectStylist(event) {
    console.log('event', event.detail.value);
  }

  private _fetchServiceDetails() {
    this.salonservice.fetchServiceDetails(this.serviceId).subscribe(serviceDeatils => {
      this.serviceDetails = serviceDeatils
    })

    this.salonservice.fetchSalonDetails(Number(this.salonId)).subscribe(salonDetails => {
      this.salonDetails = salonDetails
    }, (error) => {

    })

    this.salonservice.fetchServiceStylist(Number(this.serviceId)).subscribe(StylistList => {
      this.StylistList = StylistList
    })
    
  }

  submitForm() {
    this.bookingservise.updateData(this.serviceDetails);
    console.log(this.stylistForm.value);
    this.router.navigate([`/booking/${this.serviceId}`])
  }

}
