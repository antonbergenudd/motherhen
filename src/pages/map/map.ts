import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { MenuController, LoadingController, ModalController } from 'ionic-angular';

import { UserService } from '../../app/services/users.service';
import { GroupService } from '../../app/services/groups.service';

import { UsersPage } from '../users/users';
import { RequestsPage } from '../requests/requests';

 
declare var google;
 
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  myPosition: any;
  loader: any;
  groups: any;
  positions: any;
  activeGroup: any;
 
  constructor(
    public userService: UserService,
    public groupService: GroupService,
    public menu: MenuController, 
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {}
 
  ionViewDidLoad() {
    this.presentLoader();
    this.loadMap();

    this.handleRequests();
  }

  handleRequests() {
    this.groupService.handleRequests();
  }

  // Loader
  presentLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    this.loader.present();
  }

  // Google maps
  loadMap(){
  	Geolocation.getCurrentPosition().then((position) => {
  		this.myPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.loader.dismiss();

      if(this.activeGroup) {
        this.getGroupPositions();
      } else {
        // this.getPositions();
      }
  		
      let mapOptions = {
  			center: this.myPosition,
  			zoom: 15,
  			mapTypeId: google.maps.MapTypeId.ROADMAP
  		}

  		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  	}, (err) => {
  		console.log(err)
  	})
  }

  getLocation() {
    return Geolocation.getCurrentPosition().then((position) => {
      return position;
    }, (err) => {
      console.log(err)
    });
  }

  setPosition() {
    this.userService.updatePosition(this.myPosition);
    this.addMarker(this.myPosition);
  }

  addMarker(latLng: any) {
  	new google.maps.Marker({
  		map: this.map,
  		animation: google.maps.Animation.DROP,
  		position: latLng
  	});
  }

  getPositions() {
    console.log('Get all positions');

    // Send in current active group id
    this.userService.index()
      .then(users => {
        for(var i = 0; i < users.length; i++) {
          this.userService.getPosition(users[i].id).then(position => {
            if(position) {
              this.renderPosition(position);
            }
          });
        }
      });
  }

  renderPosition(position: any) {
    let latLng = new google.maps.LatLng(position.lat, position.lng);
    
    this.addMarker(latLng);
  }




  // Right menu functions
  toggleGroupsMenu() {
    this.menu.toggle('right');
    this.getGroups();
  }

  toggleRequestMenu() {
    this.modalCtrl.create(RequestsPage).present();
  }

  getGroups() {

    // TODO: fetch groups that usr is admin of

    this.groupService.index().then(response => {
      this.groups = response;
      return response;
    });
  }  

  getGroupPositions() {
    console.log('Get group positions');
    this.groupService.getGroupPositions(this.activeGroup.id)
      .then(positions => {
        console.log(positions);
        for(let i = 0; i < positions.length; i++) {
          this.userService.getPosition(positions[i].user_id).then(position => {
            this.renderPosition(position);
          });
        }
      });
  }

  toggleGroup(group: any) {
    this.modalCtrl.create(UsersPage, {group: group}).present();
  }

  addNewGroup(name: string) {
    this.groupService.create(name);
  }

  setActiveGroup(group: any) {
    this.activeGroup = group;

    this.presentLoader();
    this.loadMap();
  }
}


