import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/city.models';
import { ParkSpot } from 'src/app/models/parkspot.model';
import { CitiesService } from 'src/app/services/cities.service';
import { ParkingSpotService } from 'src/app/services/parkingSpot.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-add-park-spot',
  templateUrl: './add-park-spot.component.html',
  styleUrls: ['./add-park-spot.component.css']
})
export class AddParkSpotComponent implements OnInit {

  cities: City[];
  selectedCity: number;
  citystring : string;
  newSearch:ParkSpot = new ParkSpot();
  newCity:City = new City();
  subscribe:any;
  pspotGroup: FormGroup = null;

  constructor(private spotservice:ParkingSpotService, private cityservice: CitiesService, private searchesService: SearchesService, private router: Router) {
    this.pspotGroup = new FormGroup({
      addressFormControl: new FormControl('',[ Validators.required]),
      widthFormControl: new FormControl('', [Validators.pattern("^[-+]?[0-9]*\.?[0-9]+$")]),
      lengthFormControl: new FormControl('', [Validators.pattern("^[-+]?[0-9]*\.?[0-9]+$")]),
      priceFormControl: new FormControl('', [Validators.pattern("^[-+]?[0-9]*\.?[0-9]+$"), Validators.required]),
      roofOpt: new FormControl('')
        });
  }
  ngOnInit(): void {
    this.newSearch.HasRoof = false;

    this.searchesService.GetCities().subscribe(list => {
      this.cities = list;
    });
  }
  AddRegularSearch(frm:any){
    this.newSearch.UserCode = +sessionStorage.getItem('ucode');
    this.newSearch.FullAddress = this.pspotGroup.get('addressFormControl').value;
    this.newSearch.PricePerHour = this.pspotGroup.get('priceFormControl').value;
    this.newSearch.SpotLength = this.pspotGroup.get('lengthFormControl').value;
    this.newSearch.SpotWidth = this.pspotGroup.get('widthFormControl').value;
    this.newSearch.HasRoof = this.pspotGroup.get('roofOpt').value;

 this.newSearch.FullAddress += ", " + this.citystring;
    this.newSearch.CityCode  = this.selectedCity;
    this.newSearch.DaysSchedule = +sessionStorage.getItem('scheduleCode');
    this.spotservice.AddSpot(this.newSearch).subscribe(code=>
      {
        this.newSearch.Code=code; 
        console.log(code);
        if(code!=-1)
         {
           
           console.log("parkspot has been added successfully")
           sessionStorage.setItem('pspot',code.toString());
           this.router.navigate(['/ParkSpotDetails']);

           
            }
        else 
        console.log("something is wrong")
        });
    
  }
  chRO(completed: boolean) {
    this.newSearch.HasRoof = completed;

  }
 
  onSelection(e){
    this.citystring = e.source.triggerValue; 
    this.selectedCity = e.value;
    console.log(this.selectedCity); 
 }

}
