import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
// import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent {
  title = 'puff-chat';

  // user;
  // userName: string;

  // constructor(public authService: AuthenticationService) {
  //   this.authService.user.subscribe(user => {
  //     console.log(user);
  //     if (user == null) {
        
  //     } else {
  //       this.userName = user.displayName;
  //     }
  //   });
  // }

  // ngDoCheck() {
  //   this.user = firebase.auth().currentUser;
  //   if (this.user == null) {
        
  //   } else {
  //     this.userName = this.user.displayName;
  //   }
  // }

  // login(email, password) {
  //   this.authService.login(email, password);
  // }

  // logout() {
  //   this.authService.logout();
  // }

  // updateDisplayName(newName) {
  //   this.authService.updateDisplayName(newName);
  // }
}
