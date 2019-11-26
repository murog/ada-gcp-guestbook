import { Component, OnInit } from '@angular/core';
import { MessageFormService } from "./message-form.service"
import { Message } from "../message"

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  providers:[ MessageFormService ]
})
export class MessageFormComponent implements OnInit {

  // Hard-coded for now, until sticker endpoint is working
  stickers = ['https://media.giphy.com/media/yuOtad0VCOoH6/giphy.gif', 
              'https://media.giphy.com/media/3oKIPiE5AGlyMNht4c/giphy.gif',
              'https://media.giphy.com/media/ao9DUiTKH60XS/giphy.gif',
              "https://media.giphy.com/media/tXSZwvc2JPl4Y/giphy.gif",
              "https://media.giphy.com/media/t6HZilzz6W6Lm/giphy.gif",
              "https://media.giphy.com/media/p2sjYFtiXA4Zq/giphy.gif",
              "https://media.giphy.com/media/Q6nmoKHjaDSus/giphy.gif",
              "https://media.giphy.com/media/mCWjhIng6Uw0w/giphy.gif"];
  
  model = new Message(null, null);

  newMessage(){
    this.model = new Message(null, null);
  }
  onSubmit() { 
    this.messageFormService.postMessage(this.model)
    .subscribe(()=>{
      this.newMessage();
    })
  }
  constructor(private messageFormService: MessageFormService) { }

  ngOnInit() {
    // this.messageFormService.getStickers()
    // .subscribe( data =>{
    //   this.stickers = data;
    // })
  }

}
