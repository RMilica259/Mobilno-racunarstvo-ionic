import { Component, Input, OnInit } from '@angular/core';
import { DestinationModel } from '../destination.model';

@Component({
  selector: 'app-destination-element',
  templateUrl: './destination-element.component.html',
  styleUrls: ['./destination-element.component.scss'],
  standalone: false
})
export class DestinationElementComponent  implements OnInit {

  @Input() dest: DestinationModel = {id: 'd3', name: 'Barcelona', country: 'Spain', description: 'Barcelona is a major cultural, economic, and financial centre in southwestern Europe, as well as the main biotech hub in Spain.', imageUrl: ''};

  constructor() { }

  ngOnInit() {}

}
