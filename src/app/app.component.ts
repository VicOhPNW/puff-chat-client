import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import * as firebase from "firebase";
import { userInfo } from 'os';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent {
  title = 'puff-chat';

  user;
  userName: string;

  constructor(public authService: AuthenticationService) {
    this.authService.user.subscribe(user => {
      console.log(user);
    });
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
    console.log(this.user);
  }

  login(email, password) {
    this.authService.login(email, password);
  }

  logout() {
    this.authService.logout();
  }

  updateDisplayName(newName) {
    this.authService.updateDisplayName(newName);
  }
}
