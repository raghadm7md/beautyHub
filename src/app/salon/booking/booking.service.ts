import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private dataSource = new BehaviorSubject<any>({});
  public data = this.dataSource.asObservable();

  constructor() { }
  

  updateData(value: any) {
    this.dataSource.next(value);
  }
}
