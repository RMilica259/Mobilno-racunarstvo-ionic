import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestinationModel } from '../destination.model';
import { DestinationService } from '../destination';
import { ModalController } from '@ionic/angular';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: false
})
export class ExplorePage implements OnInit, OnDestroy {

  destination: DestinationModel[];

  constructor(private destinationService: DestinationService, private modalCtrl: ModalController) { 
    console.log('constructor');
    this.destination = this.destinationService.destination;
  }

  openModal(){
    this.modalCtrl.create({
      component: DestinationModalComponent
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if(resultData.role == 'confirm') {
        console.log(resultData);
      }
    });
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

}
