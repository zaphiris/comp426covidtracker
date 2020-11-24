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
  public router: Router;



  constructor(userService: UserService, router: Router) {
    this.router = router;
    if(userService.loggedIn) {
      router.navigate(['/']);
    } else {
      this.userService = userService;
      this.router = router;
    }
  }




  async login() {

    let router = this.router;
    let success = async function(token) {
      await localStorage.setItem('session', token);
      router.navigate(['/']);
    };

    await this.userService.login(this.email, this.password, success);
    if(this.userService.checkIfLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {

  }

}
