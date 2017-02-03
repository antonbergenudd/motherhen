import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, } from 'ionic-native';

import { MapPage } from '../pages/map/map';
import { UsersPage } from '../pages/users/users';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public menu: MenuController) {
    
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Map', component: MapPage },
      { title: 'Users', component: UsersPage }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // let env = this;
      // NativeStorage.getItem('user')
      //   .then(function(data) {
      //     // user is previously logged and we have his data
      //     // we will let him access the app
      //     env.nav.push(HomePage);
      //     Splashscreen.hide();
      //   }, function (error) {
      //     //we don't have the user data so we will ask him to log in
      //     // TODO: add LoginPage
      //     env.nav.push(HomePage);
      //     Splashscreen.hide();
      //   });

      StatusBar.styleDefault();

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();

    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
