import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {
	id: any;

	private usersUrl = 'http://52.56.46.145/api/v1/users';  // URL to web api
	private headers = new Headers({'Content-Type': 'application/json'});


	constructor(
		private http: Http,
		public storage: Storage,
		public user: User
	) {}

	update(user: User): Promise<User> {
	  const url = `${this.usersUrl}/update/${user.id}`;
	  return this.http
	    .put(url, JSON.stringify(user), {headers: this.headers})
	    .toPromise()
	    .then(() => user)
	    .catch(this.handleError);
	}

	updatePosition(position: any): Promise<any> {
		return this.getId().then((id) => {
      this.id = id;
      return this.http
  		  .put(this.usersUrl + '/updatePosition/' + this.id, JSON.stringify(position), {headers: this.headers})
  		  .toPromise()
  		  .then(() => position)
  		  .catch(this.handleError);
    });
	}

	// delete(id: number): Promise<void> {
	//   const url = `${this.heroesUrl}/${id}`;
	//   return this.http.delete(url, {headers: this.headers})
	//     .toPromise()
	//     .then(() => null)
	//     .catch(this.handleError);
	// }

	create(user: User): Promise<User> {
	  return this.http
	    .post(this.usersUrl + '/store', JSON.stringify(user), {headers: this.headers})
	    .toPromise()
	    .then(res => res.json())
	    .catch(this.handleError);
	}

  index(): Promise<User[]> {
  	return this.http.get(this.usersUrl + '/index')
  		.toPromise()
  		.then(response => response.json().users as User[])
  		.catch(this.handleError);
  }

  show(id: number): Promise<User> {
  	return this.http.get(this.usersUrl + '/show/' + id)
  		.toPromise()
  		.then(response => response.json().user as User)
  		.catch(this.handleError);
  }

  getPosition(id: number) {
    return this.http.get(this.usersUrl + '/show/' + id + '/position')
      .toPromise()
      .then(response => response.json().position)
      .catch(this.handleError);
  }

  getRequests() {
    return this.getId().then(id => {
      return this.http.get(this.usersUrl + '/show/' + id + '/requests')
        .toPromise()
        .then(response => response.json().data)
        .catch(this.handleError);
    })
  }

  handleRequests(group_id: number) {
    return this.http.get(this.usersUrl + '/show/' + group_id + '/acceptedRequests')
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }











  setUsername(username: string) {
    this.storage.set('username', username);
  };

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  setId(id: string) {
    this.storage.set('id', id);
  };

  getId() {
    return this.storage.get('id').then((value) => {
      return value;
    });
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);

    return Promise.reject(error.message || error);
  }

}
