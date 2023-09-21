import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { lastValueFrom } from "rxjs";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  otp:number
  showInputNumber: boolean=true
  error: boolean;
  loading: boolean;
  errorMsg: string;
  loginForm: FormGroup;

  constructor(private router: Router, 
    private authService: AuthService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  
  async onSubmitNumber(){
    const loading = await this.loadingCtrl.create({
      message: `Sending the OTP to ${this.loginForm.value.email}`,
    });
    loading.present();
    this.loading = true;
    if (this.loginForm.invalid) {
      this.loading = false;   
      loading.dismiss()      
      return;
    } else {      
      try {                
        await lastValueFrom(
          this.authService.sendLoginOTP({emailAddress : this.loginForm.value.email})
        );
        this.showInputNumber = false
        loading.dismiss()
      } catch (err) {        
        this.error = true;
        this.errorMsg = "Something Went Wrong Try Again Later";
      }
    }
  }

  onOtpChange(code: string) {
    this.otp=Number(code)
  }

  async onLogin() {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating..',
    });
    loading.present();
    this.authService
    .loginUser({emailAddress : this.loginForm.value.email} , this.otp)
    .subscribe(
      (val) => {
        if (val.loggedIn) {
          this.router.navigate(['/tab-nav/salons'])
          loading.dismiss()
        }
      },
      (error) => {
        this.error = true;
        if (error.error.error.includes("given credentials")) {
          this.errorMsg = "invalid username or password";
        } else if (error.error.error.includes("No active")) {
          this.errorMsg =
            "Your Account Is Not Active Please Check Your Email";
        } else {
          this.errorMsg = "Something Went Wrong Try Again Later";
        }
        this.error = true;
      }
    );
    
  }


}
