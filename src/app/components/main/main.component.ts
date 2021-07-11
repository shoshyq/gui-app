import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class MainComponent implements AfterViewInit {
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 40.73061;
  lng = -73.935242;
 markers = [];

  //Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 15,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER,
    },
    zoomControl: true,
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
    },
    fullscreenControl: true,

  };

  //Default Marker
  marker :any;
  center!: google.maps.LatLngLiteral ;
  currentLat: any;
  currentLong: any;
  isTracking: boolean;


  constructor(private router: Router) { 
    
    this.marker = new google.maps.Marker;
    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });
    console.log(this.marker.getTitle());
    
  }  

  ngAfterViewInit(): void {
    this.showc();
    this.mapInitializer();

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

mapInitializer(): void {
  this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

  //Adding Click event to default marker
  //Adding default marker to map
  this.marker.setMap(this.map);

  //Adding other markers
  this.loadAllMarkers();
}
showPosition(position) {
  this.currentLat = position.coords.latitude;
  this.currentLong = position.coords.longitude;
  this.map.setZoom(15);

  let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  this.map.panTo(location);

    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Your location'
    });
    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });
    this.marker.setPosition(location);
}
loadAllMarkers(): void {
  this.markers.forEach(markerInfo => {
    //Creating a new marker object
    const marker = new google.maps.Marker({
      ...markerInfo
    });

    //creating a new info window with markers info
    const infoWindow = new google.maps.InfoWindow({
      content: marker.getTitle()
    });

    //Add click event to open info window on marker
    marker.addListener("click", () => {
      infoWindow.open(marker.getMap(), marker);
    });

    //Adding marker to google map
    marker.setMap(this.map);
  });
}
trackMe() {
  this.showc();
  if (navigator.geolocation) {
    this.isTracking = true;
    navigator.geolocation.watchPosition((position) => {
      this.showTrackingPosition(position);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
showTrackingPosition(position) {
  console.log(`tracking position:  ${position.coords.latitude} - ${position.coords.longitude}`);
  this.currentLat = position.coords.latitude;
  this.currentLong = position.coords.longitude;
  let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  this.map.panTo(location);

  if (!this.marker) {
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Got you!'
    });
  }
  else {
    this.marker.setPosition(location);
  }
}
 showc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.showPosition(position);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }}
}
