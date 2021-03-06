import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from '../models/user.model';
import { AuthenticationService } from '../authentication.service';
import * as firebase from "firebase";
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers : [ChatService, AuthenticationService]
})
export class ChatComponent implements OnInit {
  messages=[{username: "Ethan Lee", msg: "Hello, welcome to the chatroom", timestamp: Date.now()}];
  msg : string;
  // currentUser: User;
  user;
  userName: string;
  regex = /(THIS_IS_IMAGE)/i;
  chatroomIndex: number = 0;

  emojiIconList: any[] = [
    { src: '../../assets/emoji/PuffChat Smiley.png', name: 'Smiley'},
    { src: '../../assets/emoji/PuffChat Smiley Wink.png', name: 'Wink'},
    { src: '../../assets/emoji/PuffChat Smiley Squint.png', name: 'Squint'},
    { src: '../../assets/emoji/PuffChat Smiley Squint Open.png', name: 'Squint Open'},
    { src: '../../assets/emoji/PuffChat Smiley Open.png', name: 'Smiley Open'},
    { src: '../../assets/emoji/PuffChat NongDamKi.png', name: 'NongDamKi!'},
    { src: '../../assets/emoji/PuffChat Frown.png', name: 'Frown'},
    { src: '../../assets/emoji/PuffChat Crying.png', name: 'Crying'},
    { src: '../../assets/emoji/PuffChat Blushing.png', name: 'Blushing'},
    { src: '../../assets/emoji/PuffChat Bemused.png', name: 'Bemused'},
    { src: '../../assets/emoji/PuffChat Kenneth.png', name: 'Kenneth'}
  ];
  
  constructor(private chatService : ChatService, public authService: AuthenticationService, private router: Router) {
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
    if (confirm('Successfully logged out')) {
      this.router.navigate([""]);
    }
    location.reload();
  }

  updateDisplayName(newName) {
    this.authService.updateDisplayName(newName);
  }

  createAccount(newEmail, newPW) {
    this.authService.createAccount(newEmail, newPW);
  }

  ngOnInit() {
    this.chatService
    .getMessage()
    .subscribe(msg => {
      if (msg.chatroomIndex === this.chatroomIndex) {
        this.messages.push({username: msg.username, msg: msg.msg, timestamp: msg.timestamp });
      }
    });
    
    this.chatService.requestPreviousMessages(this.chatroomIndex);

    this.chatService
    .getPreviousMessages()
    .subscribe(previousMessages => {
      Object.keys(previousMessages).forEach(key => {
        this.messages.push(previousMessages[key]);
      }); 
    });
  }

  sendMsg(msg){
    this.chatService.sendMessage(this.userName, msg, this.chatroomIndex);
  }

  sendImg(url) {
    this.sendMsg(url+"THIS_IS_IMAGE");
  }

  preventDefault () {window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = '';
    })
  }

  // createUser(name: string) {
  //   this.currentUser = new User(name);
  // }

  emojiMenuShow() {
    document.getElementById("dropdown-content").classList.toggle("hide");
    document.getElementById("dropdown-content").classList.toggle("emoji-grid");
  }

  sendEmoji(emojiSrc) {
    this.sendImg(emojiSrc);
    this.emojiMenuShow();
  }
}
