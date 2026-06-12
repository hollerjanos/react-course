import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import type { ChatMessageType } from '../types';
import './ChatMessages.css';

type ChatMessagesProps = {
  chatMessages: ChatMessageType[];
}

function useAutoScroll(dependencies: React.DependencyList) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies);

  return containerRef;
}

function ChatMessages({ chatMessages }: ChatMessagesProps) {
  const chatMessagesRef = useAutoScroll([chatMessages]);
  return (
    <div
      className="chat-messages-container"
      ref={chatMessagesRef}
    >
      {chatMessages.map((chatMessage: ChatMessageType) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
            time={chatMessage.time}
          />
        )
      })}
    </div>
  )
}

export default ChatMessages;
