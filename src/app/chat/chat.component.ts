import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers : [ChatService]
})
export class ChatComponent implements OnInit {
  msg : string;
  currentUser: User;

  constructor(private chatService : ChatService) { }

  ngOnInit() {
    this.chatService
    .getMessage()
    .subscribe(msg => {
      this.msg = `${msg.username}: ${msg.msg}`;
    });
  }

  sendMsg(msg){
    this.chatService.sendMessage(this.currentUser.userName, msg);
  }

  createUser(name: string) {
    this.currentUser = new User(name);
  }
}
