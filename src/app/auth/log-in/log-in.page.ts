import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: false
})
export class LogInPage implements OnInit {

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogIn(logInForm: NgForm){
    console.log(logInForm);
    if(logInForm.valid){
      this.authservice.logIn(logInForm.value).subscribe(resData => {
        console.log('Prijava uspesna');
        console.log(resData);
        this.router.navigateByUrl('/destination/tabs/explore');
      });
    }
  }

}
