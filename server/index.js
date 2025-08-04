const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

const clients = new Map(); // ws => username

function broadcast(data, exclude = null) {
    const payload = JSON.stringify(data);
    for (const [client] of clients) {
        if (client.readyState === WebSocket.OPEN && client !== exclude) {
            client.send(payload);
        }
    }
}

function getOnlineUsers() {
    const onlineUsers = [];
    for (const [client, username] of clients) {
        if (client.readyState === WebSocket.OPEN) {
            onlineUsers.push(username);
        }
    }
    return onlineUsers;
}

wss.on('connection', (ws) => {
    console.log('New connection');

    ws.on('message', (raw) => {
        let data;
        try {
            data = JSON.parse(raw);
        } catch {
            return;
        }

        // Handle message types
        switch (data.type) {
            case 'join':
                clients.set(ws, data.username);
                console.log(`${data.username} joined`);
                broadcast({ type: 'users', users: getOnlineUsers() });
                break;

            case 'message':
                broadcast({
                    type: 'message',
                    sender: data.sender,
                    content: data.content,
                    timestamp: data.timestamp,
                });
                break;

            case 'typing':
                // Broadcast typing status to others
                broadcast({
                    type: 'typing',
                    username: clients.get(ws),
                    isTyping: data.isTyping
                }, ws); // Exclude sender
                break;
        }
    });

    ws.on('close', () => {
        const username = clients.get(ws);
        clients.delete(ws);
        console.log(`${username} disconnected`);
        broadcast({ type: 'users', users: getOnlineUsers() });
    });
});