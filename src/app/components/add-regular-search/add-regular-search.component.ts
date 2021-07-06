import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
//import { GoogleMap, MapInfoWindow } from '@angular/google-maps/';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { GoogleMapsModule } from '@angular/google-maps/';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParkSpot } from 'src/app/models/parkspot.model';
import { Search } from 'src/app/models/search.model';
import { SearchesService } from 'src/app/services/searches.service';
import { City } from 'src/app/models/city.models';
import { ViewEncapsulation } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown/public_api';
import { ReactiveFormsModule } from '@angular/forms';
import { Hours } from "../../models/hours.model";
import { WeekDay } from 'src/app/models/weekDay.models';

@Component({
  selector: 'app-add-regular-search',
  templateUrl: './add-regular-search.component.html',
  styleUrls: ['./add-regular-search.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddRegularSearchComponent implements OnInit {
  selectedCity: string;
  newSearch:Search = new Search();
  subscribe:any;
  cities: City[];
  
   addressFormControl = new FormControl('', [
      Validators.required,
      ]);
  widthFormControl = new FormControl('', [
        Validators.pattern("^[0-9]*$"),
        ]);
  lengthFormControl = new FormControl('', [
          Validators.pattern("^[0-9]*$"),
          ]);
   minpriceFormControl = new FormControl('', [
            Validators.pattern("^[0-9]*$"),
            ]);
            maxpriceFormControl = new FormControl('', [
              Validators.pattern("^[0-9]*$"),
              ]);

  formattedaddress=" ";
      
  constructor(private searchesService:SearchesService,private router: Router, private fb: FormBuilder) {
   
  }
  
  ngOnInit()
  { 
    
   this.searchesService.GetCities().subscribe(list=>
      {       
            this.cities=list;        
      });  
    }
  
  
public AddressChange(address: any) {
      //setting address from API to local variable
       this.formattedaddress=address.formatted_address
      }
  AddRegularSearch(frm:any){
  
    this.searchesService.AddRegularSearch(this.newSearch).subscribe(code=>
      {
        this.newSearch.Code=code; 
        if(code!=0)
         {
           console.log("search has been added successfully")
           sessionStorage.setItem('rsearch',code.toString());
   
          this.router.navigate(['/Main',sessionStorage.getItem('ucode')]);
         }
        else 
        console.log("something is wrong")
        });
    
  }
  initAutocomplete() {
  
  
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);  
    // Bias the SearchBox results towards current map's viewport.

  
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.

      }    // Clear out the old markers.

}
