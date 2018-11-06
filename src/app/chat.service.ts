import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import 'rxjs-compat';

@Injectable()
export class ChatService {

    constructor(private socket: Socket) { }

    sendMessage(msg: string){
      this.socket.emit("message", msg);
    }
    
    getMessage() {
      return this.socket
        .fromEvent<any>("message")
        .map( data => data.msg );
    }
}