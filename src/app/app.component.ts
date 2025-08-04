import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { ChatService } from './services/chat.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatRoomComponent, MessageInputComponent, UserListComponent, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  username: string = '';
  isUsernameSet: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const savedName = localStorage.getItem('chat-username');
    if (savedName) {
      this.setUsername(savedName);
    }
  }

  setUsername(name: string) {
    this.username = name.trim();
    if (this.username) {
      this.chatService.setUsername(this.username);
      localStorage.setItem('chat-username', this.username);
      this.isUsernameSet = true;
    }
  }
}
