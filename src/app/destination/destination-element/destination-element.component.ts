import { Component, Input, OnInit } from '@angular/core';
import { DestinationModel } from '../destination.model';
import { AlertController } from '@ionic/angular';
import { SavedService } from '../saved/saved';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-destination-element',
  templateUrl: './destination-element.component.html',
  styleUrls: ['./destination-element.component.scss'],
  standalone: false
})
export class DestinationElementComponent implements OnInit {
  @Input() dest!: DestinationModel;
  isSaved = false;

  constructor(
  private alertCtrl: AlertController,
  private savedService: SavedService,
  private toastCtrl: ToastController
) {}


  ngOnInit() {
    this.isSaved = this.savedService.isSaved(this.dest.id!);

    
    this.savedService.saved$.subscribe(() => {
      this.isSaved = this.savedService.isSaved(this.dest.id!);
    });
  }

  private async presentToast(message: string) {
  const toast = await this.toastCtrl.create({
    message,
    duration: 2000,
    color: 'success',
    position: 'bottom'
  });
  await toast.present();
}


  openAlert() {
    this.alertCtrl
      .create({
        header: 'Saving destination',
        message: 'Are you sure you want to save this destination?',
        buttons: [
          {
            text: 'Save',
            handler: () => {
              this.savedService.addDestination(this.dest);
              this.presentToast('Destination saved ✅');
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      })
      .then(alert => alert.present());
  }
}
