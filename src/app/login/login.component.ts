import { Component, OnInit, HostBinding } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router } from '@angular/router';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()]
  // host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;
  user: Observable<firebase.User>;
  constructor(public af: AngularFireAuth, private router: Router) {

    this.user = af.authState;

    this.af.authState.subscribe(auth => {
    if (auth) {
      this.router.navigateByUrl('home');
    }
  });
}

/* loginFb() {
  this.af.auth.login({
    provider: AuthProviders.Facebook,
    method: AuthMethods.Popup,
  }).then(
      (success) => {
      this.router.navigate(['/members']);
    }).catch(
      (err) => {
      this.error = err;
    })
} */

loginGoogle() {
  this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  .then(
      (success) => {
      this.router.navigate(['home']);
    }).catch(
      (err) => {
      this.error = err;
    });
}

ngOnInit() {
}

}
