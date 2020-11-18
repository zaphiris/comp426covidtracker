import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NavbarComponent} from './navbar/navbar.component';
import { HomepageMapWidgetComponent } from './homepage-map-widget/homepage-map-widget.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {CovidService} from './covidservice.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageMapWidgetComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {

  }
}

