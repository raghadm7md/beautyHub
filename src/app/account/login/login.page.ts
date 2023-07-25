import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showInputNumber: boolean=true
  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  onSubmitNumber(){
    this.showInputNumber = false
  }

  onOtpChange(code: string) {
  }


  onLogin() {
    this.router.navigate(['/salons'])
  }


}
