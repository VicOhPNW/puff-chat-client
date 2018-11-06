import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import 'rxjs-compat';

@Injectable()
export class ChatService {

    constructor(private socket: Socket) { }

    sendMessage(userName: string, msg: string){
      this.socket.emit("message", {username: userName, msg: msg});
    }
    
    getMessage() {
      return this.socket
        .fromEvent<any>("message")
        .map( data => data);
    }
}