import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean;
  userServiceG: UserService;
  routerG: Router;
  show: boolean = false;
  showLoggedOut: boolean = false;

  constructor(userService: UserService, router: Router) {
    this.loggedIn = userService.checkIfLoggedIn();
    this.routerG = router;
    if(!this.loggedIn) {
      this.showLoggedOut = true;
    } else {
      this.show = true;
    }
  }

  async logOut() {
    this.show = false;
    this.showLoggedOut = true;
    await localStorage.removeItem('session');
    await this.routerG.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
