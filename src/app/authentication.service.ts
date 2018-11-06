import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  // login(email, password) {
  //   this.afAuth.auth.signInWithEmailAndPassword(email, password);
  //   console.log(this.user);
  // }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  updateDisplayName(newName) {
    let user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: newName,
      photoURL: ""
    }).then(function () {
      console.log("New Display Name: " + newName);
    }).catch(function (error) {
      console.log("Error updating display name");
    });
  }

  createAccount(newEmail, newPW) {
    this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPW);
  }
}