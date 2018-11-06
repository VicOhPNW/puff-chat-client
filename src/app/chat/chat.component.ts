import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers : [ChatService]
})
export class ChatComponent implements OnInit {
  messages=["message1","message2","message3"];
  msg : string;

  constructor(private chatService : ChatService) { }

  ngOnInit() {
    this.chatService
    .getMessage()
    .subscribe(msg => {
      this.msg = "1st "+msg;
    });
  }

  sendMsg(msg){
    this.chatService.sendMessage(msg);
  }
}
