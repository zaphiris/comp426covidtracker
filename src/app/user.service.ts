import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {Md5} from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string;
  loggedIn: boolean = this.checkIfLoggedIn();

  constructor(private http: HttpClient) { }

  checkIfLoggedIn() {
     if(localStorage.getItem('session') !== null) {
       this.loggedIn = true;
       return true;
    }
     this.loggedIn = false;
     return false;
  }

  async login(email: string, password: string) {
    await this.http.post<JsonObject>('http://localhost:8080/authentication/login', {email: email, password: Md5.hashStr(password)}).subscribe(data => {
     console.log(Md5.hashStr(password));
      if(data.token !== undefined) {
        localStorage.setItem('session', data.token.toString());
      }
    })
    if(localStorage.getItem('session') !== null) {
      return true;
    }
    return false;
  }

  register(email: string, password: string) {
    this.http.post<JsonObject>('http://localhost:8080/authentication/register', {email: email, password: Md5.hashStr(password)}).subscribe(data => {
      if(data.token !== undefined) {
        localStorage.setItem('session', data.token.toString());
        return "Success! Registered :)";
      } else {
        return "There was an error.";
      }
    })
  }

  getStateSubscriptions(){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('session')}`)
    }

    return this.http.get('http://localhost:8080/authentication/states', header);
  }

  updateStateSubscription(state1, state2, state3){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('session')}`)
    }

    this.http.post<JsonObject>('http://localhost:8080/states', {'state1': state1, 'state2': state2, 'state3': state3}, header).subscribe((data3) =>{});
  }

}
