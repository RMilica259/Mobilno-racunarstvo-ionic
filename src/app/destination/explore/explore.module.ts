import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';

import { ExplorePage } from './explore.page';
import { DestinationElementComponent } from '../destination-element/destination-element.component';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule
  ],
  declarations: [ExplorePage, DestinationElementComponent, DestinationModalComponent]
})
export class ExplorePageModule {}
