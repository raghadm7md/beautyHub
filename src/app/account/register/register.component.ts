import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from "rxjs";
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  otp:number
  showInputNumber: boolean=true
  registerForm : FormGroup
  submitted = false;
  errorMsg = "";
  error = false;
  successmsg = false;
  loading: boolean;


  constructor(private authservice : AuthService) { }

  ngOnInit(){
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onOtpChange(code: string) {
    this.otp=Number(code)
  }

  async onSubmit() {
    this.loading = true;
    this.submitted = true;
    // let registrData = this._setFormValue(this.signupForm);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.loading = false;      
      return;
    } else {
      try {        
        const result = await lastValueFrom(
          this.authservice.sendRegisterOTP({email : this.registerForm.value.email})
        );
        console.log(result);
        this.showInputNumber = false
        // this.router.navigate([], { queryParams: { corp_Success: true } });
        // this.modalService.open(this.content, { centered: true });
        this.loading = false;
      } catch (err) {
        console.log(err);
        
        // this.error = true;
        // this.loading = false;
        // if (err.error.error.includes("username")) {
        //   this.errorMsg = "Phone Number Is Already Exist";
        // } else if (err.error.error.includes("email")) {
        //   this.errorMsg = "Email Is Already Exist";
        // } else if (err.error.error.includes("corporate")) {
        //   this.errorMsg = "Corporate Already Exist ";
        // } else {
        //   this.errorMsg = "Something Went Wrong Try Again Later";
        // }
      }
    }
  }

  sibmitOTP(){
    this.authservice.registerUser({email : this.registerForm.value.email},this.otp).subscribe(registerInfo => {

    },(error)=>{
      console.log(error);
    });
    
  }
  // onClose() {
  //   this.router.navigate(["account/login"]);
  //   this.modalService.dismissAll();
  // }
}
