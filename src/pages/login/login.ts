import { Component, ViewChild } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { Nav, Platform } from 'ionic-angular';
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

  constructor(public platform: Platform, private userService: UserService, public nav: Nav, public storage: Storage) {
  	 Facebook.browserInit(1123296217721083, "v2.8");
  }

	// doDesktopLogin() {
    // FB.login(result => {
    // 	this.fetchUser();
    //   this.storage.set('token', result);
    // }, { scope: 'user_friends', auth_type: 'reauthenticate' });
	// }
    //
	// fetchUser() {
	// 	let that = this;
	// 	let facebookAPI = '/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends';
    //
    // FB.api(facebookAPI, function(result) {
    //   if (result && !result.error) {
    //
    //     that.userService.create(result);
    //     that.userService.setUsername(result['name']);
    //     that.userService.setId(result['id']);
    //
    //     that.nav.setRoot(MapPage);
    //   } else {
    //       console.log(result.error);
    //   }
    // });
	// }
	// ngOnInit() {
	// 	FB.init({
    //     appId      : 1123296217721083,
    //     cookie     : false,
    //     xfbml      : true,  // parse social plugins on this page
    //     version    : 'v2.5' // use graph api version 2.5
    // });
	// }

	login() {
		if(this.platform.is('core')) {
			// this.doDesktopLogin();
            console.log('desktop found');
		} else {
			this.doMobileLogin();
		}
	}

	 // Mobile
  doMobileLogin(){
    let permissions = new Array();
    let that = this;

    Facebook.login(["public_profile"])
			.then(function(response) {
				let user = response;
        let facebookAPI = '/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends';

        //Getting name and gender properties
        Facebook.api(facebookAPI, permissions)
          .then(function(user) {
            that.userService.create(user);
            that.userService.setUsername(user['name']);
            that.userService.setId(user['id']);

            that.nav.setRoot(MapPage);
        });
			});

	}

}
