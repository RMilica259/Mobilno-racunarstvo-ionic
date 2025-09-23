import { Component, Input, OnInit } from '@angular/core';
import { DestinationModel } from '../destination.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-destination-element',
  templateUrl: './destination-element.component.html',
  styleUrls: ['./destination-element.component.scss'],
  standalone: false
})
export class DestinationElementComponent  implements OnInit {

  @Input() dest: DestinationModel = {id: 'd3', name: 'Barcelona', country: 'Spain', description: 'Barcelona is a major cultural, economic, and financial centre in southwestern Europe, as well as the main biotech hub in Spain.', imageUrl: ''};

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {}

  openAlert(){
    this.alertCtrl.create({
      header: 'Saving destination',
      message: 'Are you sure you want to save this destination?',
      buttons: [
        {
          text:'Save',
          handler: () => {
            console.log('Save it!');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Do not save it!');
          }
        }
      ]
    }).then((alert: HTMLIonAlertElement) =>{
      alert.present();
    });
  }

}
