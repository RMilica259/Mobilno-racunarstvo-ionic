import { Component, OnDestroy, OnInit } from '@angular/core';
import { DestinationModel } from '../destination.model';
import { DestinationService } from '../destination';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  standalone: false
})
export class ExplorePage implements OnInit, OnDestroy {

  destination: DestinationModel[];

  constructor(private destinationService: DestinationService) { 
    console.log('constructor');
    this.destination = this.destinationService.destination;
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
