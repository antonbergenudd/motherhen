import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from 'ionic-native';
 
declare var google;
 
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
 
  constructor() {}
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){

  	Geolocation.getCurrentPosition().then((position) => {
  		let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  		let mapOptions = {
  			center: latLng,
  			zoom: 15,
  			mapTypeId: google.maps.MapTypeId.ROADMAP
  		}

  		console.log('view initiated')
  		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  	}, (err) => {
  		console.log(err)
  	})
 
  }

  addMarker() {
  	let marker = new google.maps.Marker({
  		map: this.map,
  		animation: google.maps.Animation.DROP,
  		position: this.map.getCenter()
  	});

  	let content = "<div><h1>Name</h1></div>";

  	this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {
  	let infoWindow = new google.maps.InfoWindow({
  		content: content
  	});

  	google.maps.event.addListener(marker, 'click', () => {
  		infoWindow.open(this.map, marker);
  	})
  }

}


