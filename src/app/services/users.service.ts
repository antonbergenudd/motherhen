import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../../assets/globals/user';

@Injectable()
export class UserService {

	private usersUrl = 'http://m-hen.dev/api/v1/users';  // URL to web api
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) {}

	// update(user: Hero): Promise<Hero> {
	//   const url = `${this.heroesUrl}/${hero.id}`;
	//   return this.http
	//     .put(url, JSON.stringify(hero), {headers: this.headers})
	//     .toPromise()
	//     .then(() => hero)
	//     .catch(this.handleError);
	// }

	// delete(id: number): Promise<void> {
	//   const url = `${this.heroesUrl}/${id}`;
	//   return this.http.delete(url, {headers: this.headers})
	//     .toPromise()
	//     .then(() => null)
	//     .catch(this.handleError);
	// }

	// create(name: string): Promise<Hero> {
	//   return this.http
	//     .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
	//     .toPromise()
	//     .then(res => res.json().data)
	//     .catch(this.handleError);
	// }

  getUsers(): Promise<User[]> {
  	return this.http.get(this.usersUrl + '/index')
  		.toPromise()
  		.then(response => response.json().users as User[])
  		.catch(this.handleError);
  }

  // getHero(id: number): Promise<Hero> {
  // 	const url = `${this.heroesUrl}/${id}`;

  // 	return this.http.get(url)
  // 		.toPromise()
  // 		.then(response => response.json().data as Hero)
  // 		.catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    
    return Promise.reject(error.message || error);
  }
  
}
