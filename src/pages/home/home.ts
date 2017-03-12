import { Component } from '@angular/core';

import { UserService } from '../../app/services/users.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 	username: string;

  constructor(public userService: UserService) {
  	this.userService.getUsername()
  }

  ionViewDidLoad(): void {
  	this.getUsername();
  }

  getUsername() {
    this.userService.getUsername().then((username) => {
      this.username = username;
    });
  }

}
