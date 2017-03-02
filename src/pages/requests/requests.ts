import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { UserService } from '../../app/services/users.service';
import { GroupService } from '../../app/services/groups.service';

@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html'
})
export class RequestsPage {
	requests: any;

  constructor(
  	public navCtrl: NavController,
  	public userService: UserService, 
  	public groupService: GroupService,
  	public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    console.log('Hello RequestsPage Page');

    this.loadRequests();
  }

  loadRequests(): void{
    this.userService.getRequests()
      .then(requests => {
        this.requests = requests;
      });
  }

  cancel(): void {
    this.viewCtrl.dismiss(RequestsPage);
  }

  acceptRequest(id: number) {
    this.groupService.updateRequestStatus(id, 1);
  }

  denyRequest(id: number) {
    this.groupService.updateRequestStatus(id, 2);
  }

}
