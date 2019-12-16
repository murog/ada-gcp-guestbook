import { Component,  Input  } from '@angular/core';


@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.scss'],
  
})
export class MessageDisplayComponent {
  @Input() messages: Array<Object>;

  getSentimentClass(message){
    if (!message.sentiment) {
      return "";
    }
    if (message.sentiment.score > 0.25){
      return "positive";
    } else if (message.sentiment.score <= 0.25 && message.sentiment.score >= -0.25) {
      return "neutral";
    } else if (message.sentiment.score < -0.25) {
      return "negative";
    } 
  }
  
}
