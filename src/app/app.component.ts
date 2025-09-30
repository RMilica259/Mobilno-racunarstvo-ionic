import { Component } from '@angular/core';
import { AuthService } from './auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logOut();
    this.router.navigateByUrl('/log-in'); 
  }
}
