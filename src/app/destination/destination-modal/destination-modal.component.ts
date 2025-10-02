import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-destination-modal',
  templateUrl: './destination-modal.component.html',
  styleUrls: ['./destination-modal.component.scss'],
  standalone: false
})
export class DestinationModalComponent implements OnInit {
  @ViewChild('f', { static: true }) form!: NgForm;
  @Input() destination: { name: string; country: string; description: string } | null = null;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.destination && this.form) {
      
      setTimeout(() => {
        this.form.setValue({
          name: this.destination!.name,
          country: this.destination!.country,
          description: this.destination!.description
        });
      });
    }
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onSaveDestination() {
    if (!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss(
      {
        destinationData: {
          name: this.form.value['name'],
          country: this.form.value['country'],
          description: this.form.value['description']
        }
      },
      'confirm'
    );
  }
}
