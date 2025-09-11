import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestinationDetailsPage } from './destination-details.page';

const routes: Routes = [
  {
    path: '',
    component: DestinationDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DestinationDetailsPageRoutingModule {}
