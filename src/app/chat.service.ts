import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import 'rxjs-compat';

@Injectable()
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage(userName: string, msg: string, chatroomIndex: number){
    this.socket.emit("message", {username: userName, msg: msg, chatroomIndex: chatroomIndex});
  }
  
  getMessage() {
    return this.socket
      .fromEvent<any>("message")
      .map( data => data);
  }

  requestPreviousMessages(chatroomIndex) {
    this.socket.emit("previousMessages", chatroomIndex);
  }

  getPreviousMessages() {
    return this.socket
      .fromEvent<any>("previousMessages");
  }

  selectChatroom(index:number) {
    this.socket.emit("selectChatroom", index);
  }
}