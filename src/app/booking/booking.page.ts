import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService, JWTDeCode } from 'src/app/account/auth.service';
import { SalonServiceService } from '../salon/salon-service.service';
import { IBook } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  seviceID: number;
  data: any;
  bookingForm: FormGroup
  bookingData: IBook
  Date = new Date();
  selectedDate: string;
  pipe = new DatePipe("en-US");
  loading: HTMLIonLoadingElement;
  showAvailableTimes: boolean;
  availableTimeList = [];
  selectedTime: any;
  userId: any;
  formatedTime: string;
  StylistList: any;
  stylist: any;

  constructor(private activeroute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private bookingservise: BookingService,
    private salonservice: SalonServiceService,
    private authservice: AuthService,
    private alertController: AlertController,
    private router: Router) {
      this.seviceID=Number(this.activeroute.snapshot.paramMap.get('seviceID'))
    this.bookingservise.data.subscribe(data => {
      if (Object.keys(data).length === 0){
        this.router.navigate([`/tab-nav/salons/service-details`, { allPage: true, serviceId: this.seviceID }])
      }
      this.data = data;  
    });
  }

  ngOnInit() {
    this.bookingForm = new FormGroup({
      start_time: new FormControl(null, Validators.required),
      end_time: new FormControl(null, Validators.required),
      notes: new FormControl(null, Validators.required),
    })
    this.seviceID = Number(this.activeroute.snapshot.paramMap.get('seviceID'))
    this.authservice.getUserID().subscribe(user => this.userId = user);
    this.salonservice.fetchServiceStylist(this.seviceID).subscribe(StylistList => {
      this.StylistList = StylistList
    })
  }

  onSelectTime(time) {
    this.selectedTime = time
    // Time in 24-hour format
    var time24 = time;
    // Split the time into hour and minute components
    var timeComponents = time24.split(':');
    var hour24 = parseInt(timeComponents[0]);
    var minute = timeComponents[1];
    // Convert the hour to 12-hour format
    var hour12 = (hour24 % 12) || 12;
    // Determine if it is AM or PM
    var period = (hour24 < 12) ? 'AM' : 'PM';
    // Build the converted time string
    var time12 = hour12 + ':' + minute + ' ' + period;
    // Print the converted time
    this.formatedTime = time12
  }

  async setDate(event) {
    this.loading = await this.loadingCtrl.create({
      message: 'Getting available times',
    });
    this.loading.present()
    const now = new Date(event.detail.value);
    this.selectedDate = this.pipe.transform(now, 'dd/MM/yyyy') || '';
    this.bookingservise.fetchAvailableHours(this.seviceID, this.selectedDate).subscribe(availableTimes => {
      this.showAvailableTimes = true
      this.availableTimeList = availableTimes['data']
      this.loading.dismiss()
    });
  }
  selectStylist(event) {
    this.stylist = event.target.value
  }

  async onBookingService() {
    let bookingData = {
      userId: this.userId.id,
      salonId: this.data.saloonId,
      note: "",
      isPaid: true,
      bookingServiceDTO: [
        {
          serviceId: this.data.serviceId,
          startTime: this.selectedDate + " " + this.formatedTime,
          stylistId: this.stylist
        }
      ]
    }
    const loading = await this.loadingCtrl.create({
      message: 'Booking..',
    });
    loading.present();
    this.bookingservise.createBooking(bookingData).subscribe(bookingData => {
      this.router.navigate(['/tab-nav/booking'])
      loading.dismiss()
    },async (error)=>{
      loading.dismiss()      
      const alert = await this.alertController.create({
        header: 'Alert',
        message: error.error.message,
        buttons: ['OK'],
      });
      await alert.present();
    }
    );


  }

}
