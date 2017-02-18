import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/toPromise';

import { UserService } from './users.service';

@Injectable()
export class GroupService {
	id: any;

	private groupsUrl = 'http://52.56.46.145/api/v1/groups';  // URL to web api
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(
		private http: Http,
		public storage: Storage,
    public userService: UserService
	) {}

  create(name: string): Promise<any> {
    return this.userService.getId().then((id) => {
      this.id = id;
      return this.http
        .post(this.groupsUrl + '/store', JSON.stringify({name: name, id: this.id}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
    });
  }

  inviteMember(member: any, group_id: number, user_id: number): Promise<any> {
    return this.http
      .post(this.groupsUrl + '/request/' + member.id, JSON.stringify({group_id: group_id, user_id: user_id}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getMembers(group: any): Promise<any> {
    return this.http
      .get(this.groupsUrl + '/index/' + group.id)
      .toPromise()
      .then(res => res.json().members)
      .catch(this.handleError);
  }

  index(): Promise<any> {
    return this.http.get(this.groupsUrl + '/index')
      .toPromise()
      .then(response => response.json().groups)
      .catch(this.handleError);
  }

  getGroupPositions(group_id: number): Promise<any> {
    return this.http.get(this.groupsUrl + '/index/' + group_id + '/positions')
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  updateRequestStatus(request_id: number, status: number): Promise<any> {
    return this.http.post('http://m-hen.dev/api/v1/requests/update/' + request_id, JSON.stringify({status: status}), {headers: this.headers})
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  handleRequests() {
    return this.http.post(this.groupsUrl + '/members/store', {headers: this.headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    
    return Promise.reject(error.message || error);
  }
  
}
