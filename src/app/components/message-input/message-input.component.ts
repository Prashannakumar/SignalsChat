import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {

  messageText: string = '';
  typingTimeout: any;

  constructor(private chatService: ChatService) {}

  onInputChange() {
    // Update typing signal
    this.chatService.setTypingStatus(true);

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.chatService.setTypingStatus(false)
    }, 1000);
  }

  sendMessage(){
    const text = this.messageText.trim();
    if(!text) return;

    this.chatService.sendMessage(text);
    this.messageText = '';
    this.chatService.setTypingStatus(false);
  }

  onKeyDown(event: KeyboardEvent){
    if(event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

}
