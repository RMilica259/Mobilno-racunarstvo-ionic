import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestinationModel } from '../destination.model';
import { DestinationService } from '../destination';
import { ModalController } from '@ionic/angular';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';
import { DestinationData } from '../destination';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: false
})
export class ExplorePage implements OnInit, OnDestroy {

  destination: DestinationModel[] = [];
  private destSub!: Subscription;

  constructor(private destinationService: DestinationService, private modalCtrl: ModalController) { 
    console.log('constructor');
    //this.destination = this.destinationService.destination;
  }

  ngOnInit() {
      this.destSub = this.destinationService.destination.subscribe((destinations) => {
      this.destination = destinations;
    });
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
        this.destinationService.addDestination(resultData.data.destinationData.name, resultData.data.destinationData.country, resultData.data.destinationData.description).subscribe();
      }
    });
  }

  ionViewWillEnter(){
    this.destinationService.getDestinations().subscribe();
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

  ngOnDestroy() {
    if(this.destSub){
      this.destSub.unsubscribe();
    }
  }

}
