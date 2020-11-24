import {Component, ViewChild} from '@angular/core';
import {UserService} from './user.service';
import {HomepageDataCardComponent} from './homepage-data-card/homepage-data-card.component';
import {NavbarComponent} from './navbar/navbar.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn;
  show = false;
  showNav = false;
  userServiceGlob;
  private router: Router;

  public async logOut() {
    this.showNav = false;
    await localStorage.removeItem('session');
    await this.router.navigate(['/login']);
  }

  constructor(userService: UserService, router: Router) {
    this.router = router;
    this.userServiceGlob = userService;
    this.loggedIn = userService.checkIfLoggedIn();
    this.showNav = this.loggedIn;
    this.show = true;

  }

  title = 'Comp 426 Political Covid Tracker';
}
