import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: false
})
export class MyProfilePage implements OnInit, OnDestroy {
  user: User | null = null;
  private userSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService['\_user'].subscribe((u) => {
      this.user = u;
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
