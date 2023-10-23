import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { lastValueFrom } from "rxjs";
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  otp: number
  showInputNumber: boolean = true
  registerForm: FormGroup
  submitted = false;
  errorMsg = "";
  error = false;
  successmsg = false;
  loading: boolean;


  constructor(private authservice: AuthService,
    private loadingCtrl: LoadingController,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }


  onOtpChange(code: string) {
    this.otp = Number(code)
  }

  async onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    } else {
      const loading = await this.loadingCtrl.create({
        message: 'Sending the OTP'
      });
      loading.present();
      try {
        await lastValueFrom(
          this.authservice.sendRegisterOTP({ emailAddress: this.registerForm.value.email })
        );
        this.showInputNumber = false
        loading.dismiss()
        this.loading = false;
      } catch (err) {
        this.error = true;
        this.errorMsg = "Something Went Wrong Try Again Later";
      }
    }
  }

  async sibmitOTP() {
    const loading = await this.loadingCtrl.create({
      message: 'Authenticating..'
    });
    loading.present();
    this.authservice.registerUser({ emailAddress: this.registerForm.value.email }, this.otp).subscribe(registerInfo => {
      this.router.navigate(["/login"]);
      loading.dismiss()
    }, (error) => {
      console.log(error);
    });

  }

}
