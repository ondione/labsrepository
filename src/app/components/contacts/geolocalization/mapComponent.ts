
import { Component, OnInit, ViewChild, ElementRef, NgZone, Inject } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';

import { google } from "google-maps";

declare var google : google;


 
@Component({
  selector: 'app-root',
  templateUrl: './map.html',
  styles: [`agm-map {
    height: 300px;
    width: 500px;
  }`]
})
export class MapComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  iconUrl="/assets/img/m1.png";
 
  @ViewChild('search', {static:true}) public searchElementRef: ElementRef;
 
 
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
 
 
  ngOnInit() {

    this.latitude     = 14.7195485;
    this.longitude     = -17.4768039;
    this.zoom    = 13;
    this.iconUrl = "/assets/img/m1.png";
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
 
  // Get Current Location Coordinates
  private setCurrentLocation() {
    /*if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }*/

      if(!!navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log(position.coords.latitude, " la position actuelle", position.coords.longitude);
          this.lat = position.coords.latitude ;
          this.lng = position.coords.longitude ;
          this.iconUrl = "/img/m2.png";

        });  
      } else {
        document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
      }
  }
 
 
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
 
    });
  }
 
}