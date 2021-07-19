import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.models';

@Component({
  selector: 'app-add-park-spot',
  templateUrl: './add-park-spot.component.html',
  styleUrls: ['./add-park-spot.component.css']
})
export class AddParkSpotComponent implements OnInit {

  cities: City[];

  constructor() { }

  ngOnInit(): void {
  }
  
  onSelection(e) {
  }

}
