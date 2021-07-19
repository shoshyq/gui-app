import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.models';

@Component({
  selector: 'app-update-park-spot',
  templateUrl: './update-park-spot.component.html',
  styleUrls: ['./update-park-spot.component.css']
})
export class UpdateParkSpotComponent implements OnInit {

  cities: City[];

  constructor() { }

  ngOnInit(): void {
  }
  
  onSelection(e) {
  }

}
