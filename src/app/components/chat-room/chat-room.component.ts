import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, OnInit, Signal, ViewChild } from '@angular/core';
import { Message } from '../../models/message.model';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent implements OnInit {
  messages: any = [];
  typingUsers: any = null;
  username: any = null;

  @ViewChild('scrollContainer') private scrollContainer: ElementRef<HTMLDivElement>;

  constructor(private chatService: ChatService) {
    this.messages = this.chatService.messages;
    this.typingUsers = this.chatService.typingUsers;
    this.username = this.chatService.username;

    effect(() => {
      const msgList = this.messages();
      if (msgList.length) {
        this.scrollToBottom();
      }
    })
  }

  ngOnInit(): void {
    // effect(() => {
    //   this.ScrollToBottom()
    // })
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.scrollContainer) {
        const el = this.scrollContainer.nativeElement;
        el.scrollTop = el.scrollHeight
      }
    })
  }

  get otherTypingUsers(): string[] {
    return this.typingUsers().filter((user: any) => user !== this.username());
  }

}
