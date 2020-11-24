import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {Md5} from 'ts-md5';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string;
  loggedIn: boolean = this.checkIfLoggedIn();
  routerGlobal: Router;

  constructor(private http: HttpClient, public router: Router) {   this.routerGlobal = router; }


  checkIfLoggedIn() {
     if(localStorage.getItem('session') !== null) {
       this.loggedIn = true;
       return true;
    }
     this.loggedIn = false;
     return false;
  }

  async login(email: string, password: string, resolve: { (token: any): Promise<void>; (arg0: string): void; }) {
    await this.http.post<JsonObject>('https://comp426covidapi.uc.r.appspot.com/authentication/login', {email: email, password: Md5.hashStr(password)}).subscribe(data => {
      if (data.token != null && JSON.stringify(data.token).length > 6) {
        let token = data.token.toString();
        token.split(',');
        resolve(token);
      }
  });
  }

  async register(email: string, password, resolve, reject) {
   let token = null;
    await this.http.post<JsonObject>('https://comp426covidapi.uc.r.appspot.com/authentication/register', {email: email, password: Md5.hashStr(password)}).subscribe(data => {

        if (data.token != null && JSON.stringify(data.token).length > 6) {
          token = data.token.toString();
          token.split(',');
          resolve(token);
        }
      });
  }

  getStateSubscriptions(){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('session')}`)
    }

    return this.http.get('https://comp426covidapi.uc.r.appspot.com/authentication/states', header);
  }

  updateStateSubscription(state1, state2, state3){
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${localStorage.getItem('session')}`)
    }

    this.http.post<JsonObject>('https://comp426covidapi.uc.r.appspot.com/states', {'state1': state1, 'state2': state2, 'state3': state3}, header).subscribe((data3) =>{});
  }

}
