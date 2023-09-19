import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/account/auth.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss'],
})
export class BookingHistoryComponent  implements OnInit {
  data: any;
  userId: any;
  bookingList:any
  bookingHistoryList: any;

  constructor(private activeroute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private bookingservise: BookingService,
    private authservice : AuthService) { }

  ngOnInit(){
    this.authservice.getUserID().subscribe(user => {this.userId = user
      this.bookingservise.fetchBookingHistory(this.userId.id).subscribe(bookingHistoryList=>this.bookingHistoryList=bookingHistoryList['data']);
    });
    

  }

}
