import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {AppRoutingModule} from '../app-routing.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() email: string;
  @Input() password: string;
  userService: UserService;
  showForm: boolean = false;
  router: Router;

  constructor(userService: UserService, router: Router) {

    if(userService.loggedIn) {
      router.navigate(['/']);
    } else {
      this.userService = userService;
      this.router = router;
    }
  }

  async login() {
    await this.userService.login(this.email, this.password);
    this.router.navigate(['/']);
  }

  ngOnInit(): void {

  }

}
