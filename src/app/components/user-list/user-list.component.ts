import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: any = [];

  constructor(private chatService: ChatService) {
    this.users = this.chatService.users;
  }
}
