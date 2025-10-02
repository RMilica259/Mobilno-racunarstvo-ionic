import { Component, OnInit } from '@angular/core';
import { DestinationModel } from '../../destination.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from '../../destination';
import { ModalController } from '@ionic/angular';
import { DestinationModalComponent } from '../../destination-modal/destination-modal.component';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.page.html',
  styleUrls: ['./destination-details.page.scss'],
  standalone: false
})
export class DestinationDetailsPage implements OnInit {

  dest!: DestinationModel;

  constructor(
  private route: ActivatedRoute,
  private destinationService: DestinationService,
  private modalCtrl: ModalController,
  private router: Router,
  private alertCtrl: AlertController
) {}

  
  openEditModal() {
  this.modalCtrl.create({
    component: DestinationModalComponent,
    componentProps: {
      destination: {
        name: this.dest.name,
        country: this.dest.country,
        description: this.dest.description,
        imageUrl: this.dest.imageUrl,   
        userId: this.dest.userId        
      }
    }
  }).then((modal: HTMLIonModalElement) => {
    modal.present();
    return modal.onDidDismiss();
  }).then((resultData) => {
    if (resultData.role === 'confirm') {
      this.destinationService.updateDestination(
        this.dest.id!,
        resultData.data.destinationData.name,
        resultData.data.destinationData.country,
        resultData.data.destinationData.description,
        this.dest.imageUrl,   
        this.dest.userId      
      ).subscribe(() => {
        
        this.dest.name = resultData.data.destinationData.name;
        this.dest.country = resultData.data.destinationData.country;
        this.dest.description = resultData.data.destinationData.description;
      });
    }
  });
}



  deleteDestination() {
  this.alertCtrl.create({
    header: 'Are you sure?',
    message: 'Do you really want to delete this destination?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          this.destinationService.deleteDestination(this.dest.id!)
            .subscribe(() => {
              console.log('Destination deleted');
              this.router.navigate(['/destination/tabs/explore']);
            });
        }
      }
    ]
  }).then(alertEl => {
    alertEl.present();
  });
}



  ngOnInit() {
  this.route.paramMap.subscribe(paramMap => {
    if (!paramMap.has('destId')) return;

    this.destinationService.getDestination(paramMap.get('destId')!)
      .subscribe(dest => {
        this.dest = dest!;
      });
  });
}

}
