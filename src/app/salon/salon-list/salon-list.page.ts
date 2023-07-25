import { Component, OnInit } from '@angular/core';
import { SalonServiceService } from '../salon-service.service';
import { ISalon } from '../salon.model';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.page.html',
  styleUrls: ['./salon-list.page.scss'],
})
export class SalonListPage implements OnInit {
  salons:ISalon[]

  constructor(private _salonservice: SalonServiceService ) { }

  ngOnInit() {
    this._salonservice.fetchsalonList().subscribe(salonList=>{
    console.log(salonList)
    this.salons=salonList
    })
  }

}
