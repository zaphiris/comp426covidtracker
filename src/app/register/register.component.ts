import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: any;
  password: any;
  userService: UserService;
  router: Router;
  public show: boolean = false;


  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;

    if(localStorage.getItem('session') != null) {
      router.navigate(['/']);
    }
  }



  register() {

    let success = async function(token) {
      await localStorage.setItem('session', token);
      router.navigate(['/']);
    }

    let failure = function() {
      throw new Error();
    }

    let router = this.router;

      this.userService.register(this.email, this.password, success, failure);

      this.show = true;

  }
  ngOnInit(): void {
  }


}
