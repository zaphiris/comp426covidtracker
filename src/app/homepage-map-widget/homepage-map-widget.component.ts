import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CovidService, State} from '../covidservice.service';

@Component({
  selector: 'app-homepage-map-widget',
  templateUrl: './homepage-map-widget.component.html',
  styleUrls: ['./homepage-map-widget.component.css']
})
export class HomepageMapWidgetComponent implements OnInit {
  states = [];

  constructor(private covidService: CovidService) { }

  ngOnInit() {

    this.covidService.sendGetRequest().subscribe((data: any[])=>{
      console.log(data);
      this.states = data;
    })
  }


}
