import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBook } from './booking.model';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  seviceID: string | null;
  data: any;
  bookingForm:FormGroup
  bookingData:IBook

  constructor(private activeroute : ActivatedRoute, 
    private bookingservise : BookingService) {
      this.bookingservise.data.subscribe(data => {
        this.data = data;
        console.log("from booking",data );
      });
    }

  ngOnInit() {
    this.bookingForm=new FormGroup({
      start_time: new FormControl(null, Validators.required),
      end_time: new FormControl(null, Validators.required),
      notes: new FormControl(null, Validators.required),
    })
    this.seviceID=this.activeroute.snapshot.paramMap.get('seviceID')
    console.log(this.seviceID);
  }

  setDate(event){
    console.log(event.detail.value);
    
  }
}
