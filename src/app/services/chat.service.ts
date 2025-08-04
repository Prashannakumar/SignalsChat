import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: WebSocket;
  private socketUrl: string = "ws://localhost:3000";

  // 🔵 Signal to track message list
  private readonly _messages: WritableSignal<Message[]> = signal([]);
  readonly messages = computed(() => this._messages());

  // 🟢 Signal for current user
  private readonly _username = signal<string>('Guest');
  readonly username = this._username.asReadonly();

  // 🟡 Signal for typing status
  private readonly _isTyping = signal(false);
  readonly isTyping = this._isTyping.asReadonly()

  private readonly _users = signal<string[]>([]);
  readonly users = this._users.asReadonly();

  private readonly _typingUsers = signal<Set<string>>(new Set());
  readonly typingUsers = computed(() => Array.from(this._typingUsers()));

  constructor() {
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.socketUrl);

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'message':
          this._messages.update((msgs) => [...msgs, {
            sender: data.sender,
            content: data.content,
            timestamp: data.timestamp,
          }]);
          break;

        case 'users':
          this._users.set(data.users);
          break;

        case 'typing':
          this.handleTyping(data.username, data.isTyping);
          break;
      }
    };

    this.socket.onopen = () => {
      console.log("WebSocket connected");
    }

    this.socket.onclose = () => {
      console.log('WebSocket closed');
      setTimeout(() => {
        console.log("Reconnecting...");
        this.connect();
      }, 1000);
    }

    this.socket.onerror = (err) => {
      console.log('WebSocket error: ', err);
    }
  }

  private typingTimeouts = new Map<string, any>();

  private handleTyping(username: string, isTyping: boolean) {
    const current = new Set(this._typingUsers());

    if (isTyping) {
      current.add(username);
      // Auto-remove after 2.5s
      clearTimeout(this.typingTimeouts.get(username));
      this.typingTimeouts.set(username, setTimeout(() => {
        current.delete(username);
        this._typingUsers.set(new Set(current));
      }, 2500));
    } else {
      current.delete(username);
    }

    this._typingUsers.set(new Set(current));
  }


  sendMessage(text: string) {
    const message = {
      type: 'message',
      sender: this._username(),
      content: text,
      timestamp: new Date().toISOString()
    };

    this.socket.send(JSON.stringify(message));
    this._messages.update((msgs) => [...msgs, message]);
  }

  setUsername(name: string) {
    this._username.set(name);

    this.socket.send(JSON.stringify({
      type: 'join',
      username: name
    }));
  }

  setTypingStatus(status: boolean) {
    this._isTyping.set(status);

    this.socket.send(JSON.stringify({
      type: 'typing',
      isTyping: status
    }));
  }

}
