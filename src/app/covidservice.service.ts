import {Injectable, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HomepageDataCardComponent} from './homepage-data-card/homepage-data-card.component';
import {plainToClass} from 'class-transformer';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';

export class State {
    state: string;
    positive: number;
    negative: number;
    totalTestResults: number;
}

export class NewsStory {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
}

export class ElectionState {
  candidatevotes: number;
  totalvotes: number;
  static party: string;
  state_po: string;
  state: string;

   d2h(d) { return (+d).toString(16).toUpperCase(); }

  calculateStateColor() {

    let democraticPercentage = 1 - (this.candidatevotes / this.totalvotes);
    let republicanPercentage = this.candidatevotes / this.totalvotes;

    let red: number = ((100 * (republicanPercentage)) - 35) * 5;
    red = red < 0 ? 0 : red;
    let green: number = 0;
    let blue: number = ((100 * (democraticPercentage)) - 35) * 5;
    blue = blue < 0 ? 0 : blue;

    let blueHex = blue.toString(16).split('.', 1);
    let redHex = red.toString(16).split('.', 1);

    let finalblue = blueHex[0].length < 2 ? 0 + blueHex[0]: blueHex[0];
    let finalred = redHex[0].length < 2 ? 0 + redHex[0]: redHex[0];

    let color = finalred + "00" + finalblue;
    return color;
  }

}

@Injectable({
  providedIn: 'root'
})

export class CovidService {

  httpClientGlob: HttpClient;
  header;

  private covidApiUrl = 'https://api.covidtracking.com/v1/states/current.json';
  private electionDatabaseApi = 'https://comp426covidapi.uc.r.appspot.com/'
  private stateString: string = "(";
  private statesList = new Array();
  private states: JsonObject;


  constructor(private httpClient: HttpClient, private userService: UserService) {
    this.httpClientGlob = httpClient;
    this.header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('session')}`)
    }
  }

  public sendGetRequest() {
    return this.httpClient.get(this.covidApiUrl);
  }

  public sendElectionRequest(year: number) {
    let data = this.httpClientGlob.get('https://comp426covidapi.uc.r.appspot.com/' + year, this.header);
    return data;
  }

  public getYearsList() {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('session')}`)
    }
    let data = this.httpClientGlob.get('https://comp426covidapi.uc.r.appspot.com/', header);
    return data;

  }


}

