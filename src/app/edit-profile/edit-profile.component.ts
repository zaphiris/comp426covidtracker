import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';

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

  initState1: any;
  initState2: any;
  initState3: any;

  constructor(userService: UserService) {

    this.userServiceG = userService;
    userService.getStateSubscriptions().subscribe((data: JsonObject) => {

      this.initState1 = data.state1;
      this.initState2 = data.state2;
      this.initState3 = data.state3;
      this.show = true;


    })

  }

  ngOnInit(): void {
  }

  changePW() {

  }

  updateSubscriptions() {
    this.userServiceG.updateStateSubscription(this.state1, this.state2, this.state3);
  }
}
