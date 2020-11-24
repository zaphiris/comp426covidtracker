import { Component, OnInit } from '@angular/core';
import {CovidService, NewsStory, State} from '../covidservice.service';
import {plainToClass} from 'class-transformer';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from '../user.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  newsData;
  show: boolean = false;
  covidServiceG: CovidService;

  constructor(private userService: UserService, client: HttpClient) {

    this.userService.getStateSubscriptions().subscribe((data: JsonObject) => {

      let URL = encodeURI("https://newsapi.org/v2/everything?qinTitle=+coronavirus AND (" + '"' + data.state1 + '" OR "' +  data.state2 + '" OR "' + data.state3 + '"' + ")&apiKey=5e1bbc88e55648e58a3fc467819ba574");

      console.log(URL)
      let header = {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('session')}`)
      }

      client.get(URL).subscribe((data2: JsonObject) => {

        console.log(data2.articles)
        this.newsData = data2.articles;
        this.show = true;
      });

    });

  }

  ngOnInit(): void {
  }




}
