import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISalon, IService, IStylist } from './salon.model';

@Injectable({
  providedIn: 'root',
})
export class SalonServiceService {

  private _baseURL = environment.baseURL;

  constructor(private _http: HttpClient) {}

  fetchsalonList():Observable<ISalon[]>{
    return this._http.get<ISalon[]>(`${this._baseURL}Saloon?pageNumber=1&pageSize=1000`)
  }

  fetchSalonDetails(salonId:number):Observable<ISalon>{
    return this._http.get<ISalon>(`${this._baseURL}Saloon/${salonId}`)
  }

  fetchSalonServices(salonId:number):Observable<IService[]>{
    return this._http.get<IService[]>(`${this._baseURL}Service/Saloon/${salonId}`)
  }

  fetchServiceDetails(serviceId:number):Observable<IService>{
    return this._http.get<IService>(`${this._baseURL}Service/${serviceId}`) 
  }

  fetchServiceStylist(serviceId:number):Observable<IStylist[]>{
    return this._http.get<IStylist[]>(`${this._baseURL}Stylist/Service/${serviceId}`)
  }
}

