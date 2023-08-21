import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of, switchMap } from "rxjs";
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseURL = environment.baseURL+`Auth/`;
  private _authenticated: boolean = false;
  private _userRole: any;

  constructor(private http: HttpClient) { }

  /**
   * @param  {string} token
   */
  set accessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }
  /**
   * @param  {} return 'accessToken'
   */
  get accessToken() {
    return localStorage.getItem("accessToken") ?? "";
  }

  sendRegisterOTP(credentials: { email: string}): Observable<any>{
    return this.http.post(`${this._baseURL}SendOtpRegister`, credentials)
  }

  registerUser(credentials: { email: string} , OTP : number): Observable<any>{
    return this.http.post(`${this._baseURL}Register?otp=${OTP}`, credentials)
  }

  sendLoginOTP(credentials: { email: string}): Observable<any>{
    return this.http.post(`${this._baseURL}SendOtpLogin`, credentials)
  }

  loginUser(credentials: { email: string} , OTP:number): Observable<any> {
    return this.http.post(`${this._baseURL}Login?otp=${OTP}`, credentials).pipe(
      switchMap((response) => {        
        this.accessToken = response['access'];
        this._authenticated = true;
        return of({
          loggedIn: true,
        });
      })
    );
  }

  logingOTP(){

  }


  logoutUser(){
    // Implement user logout logic here
    // Return a promise that resolves when logout is successful or rejects with an error message
  }
}

interface IToken {
  refresh: string;
  access: string;
}