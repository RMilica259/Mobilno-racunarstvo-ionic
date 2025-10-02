import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {

  registerForm!: FormGroup;

  constructor(private authService: AuthService, private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('Marija', Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(7)])
    });
  }

  onRegister(){
    this.loadingController
      .create({message: "Register ..."})
      .then((loadingEl: HTMLIonLoadingElement) => {
        loadingEl.present();

        this.authService.register(this.registerForm.value).subscribe(resData => {
          console.log('Registracija uspela');
          console.log(resData);
          loadingEl.dismiss();
          this.router.navigateByUrl('/log-in');
        });
    });
  }
}
