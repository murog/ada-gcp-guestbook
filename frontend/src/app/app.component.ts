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
  messages  = [
    {
      name: "Crisco",
      body: "Northern pikas are most active and mostly feed soon after dawn and as dusk approaches.",
      stickerUrl: "https://i.pinimg.com/originals/63/b3/49/63b349f74f7f2e498e1ca74c66b829fa.jpg",
      timestamp: "11-19-2019"
  }
  ]
  
  //TODO: Uncomment this section once backend works
  getMessages() {
    // this.messageService.getMessages()
    //   .subscribe( data =>{
    //     this.messages = data as any;
    //   })
  }
  
  ngOnInit() {
    this.getMessages();
  }
}
