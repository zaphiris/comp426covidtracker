import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  newpassword: any;
  password: any;
  show = false;
  states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  @Input() state1: any;
  @Input() state2: any;
  @Input() state3: any;
  userServiceG: UserService;

  sinit1;
  sinit2;
  sinit3;

  showSuccess = false;
  private router: Router;

  constructor(userService: UserService, router: Router) {

    this.userServiceG = userService;
    this.router = router;

    if(!userService.checkIfLoggedIn()) {
      router.navigate(['login']);
    }


    userService.getStateSubscriptions().subscribe((data: JsonObject) => {

      this.sinit1 = data.state1;
      this.sinit2 = data.state2;
      this.sinit3 = data.state3;

      this.show = true;

    })

  }

  ngOnInit(): void {
  }

  updateSubscriptions() {
    this.userServiceG.updateStateSubscription(this.state1, this.state2, this.state3);
    this.showSuccess = true;
    this.router.navigate(['/editprofile']);
  }
}
