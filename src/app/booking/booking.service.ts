import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private dataSource = new BehaviorSubject<any>({});
  public data = this.dataSource.asObservable();
  private _baseURL = environment.baseURL+`Booking`;

  constructor(private _http: HttpClient) { }

  updateData(value: any) {
    this.dataSource.next(value);
  }

  createBooking(bookingData):Observable<{}>{
    return this._http.post<{}>(`${this._baseURL}`,bookingData)
  }

  fetchAvailableHours(serviceId : number , selectedDate : string):Observable<[]>{
    return this._http.post<[]>(`${this._baseURL}/AvailableBookingHours?Date=${selectedDate}&ServiceID=${serviceId}`, {})
  }

  fetchBookingHistory(userID:string){
    return this._http.post(`${this._baseURL}/HistoryBooking?UserID=${userID}`,{})
  }
  
}
