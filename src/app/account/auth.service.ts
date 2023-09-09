import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of, switchMap } from "rxjs";
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseURL = environment.baseURL + `Auth/`;
  private _authenticated: boolean = false;

  constructor(private http: HttpClient,
    private router: Router) { }

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

  sendRegisterOTP(credentials: { emailAddress: string }): Observable<any> {
    return this.http.post(`${this._baseURL}SendOtpRegister`, credentials)
  }

  registerUser(credentials: { emailAddress: string }, OTP: number): Observable<any> {
    return this.http.post(`${this._baseURL}Register?otp=${OTP}`, credentials)
  }

  sendLoginOTP(credentials: { emailAddress: string }): Observable<any> {
    return this.http.post(`${this._baseURL}SendOtpLogin`, credentials)
  }

  loginUser(credentials: { emailAddress: string }, OTP: number): Observable<any> {
    return this.http.post(`${this._baseURL}Login?otp=${OTP}`, credentials).pipe(
      switchMap((response) => {
        this.accessToken = response['message'].jwtToken;
        // const decoded: JWTDeCode = jwt_decode(this.accessToken)
        // console.log(decoded);
        // console.log(decoded.id);
        // this.userID = decoded.id
        // console.log(this.userID);
        
        this._authenticated = true;
        return of({
          loggedIn: true,

        });
      })
    );
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

  getUserID(){
    // if (this.isTokenValid()){
     return of(jwt_decode(this.accessToken))
    // }
  }
}

interface IToken {
  name: string,
  ownerStrategyName: string,
  createdAt: string,
  value: string
}

export interface JWTDeCode {
  email: string,
  name: string,
  id: string,
  role: string,
  exp: number,
  iss: string,
  aud: string
}