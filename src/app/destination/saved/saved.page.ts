import { Component, OnInit } from '@angular/core';
import { SavedService } from './saved';
import { DestinationModel } from '../destination.model';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
  standalone: false
})
export class SavedPage implements OnInit {
  saved: DestinationModel[] = [];

  constructor(private savedService: SavedService, private toastCtrl: ToastController) {}


  private async presentToast(message: string) {
  const toast = await this.toastCtrl.create({
    message,
    duration: 2000,
    color: 'success',   
    position: 'bottom'
  });
  await toast.present();
}


  remove(id: string) {
  this.savedService.removeDestination(id);
  this.presentToast('Destination removed ❌');
}


  ngOnInit() {
    this.savedService.saved$.subscribe(destinations => {
      this.saved = destinations;
    });
  }
}
