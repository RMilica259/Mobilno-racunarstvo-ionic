import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: false
})
export class LogInPage implements OnInit {
  isLoading = false;

  constructor(private authservice: AuthService, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  onLogIn(logInForm: NgForm){
    this.isLoading = true;
    /*
    this.loadingController
      .create({message: "Log in ..."})
      .then((loadingEl: HTMLIonLoadingElement) => {
        loadingEl.present();
    */
      if(logInForm.valid){
        this.authservice.logIn(logInForm.value).subscribe(resData => {
          console.log('Prijava uspesna');
          console.log(resData);
          this.isLoading = false;
          /*loadingEl.dismiss();*/
          this.router.navigateByUrl('/destination/tabs/explore');
        });
      }
    //});
  }

}
