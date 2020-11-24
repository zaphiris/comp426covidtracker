import {Component, ViewChild} from '@angular/core';
import {UserService} from './user.service';
import {HomepageDataCardComponent} from './homepage-data-card/homepage-data-card.component';
import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn;
  show = false;
  userServiceGlob;

  @ViewChild(NavbarComponent) child: NavbarComponent;

  parentEventHandlerFunction(data){
    console.log("hello");
    this.loggedIn = this.userServiceGlob.checkIfLoggedIn();
    console.log("hii");
  }
  constructor(userService: UserService) {
    this.userServiceGlob = userService;
    this.loggedIn = userService.checkIfLoggedIn();
    this.show = true;
  }

  title = 'Comp 426 Political Covid Tracker';
}
