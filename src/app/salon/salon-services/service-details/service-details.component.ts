import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BookingService } from 'src/app/booking/booking.service';
import { SalonServiceService } from '../../salon-service.service';
import { ISalon, IService, IStylist } from '../../salon.model';
import { concatMap } from "rxjs";

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
})
export class ServiceDetailsComponent implements OnInit {

  @Input() serviceId: number;
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
    private bookingservise: BookingService) { }

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.allPage = params['allPage']
        this.serviceId = params['serviceId']
      }
    })
    this._fetchServiceDetails()
    this.stylistForm = new FormGroup({
      stylistName: new FormControl(null, Validators.required),
    });
  }

  viewServiceDetailsPage() {
    this.router.navigate([`/tab-nav/salons/service-details`, { allPage: true, serviceId: this.serviceId }])
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



  private _fetchServiceDetails() {
    this.salonservice.fetchServiceDetails(this.serviceId)
      .pipe(
        concatMap((serviceDeatils) => {
          this.serviceDetails = serviceDeatils
          return this.salonservice.fetchSalonDetails(serviceDeatils.saloonId);
        })
      )
      .subscribe((salonDetails) => {
        this.salonDetails = salonDetails
      });
  }

  bookingService() {
    this.bookingservise.updateData(this.serviceDetails);
    this.router.navigate([`/tab-nav/booking/${this.serviceId}`])
  }

}
