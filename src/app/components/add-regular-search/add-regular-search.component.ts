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
  selectedCity: number;
  newSearch:Search = new Search();
  subscribe:any;
  cities: City[];
  sizePref =  new FormControl('', [
    ]);
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
              roofOpt=  new FormControl('', [
              ]);

  formattedaddress=" ";
      
  constructor(private searchesService:SearchesService,private router: Router, private fb: FormBuilder) {
   
  }
  chRO(completed: boolean) {
    this.newSearch.RoofOpt = completed;

  }
  chSO(completed: boolean) {
    this.newSearch.SizeOpt = completed;

  }
  ngOnInit()
  { 
    this.newSearch.SizeOpt = false;
    this.newSearch.RoofOpt = false;

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
    this.newSearch.UserId = +sessionStorage.getItem('ucode');
 
    this.newSearch.CityCode  = this.selectedCity;
    this.newSearch.Regularly = true;
    this.newSearch.SearchDate = new Date()
    this.newSearch.DaysSchedule = +sessionStorage.getItem('scheduleCode');
    this.searchesService.AddRegularSearch(this.newSearch).subscribe(code=>
      {
        this.newSearch.Code=code; 
        console.log(code);
        if(code!=0)
         {
           
           console.log("search has been added successfully")
           sessionStorage.setItem('rsearch',code.toString());
           this.router.navigate(['/AddedRSearch']);

           
            }
        else 
        console.log("something is wrong")
        });
    
  }
  onSelection(e){
    this.selectedCity = e.value;
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
