import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NavbarComponent} from './navbar/navbar.component';
import { HomepageMapWidgetComponent } from './homepage-map-widget/homepage-map-widget.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {CovidService} from './covidservice.service';
import {MatSelectModule} from '@angular/material/select';
import { HomepageDataCardComponent } from './homepage-data-card/homepage-data-card.component';
import {MatOption, MatOptionModule} from '@angular/material/core';
import {LayoutModule} from '@angular/cdk/layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { RegisterComponent } from './register/register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import {UserService} from './user.service';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageMapWidgetComponent,
    HomepageDataCardComponent,
    LoginComponent,
    RegisterComponent,
    EditProfileComponent,
    NewsfeedComponent
  ],
    imports: [
        BrowserModule,
        MatToolbarModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatOptionModule,
        MatSelectModule,
        HttpClientModule,
        LayoutModule,
        MatSelectModule,
        FormsModule,
        AppRoutingModule,
        RouterModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatInputModule,
        MatGridListModule,
        MatListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

  loggedIn = false;
  constructor(userService: UserService) {
    this.loggedIn = userService.checkIfLoggedIn();
  }
}

