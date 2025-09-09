import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.page.html',
  styleUrls: ['./destination.page.scss'],
  standalone: false
})
export class DestinationPage implements OnInit, OnDestroy {

  constructor() { 
    console.log('constructor');
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
