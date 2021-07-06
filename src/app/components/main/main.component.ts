import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { GoogleMap, GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  //@ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap 
  @ViewChild(MapInfoWindow, { static: false }) infoWindow! : MapInfoWindow
  center!: google.maps.LatLngLiteral ;
  zoom = 16
  markers:any;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
  };

  infoContent = '';
  x:any;
  constructor(private router: Router) { 
    
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    this.markers = [];
  }

  ngOnInit(): void {
    if (navigator.geolocation) {
      var location_timeout = setTimeout("geolocFail()", 10000);
  
      navigator.geolocation.getCurrentPosition((position) => {
          clearTimeout(location_timeout);
  
           var lat = position.coords.latitude;
           var lng = position.coords.longitude;
          this.markers.push({
            position: {
              lat: lat ,
              lng: lng ,
            },
            label: {
              color: 'red',
              text: 'Your Location',
            },
            title: 'Your location',
            info: 'Marker info ' + (this.markers.length + 1),
            options: {
            },
          })
      }, function(error) {
          clearTimeout(location_timeout);
      });
  } else {
      // Fallback for no geolocation
  }
 
    console.log(this.center)
    console.log(JSON.stringify(this.map.getCenter()))
  }
  click(event: google.maps.MouseEvent) {
    console.log(event)
  }
  center_changed() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((showPosition) =>
      {
        this.center = {
          lat: showPosition.coords.latitude,
          lng: showPosition.coords.longitude,
        }
      });
    } 
  }
  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((showPosition) =>
      {
        this.center = {
          lat: showPosition.coords.latitude,
          lng: showPosition.coords.longitude,
        }
      });
    }
  }
  
addMarker() {
  this.markers.push({
    position: {
      lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
      lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
    },
    label: {
      color: 'red',
      text: 'Marker label ' + (this.markers.length + 1),
    },
    title: 'Marker title ' + (this.markers.length + 1),
  })
}
dashboard()
{
  this.router.navigate(['Dashboard/',sessionStorage.getItem('ucode')]); 
}
imidSearch()
{
  this.router.navigate(['ImmidSearch/',sessionStorage.getItem('ucode')]); 
}
advancedSearch()
{
  this.router.navigate(['AddRegularSearch/',sessionStorage.getItem('ucode')]); 

}
getCenter()
{
if(this.markers[0]==null)
{
this.markers.push({
    position: {
      lat: this.center.lat ,
      lng: this.center.lng , 
    },
    label: {
      color: 'red',
      text: 'Your location',
    },
    title: 'Your location',
  })

}    
}

}
