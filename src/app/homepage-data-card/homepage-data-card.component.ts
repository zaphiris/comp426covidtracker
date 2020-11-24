import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { LayoutModule} from '@angular/cdk/layout';

@Component({
  selector: 'app-homepage-data-card',
  templateUrl: './homepage-data-card.component.html',
  styleUrls: ['./homepage-data-card.component.css']
})
export class HomepageDataCardComponent implements OnInit {


  @Input() years: any[];
  @Output() selectDataEvent: EventEmitter<number> = new EventEmitter();
  @Output() buttonClicked: EventEmitter<String> = new EventEmitter<string>();
  year: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  clickButton() {
    this.buttonClicked.emit(this.year);
  }
}
