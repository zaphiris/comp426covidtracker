import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class State {
    state: string;
    positive: number;
}

@Injectable({
  providedIn: 'root'
})

export class CovidService {
  private covidApiUrl = 'https://api.covidtracking.com/v1/states/current.json';
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.covidApiUrl);
  }

}

