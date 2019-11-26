import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.scss']
})
export class MessageDisplayComponent {

  constructor() { }
  messages = [
    {
      name: "Crisco",
      body: "Northern pikas are most active and mostly feed soon after dawn and as dusk approaches.",
      stickerUrl: "https://i.pinimg.com/originals/63/b3/49/63b349f74f7f2e498e1ca74c66b829fa.jpg",
      timestamp: "11-19-2019"
  }
  ]


}
