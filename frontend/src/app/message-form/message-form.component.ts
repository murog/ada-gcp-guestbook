import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from "../message.service"
import { Message } from "../message"

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  providers:[ MessageService ]
})
export class MessageFormComponent implements OnInit {
  @Input() loadMessageCallback : Function;
  // TODO: remove hard coded values when sticker endpoint is working
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
    this.messageService.postMessage(this.model)
    .subscribe(()=>{
      this.loadMessageCallback();
      this.newMessage();

    })
  }
  constructor(private messageService: MessageService) { }

  //TODO: Uncomment this section once backend works
  ngOnInit() {
    // this.messageService.getStickers()
    // .subscribe( data =>{
    //   this.stickers = data as any;
    // })
  }

}
