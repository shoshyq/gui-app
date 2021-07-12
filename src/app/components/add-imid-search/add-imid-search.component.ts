import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Search } from 'src/app/models/search.model';
import { SearchesService } from 'src/app/services/searches.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ParkSpot } from 'src/app/models/parkspot.model';
import { City } from 'src/app/models/city.models';
import { CitiesService } from 'src/app/services/cities.service';
import { WeekDay } from 'src/app/models/weekDay.models';
import { Hours } from 'src/app/models/hours.model';
import { createElementCssSelector } from '@angular/compiler';
import { getLocaleCurrencyCode } from '@angular/common';
let res= "";
let resaddress = "";
@Component({
  selector: 'app-add-imid-search',
  templateUrl: './add-imid-search.component.html',
  styleUrls: ['./add-imid-search.component.css']
})
export class AddImidSearchComponent implements OnInit {
  newSchedule = new WeekDay();
addressdiv=false;
  selectedCity: number;
  citystring : string;
  parkSpotResultList:ParkSpot[]
  newSearch:Search = new Search();
  subscribe:any;
  cities: City[];
  newCity:City = new City();
  addcitydiv= false;
  lat:string;
  lng:string;
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

  constructor(private cityservice:CitiesService, private searchesService:SearchesService,private router: Router) {
    
  }
  
  ngOnInit()
  {  this.newSchedule.SundayHours=[];
    this.newSchedule.MondayHours=[];
    this.newSchedule.TuedayHours=[];
    this.newSchedule.WednesdayHours=[];
    this.newSchedule.ThursdayHours=[];
    this.newSchedule.FridayHours=[];
     this.searchesService.GetCities().subscribe(list=>
      {       
            this.cities=list;        
      });
  }
  onSelection(e){
    this.citystring = e.source.triggerValue; 
    this.selectedCity = e.value;
    console.log(this.selectedCity); 
 }
 chRO(completed: boolean) {
  this.newSearch.RoofOpt = completed;

}
chSO(completed: boolean) {
  this.newSearch.SizeOpt = completed;

}
  AddImmidiateSearch(frm:any,st:any,en:any){
    let hrs = new Hours()
    let sth = this.gethours(st);
    let enh = this.gethours(en);
    if((sth!='0')&&(enh!='0'))
    {
          hrs.StartHour= sth;
          hrs.EndHour =  enh;
   // this.newDays[dayi-1].hours.push(object) ;
   var d = new Date().getDay();
   if(d == 0)
   {
     this.newSchedule.SundayHours.push(hrs)
   }
   if(d == 1)
   {
     this.newSchedule.MondayHours.push(hrs)
   }
   if(d == 2)
   {
     this.newSchedule.TuedayHours.push(hrs)
   }
   if(d == 3)
   {
     this.newSchedule.WednesdayHours.push(hrs)
   }
   if(d == 4)
   {
     this.newSchedule.ThursdayHours.push(hrs)
   }
   if(d ==5)
   {
     this.newSchedule.FridayHours.push(hrs)
   }     
   console.log(this.newSchedule)
}
    this.searchesService.AddSchedule(this.newSchedule).subscribe((code: number)=>{
      this.newSchedule.Code=code; 
      console.log(code);
      if(code!=0)
       {
         console.log(this.newSchedule.Code)
         sessionStorage.setItem('imScheduleCode',code.toString());
         this.newSearch.UserId = +sessionStorage.getItem('ucode');
         if(this.addressdiv==true)
         {
          this.newSearch.MyLocationAddress += ", " + this.citystring;
         }
         else
         {
         this.newSearch.Place_id = this.getMyLocation();
         this.newSearch.Place_id = res;
         console.log("res"+res);
         console.log("id"+this.newSearch.Place_id);
         const geocoder = new google.maps.Geocoder();
        

        geocoder.geocode({ placeId: res },function(results,status) {
    if (status === google.maps.GeocoderStatus.OK){
      if (results[0]) {
        resaddress = results[0].formatted_address
    
      } else {
        window.alert("No results found");
      }
    }
    else{

    }
    
         });
         this.newSearch.CityCode  = this.selectedCity;
    this.newSearch.Regularly = false;
    this.newSearch.DaysSchedule = code;
    this.searchesService.AddImmidiateSearch(this.newSearch).subscribe(dic=>
      {
        let i=0;
        console.log(dic);
        dic.forEach((value: string, key: ParkSpot) => {
          this.parkSpotResultList[i] = key;
          i++;
        });      
     if(dic!=null)
      {
        console.log("search has been added successfully")
        console.log(this.newSearch.Code);
        console.log(this.parkSpotResultList);
      }
     else 
     console.log("something on the search level went wrong")
    });
        }
       
   }
  });
}
  
  gethours(h:any) {
    let time = h;
   
    if (time.value !== "") {
      var hours = time.split(":")[0];
      var minutes = time.split(":")[1];
    //  hours = hours % 12 || 12;
    if (isNaN(+minutes))
    {
      return '0';
    }
    if(minutes > 52)
      {
       hours =  hours === '23' ? '00' : ++hours
      }
     // minutes = ((Math.round(minutes/15) * 15) % 60)
      minutes = minutes===0? '00' : minutes;
      return hours + "." + minutes;
    }
    else
    {
      return '0';
    }
  }
  chl(e)
  {
  if(e.value==2)
     {
      this.addressdiv=true;
     }
     else{
      this.addressdiv=false;
      this.getMyLocation();
     }
  }
  getMyLocation():string {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var geocoder = new google.maps.Geocoder();

        this.lat = position.coords.latitude.toString();
        this.lng = position.coords.longitude.toString();
        var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};

        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
             if (results[1]) {
              console.log(results[1].place_id);
             res = results[1].place_id;
             console.log(res);
             
              return results[1].place_id;

             } else {

               window.alert('No results found');
               return '0';
             }
             return results[1].place_id
          } else {

            return '0';
             window.alert('Geocoder failed due to: ' + status);
           }
           return results[1].place_id;
         });
         return '0';
      });
    } else {
      return '0';
      alert("Geolocation is not supported by this browser.");
    }
    return '0';
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
}
