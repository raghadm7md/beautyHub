import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private _baseURL = environment.baseURL;
  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  
  constructor(private _http: HttpClient) { }

  onDeleteAccount(accountInfo){
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: accountInfo
    };
    return this._http.delete(`${this._baseURL}Auth/DeleteUser`, options)
  }
}
