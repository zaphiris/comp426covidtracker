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

  constructor(userService: UserService, router: Router) {
    this.userService = userService;

    if(this.userService.checkIfLoggedIn()) {
      router.navigate(['/']);
    }
  }

  register() {
    this.userService.register(this.email, this.password);
  }

  ngOnInit(): void {
  }


}
