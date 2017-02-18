import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { User } from '../../assets/globals/user';
import { UserService } from '../../app/services/users.service';
import { GroupService } from '../../app/services/groups.service';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
	users: User[];
  members: any;
  activeGroup: any;
  groupName: string;
  groupId: number;

	constructor(
    private userService: UserService, 
    private groupService: GroupService, 
    private navParams: NavParams,
    public viewCtrl: ViewController
  ) { }

  ionViewDidLoad(): void {
    this.loadUsers();

    this.activeGroup = this.navParams.get("group");

    this.groupName = this.activeGroup.name;
    this.groupId = this.activeGroup.id;
  }

  loadUsers(): void{
    this.loadMembers();

    this.userService.index()
      .then(users => {
        // check if this.members exists in this.user, 
        // if so, remove member from this.user
        this.users = users;
      });
  }

  loadMembers(): void {
    this.groupService.getMembers(this.navParams.get("group"))
      .then(members => {
        this.members = members;
      })
  }

  inviteMember(member: any) {
    this.userService.getId().then(id => {
      this.groupService.inviteMember(member, this.groupId, id);
    })
  }

  cancel(): void {
    this.viewCtrl.dismiss(UsersPage);
  }

}
