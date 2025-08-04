# 💬 Angular Signal Chat App (Practice Project)

This is a **simple real-time chat application** built with **Angular** and **WebSockets**, designed primarily to **practice and demonstrate Angular Signals** and related reactive patterns.

---

## 🚀 Features

- ✅ Real-time chat using WebSocket
- ✅ Angular **Signals** for reactive state
- ✅ Message input, display, and auto-scrolling
- ✅ Tabs UI to switch between chats (or future sections)
- ✅ Clean signal-based service and component structure
- ✅ Modular and scalable codebase

---

## 🎯 Learning Goals

This project was created to:

- Practice **Angular Signals (Writable, Computed, Effects)**
- Understand **readonly signal patterns**
- Explore **WebSocket** usage in Angular
- Learn **component-service communication** using signals
- Apply **component reactivity** without RxJS

---

## 🧠 Signal Features Demonstrated

| Feature             | How It's Used                                                                 |
|---------------------|-------------------------------------------------------------------------------|
| `WritableSignal<T>` | Used in services to hold internal message state (`_messages`)                |
| `readonly` keyword  | Signal reference is `readonly` to avoid reassignment and encourage discipline |
| `computed()`        | Used to expose derived state to components (`messages`)                      |
| `effect()`          | Used to trigger scroll on new message added                                  |
| `asReadonly()`      | Used optionally to convert writable to readonly when needed                  |

### ✳️ About `readonly` Usage
We deliberately used:
```ts
private readonly _messages = signal<Message[]>([]);

This is for practice purposes: even though the signal's value is mutable (.set() / .update()), the signal reference cannot be reassigned, reinforcing safe state encapsulation and mutation only inside the service.

### 📦 Tech Stack
Angular 17+

TypeScript

WebSocket

Tailwind CSS (optional, for styling)

Node.js + ws (backend)

### 🖥️ Frontend Setup
# Clone the repo
git clone https://github.com/your-username/angular-signal-chat.git
cd angular-signal-chat

# Install dependencies
npm install

# Start the dev server
ng serve

### 🌐 Backend Setup (WebSocket Server)
# Go to server folder
cd server

# Install dependencies
npm install

# Start WebSocket server
node index.js
✅ The server runs on ws://localhost:8080 and accepts simple JSON-based messages.

### 📁 Project Structure
src/
├── app/
│   ├── services/
│   │   └── chat.service.ts   # Holds WebSocket logic + signal state
│   ├── components/
│   │   ├── chat-box/
│   │   ├── message-input/
│   │   └── chat-tabs/
│   └── models/
│       └── message.model.ts  # Chat message interface
server/
└── index.js                  # WebSocket backend

### ✅ To-Do / Ideas
 Add typing indicators

 Add presence (online/offline)

 Store chat history (in memory or localStorage)

 Add username support

 Use effect() for tab syncing or notifications

### 📚 License
This project is for personal learning and experimentation. No commercial use intended.

### 🙋‍♂️ Author
Built by 'https://github.com/Prashannakumar/' as a Signals practice app.

Feel free to fork and experiment!