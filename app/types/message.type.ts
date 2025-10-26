export interface Message{
    id:string;   
    text:string;  
    sender:'me' | 'other';   
    timestamp:Date;   
    username?: string   
}

// WebSocket-ით რომელი მესიჯები მოდის/გადის
export interface WebSocketMessage{
    type: 'message' | 'user_joined' |'user_left' | 'typing';
    payload: {
        text?: string;
        username?:string;
        timestamp?:Date;

    }
}
// კავშირის სტატუსი
export enum ConnectionStatus{
    CONNECTING = 'connecting',     
    CONNECTED = 'connected',    
    DISCONNECTED = 'disconnected', 
    ERROR = 'error',                
}