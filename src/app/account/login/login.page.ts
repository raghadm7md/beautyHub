import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
  constructor(private router: Router, 
    private authService: AuthService) { }

  ngOnInit() {
  }
  
  onSubmitNumber(){
    this.showInputNumber = false
  }

  onOtpChange(code: string) {
  }


  onLogin() {
    this.router.navigate(['/salons'])
    const credentials = { email: 'user@example.com', password: 'password' };
    this.authService.loginUser(credentials ,this.otp ).subscribe(arg => {},()=>{});

    this.authService
    .loginUser(credentials ,this.otp )
    .subscribe(
      (val) => {
        if (val.loggedIn) {
          
          this.router.navigate(['/salons'])

        }
      },
      (error) => {
        this.error = true;
        this.loading = false;
        if (error.error.error.includes("given credentials")) {
          this.errorMsg = "invalid username or password";
        } else if (error.error.error.includes("No active")) {
          this.errorMsg =
            "Your Account Is Not Active Please Check Your Email";
        } else {
          this.errorMsg = "Something Went Wrong Try Again Later";
        }
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    );
    
  }


}
