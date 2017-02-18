import { Component, ViewChild } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { User } from '../../assets/globals/user';
import { UserService } from '../../app/services/users.service';

import { HomePage } from '../home/home';
import { MapPage } from '../map/map';

declare const FB: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private userService: UserService, public nav: Nav, public storage: Storage) {
  	 Facebook.browserInit(1123296217721083, "v2.8");
  }

  // Handle login
  statusChangeCallback(response: any) {
    if (response.status === 'connected') {
        this.fetchUser();
    } else {
        this.doFbLogin();
    }
	}

	// Execute first time login
	doFbLogin() {
		let that = this;
    FB.login(result => {
    	that.fetchUser();
      that.storage.set('token', result);
    }, { scope: 'user_friends', auth_type: 'reauthenticate' });
	}

	// Fetch user details
	fetchUser() {
		let that = this;
		let facebookAPI = '/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends';

    FB.api(facebookAPI, function(result) {
      if (result && !result.error) {

        that.userService.create(result);
        that.userService.setUsername(result['name']);
        that.userService.setId(result['id']);

        that.nav.setRoot(MapPage);
      } else {
          console.log(result.error);
      }
    });
	}
	ngOnInit() {
		FB.init({
        appId      : 1123296217721083,
        cookie     : false, 
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use graph api version 2.5
    });

    // Auto login
    FB.getLoginStatus(response => {
         this.statusChangeCallback(response);
    });
	} 



	
	/* // Mobile
  doMobileFbLogin(){
    let permissions = new Array();

    Facebook.login(["public_profile"])
			.then(function(response) {
				let user = response;

				console.log(user);
			});

		//Getting name and gender properties
		Facebook.api("/me?fields=name,gender", permissions)
			.then(function(user) {
				user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
		})
	}*/
}
