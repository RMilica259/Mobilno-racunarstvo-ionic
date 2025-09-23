import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-destination-modal',
  templateUrl: './destination-modal.component.html',
  styleUrls: ['./destination-modal.component.scss'],
  standalone: false
})
export class DestinationModalComponent  implements OnInit {
  @ViewChild('f', {static: true}) form!: NgForm;

  constructor(private modalCtrl: ModalController) { }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onAddDestination(){
    if(!this.form.valid){
      return;
    }
    this.modalCtrl.dismiss({
      destinationData: 
        {
          city: this.form.value['city'], 
          country: this.form.value['country'], 
          description: this.form.value['description']
        }
      }, 'confirm');
  }

  ngOnInit() {}

}
