import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

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

  onLogIn(){
    this.authservice.logIn();
    this.router.navigateByUrl('/destination/tabs/explore');
  }

}
