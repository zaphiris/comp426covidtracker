import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomepageMapWidgetComponent} from './homepage-map-widget/homepage-map-widget.component';
import {RegisterComponent} from './register/register.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {NewsfeedComponent} from './newsfeed/newsfeed.component';

// @Injectable()
// class CanActivateTeam implements CanActivate {
//   constructor() {}
//   canActivate(
//   ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
//     return this.permissions.canActivate(this.currentUser, route.params.id);
//   }
// }

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'editprofile', component: EditProfileComponent },
  { path: 'newsfeed', component: NewsfeedComponent },
  { path: '', component: HomepageMapWidgetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //providers: [IsLoggedIn]
})
export class AppRoutingModule { }
