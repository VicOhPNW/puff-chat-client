import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from '../models/user.model';
import { AuthenticationService } from '../authentication.service';
import * as firebase from "firebase";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers : [ChatService, AuthenticationService]
})
export class ChatComponent implements OnInit {
  messages=[{username: "Ethan Lee", msg: "Hello, welcome to the chatroom"}];
  msg : string;
  // currentUser: User;
  user;
  userName: string;

  constructor(private chatService : ChatService, public authService: AuthenticationService) {
    this.authService.user.subscribe(user => {
      console.log(user);
      if (user == null) {
        
      } else {
        this.userName = user.displayName;
      }
    });
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
    if (this.user == null) {
        
    } else {
      this.userName = this.user.displayName;
    }
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

  ngOnInit() {
    this.chatService
    .getMessage()
    .subscribe(msg => {
      this.msg = `${msg.username}: ${msg.msg}`;
      this.messages.push({username: msg.username, msg: msg.msg});
    });
  }

  sendMsg(msg){
    this.chatService.sendMessage(this.userName, msg);
    // this.messages.push({username: this.currentUser.userName, msg: msg})
  }

  // createUser(name: string) {
  //   this.currentUser = new User(name);
  // }
}
