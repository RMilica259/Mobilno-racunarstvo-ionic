import { Component, OnInit } from '@angular/core';
import { DestinationModel } from '../../destination.model';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../../destination';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.page.html',
  styleUrls: ['./destination-details.page.scss'],
  standalone: false
})
export class DestinationDetailsPage implements OnInit {

  dest!: DestinationModel;

  constructor(private route: ActivatedRoute, private destinationService: DestinationService) { }

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
