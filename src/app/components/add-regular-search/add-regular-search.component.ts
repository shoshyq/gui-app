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
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-add-regular-search',
  templateUrl: './add-regular-search.component.html',
  styleUrls: ['./add-regular-search.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AddRegularSearchComponent implements OnInit {
  selectedCity: number;
  citystring : string;
  newSearch:Search = new Search();
  newCity:City = new City();
  subscribe:any;
  cities: City[];
  addcitydiv= false;
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
      
  constructor(private cityservice:CitiesService, private searchesService:SearchesService,private router: Router, private fb: FormBuilder) {
   
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
    chRO(completed: boolean) {
      this.newSearch.RoofOpt = completed;
  
    }
    chSO(completed: boolean) {
      this.newSearch.SizeOpt = completed;
  
    }
    AddCity(city:string){  
      this.newCity.CityName = city;    
   this.cityservice.AddCity(this.newCity).subscribe(result=>
    {       
      if(result==1)
      {
        console.log(city);
        
 this.cityservice.GetCities().subscribe(list=>
    {       
          this.cities=list;  
          console.log("list");
                
    });  
 
      }
      else{
        console.log("error!!!");
        
      }
                 
    });  
 
  
    }
public AddressChange(address: any) {
      //setting address from API to local variable
       this.formattedaddress=address.formatted_address
      }
      open_add_city(){
        this.addcitydiv = true;

      }
  AddRegularSearch(frm:any){
    this.newSearch.UserId = +sessionStorage.getItem('ucode');
 this.newSearch.MyLocationAddress += ", " + this.citystring
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
    this.citystring = e.source.triggerValue; 
    this.selectedCity = e.value;
    console.log(this.selectedCity); 
 }
}
