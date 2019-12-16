import { Component, OnInit } from '@angular/core';
import { MessageService } from "./message.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ MessageService ]
})
export class AppComponent implements OnInit{
  title = 'Ada Guestbook';

  constructor(private messageService: MessageService) { }
  //TODO: Remove hard-coded value once backend works
  messages: [];

  //TODO: Uncomment this section once backend works
  getMessages() {
    this.messageService.getMessages()
      .subscribe( data =>{
        this.messages = data as any;
      })
  }
  
  ngOnInit() {
    this.getMessages();
  }
}
