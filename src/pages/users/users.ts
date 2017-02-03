import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../assets/globals/user';
import { UserService } from '../../app/services/users.service';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
	users: User[];

	constructor(private userService: UserService) { }

  ionViewDidLoad(): void {
    console.log('Hello UsersPage Page');

    this.loadUsers();
  }

  loadUsers(): void{
    this.userService.getUsers()
      .then(users => {
        this.users = users;
      });
  }

}
