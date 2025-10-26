import { useEffect,  useState, useCallback, useRef } from 'react';
import { ConnectionStatus, WebSocketMessage } from '../types/message.type';
import { Message } from '../types/message.type';


interface UseWebSocketProps {
  url: string;                    // WebSocket server-ის URL
  onMessage?: (message: Message) => void;  // როცა ახალი მესიჯი მოვა
  autoReconnect?: boolean;        // ავტომატურად თავიდან დაუკავშირდეს?
  reconnectInterval?: number;     // რამდენ მილიწამში სცადოს თავიდან
}

export const useWebSocket = ({
  url,
  onMessage,
  autoReconnect = true,
  reconnectInterval = 3000,
}: UseWebSocketProps) => {
  // სტეიტები
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.CONNECTING
  );
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Refs - რომ არ გადაიტვირთოს კომპონენტი
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ფუნქცია რომელიც აკავშირებს WebSocket-ს
  const connect = useCallback(() => {
    try {
      console.log('🔄 WebSocket-თან დაკავშირება იწყება...');
      const socket = new WebSocket(url);
      socketRef.current = socket;

      // როცა კავშირი წარმატებით დამყარდა
      socket.onopen = () => {
        console.log('✅ WebSocket-თან დაკავშირება წარმატებულია!');
        setConnectionStatus(ConnectionStatus.CONNECTED);
      };

      // როცა ახალი მესიჯი მოვა სერვერიდან
      socket.onmessage = (event: MessageEvent) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          
          // თუ მესიჯის ტიპია და ტექსტი აქვს
          if (data.type === 'message' && data.payload.text) {
            const newMessage: Message = {
              id: Date.now().toString(),
              text: data.payload.text,
              sender: 'other',  // სხვა ადამიანისგან მოსული მესიჯი
              timestamp: new Date(data.payload.timestamp || Date.now()),
              username: data.payload.username,
            };

            // ვამატებთ მესიჯების სიაში
            setMessages((prev) => [...prev, newMessage]);
            
            // ვიძახებთ callback-ს თუ არსებობს
            onMessage?.(newMessage);
          }
        } catch (error) {
          console.error('❌ მესიჯის პარსვის შეცდომა:', error);
        }
      };

      // როცა კავშირი წყდება
      socket.onclose = () => {
        console.log('❌ WebSocket კავშირი გაწყდა');
        setConnectionStatus(ConnectionStatus.DISCONNECTED);

        // თუ ავტომატური რეკონექტია ჩართული
        if (autoReconnect) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('🔄 თავიდან დაკავშირება...');
            connect();
          }, reconnectInterval);
        }
      };

      // როცა შეცდომა მოხდება
      socket.onerror = (error) => {
        console.error('❌ WebSocket შეცდომა:', error);
        setConnectionStatus(ConnectionStatus.ERROR);
      };
    } catch (error) {
      console.error('❌ WebSocket-ის შექმნის შეცდომა:', error);
      setConnectionStatus(ConnectionStatus.ERROR);
    }
  }, [url, autoReconnect, reconnectInterval, onMessage]);

  // ფუნქცია მესიჯის გასაგზავნად
  const sendMessage = useCallback((text: string, username?: string) => {
    // ვამოწმებთ არის თუ არა კავშირი ღია
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      // ვქმნით მესიჯ ობიექტს
      const message: WebSocketMessage = {
        type: 'message',
        payload: {
          text,
          username: username || 'Anonymous',
          timestamp: new Date()
        },
      };
      socketRef.current.send(JSON.stringify(message));

      // ვამატებთ ჩვენს ლოკალურ მესიჯების სიაში
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'me',  // ეს ჩემი მესიჯია
        timestamp: new Date(),
        username,
      };

      setMessages((prev) => [...prev, newMessage]);
      return true;  // წარმატებით გაიგზავნა
    }
    
    console.warn('⚠️ კავშირი არ არის ღია!');
    return false;  // ვერ გაიგზავნა
  }, []);

  // კავშირის გათიშვა
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    socketRef.current?.close();
    socketRef.current = null;
  }, []);

  // როცა კომპონენტი mount-დება, ვუკავშირდებით WebSocket-ს
  useEffect(() => {
    connect();

    // როცა კომპონენტი unmount-დება, ვწყვეტთ კავშირს
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // ვაბრუნებთ ყველაფერს რაც სჭირდება კომპონენტს
  return {
    messages,              // ყველა მესიჯი
    sendMessage,           // ფუნქცია მესიჯის გასაგზავნად
    connectionStatus,      // კავშირის სტატუსი
    isConnected: connectionStatus === ConnectionStatus.CONNECTED,
    disconnect,            // კავშირის გასათიშად
    reconnect: connect,    // ხელით თავიდან დასაკავშირებლად
  };
};